import React from 'react'
import {SectionList, Text} from 'react-native'
import PropsTypes from 'prop-types'
import Row from './Row'

const renderItem = obj => <Row {... (obj.item)}/>

const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

const ContactsList = props => {
    const contactsByLetter = props.contacts.reduce((obj, contact) => {
        const firstLatter = contact.name[0].toUpperCase()
        return {
            ...obj,
            [firstLatter]: [...( obj[firstLatter] || [] ), contact]
        }
    }, {})

    const sections = Object.keys(contactsByLetter).sort().map(letter => ({
        title: letter,
        data: contactsByLetter[letter],
    }))

    return (
        <SectionList
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
        />
        )
    }

ContactsList.PropsTypes = {
    contacts: PropsTypes.array,
}

export default ContactsList