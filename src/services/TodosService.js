//import { web3 } from '../util/web3Util';
import { uport, web3, MNID } from "../util/Uport";


import contract from 'truffle-contract';
import Todo from '../ethereum/build/contracts/TodoList.json';


const TodoContract = contract(Todo);
console.log('CONTRACT : ', TodoContract);

TodoContract.setProvider(web3.currentProvider);
console.log('XXXX: ', web3.currentProvider);

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
    console.log('account::::: ', account);

    const items = await instance.getMyData(account);
    console.log('items::::: ', items);
    return items;
  }

  async createAccount(name, specificNetworkAddress) {
    const instance = await this.getInstance();
    console.log('specificNetworkAddress 1: ', specificNetworkAddress);
    const item = await instance.createAccount(name);
    console.log('createAccount item ', item);
    return item.receipt.from;

  }

  async createTodo(name, account) {
    console.log('Create 11111');

    const instance = await this.getInstance();
    console.log('Create 222');
    const resp = await instance.addTodo(name, account);
    console.log('Create 3333 ', resp);
    const items = await this.getMyData(resp.receipt.from);
    console.log('Create 444 ', items);
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
