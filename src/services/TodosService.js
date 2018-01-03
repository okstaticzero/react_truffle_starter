//import { web3 } from '../util/web3Util';
import { web3 } from "../util/Uport";
import contract from 'truffle-contract';
import Todo from '../ethereum/build/contracts/TodoList.json';

const TodoContract = contract(Todo);

TodoContract.setProvider(web3.currentProvider);

//const contract_address = "0x285462054eeba5c682beb0d8ac531a0c01eb5dc2";

class Todos {
  async getInstance() {
    //await TodoContract.at(contract_address);
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

  async createAccount(name, specificNetworkAddress) {
    const instance = await this.getInstance();
    const item = await instance.createAccount(name, { from: specificNetworkAddress });
    return item.receipt.from;

  }

  async createTodo(name, account, userAddress) {
    const instance = await this.getInstance();
    const resp = await instance.addTodo(name, account, { from: userAddress });
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
