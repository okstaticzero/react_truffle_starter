# Overview

This project is a boilerplate to quickly get started building DApps (Distributed Applications).
Tools used: 
`React` (Based on Create-react-app: https://github.com/facebookincubator/create-react-app)
`Redux` for state management https://redux.js.org/
`Truffle` For contract compiling/migrating http://truffleframework.com/
`web3` To allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection. https://github.com/ethereum/wiki/wiki/JavaScript-API
`truffle-contract` To make it easier to work with your contracts. https://github.com/trufflesuite/truffle-contract

## Development Setup
* Install truffle globally using: `npm install -g truffle`

* You will need the MetaMask extension for Chrome to interact with the DApps. You can install it from here: https://metamask.io/

## Working with contracts
* All contracts and files realated to Ethereum are in directory: `src/ethereum`
#### Local Development
* For local development: cd to directory `src/ethereum` and run `truffle develop`
* Command to compile contracts: `compile`
* Command to migrate contracts: `migrate`
* Note:`truffle develop` runs a local test node on localhost:9545 `truffle develop` Needs to be running when interacting with your contracts
* Metamask needs to point to localhost:9545 For directions, read here under title "USING METAMASK WITH TRUFFLE DEVELOP" http://truffleframework.com/docs/advanced/truffle-with-metamask

## Working with React/Redux
* Command for running the front end: `yarn start`
...more documentaion to come