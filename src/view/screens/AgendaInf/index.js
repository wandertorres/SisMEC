import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, Modal, TouchableHighlight } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Text, Button } from 'react-native-elements';

import { delAgenda } from '../../../actions/AgendaActions';
import styles from './styles';

export class AgendaInf extends Component {
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
		this.props.delAgenda(this.props.navigation.state.params.agenda.key);
	}

	editar() {
		this.props.navigation.navigate('AgendaEdit', {agenda:this.props.navigation.state.params.agenda});
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
				  	centerComponent={{text: 'DETALHES DA AGENDA', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<View style={{flexDirection:'row'}}>
							<FormLabel>Especialista:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.especialista}</Text>
						</View>

						<View style={{flexDirection:'row'}}>
							<FormLabel>Especialidade:</FormLabel>
							<Text style={{marginTop:15, marginLeft:-15}} h6>{this.props.especialidade}</Text>
						</View>

						<FormLabel>Procedimento(s):</FormLabel>
						<View style={{marginLeft:15}}>
							<FlatList
								style={{height:375, margin:5}}
					        	data={this.props.procedimentos}
					          	extraData={this.state}
					          	renderItem={({item}) => (
					            	<Text h6>{item.nome}</Text>
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

			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		procedimentos:state.proced.procedimentos,
		especialista:state.agenda.especialista,
		especialidade:state.agenda.especialidade
	};
};

const screenConnect = connect(mapStateToProps, { delAgenda })(AgendaInf);

export default screenConnect;