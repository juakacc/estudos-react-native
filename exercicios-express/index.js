const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')
require('./api/produto')(app, 'Com param!')

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

app.use(saudacao('Guilherme'))
// middleware para trabalhar com dados do body
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log('Antes...')
    next()
})

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório completo ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
    // let corpo = ''
    // req.on('data', function(parte) {
    //     corpo += parte
    // })

    // req.on('end', function() {
    //     res.send(corpo)
    // })
    //BodyParser
    res.send(req.body)
})

app.get('/clientes/:id', (req, res) => {
    res.send(`Client ${req.params.id} selecionado!`)
})
 
app.get('/opa', (req, res, next) => {
    res.json([
        {id: 7, name: 'Joaquim', position: 1},
        {id: 8, name: 'Jack', position: 1},
        {id: 9, name: 'Julia', position: 1},
    ])
    next()
    // res.send('Estou <b>bem</b>')
})

app.use((req, res, next) => {
    console.log('Depois...')
    next()
})

app.listen(3000, () => {
    console.log('Backend executando!...')
})