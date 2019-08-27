import React from 'react'
import {Dimensions, View, Text} from 'react-native'
import Svg, {Circle, Defs, Rect, Mask} from 'react-native-svg'

export default () => {
    const {height, width} = Dimensions.get('window')
    const circleRadius = width / 2.5
    const viewBox = `0 0 ${width} ${height}`

    return (
        <View aspectRadio={1}>
            <Svg height={height} width={width}>
                <Defs>
                    <Mask id='mask'>
                        <Rect height={height} width={width} fill='#fff' />
                        <Circle r={circleRadius} cx={width/2} cy={height/2} fill='#000' />
                    </Mask>
                </Defs>
                <Rect
                    height={height}
                    width={width}
                    fill='#ffffff'
                    mask='url(#mask)' />
            </Svg>
        </View>
    )
}