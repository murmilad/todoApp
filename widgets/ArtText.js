import React, { useRef, useEffect } from 'react'
import {View, TextInput, TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'
import tw from '../tailwind';

function ArtText (props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <View style={tw`pt-2 pb-2 flex-row`}>
      <TextInput style={tw`m-1 text-stone-200 text-base flex-1`}
            placeholder="your comment..." 
            placeholderTextColor={tw.color('stone-500')}
            value={props.resume}
            autoCapitalize='none'
            onChangeText={text=>props.setResume(text)}
            multiline={true}
            keyboardAppearance='dark'
            ref={inputRef}
      />
      <TouchableHighlight  
        style={tw`items-center justify-center m-2`} 
        onPress = {()=>props.saveArt()} 
        underlayColor = 'transparent'>
          <View>
            <Icon 
            class="material-icons" 
            name ='send' 
            size = {20} 
            color = {tw.color('stone-500')}  />
          </View>
      </TouchableHighlight>
    </View>
  )
}

export default ArtText