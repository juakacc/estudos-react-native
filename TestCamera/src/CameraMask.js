import React from 'react'
import {Dimensions, View} from 'react-native'
import Svg, {Circle, Defs, Rect, Mask} from 'react-native-svg'

const CameraMask = () => {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const circleRadius = width / 2.2
    const viewBox = `0 0 ${width} ${height}`

    return (
        <View aspectRatio={1}>
            <Svg 
                height={height} 
                viewBox={viewBox}>
                <Defs>
                    <Mask id="mask">
                        <Rect height={height} width={width} fill='#ffffff' />
                        <Circle r={circleRadius} cx={width/2} cy={height/2} />
                    </Mask>
                </Defs>
                <Rect
                    height={height}
                    width={width}
                    fill='#fff'
                    mask="url(#mask)" />
            </Svg>
        </View>
    )
}

export default CameraMask