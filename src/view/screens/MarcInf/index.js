import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, Modal, TouchableHighlight } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Text, Button } from 'react-native-elements';

import { delMarcacao } from '../../../actions/MarcActions';
import { getProcedimentos,  } from '../../../actions/ProcedActions';
import styles from './styles';

export class MarcInf extends Component {
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

	desmarcar() {
		this.voltar();
		this.props.delMarcacao(this.props.navigation.state.params.agenda.key, this.props.data, this.props.navigation.state.params.marc.key);
	}

	editar() {
		this.props.navigation.navigate('MarcEdit', {agenda:this.props.navigation.state.params.agenda, marc:this.props.navigation.state.params.marc});
		this.props.getProcedimentos(this.props.navigation.state.params.agenda.id);
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
				  	centerComponent={{text: 'DETALHES DA MARCAÇÂO', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<View style={{flexDirection:'row'}}>
							<FormLabel>Nome:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.navigation.state.params.marc.paciente}</Text>
						</View>

						<View style={{flexDirection:'row'}}>
							<FormLabel>Endereço:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.navigation.state.params.marc.endereco}</Text>
						</View>

						<View style={{flexDirection:'row'}}>
							<FormLabel>Observação:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.navigation.state.params.marc.observacao}</Text>
						</View>

						<FormLabel>Procedimento(s):</FormLabel>
						<View style={{marginLeft:15}}>
							<FlatList
								style={{height:335, margin:5}}
					        	data={this.props.procedimentos}
					          	//extraData={this.state}
					          	renderItem={({item}) => (
					            	<Text h6>{item.nome}</Text>
					          	)}
					        />
						</View>

						<Button raise title='EDITAR' backgroundColor='#00A6FF' onPress={() => this.editar()} buttonStyle={{marginBottom: 5}} />

						<Button raise title='DESMARCAR' backgroundColor='#FF4444' onPress={() => {this.setModalVisible(true)}} />
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
								<Text h5>Deseja realmente desmarcar este agendamento?</Text>
								
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
											this.desmarcar();
										}}>
										<Text h6>DESMARCAR</Text>
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
		procedimentos:state.marc.procedimentos,
		data:state.agenda.data
	};
};

const screenConnect = connect(mapStateToProps, { delMarcacao, getProcedimentos })(MarcInf);

export default screenConnect;