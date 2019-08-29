/**
 * makeReducer
 */
export const makeReducer = (ActionTypes, initialState) => (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.update: {
      return {
        ...state,
        ...action.payload,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        items: action.payload.items || state.items,
      };
    }
    case ActionTypes.clear: {
      return {
        currentId: '',
        failed: false,
        data: {},
        items: [],
        loaded: false,
      };
    }
    case ActionTypes.onLoadFailed: {
      return {
        ...state,
        failed: true,
      };
    }
    case ActionTypes.onLoadSucceeded: {
      return {
        ...state,
        ...action.payload,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        items: action.payload.items || state.items,
        failed: false,
        loaded: true,
      };
    }
    case ActionTypes.setCurrentItem: {
      return {
        ...state,
        currentId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
