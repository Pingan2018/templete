import { put, call, takeEvery } from "redux-saga/effects";
import { AddActionType } from '../actionTypes'
// import * as API from '../../api/add'
// import {$get} from '../../lib/utils'


function* add(action:any) {
  console.log('///?')
  try {
    // yield API.add();
    yield put({ type: AddActionType.ADD_SUCCESS });
  } catch (error) {
    throw error
  }
}

export function* watchAdd() {
  yield takeEvery(AddActionType.ADD, add);
}