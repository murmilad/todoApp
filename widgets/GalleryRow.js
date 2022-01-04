import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import ImageScreen from '../screens/ImageScreen'
import randomInteger from 'random-int';
import tw from '../tailwind';
import useComponentSize from  '../useComponentSize';



function GalleryRow (props) {
    const [sizeFirst, onLayoutFirst] = useComponentSize();
    const [sizeSecond, onLayoutSecond] = useComponentSize();
    const [sizeThird, onLayoutThird] = useComponentSize();
    return (
        <TouchableOpacity style={tw`p-2 bg-stone-900 `} onPress={() => {
            props.onSelectAlbum(props.item, props.index)
        }}>
            {props.item.thumbnail_name.length > 0 && (
                <View style={tw`h-50 bg-stone-900 flex-row `}>
                    <View  style={tw`m-1 bg-stone-800 rounded-2 flex-2 overflow-hidden`} onLayout={onLayoutFirst}>
                        <ImageScreen
                                    size={sizeFirst}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(0,props.item.thumbnail_name.length-1)]}  
                        />
                    </View>
                    <View style={tw`bg-stone-900 flex-col flex-3`}>
                        <View style={tw`m-1 bg-stone-800 rounded-2 flex-3 overflow-hidden`} onLayout={onLayoutSecond}>
                            <ImageScreen
                                    size={sizeSecond}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(1,props.item.thumbnail_name.length-1)]}  
                            />
                        </View>
                        <View style={tw`bg-stone-900 flex-row flex-2`}>
                            <View style={tw`m-1 bg-stone-800  rounded-2 flex-3 overflow-hidden`} onLayout={onLayoutThird}>
                                <ImageScreen
                                    size={sizeThird}
                                    albumName={props.item.name}
                                    imageName={props.item.thumbnail_name[Math.min(2,props.item.thumbnail_name.length-1)]}  
                                />
                            </View>
                            <View style={ tw`m-1 bg-stone-100  rounded-2 flex-3 overflow-hidden     `}>
                                <Text style={tw`m-auto  text-stone-500 font-bold text-xl`} >+{Math.max(props.item.imageCount-3, 0)}
                                    { props.item.unsignedImageCount > 0 && <Text style={tw`m-auto  text-indigo-600 font-bold text-xl`} > ({props.item.unsignedImageCount})</Text>}
                                </Text>
                                
                            </View>
                        </View>
                    </View>
                </View>
            )}
            <Text style={tw`m-1 text-stone-100 text-xs`}>
                <Text style={tw`text-indigo-400 text-xs`}>{props.item.header.replace(/^([^\s]+).+/,'$1')} </Text>
                {props.item.header.replace(/^[^\s]+/,'')}
            </Text>
        </TouchableOpacity>
    )
}

export default GalleryRow