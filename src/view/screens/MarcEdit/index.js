import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Button } from 'react-native-elements';

import styles from './styles';
import { changeCpf, changeNome, changeEndereco, changeContato, changeObservacao, getMarcacao } from '../../../actions/AgendaActions';
import { getProcedimentos,  } from '../../../actions/ProcedActions';
import { editMarcacao } from '../../../actions/MarcActions';

export class MarcEdit extends Component {
	constructor(props) {
		super(props);
		this.state= {
			checked: [],
		};

		let refNav = this.props.navigation.state.params;
		this.props.getMarcacao(refNav.marc);

		this.voltar = this.voltar.bind(this);
	}

	componentWillMount() {
    	let { checked } = this.state;
    	this.setState({ checked: this.props.procedMarc })
  	}

	voltar() {
		this.props.navigation.goBack();
	}

	editar() {
		let ref = this.props;
		let refNav = ref.navigation.state.params;

		this.props.editMarcacao(refNav.marc, refNav.agenda, ref.nome, ref.endereco, ref.contato, ref.observacao, this.state.checked);
		this.props.navigation.navigate('MarcList', {agenda:refNav.agenda});
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
		let { procedimentos } = this.props;

		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'EDITAR MARCAÇÂO', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<FormLabel labelStyle={{marginBottom:-10}}>Nome</FormLabel>
						<FormInput 
							placeholder='Digite o nome' 
							value={this.props.nome} 
							onChangeText={this.props.changeNome} />

						<FormLabel labelStyle={{marginBottom:-10}}>Endereço</FormLabel>
						<FormInput 
							placeholder='Digite o endereço'
							value={this.props.endereco}
							onChangeText={this.props.changeEndereco} />

						<FormLabel labelStyle={{marginBottom:-10}}>Contato</FormLabel>
						<FormInput 
							placeholder='Digite o contato'
							value={this.props.contato}
							onChangeText={this.props.changeContato} 
							keyboardType='phone-pad' />

						<FormLabel labelStyle={{marginBottom:-10}}>Observação</FormLabel>
						<FormInput 
							placeholder='Digite o contato'
							value={this.props.observacao}
							onChangeText={this.props.changeObservacao} 
							keyboardType='phone-pad' />

						<FormLabel>Procedimentos</FormLabel>
						<View>
							<FlatList
								style={{height:205, margin:5}}
					        	data={procedimentos}
					          	extraData={this.state}
					          	renderItem={({item}) => (
					            	<CheckBox
					              		title={item.nome}
					              		onPress={() => this.checkItem(item)}
					              		checked={checked.findIndex(checkedItem => checkedItem.id === item.id) !== -1}
					            	/>
					          	)}
					        />
						</View>

						<Button raise title='SALVAR' backgroundColor='#00A6FF' onPress={() => this.editar()} />
					</Card>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nome:state.agenda.nome,
		endereco:state.agenda.endereco,
		contato:state.agenda.contato,
		observacao:state.agenda.observacao,
		procedimentos:state.proced.procedimentos,
		procedMarc:state.marc.procedimentos,
	};
};

const screenConnect = connect(mapStateToProps, { 
	changeCpf, 
	changeNome, 
	changeEndereco, 
	changeContato,
	changeObservacao, 
	getMarcacao, 
	getProcedimentos, 
	editMarcacao })(MarcEdit);

export default screenConnect;