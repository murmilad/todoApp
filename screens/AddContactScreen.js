import React from 'react'
import AddContactForm from '../AddContactForm'
import store from '../redux/store'
import {connect} from 'react-redux'

import {addContact} from '../redux/actions'

function AddContactScreen ({addContact, navigation}){

    return (
                <AddContactForm onSubmit={formState => {
                    addContact(formState)
                    navigation.navigate('ContactList');
                }}/>
    )
}

export default AddContactContainer = connect(null, {addContact: addContact})(AddContactScreen)