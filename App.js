// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

import contacts, {compareNames} from './contacts' // just an array of contacts
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ContactsContext } from './ContactsContext'
import AddContactScreen from './screens/AddContactScreen'
import ContactListScreen from './screens/ContactListScreen'


const AppNavigator  = createStackNavigator()

export default class App extends React.Component {
  state = {
    contacts: contacts,
    addContact: newContact => {
      this.setState(prevState => ({showForm: false, contacts: [...prevState.contacts, newContact]}))
    },
  }

  
  render() {
    return (
      <ContactsContext.Provider value={this.state}>
        <NavigationContainer>
            <AppNavigator.Navigator>
                <AppNavigator.Screen name="ContactList" component={ContactListScreen} />
                <AppNavigator.Screen name="AddContact" component={AddContactScreen} />
            </AppNavigator.Navigator>
        </NavigationContainer>
      </ContactsContext.Provider>
    )
  }
}

