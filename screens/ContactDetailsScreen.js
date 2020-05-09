import React from 'react'
import {Button, Text, View} from 'react-native'
import { ContactsContext } from '../ContactsContext'

class ContactDetailsScreenComponent extends React.Component {
    _goToRandom = () => {
        const contacts = this.props.contacts
        const phone = this.props.phone
        let randomContact
        while (!randomContact) {
            const randomIndex = Math.floor(Math.random()*10)
            if (contacts[randomIndex].phone !== phone) {
                randomContact = contacts[randomIndex]
            }
        }
        this.props.navigation.push("ContactDetails", {
            name: randomContact.name,
            phone: randomContact.phone,
        })
    }

    render () {
        return (
            <View>
                <Text>{this.props.phone}</Text>
                <Button title="Go to" onPress={this._goToRandom}/>
            </View>
        )
    }
}

export default function ContactDetailsScreen ({route, navigation}) {
    const {name, phone} = route.params;
    navigation.setOptions({
        headerTitle: name
    })

    return (
        <ContactsContext.Consumer>
            {({contacts, addContact}) => (
                <ContactDetailsScreenComponent contacts={contacts} phone={phone} navigation={navigation}/>
            )}
        </ContactsContext.Consumer>
    );

}