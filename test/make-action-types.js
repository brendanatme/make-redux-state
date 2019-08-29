import { expect } from 'chai';
import { makeActionTypes } from '../src/make-action-types';

describe('makeActionTypes', () => {
  const KEY = 'myKey';
  let ActionTypes = makeActionTypes(KEY);

  it('exposes "clear"', () => {
    expect(ActionTypes.clear).to.equal(`${KEY}::clear`);
  });

  it('exposes "onLoadFailed"', () => {
    expect(ActionTypes.onLoadFailed).to.equal(`${KEY}::onLoadFailed`);
  });

  it('exposes "onLoadSucceeded"', () => {
    expect(ActionTypes.onLoadSucceeded).to.equal(`${KEY}::onLoadSucceeded`);
  });

  it('exposes "setCurrentItem"', () => {
    expect(ActionTypes.setCurrentItem).to.equal(`${KEY}::setCurrentItem`);
  });

  it('exposes "update"', () => {
    expect(ActionTypes.update).to.equal(`${KEY}::update`);
  });
});
