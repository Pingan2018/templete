import React, { useReducer } from "react";
const CTX = React.createContext();
export const applyMiddleware = (...middlewares) => createStore => (
  reducer,
  initialState
) => {
  let { store, Provider, connect } = createStore(reducer, initialState);
  let dispatch = store.dispatch;
  const middlewareAPI = {
    getState: () => store.getState(),
    dispatch: (...args) => dispatch(...args)
  };
  let chain = middlewares.map(middleware => middleware(middlewareAPI));
  dispatch = compose(...chain)((...args) => store.dispatch(...args));
  store.dispatch = dispatch;
  return {
    store,
    connect,
    Provider
  };
};
export const createStore = (reducer, initialState) => {
  let store = {};
  const Provider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    store.getState = () => state;
    store.dispatch = dispatch;
    return (
      <CTX.Provider value={store}>
        {React.cloneElement(props.children)}
      </CTX.Provider>
    );
  };
  const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    let state = initialState;
    let actions = {};
    return props => {
      if (store.getState) {
        state = mapStateToProps(store.getState());
      }
      actions = mapDispatchToProps(store.dispatch);
      return (
        <Component
          {...state}
          {...actions}
          {...props}
          dispatch={store.dispatch}
        />
      );
    };
  };
  return { store, Provider, connect };
};

let logger = store => next => action => {
  console.log(
    "%c prev state",
    `color:#a3a3a3,font-weight:bold`,
    store.getState()
  );
  console.log("%c action", `color:#a3a3a3,font-weight:bold`, action);
  next(action);
  console.log(
    "%c next state",
    `color:#a3a3a3,font-weight:bold`,
    store.getState()
  );
};
let promise = store => next => action =>
  action.then && typeof action.then === "function"
    ? action.then(store.dispatch)
    : next(action);

let thunk = store => next => action =>
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);

const compose = (...fns) =>
  fns.length === 0
    ? args => args
    : fns.length === 1
    ? fns[0]
    : fns.reduce((a, b) => (...args) => a(b(...args)));
