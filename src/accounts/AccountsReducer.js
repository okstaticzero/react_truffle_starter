import * as types from "../store/actionTypes";

const initialState = { userList: [], currentUser: "" }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USERS_SUCCESS:
      return { ...state, userList: action.payload };
    case types.ACCOUNT_SUCCESS:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};
