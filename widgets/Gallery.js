import React from 'react'
import {FlatList} from 'react-native'
import PropsTypes from 'prop-types'
import Row from './Row'



function Gallery (props) {

    const renderItem = obj => <Row {... (obj.item)} onSelectAlbum={album => {
        props.onSelectAlbum(album)
    }}/>

    return (
        <FlatList
            data={props.gallery}
            renderItem={renderItem}
        />
    )
}

Gallery.PropsTypes = {
    gallery: PropsTypes.array,
}

export default Gallery