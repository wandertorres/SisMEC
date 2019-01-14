import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, FlatList, Button, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';

import styles from './styles';
import { changeAtendente, addAtendente } from '../../../actions/AtendActions';
import { signInAction, changeEmail } from '../../../actions/AuthActions';

export class AtendAdd extends Component {
	static navigationOptions = {
		header:null
	}

	constructor(props) {
		super(props);

		this.voltar = this.voltar.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	adcAtendente(atendente, email) {
		this.props.addAtendente(atendente, email);
		this.props.navigation.goBack();
		this.props.signInAction('wander@live.com', '123456');
	}

	render() {
		return(
			<View style={styles.screen}>
				<View style={styles.areaHeader}>
					<TouchableOpacity style={styles.areaBtnHeader} onPress={this.voltar}>
						<Image style={styles.imageBtnHeader}source={require('../../icons/back.png')} />
		            </TouchableOpacity>

					<Text style={styles.titleHeader}>Adicionar Atendente</Text>

					<View style={styles.areaBtnHeader}></View>
				</View>

				<View style={styles.container}>
					<View style={styles.areaInput}>
						<TextInput 
							style={styles.input}
							placeholder='Nome'
							underlineColorAndroid='transparent'
							onChangeText={this.props.changeAtendente}
						/>

						<TextInput 
							style={styles.input}
							placeholder='E-mail'
							underlineColorAndroid='transparent'
							onChangeText={this.props.changeEmail}
						/>
					</View>

					<View style={styles.areaButton}>
						<TouchableOpacity style={[styles.areaBtn, styles.areaBtnCancelar]} onPress={() => this.voltar()}>
							<Text style={[styles.textBtn, styles.textBtnCancelar]}>Cancelar</Text>
			            </TouchableOpacity>

			            <TouchableOpacity style={styles.areaBtn} onPress={() => this.adcAtendente(this.props.atendente, this.props.email)}>
							<Text style={styles.textBtn}>Salvar</Text>
			            </TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		atendente:state.atend.atendente,
		email:state.auth.email
	};
};

const AtendAddConnect = connect(mapStateToProps, { 
	changeAtendente,
	changeEmail,
	addAtendente,
	signInAction
})(AtendAdd);

export default AtendAddConnect;