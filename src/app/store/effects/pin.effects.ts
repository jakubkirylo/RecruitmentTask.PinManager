import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  PinActionTypes,
  PinCreated,
  PinCreateRequested,
  PinListLoaded,
  RequestPinDelete,
  RequestPinList,
} from '@store/actions/pin.actions';
import { catchError, EMPTY, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { PinService } from 'src/app/pin-service/pin.service';
import * as fromRoot from '@store/reducers';

@Injectable()
export class PinEffects {
  public loadPinList$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RequestPinList>(PinActionTypes.RequestPinList),
      switchMap((action) =>
        this.pinService
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
        this.pinService.deletePin(action.payload.pin).pipe(
          map(() => new RequestPinList({ id: 1, listVersion: 1 })),
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
      withLatestFrom(this._store$.pipe(select((state) => state.pins))),
      switchMap(([action, pins]) =>
        this.pinService.createPin(action.payload.pinName, 99).pipe(
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

  constructor(
    private actions$: Actions,
    private pinService: PinService,
    private _store$: Store<fromRoot.State>
  ) {}
}
