// TODO: basically this component can be used for all 3 actions: create, edit, delete

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pin } from 'src/app/classes/pin';
import * as fromRoot from '@store/reducers';
import { Store } from '@ngrx/store';
import { RequestPinDelete } from '@store/actions/pin.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-pin-details-dialog',
  templateUrl: './pin-details-dialog.component.html',
  styleUrls: ['./pin-details-dialog.component.css'],
})
export class PinDetailsDialogComponent implements OnInit {
  public pin: Pin;
  public newPin: boolean;
  constructor(
    public dialogRef: MatDialogRef<PinDetailsDialogComponent>,
    private readonly _store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {}

  public get getStartDate(): string {
    if (!!this.pin.startDate) {
      return this.formatDate(this.pin.startDate);
    } else {
      return '';
    }
  }

  public get getEndDate(): string {
    if (!!this.pin.endDate) {
      return this.formatDate(this.pin.endDate);
    } else {
      return '';
    }
  }

  public deletePin(): void {
    this._store.dispatch(new RequestPinDelete({ pin: this.pin }));
    this.dialogRef.close();
  }

  public createPin(): void {
    // TODO: save
    this.dialogRef.close();
  }

  private formatDate(d: Date): string {
    return moment(d).format('DD/MM/YYYY');
  }
}
