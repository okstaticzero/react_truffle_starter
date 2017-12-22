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

export const fetchTodos = () => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const todos = await Todos.getAllTodos();
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const createTodo = title => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const todos = await Todos.createTodo(title);
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const toggleComplete = id => {
  return async dispatch => {
    try {
      const todos = await Todos.markComplete(id);
      const todosArr = reformatTodos(todos);
      dispatch(todosSuccess(todosArr));
    } catch (err) {
      console.log(err);
    }
  };
};
