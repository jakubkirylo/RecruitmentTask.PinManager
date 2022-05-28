import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pin } from '../classes/pin';
import { PinService } from '../pin-service/pin.service';
import * as fromRoot from '@store/reducers';
import * as fromPins from '@store/reducers/pin.reducer';
import { RequestPinList } from '@store/actions/pin.actions';

@Component({
  selector: 'app-pin-management',
  templateUrl: './pin-management.component.html',
  styleUrls: ['./pin-management.component.css'],
})
export class PinManagementComponent implements OnInit {
  public pins$: Observable<Pin[]>;

  constructor(
    private readonly _store: Store<fromRoot.State>,
    public pinService: PinService
  ) {}

  ngOnInit(): void {
    this._store.dispatch(new RequestPinList({ id: 1, listVersion: 1 }));

    this.pins$ = this._store.pipe(
      select((store) => store.pins),
      select(fromPins.pinsSelector)
    );
  }
}
