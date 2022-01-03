import React, {useState, useCallback} from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import ImageScreen from '../screens/ImageScreen'
import randomInteger from 'random-int';
// lib/tailwind.js
import { create } from 'twrnc';
const tw = create(require(`../tailwind.config.js`));

const styles = StyleSheet.create({
   row: {
       padding: 20
   },
   thumbnail: {
    width: 50,
    height: 50,
   },
    container: {
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
    },
})


const useComponentSize = () => {
    const [size, setSize] = useState(null);
  
    const onLayout = useCallback(event => {
      const { width, height } = event.nativeEvent.layout;
      setSize({ width, height });
    }, []);
  
    return [size, onLayout];
};

function GalleryRow (props) {
    const [sizeFirst, onLayoutFirst] = useComponentSize();
    const [sizeSecond, onLayoutSecond] = useComponentSize();
    const [sizeThird, onLayoutThird] = useComponentSize();
    return (
        <TouchableOpacity style={tw`p-2 bg-stone-900 `} onPress={() => {
            props.onSelectAlbum(props.item, props.index)
        }}>
            {props.item.thumbnail_name.length > 0 && (
                <View style={tw`h-30 bg-stone-900 flex-row flex-3`}>
                    <View  style={tw`m-1 bg-stone-300 rounded-2 flex-3 overflow-hidden`} onLayout={onLayoutFirst}>
                        <ImageScreen
                                    size={sizeFirst}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(0,props.item.thumbnail_name.length-1)]}  
                        />
                    </View>
                    <View style={tw`bg-stone-900 flex-col flex-3`}>
                        <View style={tw`m-1 bg-stone-300 rounded-2 flex-3 overflow-hidden`} onLayout={onLayoutSecond}>
                            <ImageScreen
                                    size={sizeSecond}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(1,props.item.thumbnail_name.length-1)]}  
                            />
                        </View>
                        <View style={tw`bg-stone-900 flex-row flex-3`}>
                            <View style={tw`m-1 bg-stone-300  rounded-2 flex-3 overflow-hidden`} onLayout={onLayoutThird}>
                                <ImageScreen
                                    size={sizeThird}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(2,props.item.thumbnail_name.length-1)]}  
                                />
                            </View>
                            <View style={ tw`m-1 bg-stone-400  rounded-2 flex-3 overflow-hidden     `}>
                                <Text style={tw`ml-2  text-stone-900 font-bold text-base`} >{props.item.imageCount}</Text>
                                <Text style={tw`ml-2  text-indigo-700 font-bold text-base`} >{props.item.unsignedImageCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            <Text style={tw`ml-2  text-stone-400 text-xs`}>{props.item.header}</Text>
        </TouchableOpacity>
    )
}

export default GalleryRow