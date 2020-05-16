// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

import contacts, {compareNames} from './contacts' // just an array of contacts
import { Button } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { ContactsContext } from './ContactsContext'
import AddContactScreen from './screens/AddContactScreen'
import LoginScreen from './screens/LoginScreen.js'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import Icon from 'react-native-vector-icons/Ionicons'

import {fetchUsers} from './api'

const MainNavigator  = createStackNavigator()
const TabNavigator = createBottomTabNavigator()

function Contacts() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen 
        name="ContactList"
        component={ContactListScreen}
      />
      <MainNavigator.Screen
          name="AddContact" component={AddContactScreen} />
      <MainNavigator.Screen
          name="ContactDetails" component={ContactDetailsScreen} />
    </MainNavigator.Navigator>
  )
}


function Home() {
    return (
      <TabNavigator.Navigator 
        tabBarOptions={{
          activeTintColor:'#a41034',
      }}>
        <TabNavigator.Screen name="Contacts" component={Contacts} options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
              return (
              <Icon
                name={'md-contacts'}
                size={25}
                color={ focused ? color : 'gray'}
              />)
          }
          })}
        />
        <TabNavigator.Screen name="Settings" component={SettingsScreen} options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
              return (
              <Icon
                name={'md-options'}
                size={25}
                color={ focused ? color : 'gray'}
              />)
          }
          })}

        />
      </TabNavigator.Navigator>
    )
}

export default class App extends React.Component {

  componentDidMount(){
    //fetchUsers().then(results => this.setState({results}))
    this.getUsers()
  }

   getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  }


  state = {
    contacts: null,
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
        <NavigationContainer >
            <MainNavigator.Navigator screenOptions={{
              headerTintColor:'#a41034',
            }}>
                {this.state.isLoggedIn ? (
                    <MainNavigator.Screen  options={{
                      headerShown: false
                    }}
                      name="Home"
                      component={Home}
                    />
                ) : (
                    <MainNavigator.Screen options={{
                      headerShown: false
                    }}
                      name="LoginScreen" component={LoginScreen} />
                )}
            </MainNavigator.Navigator>
        </NavigationContainer>
      </ContactsContext.Provider>
    )
  }
}

