import React from 'react'
import {FlatList} from 'react-native'
import PropsTypes from 'prop-types'
import GalleryRow from './GalleryRow'



function Gallery (props) {

    const renderItem = obj => <GalleryRow {... (obj)} onSelectAlbum={(item, index) => {
        props.onSelectAlbum(item, index)
    }}/>

    return (
        <FlatList
            data={props.gallery}
            renderItem={renderItem}
            keyExtractor={item => item.name}
        />
    )
}

Gallery.PropsTypes = {
    gallery: PropsTypes.array,
}

export default Gallery