import React, { useState } from 'react'
import {Dimensions, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'
import ImageScreen from '../screens/ImageScreen'
import tw from '../tailwind';

const window = Dimensions.get('window');

function AlbumRow (props) {
    const [resume, setResume] = useState(props.item.resume)

    return (
    <TouchableOpacity style={tw`p-2 bg-stone-900`} onPress={() => {
        props.onSelectArt(props.item, props.index)
    }}>
        <ImageScreen
            size={{width: window.width -10 , height: 200}}
            albumName={props.item.albumName}
            imageName={props.item.imageName}  
        />
        <TextInput style={tw`ml-2  text-stone-100 text-xs`}
            placeholder="your comment..." 
            value={resume}
            autoCapitalize='none'
            onChangeText={text=>setResume(text)}
        />
    </TouchableOpacity>
    )
}

export default AlbumRow