import React, { useEffect, useState } from 'react'
import {Dimensions, View, Text, Image, TextInput} from 'react-native'
import {connect, useDispatch} from 'react-redux'
import {loadArtData} from '../redux/actions'
import tw from '../tailwind';

const window = Dimensions.get('window');

function ArtScreen (props) {
  const dispatch = useDispatch()
  const [resume, setResume] = useState()


	let loadData = () => {
		dispatch(loadArtData(props.route.params.albumName, props.route.params.imageName));
	}

	useEffect(()=> {

		loadData();

    }, []);


    let height = 200
    let factor = props.art ? // stretch & cut to widget size 
        (height / window.width > props.art.height / props.art.width     
            ? height / props.art.height
            : window.width / props.art.width)  
            : 0.5

    if (props.art) {
//      resume = props.art.resume;
    }
    return (<>
        {props.err && (<Text style={tw`m-2 bg-stone-900 text-red-500 `}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text style={tw`m-2 bg-stone-900 text-stone-600 `}>Loading...</Text>)}
        {props.art && (
        <View style={tw`m-1 bg-stone-800`} >
          <Image 
              style={{height: props.art.height*factor, width: props.art.width*factor}}
              source={{
                  uri: 'data:image/jpg;base64,' + props.art.thumbnail,
              }}  
          />
          <TextInput style={tw`m-1 text-stone-200 text-base`}
              placeholder="your comment..." 
              value={resume ? resume : props.art.resume}
              autoCapitalize='none'
              onChangeText={text=>setResume(text)}
          />
        </View>
        )}
        </>
      )

}

function mapStateToProps (state, props) {
    return ({
    err: state.art.data && state.art.data[props.route.params.albumName] && state.art.data[props.route.params.albumName][props.route.params.imageName] ? state.art.data[props.route.params.albumName][props.route.params.imageName].err : undefined,
    art: state.art.data && state.art.data[props.route.params.albumName] && state.art.data[props.route.params.albumName][props.route.params.imageName] ? state.art.data[props.route.params.albumName][props.route.params.imageName].image : undefined,
    loading: state.art.data && state.art.data[props.route.params.albumName] && state.art.data[props.route.params.albumName][props.route.params.imageName] ? state.art.data[props.route.params.albumName][props.route.params.imageName].loading : false,
    })
  }
  
export default connect(
    mapStateToProps
)(ArtScreen)

