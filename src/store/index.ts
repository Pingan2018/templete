import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "redux-saga/effects";
import { watchAdd, addReducer } from './home'
function* rootSaga() {
  yield all([
    fork(watchAdd)
  ]);
}
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  combineReducers({ addReducer }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;