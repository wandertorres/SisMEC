import React, { Component } from 'react';
import { StackActions, DrawerActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text, FlatList, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { CheckBox, Card, Header, FormLabel, Icon, Button, FormInput } from 'react-native-elements';

import { changeEspecialista, getAgendas } from '../../../actions/AgendaActions';
import { changeAtendente, editAtendente } from '../../../actions/AtendActions';
import styles from './styles';

export class AtendEdit extends Component {
	constructor(props) {
		super(props);
		this.state= {
			checked: [],
		};
		
		this.voltar = this.voltar.bind(this);
	}

	componentWillMount() {
    	let { checked } = this.state;
    	this.setState({ checked: this.props.agendasVinc })
    	//alert(this.props.agendasVinc)
  	}

	voltar() {
		this.props.navigation.goBack();
	}

	editar() {
		this.props.navigation.navigate('Config');
		let refNav = this.props.navigation.state.params;

		this.props.editAtendente(refNav.atend.key, this.props.atendente, this.state.checked);
	}

	checkItem = (item) => {
    	let { checked } = this.state;

    	if(checked.findIndex(checkedItem => checkedItem.id === item.id) !== -1)
      		this.setState({ checked: checked.filter(x => x.id !== item.id) });
    	else
      		this.setState({ checked: [...checked, item]});
  	};

	render() {
		let { checked } = this.state;
		let { agendas } = this.props;

		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'EDITAR ATENDENTE', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<FormLabel>Nome</FormLabel>
						<FormInput 
							placeholder='Digite o nome' 
							value={this.props.atendente} 
							onChangeText={this.props.changeAtendente} />

						<FormLabel>Agendas</FormLabel>
						<View style={styles.containerList}>
					    	<FlatList
					        	data={agendas}
					          	extraData={this.state}
					          	renderItem={({item}) => (
					            	<CheckBox
					              		title={item.especialista}
					              		onPress={() => this.checkItem(item)}
					              		checked={checked.findIndex(checkedItem => checkedItem.id === item.id) !== -1}
					            	/>
					          	)}
					        />
			            </View>

						<Button raise title='SALVAR' backgroundColor='#00A6FF' buttonStyle={{marginBottom: 5}} onPress={() => this.editar()} />
					</Card>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//atendente:state.atend.atendente,
		especialista:state.proced.especialista,
		agendas:state.agenda.agendas,
		agendasVinc:state.atend.agendas,
		atendente:state.atend.atendente
	};
};

const AgendaEditConnect = connect(mapStateToProps, { 
	changeEspecialista,
	getAgendas,
	changeAtendente,
	editAtendente
})(AtendEdit);

export default AgendaEditConnect;