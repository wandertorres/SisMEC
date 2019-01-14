import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, FlatList, StatusBar, TouchableHighlight, Image, Modal } from 'react-native';
import { Header, Icon, Card, List, ListItem, Button, FormInput, FormLabel } from 'react-native-elements';

import { getAgendas, putAgenda, changeEspecialista, changeEspecialidade, addAgenda } from '../../../actions/AgendaActions';
import { getProcedimentos } from '../../../actions/ProcedActions';
import { getAtendentes, getAtendente, getAgendasVinc } from '../../../actions/AtendActions';
import { signUp, changeEmail, changeNome } from '../../../actions/AuthActions';
import styles from './styles';

export class Config extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    	modalVisibleAdd: false,
	    	modalVisible: false,
	  	};

		this.props.getAgendas();
		this.props.getAtendentes();
		this.voltar = this.voltar.bind(this);
		this.selectAgenda = this.selectAgenda.bind(this);
		this.deleteAgenda = this.deleteAgenda.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	adcAgenda() {
		this.props.addAgenda(this.props.especialista, this.props.especialidade);
	}

	selectAgenda(item) {
		this.props.getProcedimentos(item.id);
		this.props.changeEspecialista(item.especialista);
		this.props.changeEspecialidade(item.especialidade);
		this.props.navigation.navigate('AgendaInf', {agenda:item});
	}

	deleteAgenda(item) {
		this.props.putAgenda(item);
	}

	adcAtendente() {
		this.props.signUp(this.props.nome, this.props.email, this.props.senha);
	}

	selectAtend(item) {
		this.props.getAgendasVinc(item.key);
		this.props.navigation.navigate('AtendInf', {atend: item});
	}

	setModalVisibleAdd(visible) {
		this.setState({modalVisibleAdd: visible});
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
				  	centerComponent={{text: 'CONFIGURAÇÕES', style: {color: '#FFFFFF'}}}
				/>
				
				<View style={styles.container}>
					<Card title='Agendas'>
						<View style={styles.containerList}>
							<List>
						    	<FlatList
						        	data={this.props.agendas}
						        	renderItem={({item}) => 
						        		<ListItem
									      	title={item.especialista}
									      	onPress={() => {this.selectAgenda(item)}}
									    />
						        	}
						      	/>
						    </List>
			            </View>
			            <Button raise title='NOVA AGENDA' backgroundColor='#00A6FF' onPress={() => this.setModalVisibleAdd(!this.state.modalVisibleAdd)} />
		            </Card>
				</View>

				<View style={styles.container}>
					<Card title='Atendentes'>
						<View style={styles.containerList}>
							<List>
						    	<FlatList
						        	data={this.props.atendentes}
						        	renderItem={({item}) => 
						        		<ListItem
									      	title={item.nome}
									      	onPress={() => {this.selectAtend(item)}}
									    />
						        	}
						      	/>
						    </List>
			            </View>
			            <Button raise title='NOVO ATENDENTE' backgroundColor='#00A6FF' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
		            </Card>
				</View>
			
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisibleAdd}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Adicionar Agenda'>
								<FormLabel labelStyle={{marginBottom:-10}}>Especialista</FormLabel>
								<FormInput 
									placeholder='Digite o especialista'
									onChangeText={this.props.changeEspecialista}
								/>

								<FormLabel labelStyle={{marginBottom:-10}}>Especialidade</FormLabel>
								<FormInput 
									placeholder='Digite o especialidade'
									onChangeText={this.props.changeEspecialidade} 
								/>
								
								<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
									<TouchableHighlight style={{marginTop: 20, marginRight:10}}
										onPress={() => {
											this.setModalVisibleAdd(!this.state.modalVisibleAdd);
										}}>
										<Text h6>CANCELAR</Text>
									</TouchableHighlight>
									<TouchableHighlight style={{marginTop: 20, marginLeft:10, marginRight:15}}
										onPress={() => {
											this.setModalVisibleAdd(!this.state.modalVisibleAdd);
											this.adcAgenda();
										}}>
										<Text h6>SALVAR</Text>
									</TouchableHighlight>
								</View>
							</Card>
						</View>
					</View>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Adicionar Atendente'>
								<FormLabel labelStyle={{marginBottom:-10}}>Nome</FormLabel>
								<FormInput 
									placeholder='Digite o nome'
									onChangeText={this.props.changeNome}
								/>

								<FormLabel labelStyle={{marginBottom:-10}}>E-mail</FormLabel>
								<FormInput 
									placeholder='Digite o e-mail'
									onChangeText={this.props.changeEmail}
								/>
								
								<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
									<TouchableHighlight style={{marginTop: 20, marginRight:10}}
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
										}}>
										<Text h6>CANCELAR</Text>
									</TouchableHighlight>
									<TouchableHighlight style={{marginTop: 20, marginLeft:10, marginRight:15}}
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
											this.adcAtendente();
										}}>
										<Text h6>SALVAR</Text>
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
		uid:state.auth.uid,
		nome:state.auth.nome,
		email:state.auth.email,
		senha:state.auth.senha,
		agendas:state.agenda.agendas,
		atendentes:state.atend.atendentes,
		especialista:state.agenda.especialista,
		especialidade:state.agenda.especialidade
	};
};

const ConfigConnect = connect(mapStateToProps, { 
	getAgendas, 
	putAgenda,
	getProcedimentos, 
	getAtendentes,
	getAtendente,
	changeEspecialista,
	changeEspecialidade,
	addAgenda,
	changeNome, 
	changeEmail, 
	signUp,
	getAgendasVinc,
})(Config);

export default ConfigConnect;