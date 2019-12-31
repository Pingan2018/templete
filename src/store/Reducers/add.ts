import { AddActionType } from '../ActionTypes'
export const initSate = {
  counter: 1
}
function add(state = initSate, action: any) {
  switch (action.type) {
    case AddActionType.ADD_SUCCESS:
      let { counter } = state
      counter++
      return { counter };
    default:
      return state;
  }
}

export default add;