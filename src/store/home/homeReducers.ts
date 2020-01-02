import { AddActionType } from './homeTypes'
export const initSate = {
  counter: 1
}
function addReducer(state = initSate, action: any) {
  switch (action.type) {
    case AddActionType.ADD_SUCCESS:
      let { counter } = state
      counter++
      return { counter };
    default:
      return state;
  }
}

export {
  addReducer
};