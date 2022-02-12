import React, {useState} from 'react'
import {Button, View, TextInput, Text, Pressable} from 'react-native'
import {connect} from 'react-redux'
import {logInUser} from '../redux/actions'

import tw from '../tailwind';


export default function LoadingScreen (props) {

    

    return (
        <View style={tw`bg-stone-900 flex-1 justify-center`}>
            <Text style={tw`ml-5 mr-5 mt-2 mb-2 bg-stone-900 text-stone-500 `} >Loading...</Text>
        </View>

    )
}



  
