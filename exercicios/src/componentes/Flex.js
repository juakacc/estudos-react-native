import React from 'react'
import {View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    norte: {
        flex: 1,
        backgroundColor: '#bdf9ed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centro: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }, 
    sul: {
        flex: 1,
        backgroundColor: '#f93d3e',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    circulo: {
        width: 100,
        height: 100,
        backgroundColor: '#f47f61',
        borderRadius: 50,
    }
})

const Cirulo = props =>
    <View style={styles.circulo}></View>

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.norte}>
                <Cirulo />
            </View>
            <View style={styles.centro}>
                <Cirulo />
                <Cirulo />
                <Cirulo />
            </View>
            <View style={styles.sul}>
                <Cirulo />
            </View>
        </View>
    )
}