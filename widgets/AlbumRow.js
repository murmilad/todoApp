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

function AlbumRow (props) {
    const [resume, setResume] = useState(props.item.resume)
    let factor = (window.width - 20) / props.item.width
    return (
    <TouchableOpacity style={styles.row} onPress={() => {
        props.onSelectArt(props.item, props.index)
    }}>
        <Image
            style={{...styles.thumbnail, height: props.item.height*factor, width: props.item.width*factor}}
            source={{
                uri: 'data:image/jpg;base64,' + props.item.thumbnail,
            }}  
        />
        <TextInput 
            placeholder="your comment..." 
            value={resume}
            autoCapitalize='none'
            onChangeText={text=>setResume(text)}
        />
    </TouchableOpacity>
    )
}

export default AlbumRow