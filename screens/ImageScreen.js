import React, { useEffect } from 'react'
import {Dimensions, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {connect, useDispatch} from 'react-redux'
import {loadImageData} from '../redux/actions'
import tw from '../tailwind';


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
            : 0.5

    if (props.image) {
        let error = props.err;
    }
    return (<>
        {props.err && (<Text style={tw`pt-1 bg-stone-900 text-red-500 `}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text style={tw`pt-1 bg-stone-900 text-stone-600 `}>Loading...</Text>)}
        {props.image && (
            <Image style={tw`bg-black`}
                style={{height: props.image.height*factor, width: props.image.width*factor}}
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

