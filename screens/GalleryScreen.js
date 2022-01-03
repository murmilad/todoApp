import {React, useEffect} from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'
import Gallery from '../widgets/Gallery'
import {loadGalleryData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

function GalleryScreen (props) {
	const dispatch = useDispatch();
  const navigation = useNavigation();

	let loadData = () => {
		dispatch(loadGalleryData());
	}

	useEffect(()=> {

		loadData();

  }, []);
  
        return (<>
        {props.err && (<Text style={styles.error}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text>Loading...</Text>)}
        {props.gallery && (
                <View style={tw`bg-blue-100`} style={styles.container}>
                          <Gallery
                            gallery={props.gallery}
                            onSelectAlbum={(album, index) => {
                              navigation.navigate("Album",{
                                albumName:  album.name,
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

const mapStateToProps = state => ({
  err: state.gallery.err,
  gallery: state.gallery.data,
  loading: state.gallery.loading,
})

export default connect(
	mapStateToProps
)(GalleryScreen)