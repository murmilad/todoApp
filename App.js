// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

import contacts, {compareNames} from './contacts' // just an array of contacts
import { Button } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddContactContainer from './screens/AddContactScreen'
import ContactListContainer from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import {Provider} from 'react-redux'
import store from './redux/store'

const AppNavigator  = createStackNavigator()

export default class App extends React.Component {
  state = {
    contacts: contacts,
  }

  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <AppNavigator.Navigator>
                <AppNavigator.Screen 
                  name="ContactList"
                  component={ContactListContainer}
                />
                <AppNavigator.Screen
                  name="AddContact" component={AddContactContainer} />
                <AppNavigator.Screen
                  name="ContactDetails" component={ContactDetailsScreen} />
            </AppNavigator.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

