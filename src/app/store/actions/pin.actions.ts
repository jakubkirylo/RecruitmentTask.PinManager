import { Action } from '@ngrx/store';
import { Pin, PinList } from 'src/app/classes/pin';

export enum PinActionTypes {
  RequestPinList = '[Pin] Request Pin List',
  PinListLoaded = '[Pin] Pin List Loaded',
  RequestPinDelete = '[Pin] Request Pin Delete',
  PinDeleted = '[Pin] Pin Deleted',
  PinCreateRequested = '[Pin] Pin Create Requested',
  PinCreated = '[Pin] Pin Created',
}

export class RequestPinList implements Action {
  readonly type = PinActionTypes.RequestPinList;

  constructor(public payload: { id: number; listVersion: number }) {}
}

export class PinListLoaded implements Action {
  readonly type = PinActionTypes.PinListLoaded;

  constructor(public payload: { pins: PinList }) {}
}

export class RequestPinDelete implements Action {
  readonly type = PinActionTypes.RequestPinDelete;

  constructor(public payload: { pin: Pin }) {}
}

export class PinDeleted implements Action {
  readonly type = PinActionTypes.PinDeleted;

  constructor(public payload: { pin: Pin }) {}
}

export class PinCreateRequested implements Action {
  readonly type = PinActionTypes.PinCreateRequested;

  constructor(public payload: { pin: Pin }) {}
}

export class PinCreated implements Action {
  readonly type = PinActionTypes.PinCreated;

  constructor(public payload: { pin: Pin }) {}
}

export type PinActions =
  | RequestPinList
  | PinListLoaded
  | RequestPinDelete
  | PinDeleted
  | PinCreateRequested
  | PinCreated;
