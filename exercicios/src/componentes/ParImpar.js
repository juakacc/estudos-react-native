import React from 'react'
import { View, Text } from 'react-native'
import Padra from '../estilo/Padrao'
import Padrao from '../estilo/Padrao';

function parOuImpar(num) {
    // if (num % 2 == 0) {
    //     return <Text style={Padrao.ex}>Par</Text>
    // } else {
    //     return <Text style={Padrao.ex}>Impar</Text>
    // }
    const c = num % 2 == 0 ? 'Par' : 'Impar';
    return <Text style={Padrao.ex}>{c}</Text>
}

export default props =>
    <View>
        { parOuImpar(props.numero)}
        {/* {
            props.numero % 2 == 0
            ? <Text style={Padrao.ex}>Par</Text>
            : <Text style={Padrao.ex}>Impar</Text>
        } */}
    </View>