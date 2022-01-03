// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

import {StatusBar} from 'react-native'

//import contacts, {compareNames} from './contacts' // just an array of contacts
import { NavigationContainer, DefaultTheme} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginScreenContainer from './screens/LoginScreen.js'
import GalleryContainer from './screens/GalleryScreen'
import SettingsScreen from './screens/SettingsScreen'
import AlbumScreen from './screens/AlbumScreen'
import ArtScreen from './screens/ArtScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import {Provider, connect} from 'react-redux'
import {store, persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import tw from './tailwind';


const DarkTheme = {
  dark: true,
  colors: {
    primary: tw.color('stone-100'),
    primaryDark: tw.color('stone-100'),
    background: tw.color('stone-900'),
    card: tw.color('stone-900'),
    text: tw.color('stone-100'),
    border: tw.color('stone-700'),
    notification: tw.color('stone-700'),
  },
}

const MainNavigator  = createStackNavigator()
const TabNavigator = createBottomTabNavigator()

function GalleryView() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen 
        name="Gallery"
        component={GalleryContainer}
        
      />
      <MainNavigator.Screen
          name="Album" component={AlbumScreen} />
      <MainNavigator.Screen
          name="Art" component={ArtScreen} />
    </MainNavigator.Navigator>
  )
}


function HomeView() {
    return (
      <TabNavigator.Navigator 
        tabBarOptions={{
          activeTintColor:tw.color('indigo-400'),
      }}>
        <TabNavigator.Screen name="Gallery" component={GalleryView} options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
              return (
              <Icon
                name={'md-contacts'}
                size={25}
                color={ focused ? color : tw.color('stone-700')}
              />)
          },
          headerShown: false,
          })}
        />
        <TabNavigator.Screen name="Settings" component={SettingsScreen} options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
              return (
              <Icon
                name={'md-options'}
                size={25}
                color={ focused ? color : tw.color('stone-700')}
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
      headerTintColor:tw.color('stone-100'),
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

export default function App() {

  return (

      <Provider store={store}>
      <StatusBar 
        backgroundColor={tw.color('black')}
        barStyle="light-content"
      />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer  theme={DarkTheme} >
          <MainNavigator.Navigator >
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

