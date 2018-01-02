import * as types from '../store/actionTypes';
import Todos from '../services/TodosService';
import { push } from "react-router-redux";

export const usersSuccess = data => {
  return {
    type: types.USERS_SUCCESS,
    payload: data,
  };
};

export const showPreloader = (bool) => {
  return {
    type: types.SHOW_PRELOADER,
    payload: bool
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const users = await Todos.getAllUsers();
      dispatch(usersSuccess(users));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const accountSuccess = (account) => {
  return {
    type: types.ACCOUNT_SUCCESS,
    payload: account
  };
};

export const createAccount = (title, specificNetworkAddress) => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      console.log('111111');
      dispatch(accountSuccess(specificNetworkAddress));
      const account = await Todos.createAccount(title, specificNetworkAddress);

      console.log('createAccount: ' + title);

      dispatch(push(`/todos/${account}`));
      console.log('333333');

      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};