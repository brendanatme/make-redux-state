import { expect } from 'chai';
import { makeActionTypes } from '../src/make-action-types';
import { makeActions } from '../src/make-actions';

describe('makeActions', () => {
  const KEY = 'users';
  const ActionTypes = makeActionTypes(KEY);
  const actions = makeActions(KEY, ActionTypes, {
    customUserAction: () => () => null,
  });

  it('exposes "setCurrent${key}" action', () => {
    expect(actions.setCurrentUser).to.be.a('function');
  });

  it('exposes "clear${key}s" action', () => {
    expect(actions.clearUsers).to.be.a('function');
  });

  it('exposes "on${key}sLoadFailed" action', () => {
    expect(actions.onUsersLoadFailed).to.be.a('function');
  });

  it('exposes "on${key}sLoadSucceeded" action', () => {
    expect(actions.onUsersLoadFailed).to.be.a('function');
  });

  it('exposes "update${key}s" action', () => {
    expect(actions.updateUsers).to.be.a('function');
  });

  it('exposes custom user-defined actions', () => {
    expect(actions.customUserAction).to.be.a('function');
  });
});
