/**
 * makeHocs
 * 
 * take the state key,
 * and the actions we will provide to the user,
 * and return hocs to wrap React components
 * 
 * @param {string} key
 * @param {any} actions
 * @return {<{ [k: string]: HocFunction }>}
 */
import { connect } from 'react-redux';
import { decorate } from '@brendanatme/js-helpers';
import { makeSelectors } from './make-selectors';

export const makeHocs = (key, actions) => {
  const selectors = makeSelectors(key);

  /**
   * withProps
   * (hoc)
   *
   * expose pages props to provided component (Composed)
   *
   * @param {React.ComponentType} Composed
   */
  const withProps = (Composed) => connect((state) => ({
    [key]: {
      ...selectors.selectSlice(state),
      current: selectors.selectCurrentItem(state),
      itemMap: selectors.selectItemMap(state),
    },
  }))(Composed);

  /**
   * withActions
   * (hoc)
   *
   * expose pages actions to provided component (Composed)
   *
   * @param {React.ComponentType} Composed
   */
  const withActions = (Composed) => connect(null, actions)(Composed);

  const withAll = (Composed) => decorate(withActions, withProps)(Composed);

  return {
    withProps,
    withActions,
    withAll,
  };
};
