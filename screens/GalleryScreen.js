import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import Gallery from '../Gallery'
import {loadGalleryData} from '../redux/actions'
import {connect, useDispatch} from 'react-redux'

function GalleryScreen ({gallery, dispatch, navigation}) {
	const dispatch = useDispatch();

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


      return (
                <View style={styles.container}>
                          <Gallery
                            gallery={gallery}
                            onSelectAlbum={(album) => {
                              navigation.navigate("Album",{
                                name:  album.name,
                              })
                            }}
                          />
                </View>
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
  gallery: state.gallery,
})

export default GalleryContainer = connect(mapStateToProps)(GalleryScreen)