import React, { useState, useLayoutEffect } from 'react'
import {connect, useDispatch} from 'react-redux'
import {View, TextInput, Pressable, Text} from 'react-native'
import {checkConnection, SAVE_CONFIG} from '../redux/actions'

import tw from '../tailwind';

function SettingsScreen (props) {
	const dispatch = useDispatch();
    const [server, setServer] = useState()
    const [port, setPort] = useState()


    const saveCheckConnection = () => {
        dispatch({type: SAVE_CONFIG, payload: {server, port}})
        dispatch(checkConnection());        
    }

    useLayoutEffect(() => {
        if (props.config) {
            setServer(props.config.server)
            setPort(props.config.port)
        }
    }, [props.config]);


    return (
            <View >
                <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-700 text-stone-200 text-base rounded-2 overflow-hidden`}
                    placeholder="Сервер (localhost)"
                    placeholderTextColor={tw.color('stone-500')}
                    value={server}
                    onChangeText={text => setServer(text)}
                />
                <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-700 text-stone-200 text-base rounded-2 overflow-hidden`}
                    placeholder="Порт (8000)"
                    placeholderTextColor={tw.color('stone-500')}
                    value={port}
                    onChangeText={text => setPort(text)}
                />
                <Pressable style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-indigo-400 rounded-2 overflow-hidden items-center`}
                    onPress={() => saveCheckConnection()}>
                <Text style={tw`text-stone-200 text-base `}>Check connection</Text>
            </Pressable>

            </View>
        )
}

function mapStateToProps (state, props) {
    return ({
        config: state.config
    })
}


export default connect(
    mapStateToProps
)(SettingsScreen)
