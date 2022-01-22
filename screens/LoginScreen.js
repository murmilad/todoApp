import React, {useState} from 'react'
import {Button, View, TextInput, Text, Pressable} from 'react-native'
import {connect} from 'react-redux'
import {logInUser} from '../redux/actions'

import tw from '../tailwind';


function LoginScreenComponent (props) {
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('password')

    

    return (
        <View style={tw`bg-stone-900 flex-1 justify-center`}>
            <Text style={tw`ml-5 mr-5 mt-2 mb-2 bg-stone-900 text-red-500 `} >{props.err}</Text>
            <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-700 text-stone-200 text-base rounded-2 overflow-hidden`}
                placeholder="username"
                placeholderTextColor={tw.color('stone-500')}
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize='none'
            />
            <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-700 text-stone-200 text-base rounded-2 overflow-hidden`}
                placeholder="password"
                placeholderTextColor={tw.color('stone-500')}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <Pressable style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-indigo-400 rounded-2 overflow-hidden items-center`}
                onPress={() => props.logInUser(username, password)}>
                <Text style={tw`text-stone-200 text-base `}>Log in</Text>
            </Pressable>
        </View>

    )
}


const mapStateToProps = state => ({
    err: state.user.loginErr,
    token: state.user.token,
})

  
export default  LoginScreenContainer = connect(mapStateToProps, {logInUser})(LoginScreenComponent)