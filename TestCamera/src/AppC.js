import React from 'react'
import {
    Dimensions, 
    StyleSheet, 
    View,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import CameraRoll from "@react-native-community/cameraroll";
import CameraMask from './CameraMask'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AppC extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    ref={ref => {this.camera = ref;}}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    type={RNCamera.Constants.Type.back} />
                <CameraMask width={width} height={height} />
                <View style={[styles.cameraElements, {backgroundColor: 'blue'}]}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.buttom}>
                            <Icon name="camera" size={30} color='#fff' />                
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    takePicture = async function() {
        if (this.camera) {
            const data = await this.camera.takePictureAsync().then(data => {
                ToastAndroid.show('Imagem salva na galeria', ToastAndroid.SHORT);
                console.disableYellowBox = true;
                CameraRoll.saveToCameraRoll(data.uri, 'photo');
            });
            console.log(data.uri);
        }
    };
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

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
        width: width,
        height: height,
    },
    cameraElements: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20
    },
    buttom: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#000'
    },
})