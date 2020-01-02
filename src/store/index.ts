import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {add} from './reducers'
import rootSaga from './saga'
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  combineReducers({ add }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;