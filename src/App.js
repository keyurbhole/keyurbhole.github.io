import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/layout/header';
import Todos from './components/todos/Todos';
import AddTodo from './components/todos/AddTodo';
import About from './components/pages/About';

// Css
import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data}))
    .catch(error => console.error(error))
  }

  // Toggle Complete
  markComplete = (id) =>{
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    });
  };

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
    .catch(error => console.error(error))
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    .catch(error => console.error(error))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="containere">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} 
                markComplete={this.markComplete}
                delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
