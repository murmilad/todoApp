import React, { useState } from 'react'
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native'
import ImageScreen from '../screens/ImageScreen'
import tw from '../tailwind';
import ImageZoom from "react-native-image-pan-zoom"

const window = Dimensions.get('window');

function ArtImage (props) {

    let factor = props.image && props.size ? // stretch & cut to widget size 
        props.size.width / props.imageSize.width
        : 1

    return (
    <ImageZoom
        cropWidth={props.size.width}
        cropHeight={props.size.height}
        imageWidth={props.imageSize.width*factor  }
        imageHeight={props.imageSize.height*factor }
        maxOverflow={0}
    >
        <Image 
          style={{height: props.imageSize.height*factor, width: props.imageSize.width*factor}}
          source={{
            uri: 'data:image/jpg;base64,' + props.image,
          }}
        />
    </ImageZoom>
)
}

export default ArtImage