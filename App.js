import React from 'react';
import { Button, SectionList, StyleSheet, Text, View} from 'react-native';

import contacts, {compareNames} from './contacts' // just an array of contacts

import { objectMethod } from '@babel/types';
import ContactsList from './ContactsList';

export default class App extends React.Component {
  state = {
    showContacts: false,
    contacts: contacts,
  }

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }))
  }

  sort = () => {
    this.setState(prevState =>({ contacts: [...prevState.contacts].sort(compareNames)}))
  }


render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="sort" onPress={this.sort} />
        {this.state.showContacts && (
          <ContactsList
            contacts={this.state.contacts}
          />
        )}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:2,
  },
});