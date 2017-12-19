import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import todosReducer from "../todos/TodosReducer";
const root = combineReducers({
  router: routerReducer,
  todos: todosReducer
});

export default root;
