import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Button } from 'react-native-elements';

import styles from './styles';
import { changeCpf, changeNome, changeEndereco, changeContato, changeObservacao, addMarc } from '../../../actions/AgendaActions';

export class MarcAdd extends Component {
	constructor(props) {
		super(props);
		this.state= {
			checked: []
		};

		this.voltar = this.voltar.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	marcar() {
		let ref = this.props;
		let refNav = ref.navigation.state.params;

		this.props.addMarc(refNav.data, refNav.agenda, ref.cpf, ref.nome, ref.endereco, ref.contato, ref.observacao, this.state.checked);
		this.props.navigation.goBack();
	}

  	checkItem = item => {
    	const {checked} = this.state;

    	if (!checked.includes(item)) {
      		this.setState({checked: [...checked, item]});
    	} else {
      		this.setState({checked: checked.filter(a => a !== item)});
    	}
  	};

	render() {
		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'ADICIONAR MARCAÇÂO', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<FormLabel labelStyle={{marginBottom:-10}}>Nome</FormLabel>
						<FormInput placeholder='Digite o nome' onChangeText={this.props.changeNome} />

						<FormLabel labelStyle={{marginBottom:-10}}>Endereço</FormLabel>
						<FormInput placeholder='Digite o endereço' onChangeText={this.props.changeEndereco} />

						<FormLabel labelStyle={{marginBottom:-10}}>Contato</FormLabel>
						<FormInput placeholder='Digite o contato' onChangeText={this.props.changeContato} keyboardType='phone-pad' />

						<FormLabel labelStyle={{marginBottom:-10}}>Obsevação</FormLabel>
						<FormInput placeholder='Digite a observação' onChangeText={this.props.changeObservacao} />

						<FormLabel>Procedimentos</FormLabel>
						<View>
							<FlatList
								style={{height:205, margin:5}}
					        	data={this.props.procedimentos}
					          	extraData={this.state}
					          	renderItem={({item}) => (
					            	<CheckBox
					              		title={item.nome}
					              		onPress={() => this.checkItem(item)}
					              		checked={this.state.checked.includes(item)}
					            	/>
					          	)}
					        />
						</View>

						<Button raise title='MARCAR' backgroundColor='#00A6FF' onPress={() => this.marcar()} />
					</Card>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cpf:state.agenda.cpf,
		nome:state.agenda.nome,
		endereco:state.agenda.endereco,
		contato:state.agenda.contato,
		observacao:state.agenda.observacao,
		procedimentos:state.proced.procedimentos,
	};
};

const screenConnect = connect(mapStateToProps, { changeCpf, changeNome, changeEndereco, changeContato, changeObservacao, addMarc })(MarcAdd);

export default screenConnect;