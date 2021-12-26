import React from 'react'
import {FlatList} from 'react-native'
import PropsTypes from 'prop-types'
import AlbumRow from './AlbumRow'



function Album (props) {

    const renderItem = obj => <AlbumRow {... (obj)} onSelectArt={(item, index) => {
        props.onSelectArt(item, index)
    }}/>

    return (
        <FlatList
            data={props.album}
            renderItem={renderItem}
            keyExtractor={item => item.name}
        />
    )
}

Album.PropsTypes = {
    album: PropsTypes.array,
}

export default Album