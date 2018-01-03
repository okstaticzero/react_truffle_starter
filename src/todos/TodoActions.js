import { web3 } from '../util/web3Util';

import * as types from '../store/actionTypes';
import Todos from '../services/TodosService';

const reformatTodos = todos => {
  const newArr = [];
  for (let i = 0; i < todos[0].length; i++) {
    let obj = {};
    obj.id = todos[0][i].c[0];
    obj.name = web3.toAscii(todos[1][i]); //convert byte32 to string
    obj.complete = todos[2][i];
    newArr.push(obj);
  }
  return newArr;
};

export const todosSuccess = data => {
  return {
    type: types.TODOS_SUCCESS,
    payload: data,
  };
};

export const showPreloader = (bool) => {
  return {
    type: types.SHOW_PRELOADER,
    payload: bool
  };
};

export const fetchTodos = (account) => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const todos = await Todos.getMyData(account);
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const createTodo = (title, account, userAddress) => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const todos = await Todos.createTodo(title, account, userAddress);
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const toggleComplete = (account, id, userAddress) => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const todos = await Todos.toggleComplete(account, id, userAddress);
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
    } catch (err) {
      dispatch(showPreloader(false));
    }
  };
};
