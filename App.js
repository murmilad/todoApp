import React from 'react';
import {render} from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const Todo = props => {
  <li>
    <input type="checkbox" />
    <button>delete</button>
    <span>{props.text}</span>
  </li>
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }
  addTodo(){
    const text = prompt('TODO text please!');
    this.setState({
      todos: [...this.state.todos, {text: text}],
    });
  }

  render() {
    return (
      <div>
        <button>Add todo</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo todo="todo" />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
