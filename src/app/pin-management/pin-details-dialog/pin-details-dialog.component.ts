// TODO: basically this component can be used for all 3 actions: create, edit, delete

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pin } from 'src/app/classes/pin';
import * as fromRoot from '@store/reducers';
import { Store } from '@ngrx/store';
import {
  PinCreateRequested,
  RequestPinDelete,
} from '@store/actions/pin.actions';
import * as moment from 'moment';
import { PinService } from 'src/app/pin-service/pin.service';

@Component({
  selector: 'app-pin-details-dialog',
  templateUrl: './pin-details-dialog.component.html',
  styleUrls: ['./pin-details-dialog.component.css'],
})
export class PinDetailsDialogComponent implements OnInit {
  public pin: Pin;
  public newPin: boolean;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Pin,
    public dialogRef: MatDialogRef<PinDetailsDialogComponent>,
    private readonly _store: Store<fromRoot.State>,
    private _pinService: PinService
  ) {}

  ngOnInit(): void {
    if (!!this.newPin) {
      this.pin = this._pinService.createPin(
        'New pin',
        Math.floor(Math.random() * 10000 + 20)
      );
    } else {
      this.pin = { ...this.data };
    }
  }

  // TODO: Hate dates
  // Display only, changing dates not implemented (maybe use setters? ngModelChange? custom ControlValueAccessor?)
  // Need more time to look for solution and think about it
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
    this._store.dispatch(new PinCreateRequested({ pin: this.pin }));
    this.dialogRef.close();
  }

  private formatDate(d: Date): string {
    return moment(d).format('DD/MM/YYYY');
  }

  // TODO: validation methods not implemented
  // Possible solution: custom validation for template-driven forms
  // Custom validation on (change) event:
  //   <input
  //   matInput
  //   [value]="pin.alias"
  //   (blur)="stopRenamingPin()"
  //   (change)="validateAlias($event)"
  // />
  // Switch to reactive forms and define validators
}
