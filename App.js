// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React from 'react';

//import contacts, {compareNames} from './contacts' // just an array of contacts
import { NavigationContainer} from '@react-navigation/native'
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

const MainNavigator  = createStackNavigator()
const TabNavigator = createBottomTabNavigator()

function GalleryView() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen 
        name="List"
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
          activeTintColor:'#a41034',
      }}>
        <TabNavigator.Screen name="Gallery" component={GalleryView} options={({route}) => ({
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

export default function App() {
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

