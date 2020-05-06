import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import { ContactsContext } from '../ContactsContext'
import ContactsList from '../ContactsList';

export default function ContactListScreen ({navigation}) {

      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {navigation.navigate("AddContact")}}
            title="Add"
          />
        )
      })


      return (
                <View style={styles.container}>
                  <ContactsContext.Consumer>
                    {({contacts, addContact}) => (
                          <ContactsList
                            contacts={contacts}
                            onSelectContact={(contact) => {
                              navigation.navigate("ContactDetails",{
                                phone: contact.phone,
                                name:  contact.name,
                              })
                            }}
                          />
                    )}
                  </ContactsContext.Consumer>
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