import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, FlatList, TouchableOpacity, Image, Modal, TouchableHighlight } from 'react-native';
import { Header, Icon, List, ListItem, Button, Card, Text, FormLabel, FormInput } from 'react-native-elements';

import Calendario from '../../components/Calendario';
import { getProcedimentos,  } from '../../../actions/ProcedActions';
import { getProcedMarcados } from '../../../actions/MarcActions';
import { getMarcacoes } from '../../../actions/AgendaActions';
import styles from './styles';

class MarcList extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    	modalVisible: false,
	    	marcSelected: null
	  	};

		this.voltar = this.voltar.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	marcar() {
		let ref = this.props;

		this.props.navigation.navigate('MarcAdd', {agenda:ref.navigation.state.params.agenda.id, data:ref.data});
		this.props.getProcedimentos(ref.navigation.state.params.agenda.id);
	}

	detalhar(item) {
		let ref = this.props;

		this.props.navigation.navigate('MarcInf', {agenda:ref.navigation.state.params.agenda, marc:item});
		this.props.getProcedMarcados(ref.navigation.state.params.agenda.key, ref.data, item.key);
	}

	setMarcSelected(item) {
		let ref = this.props;

		this.setState({marcSelected: item});
		this.props.getProcedMarcados(ref.navigation.state.params.agenda.key, ref.data, item.key);
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
				  	centerComponent={{text: this.props.navigation.state.params.agenda.especialidade.toUpperCase(), style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<List>
				    	<FlatList
				        	data={this.props.marcacoes}
				        	renderItem={({item}) => 
				        		<ListItem
							      	title={item.paciente}
							      	subtitle={
							      		item.contato.substring(0,1)+
							      		'.'+item.contato.substring(1,5)+
							      		'-'+item.contato.substring(5,9)+
							      		' - '+item.endereco
							      	}
							      	//rightTitle={item.atendido}
							      	onLongPress={() => {
							      		this.setMarcSelected(item);
							      		this.setModalVisible(true);
							      	}}
							      	onPress={() => {this.detalhar(item)}}
							    />
				        	}
				      	/>
				    </List>
				</View>

				<View style={styles.plus}>
					<Icon
					  	raised
					  	reverse
					  	name='plus'
					  	type='octicon'
					  	color='#00A6FF'
					  	onPress={() => this.marcar()} />
				</View>

				<View style={styles.calendar}>
					<Calendario agenda={this.props.navigation.state.params.agenda} />
				</View>
			
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:3, justifyContent:'flex-end'}} >
							<Card title='Remarcar'>
								<Text h5>Para remarcar este agendamento, 
									selecione uma nova data na parte inferior da tela.</Text>
								
								<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
									<TouchableHighlight style={{marginTop: 20, marginRight:10}}
										onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
        									this.props.getMarcacoes(this.props.navigation.state.params.agenda, this.state.marcSelected.data);
										}}>
										<Text h6>CANCELAR</Text>
									</TouchableHighlight>
								</View>
							</Card>
						</View>

						<View style={{flex: 2, justifyContent:'flex-end'}}>
							<Calendario 
								onPress={this.setModalVisible} 
								agenda={this.props.navigation.state.params.agenda} 
								marcacao={this.state.marcSelected} 
							/>
						</View>
						</View>
				</Modal>

			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		marcacoes:state.agenda.marcacoes,
		data:state.agenda.data,
		count:state.agenda.count,
	};
};

const screenConnect = connect(mapStateToProps, { getProcedimentos, getProcedMarcados, getMarcacoes })(MarcList);

export default screenConnect;