import React, { useEffect, useState, useLayoutEffect } from 'react'
import {Dimensions, ScrollView, Text, Image, TextInput, View, TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect, useDispatch} from 'react-redux'
import {loadArtData, saveArtData} from '../redux/actions'
import ImageZoom from "react-native-image-pan-zoom"

import tw from '../tailwind';


function ArtScreen (props) {
  const dispatch = useDispatch()
  const [resume, setResume] = useState()
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 })

  let widgetHeight = 200
  let widgetWidth = Dimensions.get("window").width

  const calculateImageSize = (nativeEvent) => {

    let factor = (widgetHeight / widgetWidth > nativeEvent.height / nativeEvent.width     
            ? widgetHeight / nativeEvent.height
            : widgetWidth / nativeEvent.width)  
            

    let width = nativeEvent.width * factor;
    let height = nativeEvent.height * factor;
        
    setImageSize({ height, width })
  }
  
	let loadData = () => {
		dispatch(loadArtData(props.route.params.albumName, props.route.params.imageName));
	}
  
  useLayoutEffect(() => {
    if (props.art) {
      calculateImageSize(props.art)
    }
  }, [props.art]);

	useEffect(()=> {

		loadData();

  }, []);

  return (<>
        {props.err && (<Text style={tw`m-2 bg-stone-900 text-red-500 `}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text style={tw`m-2 bg-stone-900 text-stone-600 `}>Loading...</Text>)}
        {props.art && (
        <ScrollView style={tw`m-1 bg-stone-800`}>
          <ImageZoom
            cropWidth={widgetWidth}
            cropHeight={imageSize.height}
            imageWidth={imageSize.width}
            imageHeight={imageSize.height}
            maxOverflow={0}
          >
            <Image 
              resizeMode="contain" 
              loaderSize="large"
              style={{height: imageSize.height, width: imageSize.width}}
              source={{
                uri: 'data:image/jpg;base64,' + props.art.thumbnail,
              }}
            />
          </ImageZoom>
          <View style={tw`flex-row`}>
            <TextInput style={tw`m-1 text-stone-200 text-base`}
                  placeholder="your comment..." 
                  placeholderTextColor={tw.color('stone-500')}
                  value={resume ? resume : props.art.resume}
                  autoCapitalize='none'
                  onChangeText={text=>setResume(text)}
                  multiline={true}
                  keyboardAppearance='dark'
            />
            <TouchableHighlight  
              style={tw`items-center justify-center`} 
              onPress = {()=>{dispatch(saveArtData(props.route.params.albumName, props.route.params.imageName, resume))}} 
              underlayColor = 'transparent'>
                <View>
                  <Icon class="material-icons" name='save-alt' size = {20} color = {tw.color('stone-500')}  />
                </View>
            </TouchableHighlight>
          </View>
          
        </ScrollView>
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

