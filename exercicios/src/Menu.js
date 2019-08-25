import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import Inverter, { MegaSena} from './componentes/Multi'
import Contador from './componentes/Contador'
import Plataforma from './componentes/Plataforma'
import ValidarProps from './componentes/ValidarProps'
import Evento from './componentes/Evento'
import {Avo} from './componentes/ComunicacaoDireta'
import {TextoSincronizado} from './componentes/ComunicacaoIndireta'
import ListaFlex from './componentes/ListaFlex'
import Flex from './componentes/Flex'

export default createDrawerNavigator({
    Flex: {
        screen: Flex
    },
    ListaFlex: {
        screen: ListaFlex,
        navigationOptions: {title: 'Lista Flex'}
    },
    TextoSincronizado: {
        screen: TextoSincronizado,
        navigationOptions: {title: 'Texto sincronizado'}
    },
    Avo: {
        screen: () => <Avo nome='Josefa' sobrenome='Caetano'/>
    },
    Evento: {
        screen: Evento
    },
    ValidarProps: {
        screen: () => <ValidarProps ano={20} label={'Teste: '}/>
    }, 
    Plataforma: {
        screen: Plataforma
    },
    Contador: {
        screen: () => <Contador numeroInicial={100} />
    },
    MegaSena: {
        screen: () => <MegaSena numeros={8} />,
        navigationOptions: { title:'Mega sena' }
    },
    Inverter: {
        screen: () => <Inverter texto='React Native' />
    },
    ParImpar: {
        screen: () => <ParImpar numero={30} />,
        navigationOptions: {title:'Par & Impar'}
    },
    Simples: {
        screen: () => <Simples texto='Flexivel!!!' />
    }
}, { drawerWidth: 300}) 