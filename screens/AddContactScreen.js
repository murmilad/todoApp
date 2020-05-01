import React from 'react'
import AddContactForm from '../AddContactForm'
import { ContactsContext } from '../ContactsContext'

export default class AddContactScreen extends React.Component {
    static contextType = ContactsContext

    handleSubmit = formState => {
        this.context.addContact(formState)
        this.props.navigation.navigate('ContactList')
    }

    render() {
        return (

                <AddContactForm onSubmit={this.handleSubmit}/>
            )
    }
}
