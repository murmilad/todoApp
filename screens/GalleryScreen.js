import {React, useEffect} from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'
import Gallery from '../widgets/Gallery'
import {loadGalleryData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import tw from '../tailwind';

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
        {!props.err && props.gallery && (
                <View style={tw`pt-1 bg-stone-900 flex-1`}>
                          <Gallery
                            gallery={props.gallery}
                            onSelectAlbum={(album, index) => {
                              navigation.navigate("Album",{
                                albumName:  album.name,
                                albumHeader:  album.header,
                              })
                            }}
                          />
                </View>
        )}
        </>
      )

}

const mapStateToProps = state => ({
  err: state.gallery.err,
  gallery: state.gallery.data,
  loading: state.gallery.loading,
})

export default connect(
	mapStateToProps
)(GalleryScreen)