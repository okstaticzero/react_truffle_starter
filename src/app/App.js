import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.svg';
import ListTodos from '../todos/ListTodos';
import 'material-design-icons/iconfont/material-icons.css';

import './App.css';
import { fetchTodos, createTodo, toggleComplete } from '../todos/TodoActions';

export class App extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ListTodos
          todos={this.props.todos}
          fetchTodos={this.props.fetchTodos}
          createTodo={this.props.createTodo}
          toggleComplete={this.props.toggleComplete}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchTodos: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, {
  fetchTodos,
  createTodo,
  toggleComplete,
})(App);
