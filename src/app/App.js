import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import logo from '../assets/images/logo.svg';
import eth_logo from '../assets/images/eth_logo.png';
import './App.css';
import ListTodos from '../todos/ListTodos';
import Accounts from '../accounts/Accounts';
import 'material-design-icons/iconfont/material-icons.css';
import { fetchTodos, createTodo, toggleComplete } from '../todos/TodoActions';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={eth_logo} className="Eth-logo" alt="logo" />
          </div>
          <h2>Welcome to Todo DApp</h2>
        </div>

        <Route exact path="/" component={Accounts} />
        <Route path="/todos/:account" component={ListTodos} />

      </div>
    );
  }
}

App.propTypes = {
  fetchTodos: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    loading: state.loadingState.loading
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchTodos,
  createTodo,
  toggleComplete,
})(App));
