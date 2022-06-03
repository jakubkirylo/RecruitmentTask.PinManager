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
        startDate: new Date(2022, 3, 1),
        endDate: new Date(2022, 4, 31),
      },
      {
        id: 2,
        alias: 'Pin for girlfriend',
        code: 332211,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2023, 10, 31),
      },
      {
        id: 3,
        alias: 'Pin for dog',
        code: 445566,
        startDate: new Date(1952, 1, 1),
        endDate: new Date(2022, 10, 31),
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
        id: 6,
        alias: 'Pin for dog 5',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 7,
        alias: 'Pin for aaa',
        code: 445566,
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 11, 31),
      },
      {
        id: 8,
        alias: 'Pin for xxx',
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

  public deletePin(pin: Pin): Observable<boolean> {
    const p = this.pinData.pins.map((p) => p === pin);
    if (!!p) {
      this.pinData = {
        ...this.pinData,
        pins: this.pinData.pins.filter((item) => item !== pin),
      };
      return of(true);
    }
    return of(false);
  }

  public createPin(name: string, id: number): Observable<Pin> {
    // TODO: logic for creating new pin, evaluate code, etc.
    return of({
      id: id,
      alias: name,
      code: 445566,
      startDate: new Date(2022, 0, 1),
      endDate: new Date(2022, 11, 31),
    });
  }
}
