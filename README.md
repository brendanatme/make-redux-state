# Make Redux State

Take the boilerplate out of redux.

Creates a slice of Redux state, and provides out-of-the-box reducers, actions for updating data and network status, and higher-order components

Store all your relevant state data in one object and cut out boilerplate without losing any flexibility in Redux.

## Usage

### Creating State

```javascript
import { makeActionTypes, makeReduxState } from '@brendanatme/make-redux-state';
import { myApi } from './path/to/my-api';

const STATE_KEY = 'myStateSlice';

const ActionTypes = makeActionsTypes(STATE_KEY);

const options = {
  actions: {
    myCustomFetch: (...myActionArgs) => (dipatch, getState) => {
      dispatch({ type: ActionTypes.clear });
      
      myApi
        .fetchData(...myActionArgs)
        .then((data) => {
          dispatch({
            type: ActionTypes.onLoadSucceeded,
            payload: { data },
          });
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.onLoadFailed });
        });
    },
  },
  initialState: { // with default shape
    currentId: '',
    data: {},
    failed: false,
    items: [],
    loaded: false,
  },
};

export const myState = makeReduxState(STATE_KEY, options);
```

### Adding State to Redux

```javascript
import { createStore, combineReducers } from 'redux';
import { myState } from './path/to/my-state';

const initialState = {
  [myState.key]: myState.initialState,
};

const reducer = combineReducers({
  [myState.key]: myState.reducer,
});

const myStore = createStore(reducer, initialState);
```

### Injecting State Props into Components

You can use the "withProps" HOC method to inject your state props into a component.

```javascript
import React from 'react';
import { myState } from './path/to/my-state';

const MyComponent = ({
  myStateSlice, // myState.key
}) => (
  <div>
    {myStateSlice.loaded ? (
      <span>{JSON.stringify(myStateSlice.data)}</span>
    ) : (
      <span>Loading...</span>
    )}
  </div>
);

export default myState.withProps(MyComponent);
```

### Giving Containers access to State Actions

```javascript
import React from 'react';
import MyComponent from './path/to/my-component';
import { myState } from './path/to/my-state';

class MyContainer extends React.Component {
  componentDidMount() {
    const args = {};
    this.props.myCustomFetch('any', args, 'you', 'want');
  }

  render() {
    return (
      <MyComponent />
    );
  }
}

export default myState.withActions(MyContainer);
```

## API

### makeActionTypes

@param {string} key  the key of the piece of state you are creating
@returns {Object} a hash of action type strings

Action Types:

- `clear`: resets state slice to default state
- `onLoadFailed`: sets "failed" flag to true
- `onLoadSucceeded`: sets "failed" flag to `false`, "loaded" flag to `true`, and updates state with payload
- `setCurrentItem`: sets the "currentId" property. Gives you access to a computed property "current" when you have items in the "items" array
- `update`: updates state with payload. Useful catchall to perform any manual update you want in a custom action creator

Example:

```javascript
const ActionTypes = makeActionTypes('users');
```

### makeReduxState

@param {string} key  the key of the piece of state you are creating
@param {Object} options  object containing custom action and custom initialState

Options:

```javascript
{
  actions?: {
    [k: string]: (args: any) => (dispatch: function, getState: function) => void;
  };
  initialState?: {
    currentId: string;
    data: any;
    failed: boolean;
    items: [
      { id: string|number; ...any }
    ],
    loaded: boolean;
  };
}
```

- `Options.actions`: a hash map of Redux action creators
- `Options.initialState`: the custom initial state of your state slice

Example:

```
const ActionTypes = makeActionTypes('users');
const stateSlice = makeReduxState('users', {
  actions: {
    fetchUser: (id) => (dispatch, getState) => {
      // ... get user ...
      dispatch({
        type: ActionTypes.onLoadSucceeded,
        payload: {
          data: user,
        },
      });
    },
    doSomethingSpecial:
  },
  initialState: {
    data: {
      something: 'custom',
    },
  },
});
```

Returns: a `ReduxState` object with the following properties:

```javascript
{
  actions: Object<{ [k: string]: Function }>
  initialState: Object;
  key: String;
  reducer: Function;
  withProps: Function;
  withActions: Function;
  withAll: Function;
}
```
