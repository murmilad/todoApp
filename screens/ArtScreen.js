import React, { useEffect, useState, useLayoutEffect } from 'react'
import {Dimensions, ScrollView, Text, TextInput, View, TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect, useDispatch} from 'react-redux'
import {loadArtData, saveArtData, UPDATE_ALBUM_DATA} from '../redux/actions'
import ArtImage from '../widgets/ArtImage'
import useComponentSize from  '../useComponentSize';

import tw from '../tailwind';

function ArtScreen (props) {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [resume, setResume] = useState()
  const [size, onLayout] = useComponentSize()

  
	const loadData = () => {
		dispatch(loadArtData(props.route.params.albumName, props.route.params.imageName))
	}
  
  const saveArt = () => {
    dispatch(saveArtData(props.route.params.albumName, props.route.params.imageName, resume))
    setEditMode(false)
    dispatch({type: UPDATE_ALBUM_DATA, payload: {
      albumName: props.route.params.albumName, 
      imageName: props.route.params.imageName,
      resume
    }})
  }

  useLayoutEffect(() => {
    if (props.art) {
      setResume(props.art.resume)
    }
  }, [props.art]);

	useEffect(()=> {

		loadData();

  }, []);

  return (<>
        {props.err && (<Text style={tw`m-2 bg-stone-900 text-red-500 `}>{props.err}</Text>)}
        {!props.err && props.loading && (<Text style={tw`m-2 bg-stone-900 text-stone-600 `}>Loading...</Text>)}
        {props.art && (
        <>
          <View style={tw`flex-1 relative`}  onLayout={onLayout}  >
            <ArtImage
                size={size}
                imageSize={props.art.size}
                image={props.art.image}
            />
            {editMode || ( 
            <Text style={tw`m-1 text-stone-600 text-base bg-transparent absolute bottom-0`} >
              {resume}
            </Text>
            )}
          </View>
          {editMode ? ( 
          <View style={tw`pt-2 pb-2 flex-row`}>
            <TextInput style={tw`m-1 text-stone-200 text-base flex-1`}
                  placeholder="your comment..." 
                  placeholderTextColor={tw.color('stone-500')}
                  value={resume}
                  autoCapitalize='none'
                  onChangeText={text=>setResume(text)}
                  multiline={true}
                  keyboardAppearance='dark'
            />
            <TouchableHighlight  
              style={tw`items-center justify-center m-2`} 
              onPress = {()=>saveArt()} 
              underlayColor = 'transparent'>
                <View>
                  <Icon 
                  class="material-icons" 
                  name='send' 
                  size = {20} 
                  color = {tw.color('stone-500')}  />
                </View>
            </TouchableHighlight>
        </View>
        ) : (
          <>
          <View style={tw`pt-2 pb-2 flex-row`}>
            <TouchableHighlight  
              style={tw`items-center justify-center flex-1`} 
              onPress = {()=>setEditMode(true)} 
              underlayColor = 'transparent'>
              <Icon
                  class="material-icons"
                  name="visibility-off"
                  size={25}
                  color={tw.color('stone-700')}
              />
            </TouchableHighlight>
            <TouchableHighlight  
              style={tw`items-center justify-center flex-1`} 
              onPress = {()=>setEditMode(true)} 
              underlayColor = 'transparent'>
              <Icon
                  class="material-icons"
                  name="edit"
                  size={25}
                  color={tw.color('stone-700')}
              />
            </TouchableHighlight>
            <TouchableHighlight  
              style={tw`items-center justify-center flex-1`} 
              onPress = {()=>setEditMode(true)} 
              underlayColor = 'transparent'>
              <Icon
                  class="material-icons"
                  name="share"
                  size={25}
                  color={tw.color('stone-700')}
              />
            </TouchableHighlight>
        </View>
        </>
        )}
        
        </>
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

