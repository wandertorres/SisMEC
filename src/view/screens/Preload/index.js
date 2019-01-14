import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, StatusBar, Image } from 'react-native';
import { Text } from 'react-native-elements';

import { checkLogin } from '../../../actions/AuthActions';
import styles from './styles';

class Preload extends Component {
	constructor(props) {
		super(props);

		this.props.checkLogin();
		this.directPages = this.directPages.bind(this);
	}

	// Função que determina qual tela será renderizada após o preload
	directPages() {
		switch(this.props.connected) {
			// Caso haja um usuário conectado, será renderizada a tela de seleção de turma
			case true:
				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[NavigationActions.navigate({routeName:'AgendaList'})]
				}));
				break;
			case false:
			// Caso não haja um usuário conectado, será renderizada a tela de login
				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[NavigationActions.navigate({routeName:'SignIn'})]
				}));
				break;
		}
	}

	// Quando reabrir o aplicativo
	componentDidMount() {
		this.directPages();
	}

	// Quando houber uma alteração no state e a tela for atualizada
	componentDidUpdate() {
		this.directPages();
	}

	render() {
		return(
			<View style={styles.screen}>
				<StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />

				<View style={styles.logo}>
					<Image style={styles.logoImg} source={require('../../icons/logo.png')} />
					<Text h3>SisMEC</Text>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		connected:state.auth.connected
	};
};

const screenConnect = connect(mapStateToProps, { 
	checkLogin 
})(Preload);

export default screenConnect;