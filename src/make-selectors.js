/**
 * makeSelectors
 * 
 * use these to provide:
 * - an item map
 * - the current item
 * 
 * @param {string} key 
 * @returns {<{  }>}
 */
import { createSelector } from 'reselect';
import { mapArrayToObject } from '@brendanatme/js-helpers';

export const makeSelectors = (key) => {
  const selectSlice = (state) => state[key];
  const selectItemMap = createSelector(
    selectSlice,
    (storeSlice) => mapArrayToObject(storeSlice.items, 'id'),
  );
  const selectCurrentItem = createSelector(
    selectSlice,
    selectItemMap,
    (storeSlice, itemMap) => itemMap[storeSlice.currentId] ? itemMap[storeSlice.currentId] : storeSlice.data,
  );

  return {
    selectSlice,
    selectItemMap,
    selectCurrentItem,
  };
};
