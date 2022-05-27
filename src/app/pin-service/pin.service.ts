import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pin, PinList } from '../classes/pin';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  private pinData = {
    listVersion: 0,
    pins: [
      {
        id: 1,
        alias: 'Pin for cleaning company',
        code: 112233,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 2,
        alias: 'Pin for girlfriend',
        code: 332211,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 3,
        alias: 'Pin for dog',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 4,
        alias: 'Pin for dog 2',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 5,
        alias: 'Pin for dog 3',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 5,
        alias: 'Pin for dog 5',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
    ],
  };

  // setup proxy https://blog.angulartraining.com/fake-your-angular-backend-until-you-make-it-8d145f713e14
  public getPinList(id: number, listVersion: number): Observable<PinList> {
    return of(this.pinData);
    // const pins = this.http.get('http://localhost:3000/api/teams');
  }
}
