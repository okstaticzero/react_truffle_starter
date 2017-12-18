import Web3 from "web3";

let web3;
if (typeof web3 !== "undefined") {
  // Use Mist/MetaMask's provider.
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3.providers.HttpProvider("http://localhost:7545");
}
export default new Web3(web3);
