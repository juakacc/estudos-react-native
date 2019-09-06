import React from 'react'
import {Dimensions, View, Image} from 'react-native'
import Svg, {Circle, Defs, Rect, Mask} from 'react-native-svg'
import { ZoomableSvg } from './MovendoAumentando'

const CameraMask = props => {
    const height = props.height
    const width = props.width
    const circleRadius = width / 2.2
    const viewBox = `0 0 ${width} ${height}`

    return (
        <ZoomableSvg width={width} height={height} x={30} y={30}/>
        // <View aspectRatio={1}>
        //     <Svg 
        //         height={height} 
        //         viewBox={viewBox}>
        //         <Defs>
        //             <Mask id="mask">
        //                 {/* <Rect height={height} width={width} fill='#fff' /> */}
        //                 <Rect x={width/2 - 150} y={height/2-250} height={500} width={300} fill='#fff' />
        //                 <Rect x={width/2 - 125} y={height/2-225} height={450} width={250} />
        //                 {/* <Circle r={circleRadius} cx={width/2} cy={height/2} fill='#fff' /> */}
        //             </Mask>
        //         </Defs>
        //         <Rect
        //             height={height}
        //             width={width}
        //             fill='#fff'
        //             mask="url(#mask)" />
        //     </Svg>
        // </View>
    )
}

export default CameraMask