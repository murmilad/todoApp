import React from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class ScreenComponentOne extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 25, borderColor: 'teal' }} >
                <Button title="Go to screen two" onPress={() => this.props.navigation.navigate('ScreenTwo')}/>
            </View>
        )
    }
}

class ScreenComponentTwo extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 25, borderColor: 'orange' }} >
                <Button title="Go to screen one" onPress={() => this.props.navigation.navigate('ScreenOne')}/>
            </View>
        )
    }
}

const AppNavigator = createSwitchNavigator()

export default class App extends React.Component {
    render(){
        return (
            <NavigationContainer>
                <AppNavigator.Navigator>
                    <AppNavigator.Screen name="ScreenOne" component={ScreenComponentOne} />
                    <AppNavigator.Screen name="ScreenTwo" component={ScreenComponentTwo} />
                </AppNavigator.Navigator>
            </NavigationContainer>
        )

    }
}