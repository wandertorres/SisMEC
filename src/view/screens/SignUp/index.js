import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Keyboard, StatusBar, TouchableOpacity } from 'react-native';
import { Card, FormLabel, FormInput, Button, Text } from 'react-native-elements';

import styles from './styles';
import { signIn, changeNome, changeEmail, changeSenha, signUp } from '../../../actions/AuthActions';

class SignUp extends Component {
	cadastrar() {
		let ref = this.props;
		this.props.signUp(ref.nome, ref.email, ref.senha);
	}

	entrar() {
		this.props.navigation.navigate('SignIn');
	}

	render() {
		return(
			<View style={styles.screen}>
				<StatusBar backgroundColor="#F1F1F1" barStyle="dark-content" />

				<View style={styles.container}>
					<Card title='Cadastro'>
						<FormLabel>Nome</FormLabel>
						<FormInput placeholder='Digite seu nome' onChangeText={this.props.changeNome} />

						<FormLabel>E-mail</FormLabel>
						<FormInput placeholder='Digite seu e-mail' onChangeText={this.props.changeEmail} keyboardType='email-address' />

						<FormLabel>Senha</FormLabel>
						<FormInput placeholder='Digite sua senha' onChangeText={this.props.changeSenha} secureTextEntry/>

						<Button raise title='CADASTRAR' backgroundColor='#00A6FF' onPress={() => this.cadastrar()} />
						<TouchableOpacity style={{alignItems: 'center', marginTop: 10}} onPress={() => this.entrar()}>
							<Text style={{fontWeight: 'bold', color: '#00A6FF'}} h5>Já tenho cadastro</Text>
						</TouchableOpacity>
			    	</Card>   
			    </View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nome:state.auth.nome,
		email:state.auth.email,
		senha:state.auth.senha,
		connected:state.auth.connected
	};
};

const screenConnect = connect(mapStateToProps, { 
	signIn,
	changeNome,
	changeEmail, 
	changeSenha, 
	signUp,
})(SignUp);

export default screenConnect;