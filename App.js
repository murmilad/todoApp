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
import LoginScreen from './screens/LoginScreen.js'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'


const MainNavigator  = createStackNavigator()

export default class App extends React.Component {
  state = {
    contacts: contacts,
    addContact: newContact => {
      this.setState(prevState => ({isLoggedIn: prevState.isLoggedIn, contacts: [...prevState.contacts, newContact]}))
    },
    setLoggedIn: newContact => {
      this.setState(prevState => ({isLoggedIn: true, contacts: prevState.contacts}))
    },
    isLoggedIn: false,
  }

  
  render() {
    return (
      <ContactsContext.Provider value={this.state}>
        <NavigationContainer>
            <MainNavigator.Navigator>
                {this.state.isLoggedIn ? (
                  <>
                    <MainNavigator.Screen 
                      name="ContactList"
                      component={ContactListScreen}
                    />
                    <MainNavigator.Screen
                        name="AddContact" component={AddContactScreen} />
                    <MainNavigator.Screen
                        name="ContactDetails" component={ContactDetailsScreen} />
                  </>
                ) : (
                    <MainNavigator.Screen
                      name="LoginScreen" component={LoginScreen} />
                )}
            </MainNavigator.Navigator>
        </NavigationContainer>
      </ContactsContext.Provider>
    )
  }
}

