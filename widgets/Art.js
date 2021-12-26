import React, { useState } from 'react'
import {Dimensions, TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'

const window = Dimensions.get('window');
const styles = StyleSheet.create({
   row: {
       padding: 10
   },
   thumbnail: {
   },

})

function Art (props) {
    const [resume, setResume] = useState(props.resume)
    let factor = (window.width - 20) / props.width
    return (
        <>
        <Image
            style={{...styles.thumbnail, height: props.height*factor, width: props.width*factor}}
            source={{
                uri: 'data:image/jpg;base64,' + props.thumbnail,
            }}  
        />
        <TextInput 
            placeholder="your comment..." 
            value={resume}
            autoCapitalize='none'
            onChangeText={text=>setResume(text)}
        />
        </>
    )
}

export default Art