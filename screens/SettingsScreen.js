import React from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'

class SettingsScreenComponent extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Comming soon</Text>
            </View>
        )
    }
}

export default function SettingsScreen() {
    return (
        <SettingsScreenComponent/>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        textAlign: 'center'
    },
})