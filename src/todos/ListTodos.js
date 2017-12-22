import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ripple from '../assets/images/ripple.svg';
import './Todos.css';
import {
  List,
  Card,
  ListItemControl,
  Checkbox,
  TextField,
  Button,
} from 'react-md';

export class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchTodos();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createTodo(this.state.newTodo);
    this.setState({ newTodo: '' });
  };

  toggleComplete = id => {
    this.props.toggleComplete(id);
  };

  render() {
    return (
      <div className="Todo-list">
        <Card className="Todos-card">
          <List>
            {this.props.todos.todoList.map((todo, index) => (
              <ListItemControl
                key={index}
                primaryAction={
                  <Checkbox
                    id={index}
                    name="list-control-primary"
                    label={todo.name}
                    defaultChecked={todo.complete}
                    onChange={(todo, e) =>
                      this.toggleComplete(Number(e.target.id))
                    }
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
                value={this.state.newTodo}
                onChange={name => this.setState({ newTodo: name })}
              />
              {this.props.todos.loading ? (
                <div className="preloader">
                  <img src={ripple} className="ripple" alt="logo" />
                  <p>
                    Waiting for transaction to complete. <br />This may take a
                    few seconds.
                  </p>
                </div>
              ) : (
                <Button type="submit" raised secondary swapTheming>
                  Add Todo
                </Button>
              )}
            </form>
          </div>
        </Card>
      </div>
    );
  }
}

ListTodos.propTypes = {};
export default ListTodos;
