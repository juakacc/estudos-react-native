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
                    flashMode={RNCamera.Constants.FlashMode.on}
                    autoFocus={RNCamera.Constants.AutoFocus.off}
                    type={RNCamera.Constants.Type.back} />
                <CameraMask />
                <View style={styles.cameraElements}>
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
        backgroundColor: '#000'
    },
})