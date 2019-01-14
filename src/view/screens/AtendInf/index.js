import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, Modal, TouchableHighlight } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Text, Button } from 'react-native-elements';

import { changeAtendente, delAtendente } from '../../../actions/AtendActions'
import styles from './styles';

export class AtendInf extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    	modalVisible: false,
	  	};

		this.voltar = this.voltar.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	excluir() {
		this.voltar();
		let refNav = this.props.navigation.state.params;

		this.props.delAtendente(refNav.atend.key);
	}

	editar() {
		this.props.navigation.navigate('AtendEdit', {atend:this.props.navigation.state.params.atend});
		this.props.changeAtendente(this.props.navigation.state.params.atend.nome);
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'DETALHES DO ATENDENTE', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<View style={{flexDirection:'row'}}>
							<FormLabel>Nome:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.navigation.state.params.atend.nome}</Text>
						</View>

						<FormLabel>Agenda(s) vinculada(s):</FormLabel>
						<View style={{marginLeft:15}}>
							<FlatList
								style={{height:410, margin:5}}
					        	data={this.props.agendasVinc}
					          	extraData={this.state}
					          	renderItem={({item}) => (
					            	<Text h6>{item.especialista}</Text>
					          	)}
					        />
						</View>

						<Button raise title='EDITAR' backgroundColor='#00A6FF' onPress={() => this.editar()} buttonStyle={{marginBottom: 5}} />

						<Button raise title='EXCLUIR' backgroundColor='#FF4444' onPress={() => {this.setModalVisible(true)}} />
					</Card>
				</View>

				<Modal
					animationType="fade"
					transparent={true}
					presentationStyle='fullScreen'
					visible={this.state.modalVisible}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Desmarcar'>
								<Text h5>Deseja realmente excluir este atendente?</Text>
								
								<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
									<TouchableHighlight style={{marginTop: 20, marginRight:10}}
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
										}}>
										<Text h6>CANCELAR</Text>
									</TouchableHighlight>
									<TouchableHighlight style={{marginTop: 20, marginLeft:10}}
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
											this.excluir();
										}}>
										<Text h6>EXCLUIR</Text>
									</TouchableHighlight>
								</View>
							</Card>
						</View>
					</View>
				</Modal>

			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		agendas:state.agenda.agendas,
		agendasVinc:state.atend.agendas,
		atendente:state.atend.atendente
	};
};

const screenConnect = connect(mapStateToProps, { changeAtendente, delAtendente })(AtendInf);

export default screenConnect;