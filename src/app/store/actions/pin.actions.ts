import { Action } from '@ngrx/store';
import { PinList } from 'src/app/classes/pin';

export enum PinActionTypes {
  RequestPinList = '[Pin] Request Pin List',
  PinListLoaded = '[Pin] Pin List Loaded',
}

export class RequestPinList implements Action {
  readonly type = PinActionTypes.RequestPinList;

  constructor(public payload: { id: number; listVersion: number }) {}
}

export class PinListLoaded implements Action {
  readonly type = PinActionTypes.PinListLoaded;

  constructor(public payload: { pins: PinList }) {}
}

export type PinActions = RequestPinList | PinListLoaded;
