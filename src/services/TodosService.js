import { web3 } from "../util/web3Util";
import contract from "truffle-contract";
import Todo from "../ethereum/build/contracts/TodoList.json";

const TodoContract = contract(Todo);
TodoContract.setProvider(web3.currentProvider);

class Todos {
  async getInstance() {
    const instance = await TodoContract.deployed();
    return instance;
  }

  async getAllTodos() {
    const instance = await this.getInstance();
    const items = await instance.getAllItems.call();
    return items;
  }
  async createTodo(name) {
    const instance = await this.getInstance();
    const item = await instance.createItem(name);
    console.log("C: ", item);
    const items = await this.getAllTodos();
    console.log("D ", items);

    return items;
  }
  async markComplete(id) {
    const instance = await this.getInstance();
    const item = await instance.markComplete(id);
    return;
  }
}

export default new Todos();
