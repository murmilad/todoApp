import React from 'react'
import {Button, View, StyleSheet, TextInput, Text} from 'react-native'
import { ContactsContext } from '../ContactsContext'
import {login} from '../api'

class LoginScreenComponent extends React.Component {
    state = {
        username: '',
        password: '',
        err: '',
    }
    
    _login = async() => {
        try {
            const success = await login(this.state.username, this.state.password)
            if (success) {
                this.props.setLoggedIn()
            }
        } catch (err){
            const errMessage = err.message
            this.setState({err: errMessage})
        }
    }

    handleUsernameUpdate = username => {
        this.setState({username})
    }
    handlePasswordUpdate = password => {
        this.setState({password})
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{this.state.err}</Text>
                <TextInput 
                    placeholder="username" 
                    value={this.state.username}
                    onChangeText={this.handleUsernameUpdate}
                    autoCapitalize='none'
                />
                <TextInput 
                    placeholder="password"
                    value={this.state.password}
                    onChangeText={this.handlePasswordUpdate}
                    secureTextEntry={true}
                />
                <Button title="Press to login" onPress={this._login}/>
            </View>

        )
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
    error: {
        textAlign: 'center',
        color: 'red',
    },
})