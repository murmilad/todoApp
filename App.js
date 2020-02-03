import React from 'react';
import {Button, ScrollView, Text, View, StyleSheet, Switch} from 'react-native';

let id = 0;

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch onValueChange={props.onToggle} value={props.todo.checked} />
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.todo.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  appContainer: {
    flex: 1,
    paddingTop: 30,
  },
  fill: {
    flex: 1
  }
});

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  addTodo() {
    id++;
    const text = `TODO number ${id}`;
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id, text: text, checked: false}
      ]
    });
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>
          Unchecked todo count{' '}
          {this.state.todos.filter(todo => !todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="Add todo" />
        <ScrollView style={styles.fill}>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
