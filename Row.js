import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
   row: {
       padding: 20
   },
   thumbnail: {
    width: 50,
    height: 50,
   },

})

const Row = props => (
    <TouchableOpacity style={styles.row} onPress={() => {
        props.onSelectContact(props)
    }}>
        <Text >{props.name}</Text>
        <Image
            style={styles.thumbnail}
            source={{
                uri: 'data:image/jpg;base64,' + props.thumbnail,
            }}  
        />
        <Text >{props.resume}</Text>
    </TouchableOpacity>

)

export default Row