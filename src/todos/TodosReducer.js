import * as types from "../store/actionTypes";

const initialState = { loading: false, todoList: [] }
export default (state = initialState, action) => {
  switch (action.type) {
    case types.TODOS_SUCCESS:
      return { ...state, todoList: action.payload, loading: false };
    case types.SHOW_PRELOADER:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
