import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { PinActions } from '@store/actions/pin.actions';
import * as fromPins from '@store/reducers/pin.reducer';

export interface State {
  pins: fromPins.State;
}

export const reducers: ActionReducerMap<State, PinActions> = {
  pins: fromPins.reducer,
};

export const reducer = combineReducers(reducers);

export const getInitialTestingState = (): State => {
  return {
    pins: fromPins.initialState,
  };
};
