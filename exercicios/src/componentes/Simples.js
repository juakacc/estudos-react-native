import React from 'react'
import { View, Text } from 'react-native'
import Padrao from '../estilo/Padrao'

// export default function(props) {
//     return <Text>{props.texto}</Text>
// }

export default props =>
    <View>
        <Text style={[Padrao.ex]}>1: {props.texto}</Text>
        <Text>2: {props.texto}</Text>
    </View>