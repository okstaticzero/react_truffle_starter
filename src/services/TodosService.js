import web3 from "../util/web3Util";
import contract from "truffle-contract";
import Todo from "../ethereum/build/contracts/TodoList.json";

web3.eth.defaultAccount = web3.eth.accounts[0];
const TodoContract = contract(Todo);
TodoContract.setProvider(web3.currentProvider);

export const test = async () => {
  console.log("TodoContract: ", TodoContract);

  //console.log("ACOUNTS: ", TodoContract.getAllItems());
  const instance = await TodoContract.deployed();
  console.log("instance: ", instance);
  const newItem = await instance.createItem("YO YO YO YO YOYO");
  const items = await instance.getAllItems();
  console.log("items ", items);
};

class Todos {
  getAllItems = () => {};
}

//export new Todos();
