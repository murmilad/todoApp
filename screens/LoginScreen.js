import React from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'
import { ContactsContext } from '../ContactsContext'

class LoginScreenComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You are</Text>
                <Button title="Press to login" onPress={this._login}/>
            </View>

        )
    }
    _login = () => {
        this.props.setLoggedIn()
    }
}

export default function LoginScreen ({navigation}){
    return (
        <ContactsContext.Consumer> 
            {({setLoggedIn}) => (
                <LoginScreenComponent navigation={navigation} setLoggedIn={setLoggedIn}/>
            )}
        </ContactsContext.Consumer>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        textAlign: 'center',
    },
})