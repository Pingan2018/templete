import { fork, all } from "redux-saga/effects";
import {watchAdd} from './add'
export default function* rootSaga() {
  yield all([
    fork(watchAdd)
  ]);
}