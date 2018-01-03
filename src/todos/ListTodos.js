import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ripple from '../assets/images/ripple.svg';
import { connect } from 'react-redux';
import { fetchTodos, createTodo, toggleComplete } from '../todos/TodoActions';
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
    this.state = { newTodo: '', account: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentDidMount(e) {
    const account = this.props.match.params.account;
    this.setState({ account: account });
    this.props.fetchTodos(account);
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newTodo === '') return;
    this.props.createTodo(this.state.newTodo, this.state.account, this.props.account);
    this.setState({ newTodo: '' });
  };

  toggleComplete(id) {
    const account = this.state.account;
    this.props.toggleComplete(account, id, this.props.account);
  };

  render() {
    return (
      <div className="Todo-list">
        <Card className="Todos-card">
          <h4 data-account={this.props.match.params.account}>Account: {this.props.user.name}</h4>
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
              {this.props.loading ? (
                <div className="preloader">
                  <img src={ripple} className="ripple" alt="logo" />
                  <p>
                    Waiting for transaction to complete. <br />This may take a
                    few seconds.
                  </p>
                </div>
              ) : (
                  <Button type="submit" raised primary swapTheming>
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

ListTodos.propTypes = {
  createTodo: PropTypes.func,
  fetchTodos: PropTypes.func,
  toggleComplete: PropTypes.func,
  match: PropTypes.object,
  loading: PropTypes.bool,
  todos: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    account: state.accounts.account,
    loading: state.loadingState.loading,
    user: state.accounts.currentUser
  };
}

export default connect(mapStateToProps, {
  fetchTodos,
  createTodo,
  toggleComplete,
})(ListTodos);

