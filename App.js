import React from 'react';
import { Button, SectionList, StyleSheet, Text, View} from 'react-native';

import contacts, {compareNames} from './contacts' // just an array of contacts

import { objectMethod } from '@babel/types';
import ContactsList from './ContactsList';
import AddContactsForm from './AddContactsForm';

export default class App extends React.Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts: contacts,
  }

  addContact = newContact => {
    this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
  }

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }))
  }

  toggleForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }))
  }

  sort = () => {
    this.setState(prevState =>({ contacts: [...prevState.contacts].sort(compareNames)}))
  }


render() {
  if(this.state.showForm) return <AddContactsForm onSubmit={this.addContact}/>
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="add contact" onPress={this.toggleForm} />
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