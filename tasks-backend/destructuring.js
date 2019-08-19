const pessoa = {
    nome: 'Joaquim',
    sobrenome: 'da Silva',
    endereco: {
        rua: 'Rua de cima',
        numero: 34
    }
}

const {nome, sobrenome} = pessoa
console.log(nome, sobrenome)

const {endereco:{rua, numero, cep='123'}} = pessoa
console.log(rua, numero, cep)

const [a,b] = [2, 3,4,5,6]
console.log(a,b)

const numeros = [1,2,3,4,5]
const dobro = numeros.map(a => a * 2)
console.log(numeros, dobro)