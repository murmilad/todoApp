/* eslint-disable prettier/prettier */
import React from 'react'
import {Button, KeyboardAvoidingView, TextInput, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        paddingTop: 20,
        justifyContent: 'center',
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        marginHorizontal: 20,
        marginTop:10,
        minWidth:100,
    }
})

export default class AddContactsForm extends React.Component {
    static propTypes = {
        addContacts: PropTypes.func,
    }

    state = {
        name: '',
        phone: '',
        isFormValid: false,
        this: this,
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.name != prevState.name || this.state.phone != prevState.phone) {
            return this.validateForm()
        }
    }

    getHandler = key => val => {
            this.setState({[key]: val})
    }

    handleNameChange = this.getHandler('name')

    //handleNameChange = name => {
    //    this.setState({name}) // or this.setState({name}, this.validateForm)
    //}

    handlePhoneChange = phone => {
        if (+phone >= 0 && phone.length <= 10) {
            this.setState({phone})
        }
    }


    handleSubmit = () => {
        this.props.onSubmit({...this.state})
    }

    validateForm = () => {
        console.log(this.state)
        const names = this.state.name.split(' ')
        if (+this.state.phone >= 0 && this.state.phone.length === 10 && names.length >= 2 && names[0] && names[1]) {
            this.setState({isFormValid: true})
        } else {
            this.setState({isFormValid: false})
        }

    }



    render (){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={this.getHandler('name')}
                    value={this.state.name}
                    placeholder='Name'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={this.handlePhoneChange}
                    value={this.state.phone}
                    keyboardType='numeric'
                    placeholder='Number'
                />
                <Button title='Add contacts' onPress={this.handleSubmit} disabled={!this.state.isFormValid}/>
            </KeyboardAvoidingView>
        )
    }
}