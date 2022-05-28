import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Pin } from 'src/app/classes/pin';
import { PinActions, PinActionTypes } from '../actions/pin.actions';
import * as R from 'ramda';

export interface State extends EntityState<Pin> {}

const adapter: EntityAdapter<Pin> = createEntityAdapter<Pin>();

const emptyState: State = adapter.getInitialState({});

const initialState: State = { ...emptyState };

export function reducer(
  state: State = initialState,
  action: PinActions
): State {
  switch (action.type) {
    case PinActionTypes.PinListLoaded: {
      return adapter.upsertMany(
        action.payload.pins.pins,
        adapter.removeAll(state)
      );
    }
  }
  return state;
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const pinsSelector = createSelector(selectAll, (array) =>
  R.sortBy((o: Pin) => o.alias, array)
);

// export const sortedUsersSelector: MemoizedSelector<
//     EntityState<ManageableUser>,
//     ManageableUser[]
// > = createSelector(selectAll, items => {
//     return R.sortBy((o: ManageableUser) => o.email, items);
// });
