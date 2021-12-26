import React, {useEffect} from 'react'
import {Button, Text, StyleSheet, View} from 'react-native'
import Art from '../widgets/Art'
import { useNavigation } from '@react-navigation/native';
import {loadAlbumData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'

function AlbumScreen (props) {
    const navigation = useNavigation();

    navigation.setOptions({
        headerTitle: props.route.params.artName
    })

    return (<>
        {props.err && (<Text style={styles.error}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text>Loading...</Text>)}
        {props.art  && (
                <View style={styles.container}>
                          <Art {... (props.art)} />
                </View>
        )}
        </>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:2,
    },
    text: {
        textAlign: 'center',
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
  });
 
  function mapStateToProps (state, props) {
    return ({
    err: state.album.err,
    art: state.album.data ? state.album.data[props.route.params.albumName][props.route.params.artIndex] : undefined,
    loading: state.album.loading,
    })
  }
  
export default connect(
    mapStateToProps
)(AlbumScreen)