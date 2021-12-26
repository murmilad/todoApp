import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import ImageScreen from '../screens/ImageScreen'

const styles = StyleSheet.create({
   row: {
       padding: 20
   },
   thumbnail: {
    width: 50,
    height: 50,
   },

})

const GalleryRow = props => (
    <TouchableOpacity style={styles.row} onPress={() => {
        props.onSelectAlbum(props.item, props.index)
    }}>
        <Text >{props.item.name}</Text>
        <ImageScreen
            albumName={props.item.name}
            imageName={props.item.thumbnail_name[0]}  
        />
        <Text >{props.item.imageCount}</Text>
        <Text >{props.item.unsignedImageCount}</Text>
    </TouchableOpacity>

)

export default GalleryRow