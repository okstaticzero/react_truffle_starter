import Web3 from "web3";

let provider = window.web3;

if (typeof provider !== "undefined") {
  provider = new Web3(provider.currentProvider);
} else {
  provider = new Web3.providers.HttpProvider("http://localhost:7545");
}

provider.eth.defaultAccount = provider.eth.accounts[0];
console.log("accounts: ", provider.eth.accounts[0]);
export const web3 = new Web3(provider);

/*
provider.eth.defaultAccount = provider.eth.accounts[0];
export const ethereumClient = new Web3(
  new Web3.providers.HttpProvider('https://37d3d7e0.ngrok.io')
);
*/
