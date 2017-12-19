import web3 from "../util/web3Util";
import contract from "truffle-contract";
import Todo from "../ethereum/build/contracts/TodoList.json";

web3.eth.defaultAccount = web3.eth.accounts[0];
const TodoContract = contract(Todo);
TodoContract.setProvider(web3.currentProvider);

class Todos {
  async getInstance() {
    const instance = await TodoContract.deployed();
    return instance;
  }

  async getAllTodos() {
    //Todo find better way to get the instance
    const instance = await this.getInstance();
    const items = await instance.getAllItems();
    return items;
  }
  async createTodo(name) {
    const instance = await this.getInstance();
    const item = await instance.createItem(name);
    const items = await instance.getAllItems();
    return items;
  }
  async markComplete(id) {
    const instance = await this.getInstance();
    const item = await instance.markComplete(id);
    return;
  }
}

export default new Todos();
