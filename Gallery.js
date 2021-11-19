import React from 'react'
import {SectionList, Text} from 'react-native'
import PropsTypes from 'prop-types'
import Row from './Row'


const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

const Gallery = props => {
    const galleryByLetter = props.gallery.reduce((obj, album) => {
        const firstLatter = album.name[0].toUpperCase()
        return {
            ...obj,
            [firstLatter]: [...( obj[firstLatter] || [] ), album]
        }
    }, {})

    const sections = Object.keys(contactsByLetter).sort().map(letter => ({
        title: letter,
        data: galleryByLetter[letter],
    }))

    const renderItem = obj => <Row {... (obj.item)} onSelectAlbum={album => {
        props.onSelectAlbum(album)
    }}/>

    return (
        <SectionList
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
        />
        )
    }

Gallery.PropsTypes = {
    gallery: PropsTypes.array,
}

export default Gallery