import React, { useEffect } from 'react'
import {Dimensions, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {connect, useDispatch} from 'react-redux'
import {loadImageData} from '../redux/actions'
import tw from 'twrnc';

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

    let factor = props.image && props.size ? // stretch & cut to widget size 
        (props.size.height / props.size.width > props.image.height / props.image.width     
            ? props.size.height / props.image.height
            : props.size.width / props.image.width)  
            : 1

    if (props.image) {
        let error = props.err;
    }
    return (<>
        {props.err && (<Text style={styles.error}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text>Loading...</Text>)}
        {props.image && (
            <Image style={tw`bg-black`}
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

