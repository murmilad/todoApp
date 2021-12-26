import React, {useEffect} from 'react'
import {Button, Text, StyleSheet, View} from 'react-native'
import Album from '../widgets/Album'
import { useNavigation } from '@react-navigation/native';
import {loadAlbumData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'

function AlbumScreen (props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

	let loadData = () => {
		dispatch(loadAlbumData(props.route.params.albumName));
	}

	useEffect(()=> {

		loadData();

    }, []);

    navigation.setOptions({
        headerTitle: props.route.params.albumName
    })

    return (<>
        {props.err && (<Text style={styles.error}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text>Loading...</Text>)}
        {props.album  && (
                <View style={styles.container}>
                          <Album
                            album={Object.keys(props.album).sort((a,b) =>  props.album[a].order-props.album[b].order).map(key => props.album[key])}
                            onSelectArt={(art, index) => {
                                navigation.navigate("Art",{
                                    albumName:  props.route.params.albumName,
                                    artIndex:   index,
                                    artName:    art.name,
                                })
    
                              }}
                            />
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
    album: state.album.data ? state.album.data[props.route.params.albumName] : undefined,
    loading: state.album.loading,
    })
  }
  
export default connect(
    mapStateToProps
)(AlbumScreen)