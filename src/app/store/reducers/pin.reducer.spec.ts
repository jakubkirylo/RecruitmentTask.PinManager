import { Action } from '@ngrx/store';
import {
  PinCreated,
  PinDeleted,
  PinListLoaded,
} from '@store/actions/pin.actions';
import * as R from 'ramda';
import { Pin, PinList } from 'src/app/classes/pin';
import { initialState, reducer, State } from './pin.reducer';

// Quick and nasty hack to bypass TS2591 Cannot find name 'require'. Tsconfif / types issue
declare var require: any;

const deepFreeze = require('deep-freeze');

const reduceState =
  (action: Action) =>
  (state: State): State => {
    return reducer(deepFreeze({ ...state }), action as any);
  };

const pin1: Pin = {
  id: 1,
  alias: 'Pin 1',
  code: 112233,
  startDate: new Date(2022, 3, 1),
  endDate: new Date(2022, 4, 31),
};

const pin2: Pin = {
  id: 2,
  alias: 'Pin for girlfriend',
  code: 332211,
  startDate: new Date(2020, 0, 1),
  endDate: new Date(2023, 10, 31),
};

const pins: PinList = {
  pins: [pin1, pin2],
  listVersion: 1,
};

describe('Pin Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
    it('should return the initial state if state unknown', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe('PinListLoaded action', () => {
    it('should load pin list', () => {
      let pipeRun = false;
      const actions: ((state: State) => State)[] = [
        R.tap((s) => {
          expect(s.ids).toEqual([]);
        }),
        reduceState(new PinListLoaded({ pins })),
        R.tap((s) => {
          expect(s.ids as string[]).toEqual(
            jasmine.arrayContaining([pin1.id, pin2.id])
          );
        }),
        R.tap(() => (pipeRun = true)),
      ];
      actions.reduce((acc, f) => f(acc), initialState);
      expect(pipeRun).toBeTruthy();
    });
  });

  describe('PinDeleted action', () => {
    it('should delete pin list', () => {
      let pipeRun = false;
      const actions: ((state: State) => State)[] = [
        R.tap((s) => {
          expect(s.ids).toEqual([]);
        }),
        reduceState(new PinListLoaded({ pins })),
        R.tap((s) => {
          expect(s.ids as string[]).toEqual(
            jasmine.arrayContaining([pin1.id, pin2.id])
          );
        }),
        reduceState(new PinDeleted({ pin: pin1 })),
        R.tap((s) => {
          expect(s.ids as string[]).toEqual(jasmine.arrayContaining([pin2.id]));
        }),
        R.tap(() => (pipeRun = true)),
      ];
      actions.reduce((acc, f) => f(acc), initialState);
      expect(pipeRun).toBeTruthy();
    });
  });

  describe('PinCreated action', () => {
    it('should create pin', () => {
      let pipeRun = false;
      const actions: ((state: State) => State)[] = [
        R.tap((s) => {
          expect(s.ids).toEqual([]);
        }),
        reduceState(new PinCreated({ pin: pin1 })),
        R.tap((s) => {
          expect(s.ids as string[]).toEqual(jasmine.arrayContaining([pin1.id]));
        }),
        R.tap(() => (pipeRun = true)),
      ];
      actions.reduce((acc, f) => f(acc), initialState);
      expect(pipeRun).toBeTruthy();
    });
  });
});
