import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

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
        <Image
            style={styles.thumbnail}
            source={{
                uri: 'data:image/jpg;base64,' + props.item.thumbnail,
            }}  
        />
        <Text >{props.item.imageCount}</Text>
        <Text >{props.item.unsignedImageCount}</Text>
    </TouchableOpacity>

)

export default GalleryRow