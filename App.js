// import Example from './examples/0-switch'
// export default Example

/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';

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
import {Icon} from 'react-native-elements'
import {View, Text} from 'react-native'
import {Provider, connect, useDispatch} from 'react-redux'
import {store, persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import tw from './tailwind';
import { saveArtData, ALERT_CLEAN} from './redux/actions'

import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

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
                class="material-icons"
                name="dashboard"
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
                class="material-icons"
                name="settings"
                size={25}
                color={ focused ? color : tw.color('stone-700')}
              />)
          }
          })}

        />
      </TabNavigator.Navigator>
    )
}

const toastConfig = {
 
  infoToast: ({ text1, props }) => (
    <View style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-800 rounded-2 overflow-hidden items-center self-stretch`}>
      <Text style={tw`m-2 pl-2 text-stone-500 font-bold text-normal`}  >{text1}</Text>
    </View>
  )
};

function Main({token, alert}){
  const dispatch = useDispatch()

  useEffect(() => {
    if (alert && Object.keys(alert).length > 0) {

      if (alert.loading) {
        Toast.show({
          type: 'infoToast',
          text1: 'Loading',
        })
      } else if (alert.err) {
        Toast.show({
          type: 'error',
          text1: alert.err,
        })
        dispatch({type: ALERT_CLEAN})
      } else {
        Toast.hide()
      }
    }
  }, [alert]);

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
  alert: state.alert,
})
const MainContainer = connect(mapStateToProps)(Main)

export default function App() {

  return (
      <>
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
      <Toast config={toastConfig}/>
      </>
    )
}

