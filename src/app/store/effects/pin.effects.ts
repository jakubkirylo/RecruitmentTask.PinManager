import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  PinActionTypes,
  PinListLoaded,
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

  constructor(private actions$: Actions, private pinService: PinService) {}
}
