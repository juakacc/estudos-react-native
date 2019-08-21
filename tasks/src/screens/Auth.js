import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
import axios from 'axios'
import {server, showError} from '../common'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            axios.defaults.headers.common['Authorization']
                = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home', res.data)
        } catch(err) {
            showError(err)
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            Alert.alert('Sucesso!', 'Usuário cadastrado :)')
            this.setState({stageNew: false})
        } catch(err) {
            showError(err)
        }
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    render() {
        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >=6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword && this.state.confirmPassword === this.state.password)
        }

        const validForm = validations.reduce((all, v) => all && v)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                    <Text style={styles.title}>Tasks</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.subtitle}>
                            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                        </Text>
                        {this.state.stageNew &&
                            <AuthInput icon='user' placeholder='Nome' style={styles.input}
                                value={this.state.name}
                                onChangeText={name => this.setState({name})}/>}
                        <AuthInput icon='at' placeholder='E-mail'style={styles.input}
                            value={this.state.email}
                            onChangeText={email => this.setState({email})} />
                        <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input}
                            value={this.state.password}
                            onChangeText={password => this.setState({password})} />
                        {this.state.stageNew &&
                            <AuthInput icon='asterisk' secureTextEntry={true} placeholder='Confirmação'
                                value={this.state.confirmPassword} style={styles.input}
                                onChangeText={confirmPassword => this.setState({confirmPassword})} />}
                        <TouchableOpacity disabled={!validForm}
                            onPress={this.signinOrSignup}>
                            <View style={[styles.button, !validForm ? {backgroundColor: '#aaa'} : {}]}>
                                <Text style={styles.buttonText}>
                                    {this.state.stageNew ? 'Registrar' : 'Entrar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom:10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20
    }
})