import React, { Component } from 'react';
import { StackActions, DrawerActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, FlatList, StatusBar, TouchableOpacity, TouchableHighlight, TextInput, Image, Modal } from 'react-native';
import { Header, Icon, Card, FormInput, FormLabel, List, ListItem, Button } from 'react-native-elements';

import { getProcedimentos, changeProced, addProcedimento, delProcedimento } from '../../../actions/ProcedActions';
import { changeEspecialista, delAgenda, changeEspecialidade, editAgenda } from '../../../actions/AgendaActions';
import styles from './styles';

export class AgendaEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    	modalVisible: false,
	    	modalVisibleAdd: false,
	    	modalVisibleDel: false,
	    	procedExcluir: ''
	  	};

		this.voltar = this.voltar.bind(this);
		this.excluir = this.excluir.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	excluir() {
		this.props.delAgenda(this.props.navigation.state.params.agenda);
		this.voltar();
	}

	excluirProced(proced, agenda) {
		this.props.delProcedimento(proced, agenda);
	}

	editar() {
		this.props.editAgenda(this.props.navigation.state.params.agenda.key, this.props.especialista, this.props.especialidade);
		this.voltar();
	}

	adicionar() {
		this.props.addProcedimento(this.props.procedimento, this.props.navigation.state.params.agenda)
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	setModalVisibleAdd(visible) {
		this.setState({modalVisibleAdd: visible});
	}

	setModalVisibleDel(visible) {
		this.setState({modalVisibleDel: visible});
	}

	render() {
		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'EDITAR AGENDA', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<FormLabel>Especialista</FormLabel>
						<FormInput 
							placeholder='Digite o nome' 
							value={this.props.especialista} 
							onChangeText={this.props.changeEspecialista} />

						<FormLabel>Especialidade</FormLabel>
						<FormInput 
							placeholder='Digite o endereço'
							value={this.props.especialidade}
							onChangeText={this.props.changeEspecialidade} />

						<FormLabel>Procedimentos</FormLabel>
						<View style={styles.containerList}>
							
						    	<FlatList
						        	data={this.props.procedimentos}
						        	renderItem={({item}) => 
						        		<ListItem
									      	title={item.nome}
									      	rightIcon={<Icon />}
									      	onLongPress={() => {
									      		this.setModalVisibleDel(!this.state.modalVisibleDel);
									      		this.setState({procedExcluir: item});
									      	}}
									    />
						        	}
						      	/>
						      	<View style={styles.plus}>
									<Icon
									  	raised
									  	reverse
									  	name='plus'
									  	type='octicon'
									  	color='#00A6FF'
									  	onPress={() => this.setModalVisibleAdd(!this.state.modalVisibleAdd)} />
								</View>
						    
			            </View>

						<Button raise title='SALVAR ALTERAÇÕES' backgroundColor='#00A6FF' buttonStyle={{marginBottom: 5}} onPress={() => this.editar()} />
					</Card>
				</View>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Excluir'>
								<Text h5>Todas as marcações desta agenda também serão excluídas. Deseja realmente excluir?</Text>
								
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

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisibleAdd} 
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Adicionar Procedimento'>
								<FormLabel labelStyle={{marginBottom:-10}}>Nome</FormLabel>
								<FormInput 
									placeholder='Digite o nome'
									onChangeText={this.props.changeProced}
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
											this.adicionar();
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
					visible={this.state.modalVisibleDel}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Excluir Procedimento'>
								<Text>Deseja realmente excluir este procedimento?</Text>
								
								<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
									<TouchableHighlight style={{marginTop: 20, marginRight:10}}
										onPress={() => {
											this.setModalVisibleDel(!this.state.modalVisibleDel);
										}}>
										<Text h6>CANCELAR</Text>
									</TouchableHighlight>
									<TouchableHighlight style={{marginTop: 20, marginLeft:10, marginRight:15}}
										onPress={() => {
											this.setModalVisibleDel(!this.state.modalVisibleDel);
											this.excluirProced(this.state.procedExcluir.key, this.props.navigation.state.params.agenda.key);
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
		procedimentos:state.proced.procedimentos,
		procedimento:state.proced.procedimento,
		especialista:state.agenda.especialista,
		especialidade:state.agenda.especialidade
	};
};

const AgendaEditConnect = connect(mapStateToProps, { 
	getProcedimentos, 
	changeProced, 
	addProcedimento, 
	changeEspecialista, 
	delAgenda, 
	changeEspecialidade,
	editAgenda,
	delProcedimento,
})(AgendaEdit);

export default AgendaEditConnect;