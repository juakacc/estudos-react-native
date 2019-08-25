import React from 'react'
import {ScrollView, View, FlatList, Text} from 'react-native'

const alunos =[
    {id: 1, nome: 'João', nota: 7.9},
    {id: 2, nome: 'Pedro', nota: 8.9},
    {id: 3, nome: 'Joaquim', nota: 9.9},
    {id: 4, nome: 'Rebeca', nota: 10},
    {id: 5, nome: 'Tobias', nota: 5.6},
    {id: 6, nome: 'João', nota: 7.9},
    {id: 7, nome: 'Pedro', nota: 8.9},
    {id: 8, nome: 'Joaquim', nota: 9.9},
    {id: 9, nome: 'Rebeca', nota: 10},
    {id: 10, nome: 'Tobias', nota: 5.6},
    {id: 11, nome: 'João', nota: 7.9},
    {id: 12, nome: 'Pedro', nota: 8.9},
    {id: 13, nome: 'Joaquim', nota: 9.9},
    {id: 14, nome: 'Rebeca', nota: 10},
    {id: 15, nome: 'Tobias', nota: 5.6},
]

const itemEstilo = {
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#DDD',
    borderWidth: 0.5,
    borderColor: '#222',

    // Flex
    alignItems: 'center',
    // justifyContent: 'space-between'
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const Aluno = props =>
    <View style={itemEstilo}>
        <Text>{props.nome}</Text>
        <Text style={{fontWeight: 'bold'}}>Nota: {props.nota}</Text>
    </View>

export default props => {
    const renderItens = ({item}) =>  {
        return <Aluno {...item} />
    }

    return (
        <ScrollView>
            <FlatList data={alunos} renderItem={renderItens}
                    keyExtractor={(_, index) => index.toString()} />
        </ScrollView>
    )
}
