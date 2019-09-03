import React,{Component} from 'react';
import PinchZoomImage from 'react-native-pinch-zoom-image';
import {
    Image, View, Text
} from 'react-native';

import t from '../assets/images/smartphone.png'
 
export default class ImageViewer extends Component {
    pinZoomLayoutRef=React.createRef();
    render() {
       return(
           <View>
            <Text>Testando o texto</Text>
            <Image
                style={{width:56,height:56}}
                source={t} />
                <PinchZoomImage
                    style={{flex:1}}
                    ref={this.pinZoomLayoutRef}
                    onZoom={this.onZoom}
                    onTap={this.onTap}>
                    <Image
                        style={{width:56,height:56}}
                        source={t}
                    />
                </PinchZoomImage>
            </View>
        )
    }
    
    onZoom = event => {
        const {
            containerWidth,
            containerHeight,
            contentWidth,
            contentHeight,
            zoomScale 
        } = event;
    }
    
    onTap = () => {}
}