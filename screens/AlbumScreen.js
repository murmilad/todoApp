import React, {useEffect} from 'react'
import {Button, Text, StyleSheet, View} from 'react-native'
import Album from '../widgets/Album'
import { useNavigation } from '@react-navigation/native';
import {loadAlbumData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'
import tw from '../tailwind';

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
        headerTitle: props.route.params.albumHeader
    })

    return (<>
        {props.err && (<Text style={tw`pt-1 bg-stone-900 text-red-500 flex-1`}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text style={tw`pt-1 bg-stone-900 text-stone-600 flex-1`} >Loading...</Text>)}
        {props.album  && (
                <View style={tw`pt-1 bg-stone-900 flex-1`}>
                          <Album
                            album={props.album}
                            onSelectArt={(art, index) => {
                                 navigation.navigate("Art",{
                                    albumName:  art.albumName,
                                    imageName:  art.imageName,
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