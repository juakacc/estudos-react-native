import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {RNCamera} from 'react-native-camera'
import CameraOverlayC from './CameraOverlayC'

export default class AppC extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    ref={ref => {this.camera = ref}}
                    type={RNCamera.Constants.Type.back} />
                <CameraOverlayC />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f5fcff',

        // flexDirection: 'column',
        // backgroundColor: 'black',
    },
    camera: {
        position: 'absolute',
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})