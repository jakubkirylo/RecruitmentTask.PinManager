import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pin } from '../classes/pin';
import { PinService } from '../pin-service/pin.service';

@Component({
  selector: 'app-pin-management',
  templateUrl: './pin-management.component.html',
  styleUrls: ['./pin-management.component.css'],
})
export class PinManagementComponent implements OnInit {
  public pins$: Observable<Pin[]>;

  constructor(public pinService: PinService) {}

  ngOnInit(): void {
    this.pins$ = this.pinService
      .getPinList(1, 1)
      .pipe(map((pinList) => pinList.pins));
  }
}
