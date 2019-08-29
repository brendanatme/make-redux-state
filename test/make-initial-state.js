import { expect } from 'chai';
import { makeInitialState } from '../src/make-initial-state';

describe('makeInitialState', () => {
  it('creates correct shape by default', () => {
    expect(makeInitialState()).to.eql({
      currentId: '',
      failed: false,
      data: {},
      items: [],
      loaded: false,
    });
  });

  it('overrides defaults with passed params', () => {
    expect(makeInitialState({
      currentId: '1',
      data: { custom: 'thing' },
      items: [{ id: '1' }],
      loaded: true,
    })).to.eql({
      currentId: '1',
      failed: false,
      data: { custom: 'thing' },
      items: [{ id: '1' }],
      loaded: true,
    });
  });
});
