import React from 'react'
import {Button, View, StyleSheet, TextInput, Text} from 'react-native'
import { ContactsContext } from '../ContactsContext'
import {connect} from 'react-redux'
import {logInUser} from '../redux/actions'
import PropTypes from 'prop-types'

class LoginScreenComponent extends React.Component {
    static propTypes = {
        err: PropTypes.string,
        token: PropTypes.string,
        logInUser: PropTypes.func,
    }
    state = {
        username: 'username',
        password: 'password',
    }
/*
    static getDerivedStateFromProps(props, state){
        if(props.token){
            props.navigation.navigate('Home')
        }

        return props
    }
*/    
    _login = async() => {
            this.props.logInUser(this.state.username, this.state.password)
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
                <Text style={styles.error}>{this.props.err}</Text>
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

function LoginScreen ({logInUser, navigation}){
    return (
        <LoginScreenComponent navigation={navigation} logInUser={logInUser} />
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

const mapStateToProps = state => ({
    err: state.user.loginErr,
    token: state.user.token,
})

  
export default  LoginScreenContainer = connect(mapStateToProps, {logInUser})(LoginScreenComponent)