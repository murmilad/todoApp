import React from 'react'
import {ScrollView, View} from 'react-native'
import PropsTypes from 'prop-types'
import AlbumRow from './AlbumRow'
import tw from '../tailwind';

function Album (props) {

    const renderItem = obj => <AlbumRow {... (obj)} onSelectArt={(item, index) => {
        props.onSelectArt(item, index)
    }}/>
/*     data={props.album}
    renderItem={renderItem}
    keyExtractor={item => item.name}
 */
    return (
        <ScrollView>
            <View style={tw`m-1 flex-row bg-stone-900`}>
                 <View style={tw`flex-1 bg-stone-900`}>
                    {
                    props.album.length ? 
                        props.album.filter((n, index) => index%2 == 0).map(
                            (item, index) => {
                                return renderItem({item, index})
                            }) : (<></>)
                    }
                 </View>
                 <View style={tw`flex-1 bg-stone-900`}>
                    {
                    props.album.length ? 
                        props.album.filter((n, index) => index%2)
                                .map((item, index) => {
                                   return renderItem({item, index})
                                  }) : (<></>)
                   }                 
                </View>
            </View>
        </ScrollView>
    )
}

Album.PropsTypes = {
    album: PropsTypes.array,
}

export default Album