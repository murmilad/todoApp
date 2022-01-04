import React, { useState } from 'react'
import {Dimensions, TouchableOpacity, Text, View} from 'react-native'
import ImageScreen from '../screens/ImageScreen'
import tw from '../tailwind';
import useComponentSize from  '../useComponentSize';

const window = Dimensions.get('window');

function AlbumRow (props) {
    const [size, onLayout] = useComponentSize()
/*     const [resume, setResume] = useState(props.item.resume)
    <TextInput style={tw`ml-2  text-stone-100 text-xs`}
    placeholder="your comment..." 
    value={resume}
    autoCapitalize='none'
    onChangeText={text=>setResume(text)}
/>
 */

    return (
    <TouchableOpacity style={tw`p-1 bg-stone-900`} onPress={() => {
        props.onSelectArt(props.item, props.index)
    }}>
        <View style={tw`max-h-100 bg-stone-800 rounded-2 overflow-hidden`} onLayout={onLayout} >
            <ImageScreen
                size={size}
                albumName={props.item.albumName}
                imageName={props.item.imageName}  
            />
        </View>
        {props.item.resume &&
            <Text style={tw`text-stone-100 text-xs`}>
                <Text style={tw`text-indigo-400 text-xs`}>{props.item.resume.replace(/^([^\s]+).+/,'$1')} </Text>
                {props.item.resume.replace(/^[^\s]+/,'')}
            </Text>
        }
        </TouchableOpacity>
    )
}

export default AlbumRow