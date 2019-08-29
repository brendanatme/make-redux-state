import { expect } from 'chai';
import { makeActionTypes, makeReduxState } from '../src';

describe('index', () => {
  const KEY = 'myKey';
  
  describe('makeActionTypes', () => {
    it('is exposed', () => {
      expect(makeActionTypes).to.be.a('function');
    });
  });

  describe('makeReduxState', () => {
    let state = makeReduxState(KEY);
  
    it('exposes "reducer"', () => {
      expect(state.reducer).to.be.a('function');
    });
  
    it('exposes "withProps" hoc', () => {
      expect(state.withProps).to.be.a('function');
    });
  
    it('exposes "withActions" hoc', () => {
      expect(state.withActions).to.be.a('function');
    });
  
    it('exposes "withAll" hoc', () => {
      expect(state.withAll).to.be.a('function');
    });
  
    it('exposes "withProps" hoc', () => {
      expect(state.withProps).to.be.a('function');
    });
  
    it('exposes "initialState"', () => {
      expect(state.initialState).to.be.an('object');
    });
  
    it('exposes user-defined "key"', () => {
      expect(state.key).to.equal(KEY);
    });
  
    it('exposes "actions"', () => {
      expect(state.actions).to.be.an('object');
    });
  });
});
