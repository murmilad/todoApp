import React, {useEffect} from 'react'
import {Button, Text, StyleSheet, View} from 'react-native'
import Album from '../widgets/Album'
import { useNavigation } from '@react-navigation/native';
import {loadAlbumData, UPDATE_GALLERY_DATA} from '../redux/actions'
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

  useEffect(()=> {
    if (props.album) {
      let unsignedImageCount = props.album.length
      props.album.forEach(element => {
        if (element.resume) {
          unsignedImageCount--
        }
      });
      dispatch({type: UPDATE_GALLERY_DATA, payload: {
        albumName: props.route.params.albumName, 
        unsignedImageCount: unsignedImageCount
      }})
    }
  } , [props.album]);

    navigation.setOptions({
        headerTitle: props.route.params.albumHeader
    })

    return (<>
        {!props.err && props.album  && (
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