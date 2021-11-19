// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

//import contacts, {compareNames} from './contacts' // just an array of contacts
import { Button } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddContactContainer from './screens/AddContactScreen'
import LoginScreenContainer from './screens/LoginScreen.js'
import GalleryContainer from './screens/GalleryScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import {Provider, connect} from 'react-redux'
import {store, persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import {fetchGallery} from './api'

const MainNavigator  = createStackNavigator()
const TabNavigator = createBottomTabNavigator()

function GalleryView() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen 
        name="GalleryScreen"
        component={GalleryContainer}
      />
      <MainNavigator.Screen
          name="AddContact" component={AddContactContainer} />
      <MainNavigator.Screen
          name="ContactDetails" component={ContactDetailsScreen} />
    </MainNavigator.Navigator>
  )
}


function HomeView() {
    return (
      <TabNavigator.Navigator 
        tabBarOptions={{
          activeTintColor:'#a41034',
      }}>
        <TabNavigator.Screen name="GalleryView" component={GalleryView} options={({route}) => ({
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

function Main({token}){
  return (
    <MainNavigator.Navigator screenOptions={{
      headerTintColor:'#a41034',
    }} >
        {token ? (
            <MainNavigator.Screen  options={{
              headerShown: false
            }}
              name="HomeView"
              component={HomeView}
            />
        ) : (
            <MainNavigator.Screen options={{
              headerShown: false
            }}
              name="LoginScreen" component={LoginScreenContainer} />
        )}
      </MainNavigator.Navigator>
  )
}


const mapStateToProps = state => ({
  token: state.user.token,
})
const MainContainer = connect(mapStateToProps)(Main)

export default class App extends React.Component {
  componentDidMount(){
    const gallery = fetchGallery();
    this.setState({gallery: gallery})
  }
  
  state = {
    gallery: [],
  }

  
  render() {
    console.log(this.props.isLoggedIn)

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator.Navigator>
          <MainNavigator.Screen  options={{
            headerShown: false
          }}
            name="Main"
            component={MainContainer}
          />
          </MainNavigator.Navigator>
        </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}

