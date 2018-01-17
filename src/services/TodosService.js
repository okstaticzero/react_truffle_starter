//import { web3 } from '../util/web3Util';
import { web3 } from "../util/Uport";
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

  async createAccount(userAddress) {
    const instance = await this.getInstance();
    const item = await instance.createAccount({ from: userAddress });
    return item.receipt.from;

  }

  async createTodo(hash1, hash2, account, userAddress) {
    const instance = await this.getInstance();
    console.log('11111: ', hash1);
    console.log('22222: ', hash2);
    const resp = await instance.addTodo(hash1, hash2, account, { from: userAddress });
    console.log('solidity response: ', resp);
    const items = await this.getMyData(resp.receipt.from);
    console.log('items: ', items);
    return items;
  }

  async toggleComplete(account, id, userAddress) {
    const instance = await this.getInstance();
    await instance.toggleComplete(account, id, { from: userAddress });
    const items = await this.getMyData(account);
    return items;
  }

  async deleteTodo(account, id, userAddress) {
    const instance = await this.getInstance();
    await instance.deleteTodo(account, id, { from: userAddress });
    const items = await this.getMyData(account);
    return items;
  }
}

export default new Todos();
