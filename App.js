import React from 'react';
import {Button, ScrollView, Text, View, StyleSheet, Switch} from 'react-native';

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
  }
})

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      count:0,
    }
  }

  inc(){
    this.setState(prevState=>({
      count: prevState.count + 1,
    }))
  }

  componentDidMount(){
    setInterval(() => {
      this.inc()
    }, 1000);
  }

  render() {
    return (
      <View style={styles.appContainer}>
      <Text style={styles.count}>{this.state.count}</Text>
      </View>
    );
  }


}
