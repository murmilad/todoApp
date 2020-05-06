import React from 'react'
import {Button, Text, View} from 'react-native'

export default function ContactDetailsScreen ({route, navigation}) {
    const {name, phone} = route.params;
    navigation.setOptions({
        headerTitle: name
    })

    return (
        <View>
            <Text>{phone}</Text>
            <Button title="Go to"/>
        </View>
    );
}