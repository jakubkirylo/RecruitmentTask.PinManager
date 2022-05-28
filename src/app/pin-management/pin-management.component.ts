import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pin } from '../classes/pin';
import { PinService } from '../pin-service/pin.service';
import * as fromRoot from '@store/reducers';
import * as fromPins from '@store/reducers/pin.reducer';
import { RequestPinList } from '@store/actions/pin.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PinDetailsDialogComponent } from './pin-details-dialog/pin-details-dialog.component';

@Component({
  selector: 'app-pin-management',
  templateUrl: './pin-management.component.html',
  styleUrls: ['./pin-management.component.css'],
})
export class PinManagementComponent implements OnInit {
  public pins$: Observable<Pin[]>;

  constructor(
    private readonly _store: Store<fromRoot.State>,
    public pinService: PinService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._store.dispatch(new RequestPinList({ id: 1, listVersion: 1 }));

    this.pins$ = this._store.pipe(
      select((store) => store.pins),
      select(fromPins.pinsSelector)
    );
  }

  public openPinDetailsDialog(pin: Pin): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '100%';
    dialogConfig.position = {
      top: '0',
      right: '0',
    };

    const dialogRef = this.dialog.open(PinDetailsDialogComponent, dialogConfig);
    dialogRef.componentInstance.pin = pin;
    dialogRef.componentInstance.dialogRef = dialogRef;
  }
}
