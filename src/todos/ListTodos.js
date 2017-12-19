import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  List,
  ListItem,
  ListItemControl,
  Checkbox,
  Switch,
  FontIcon,
  TextField,
  Button
} from "react-md";

export class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    this.props.fetchTodos();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createTodo(this.state.newTodo);
  };
  render() {
    // console.log("HUH: ", this.props.todos);

    return (
      <div>
        <List className="Todo-list">
          {this.props.todos.map((todo, index) => (
            <ListItemControl
              key={index}
              primaryAction={
                <Checkbox
                  id={`list-control-chat-${index}`}
                  name="list-control-primary"
                  label={todo.name}
                  defaultChecked={todo.completed}
                />
              }
            />
          ))}
        </List>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="floating-center-title"
              label="Title"
              lineDirection="center"
              placeholder="Hello World"
              className="md-cell md-cell--bottom"
              onChange={name => this.setState({ newTodo: name })}
            />
            <Button type="submit" raised secondary swapTheming>
              Add Todo
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

ListTodos.propTypes = {};
export default ListTodos;
