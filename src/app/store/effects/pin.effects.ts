import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  PinActionTypes,
  PinCreated,
  PinCreateRequested,
  PinDeleted,
  PinListLoaded,
  RequestPinDelete,
  RequestPinList,
} from '@store/actions/pin.actions';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { PinService } from 'src/app/pin-service/pin.service';

@Injectable()
export class PinEffects {
  public loadPinList$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RequestPinList>(PinActionTypes.RequestPinList),
      switchMap((action) =>
        this._pinService
          .getPinList(action.payload.id, action.payload.listVersion)
          .pipe(
            map((pins) => new PinListLoaded({ pins })),
            tap(() => console.log('list loaded')), //or any other kind of notification for user
            catchError((errorResponse) => {
              //show error notification to user
              console.warn('error: ', errorResponse);
              return EMPTY;
            })
          )
      )
    )
  );
  public requestDeletePin$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RequestPinDelete>(PinActionTypes.RequestPinDelete),
      switchMap((action) =>
        this._pinService.deletePin(action.payload.pin).pipe(
          map(() => new PinDeleted({ pin: action.payload.pin })),
          tap(
            () => console.log('pin deleted') //or any other kind of notification for user
          ),
          catchError((errorResponse) => {
            //show error notification to user
            console.warn('error: ', errorResponse);
            return EMPTY;
          })
        )
      )
    )
  );

  public pinCreateRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PinCreateRequested>(PinActionTypes.PinCreateRequested),
      switchMap((action) =>
        this._pinService.savePin(action.payload.pin).pipe(
          map((pin) => new PinCreated({ pin })),
          tap(
            () => console.log('pin created') //or any other kind of notification for user
          ),
          catchError((errorResponse) => {
            //show error notification to user
            console.warn('error: ', errorResponse);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private _pinService: PinService) {}
}
