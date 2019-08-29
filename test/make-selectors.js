import { expect } from 'chai';
import { makeSelectors } from '../src/make-selectors';

describe('makeSelectors', () => {
  const KEY = 'users';
  const selectors = makeSelectors(KEY);
  
  const Kurt = { id: '1', name: 'Kurt Vonnegut' };
  const Joe = { id: '2', name: 'Joseph Heller' };
  const users = [Kurt, Joe];
  const usersMap = { '1': Kurt, '2': Joe };
  const usersState = { currentId: '2', items: users };
  const state = { [KEY]: usersState };

  it('exposes "selectSlice" method', () => {
    expect(selectors.selectSlice).to.be.a('function');
  });

  it('exposes "selectItemMap" method', () => {
    expect(selectors.selectItemMap).to.be.a('function');
  });

  it('exposes "selectCurrentItem" method', () => {
    expect(selectors.selectCurrentItem).to.be.a('function');
  });

  it('"selectSlice" gets correct slice of state', () => {
    expect(selectors.selectSlice(state)).to.eql(usersState);
  });

  it('"selectItemMap" converts items array to map', () => {
    expect(selectors.selectItemMap(state)).to.eql(usersMap);
  });

  it('"selectCurrentItem" gets item from map by currentId', () => {
    expect(selectors.selectCurrentItem(state)).to.eql(Joe);
  });
});
