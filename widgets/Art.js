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

function Row (props) {
//    const [state, setState] = setState({})
    let factor = (window.width - 20) / props.width
    return (
    <TouchableOpacity style={styles.row} onPress={() => {
        props.onSelectArt(props)
    }}>
        <Image
            style={{...styles.thumbnail, height: props.height*factor, width: props.width*factor}}
            source={{
                uri: 'data:image/jpg;base64,' + props.thumbnail,
            }}  
        />
        <TextInput 
            placeholder="your comment..." 
            value={props.resume}
            autoCapitalize='none'
        />
    </TouchableOpacity>
    )
}

export default Row