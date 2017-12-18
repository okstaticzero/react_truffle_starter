import * as types from "../store/actionTypes";
import { test } from "../services/TodosService";

export const fetchTodos = () => {
  console.log("1111111");
  test();
  return dispatch => {
    console.log("222222");
  };
};
