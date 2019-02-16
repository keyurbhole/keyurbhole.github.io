import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Proptypes from 'prop-types';

class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} 
      markComplete={this.props.markComplete} 
      delTodo={this.props.delTodo}/>
    })
  }
}

Todos.propTypes = {
  todos: Proptypes.array.isRequired,
  markComplete: Proptypes.func.isRequired,
  delTodo: Proptypes.func.isRequired,
}

export default Todos
