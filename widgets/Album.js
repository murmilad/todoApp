import React from 'react'
import {FlatList} from 'react-native'
import PropsTypes from 'prop-types'
import Art from './Art'



function Album (props) {

    const renderItem = obj => <Art {... (obj.item)} onSelectArt={art => {
        props.onSelectArt(art)
    }}/>

    return (
        <FlatList
            data={props.album}
            renderItem={renderItem}
        />
    )
}

Album.PropsTypes = {
    album: PropsTypes.array,
}

export default Album