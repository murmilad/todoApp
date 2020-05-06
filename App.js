// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

import contacts, {compareNames} from './contacts' // just an array of contacts
import { Button } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ContactsContext } from './ContactsContext'
import AddContactScreen from './screens/AddContactScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'


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
                <AppNavigator.Screen 
                  name="ContactList"
                  component={ContactListScreen}
                />
                <AppNavigator.Screen
                  name="AddContact" component={AddContactScreen} />
                <AppNavigator.Screen
                  name="ContactDetails" component={ContactDetailsScreen} />
            </AppNavigator.Navigator>
        </NavigationContainer>
      </ContactsContext.Provider>
    )
  }
}

