/**
 * makeInitialState
 */
export const makeInitialState = (optionsInitialState = {}) => ({
  currentId: '', // for multiple resources
  failed: false,
  data: optionsInitialState.data || {}, // for singular resources
  items: optionsInitialState.items || [], // for multiple resources
  loaded: false,
  ...optionsInitialState,
});
