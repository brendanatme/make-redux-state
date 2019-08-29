import { expect } from 'chai';
import { makeActionTypes } from '../src/make-action-types';
import { makeInitialState } from '../src/make-initial-state';
import { makeReducer } from '../src/make-reducer';

describe('makeReducer', () => {
  const KEY = 'users';
  const initialState = makeInitialState();
  const ActionTypes = makeActionTypes(KEY);
  const reducer = makeReducer(ActionTypes, initialState);

  it('updates with payload', () => {
    expect(reducer(initialState, {
      type: ActionTypes.update,
      payload: { data: { custom: 'things' } },
    })).to.eql({
      ...initialState,
      data: { custom: 'things' },
    });
  });

  it('clears to defaults', () => {
    expect(reducer(initialState, { type: ActionTypes.clear })).to.eql(initialState);
  });

  it('switches on "failed" flag on fail', () => {
    expect(reducer(initialState, { type: ActionTypes.onLoadFailed })).to.eql({
      ...initialState,
      failed: true,
    });
  });

  it('switches on "loaded" flag on success and updates', () => {
    expect(reducer(initialState, {
      type: ActionTypes.onLoadSucceeded,
      payload: { data: { succeeding: true } },
    })).to.eql({
      ...initialState,
      failed: false,
      loaded: true,
      data: { succeeding: true },
    });
  });

  it('sets "currentId"', () => {
    expect(reducer(initialState, {
      type: ActionTypes.setCurrentItem,
      payload: '1',
    })).to.eql({
      ...initialState,
      currentId: '1',
    });
  });
});
