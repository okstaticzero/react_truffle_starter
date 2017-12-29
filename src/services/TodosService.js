import { web3 } from '../util/web3Util';
import contract from 'truffle-contract';
import Todo from '../ethereum/build/contracts/TodoList.json';

const TodoContract = contract(Todo);
TodoContract.setProvider(web3.currentProvider);

class Todos {
  async getInstance() {
    const instance = await TodoContract.deployed();
    return instance;
  }

  async getAllUsers() {
    const instance = await this.getInstance();
    const items = await instance.getAllUsers();
    return items;
  }

  async getMyData(account) {
    const instance = await this.getInstance();
    const items = await instance.getMyData(account);
    return items;
  }

  async createAccount(name) {
    const instance = await this.getInstance();
    const item = await instance.createAccount(name);
    return item.receipt.from;
  }

  async createTodo(name) {
    const instance = await this.getInstance();
    const resp = await instance.addTodo(name);
    const items = await this.getMyData(resp.receipt.from);
    return items;
  }

  async toggleComplete(account, id) {
    const instance = await this.getInstance();
    await instance.toggleComplete(account, id);
    const items = await this.getAllTodos();
    return items;
  }
}

export default new Todos();
