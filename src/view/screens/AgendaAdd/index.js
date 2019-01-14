import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, FlatList, Button, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';

import styles from './styles';
import { changeEspecialidade, changeEspecialista, addAgenda } from '../../../actions/AgendaActions';

export class AgendaAdd extends Component {
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

	adcAgenda() {
		this.props.addAgenda(this.props.especialista, this.props.especialidade);
		this.props.navigation.goBack();
	}

	render() {
		return(
			<View style={styles.screen}>
				<View style={styles.areaHeader}>
					<TouchableOpacity style={styles.areaBtnHeader} onPress={this.voltar}>
						<Image style={styles.imageBtnHeader}source={require('../../icons/back.png')} />
		            </TouchableOpacity>

					<Text style={styles.titleHeader}>Adicionar Agenda</Text>

					<View style={styles.areaBtnHeader}></View>
				</View>

				<View style={styles.container}>
					<View style={styles.areaInput}>
						<TextInput 
							style={styles.input}
							placeholder='Especialidade'
							underlineColorAndroid='transparent'
							onChangeText={this.props.changeEspecialidade}
						/>

						<TextInput 
							style={styles.input}
							placeholder='Especialista'
							underlineColorAndroid='transparent'
							onChangeText={this.props.changeEspecialista}
						/>
					</View>

					<View style={styles.areaButton}>
						<TouchableOpacity style={[styles.areaBtn, styles.areaBtnCancelar]} onPress={() => this.voltar()}>
							<Text style={[styles.textBtn, styles.textBtnCancelar]}>Cancelar</Text>
			            </TouchableOpacity>

			            <TouchableOpacity style={styles.areaBtn} onPress={() => this.adcAgenda()}>
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
		especialidade:state.agenda.especialidade,
		especialista:state.agenda.especialista
	};
};

const AgendaAddConnect = connect(mapStateToProps, { 
	changeEspecialidade,
	changeEspecialista,
	addAgenda
})(AgendaAdd);

export default AgendaAddConnect;