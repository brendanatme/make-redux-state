/**
 * make-redux-state
 *
 * make a slice of redux state
 * complete with out-of-the-box default behaviour:
 *
 * actions
 * selectors
 * reducer
 * etc
 *
 * useful for fetching data via api
 */
import { makeActions } from './make-actions';
import { makeActionTypes as _makeActionTypes } from './make-action-types';
import { makeHocs } from './make-hocs';
import { makeInitialState } from './make-initial-state';
import { makeReducer } from './make-reducer';

export const makeActionTypes = _makeActionTypes;

export const makeReduxState = (key, options = {}) => {
  const ActionTypes = _makeActionTypes(key);
  const initialState = makeInitialState(options.initialState);
  const actions = makeActions(key, ActionTypes, options.actions);
  const hocs = makeHocs(key, actions);
  const reducer = makeReducer(ActionTypes, initialState);

  return {
    actions, // provide external access to actions for use in other redux actions, etc.
    initialState,
    key,
    reducer,
    ...hocs
  };
};
