import React, { useEffect } from 'react'
import {Dimensions, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {connect, useDispatch} from 'react-redux'
import {loadImageData} from '../redux/actions'

const window = Dimensions.get('window');
const styles = StyleSheet.create({
   row: {
       padding: 10
   },
   thumbnail: {
   },

})

function ImageScreen (props) {
    const dispatch = useDispatch();

	let loadData = () => {
		dispatch(loadImageData(props.albumName, props.imageName));
	}

	useEffect(()=> {

		loadData();

    }, []);

    let factor = props.image ? (window.width - 20) / props.image.width : 0

    if (props.image) {
        let error = props.err;
    }
    return (<>
        {props.err && (<Text style={styles.error}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text>Loading...</Text>)}
        {props.image && (
            <Image
                style={{...styles.thumbnail, height: props.image.height*factor, width: props.image.width*factor}}
                source={{
                    uri: 'data:image/jpg;base64,' + props.image.thumbnail,
                }}  
            />
        )}
        </>
      )

}

function mapStateToProps (state, props) {
    return ({
    err: state.image.data && state.image.data[props.albumName] && state.image.data[props.albumName][props.imageName] ? state.image.data[props.albumName][props.imageName].err : undefined,
    image: state.image.data && state.image.data[props.albumName] && state.image.data[props.albumName][props.imageName] ? state.image.data[props.albumName][props.imageName].image : undefined,
    loading: state.image.data && state.image.data[props.albumName] && state.image.data[props.albumName][props.imageName] ? state.image.data[props.albumName][props.imageName].loading : false,
    })
  }
  
export default connect(
    mapStateToProps
)(ImageScreen)

