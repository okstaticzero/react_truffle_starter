import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchTodos } from "./TodoActions";
import {
  Avatar,
  List,
  ListItem,
  ListItemControl,
  Checkbox,
  Switch,
  FontIcon
} from "react-md";

export class ListTodos extends Component {
  render() {
    console.log("HUH");

    fetchTodos();
    return (
      <div>
        <List className="Todo-list">
          <ListItemControl
            primaryAction={
              <Checkbox
                id="list-control-chat-1"
                name="list-control-primary"
                label="Line Item 1"
                defaultChecked
              />
            }
          />
          <ListItemControl
            primaryAction={
              <Checkbox
                id="list-control-chat-2"
                name="list-control-primary"
                label="Line Item 2"
              />
            }
          />
          <ListItemControl
            primaryAction={
              <Checkbox
                id="list-control-chat-3"
                name="list-control-primary"
                label="Line Item 3"
                defaultChecked
              />
            }
          />
        </List>
      </div>
    );
  }
}

ListTodos.propTypes = {};
export default ListTodos;
