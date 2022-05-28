import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pin } from 'src/app/classes/pin';

@Component({
  selector: 'app-pin-details-dialog',
  templateUrl: './pin-details-dialog.component.html',
  styleUrls: ['./pin-details-dialog.component.css'],
})
export class PinDetailsDialogComponent implements OnInit {
  public pin: Pin;
  constructor(public dialogRef: MatDialogRef<PinDetailsDialogComponent>) {}

  ngOnInit(): void {}
}
