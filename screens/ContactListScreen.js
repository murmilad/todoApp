import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import ContactsList from '../ContactsList'
import {connect} from 'react-redux'

function ContactListScreen ({contacts, dispatch, navigation}) {

      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {navigation.navigate("AddContact")}}
            title="Add"
          />
        ),
      })


      return (
                <View style={styles.container}>
                          <ContactsList
                            contacts={contacts}
                            onSelectContact={(contact) => {
                              navigation.navigate("ContactDetails",{
                                phone: contact.phone,
                                name:  contact.name,
                              })
                            }}
                          />
                </View>
      )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:2,
    },
  });

const mapStateToProps = state => ({
  contacts: state.contacts,
})

export default ContactListContainer = connect(mapStateToProps)(ContactListScreen)