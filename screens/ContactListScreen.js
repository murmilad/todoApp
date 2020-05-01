import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import { ContactsContext } from '../ContactsContext'
import ContactsList from '../ContactsList';

export default class ContactListScreen extends React.Component {
    state = {
        showContacts: true,
    }

    toggleContacts = () => {
        this.setState(prevState => ({showContacts: !prevState.showContacts}))
    }

    showForm = () => {
        this.props.navigation.navigate('AddContact')
    }

    render() {
          return (
                <View style={styles.container}>
                  <Button title="toggle contacts" onPress={this.toggleContacts} />
                  <Button title="add contact" onPress={this.showForm} />
                  {this.state.showContacts && (
                    <ContactsContext.Consumer>
                      {({contacts, addContact}) => (
                            <ContactsList
                              contacts={contacts}
                            />
                      )}
                    </ContactsContext.Consumer>
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