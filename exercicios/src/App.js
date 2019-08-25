import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import Inverter, { MegaSena} from './componentes/Multi'


export default function() {
  return (
    <View style={styles.container}>
      <Simples texto='Flexível!' />
      <ParImpar numero={36} />
      <Inverter texto='Testando o paredao' />
      <MegaSena numeros={6} />
    </View>
  )
}

// export default class App extends Component {
//   render () {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.f20}>App!</Text>
//       </View>
//     )
//   }  
// }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
  }
})