/**
 * makeActions
 */
import { capitalize, singularize } from '@brendanatme/js-helpers';

export const makeActions = (key, ActionTypes, optionsActions = {}) => {
  const cappedKey = capitalize(key);
  const cappedSingleKey = singularize(cappedKey);

  /**
   * clear
   *
   * provide action creator to reset to blank state
   */
  const clear = () => ({ type: ActionTypes.clear });

  /**
   * onLoadFailed
   *
   * use to signify resource loading failed
   */
  const onLoadFailed = () => ({ type: ActionTypes.onLoadFailed });

  /**
   * onLoadSucceeded
   *
   * use to signify resource loading succeeded
   */
  const onLoadSucceeded = () => ({ type: ActionTypes.onLoadSucceeded });

  /**
   * setCurrentItem
   *
   * action creator to set an item from our itemMap as the 'current' item
   * by ID
   *
   * @param {string} itemId id of item to use as current item
   */
  const setCurrentItem = (itemId) => ({ payload: itemId, type: ActionTypes.setCurrentItem });

  /**
   * update
   * 
   * generic method to update state data
   * 
   * @param {any} payload 
   */
  const update = (payload) => ({ payload, type: ActionTypes.update });

  /**
   * combine our interal actions with user-defined actions
   */
  return {
    [`setCurrent${cappedSingleKey}`]: setCurrentItem,
    [`clear${cappedKey}`]: clear,
    [`on${cappedKey}LoadFailed`]: onLoadFailed,
    [`on${cappedKey}LoadSucceeded`]: onLoadSucceeded,
    [`update${cappedKey}`]: update,
    ...optionsActions,
  };
};
