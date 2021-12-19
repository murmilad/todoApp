import {React, useEffect} from 'react'
import {Button, View, StyleSheet, Text} from 'react-native'
import Gallery from '../Gallery'
import {loadGalleryData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native';

function GalleryScreen (props) {
	const dispatch = useDispatch();
  const navigation = useNavigation();

	let loadData = () => {
		dispatch(loadGalleryData());
	}

	useEffect(()=> {

		loadData();

  }, []);
  
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {navigation.navigate("AddContact")}}
            title="Add"
          />
        ),
      })
      return (<>
        {props.loading && (<Text>Loading...</Text>)}
        {props.gallery && (
                <View style={styles.container}>
                          <Gallery
                            gallery={props.gallery}
                            onSelectAlbum={(album) => {
                              navigation.navigate("Album",{
                                name:  album.name,
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
  });

const mapStateToProps = state => ({
  gallery: state.gallery.data,
  loading: state.gallery.loading,
})

export default connect(
	mapStateToProps
)(GalleryScreen)