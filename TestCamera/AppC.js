import React from 'react'
import {
    CameraRoll,
    Dimensions, 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    TouchableOpacity
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import CameraOverlayC from './CameraOverlayC'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AppC extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    ref={ref => {this.camera = ref;}}
                    type={RNCamera.Constants.Type.back} />
                <CameraOverlayC />
                <View style={styles.cameraElements}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.buttom}>
                            <Icon name="camera" size={40} color='#342' />                
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    takePicture = async() => {
        // if (this.camera) {
        //   const options = { quality: 0.5, base64: true }
        //   const data = await this.camera.takePictureAsync(options).then(data => {
        //     CameraRoll.saveToCameraRoll(data.uri)
        //     console.log(data)
        //   })
        //   console.log(data.uri)
        // }
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    camera: {
        position: 'absolute',
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cameraElements: {
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20
    },
    smartphoneImage: {
        width: 50,
        resizeMode: 'contain'
    },
    buttom: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#5d4'
    },
})