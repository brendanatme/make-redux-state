/**
 * make makeActionTypes
 * @param {string} key 
 * @returns {<{ [k: string]: string; }>}
 */
export const makeActionTypes = (key) => ({
  clear: `${key}::clear`,
  onLoadFailed: `${key}::onLoadFailed`,
  onLoadSucceeded: `${key}::onLoadSucceeded`,
  setCurrentItem: `${key}::setCurrentItem`,
  update: `${key}::update`,
});
