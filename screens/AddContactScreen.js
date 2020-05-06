import React from 'react'
import AddContactForm from '../AddContactForm'
import { ContactsContext } from '../ContactsContext'

export default function AddContactScreen ({navigation}){

    return (
        <ContactsContext.Consumer>
            {({addContact}) => (
                <AddContactForm onSubmit={formState => {
                    addContact(formState)
                    navigation.navigate('ContactList');
                }}/>
            )}
        </ContactsContext.Consumer>
    )
}
