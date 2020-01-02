import { put, takeEvery } from "redux-saga/effects";
import { AddActionType } from './homeTypes'
// import * as API from '../../api/add'
// import {$get} from '../../lib/utils'


function* add() {
  // yield API.add();
  yield put({ type: AddActionType.ADD_SUCCESS });
}

export function* watchAdd() {
  yield takeEvery(AddActionType.ADD, add);
}