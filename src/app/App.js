import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card, CardText, CardTitle } from "react-md/lib/Cards";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import "./App.css";
import ListTodos from "../todos/ListTodos";
import "material-design-icons/iconfont/material-icons.css";

export class App extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ListTodos />
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(App);
