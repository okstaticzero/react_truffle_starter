import React, { Component } from "react";
import PropTypes from "prop-types";
import ripple from "../assets/images/ripple.svg";
import "./Todos.css";
import {
  Avatar,
  List,
  ListItem,
  Card,
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
    const _this = this;
    setTimeout(() => {
      _this.props.fetchTodos();
    }, 500);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createTodo(this.state.newTodo);
  };
  render() {
    // console.log("HUH: ", this.props.todos);

    return (
      <Card>
        <List className="Todo-list">
          {this.props.todos.todoList.map((todo, index) => (
            <ListItemControl
              key={index}
              primaryAction={
                <Checkbox
                  id={`list-control-chat-${index}`}
                  name="list-control-primary"
                  label={todo.name}
                  defaultChecked={todo.completed}
                  onChange={(todo, e) => console.log(todo, e.target.id)}
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
            {this.props.todos.loading ?
              <div className="preloader"><img src={ripple} className="ripple" alt="logo" /><p>Waiting for transaction to complete. <br />This may take a few seconds.</p></div>
              :
              <Button type="submit" raised secondary swapTheming>
                Add Todo
            </Button>
            }

          </form>
        </div>
      </Card>
    );
  }
}

ListTodos.propTypes = {};
export default ListTodos;
