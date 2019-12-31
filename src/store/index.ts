import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {add} from './Reducers'
import rootSaga from './Saga'
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  combineReducers({ add }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;