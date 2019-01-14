import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Keyboard, StatusBar, TouchableOpacity } from 'react-native';
import { Card, FormLabel, FormInput, Button, Text } from 'react-native-elements';

import styles from './styles';
import { signIn, changeEmail, changeSenha } from '../../../actions/AuthActions';

class SignIn extends Component {
	// Quando houber uma alteração no state e a tela for atualizada
	componentDidUpdate() {
		// Caso o usuário seja logado com sucesso
		if(this.props.connected) {
			Keyboard.dismiss(); // Função para esconder o teclado

			this.props.navigation.dispatch(StackActions.reset({
				index:0,
				actions:[NavigationActions.navigate({routeName:'AgendaList'})]
			}));
		}
	}

	entrar() {
		this.props.signIn(this.props.email, this.props.senha);
	}

	cadastrar() {
		this.props.navigation.navigate('SignUp');
	}

	render() {
		return(
			<View style={styles.screen}>
				<StatusBar backgroundColor='#00A6FF' barStyle="light-content" />

				<View style={styles.container}>
					<Card title='Login'>
						<FormLabel labelStyle={{marginBottom:-10}}>E-mail</FormLabel>
						<FormInput placeholder='Digite seu e-mail' onChangeText={this.props.changeEmail} keyboardType='email-address' />

						<FormLabel labelStyle={{marginBottom:-10}}>Senha</FormLabel>
						<FormInput placeholder='Digite sua senha' onChangeText={this.props.changeSenha} secureTextEntry/>

						<Button raise title='ENTRAR' backgroundColor='#00A6FF' onPress={() => this.entrar()} />
			    	</Card>   
			    </View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		email:state.auth.email,
		senha:state.auth.senha,
		connected:state.auth.connected
	};
};

const screenConnect = connect(mapStateToProps, { 
	signIn,
	changeEmail, 
	changeSenha, 
})(SignIn);

export default screenConnect;