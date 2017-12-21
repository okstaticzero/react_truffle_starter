import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card, CardText, CardTitle } from "react-md/lib/Cards";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import eth_logo from "../assets/images/eth_logo.png";
import "./App.css";
import ListTodos from "../todos/ListTodos";
import "material-design-icons/iconfont/material-icons.css";
import { fetchTodos, createTodo } from "../todos/TodoActions";

export class App extends Component {
  componentDidMount = () => { };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={eth_logo} className="Eth-logo" alt="logo" />
          </div>
          <h2>Welocome to Todo DApp</h2>
        </div>
        <ListTodos
          todos={this.props.todos}
          fetchTodos={this.props.fetchTodos}
          createTodo={this.props.createTodo}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchTodos: PropTypes.func,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, { fetchTodos, createTodo })(App);
