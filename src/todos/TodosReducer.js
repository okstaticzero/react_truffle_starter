import * as types from "../store/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case types.TODOS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
