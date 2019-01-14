import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, TouchableHighlight, Modal } from 'react-native';
import { Header, List, ListItem, Icon, Card, FormLabel, FormInput, Text} from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { getAgendas } from '../../../actions/AgendaActions';
import { signOut, checkPass, altSenha } from '../../../actions/AuthActions';
import { getGestor } from '../../../actions/AtendActions';
import styles from './styles';

class AgendaList extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    	modalVisible: false,
	    	nova:'',
	    	senha:'',
	    	confirm:''
	  	};

	  	this.props.getGestor(this.props.uid);
		this.props.getAgendas(this.props.uid);
		this.selectAgenda = this.selectAgenda.bind(this);
		//this.config = this.config.bind(this);
		this.sair = this.sair.bind(this);
		this.changeNova = this.changeNova.bind(this);
		this.changeSenha = this.changeSenha.bind(this);
		this.changeConfirm = this.changeConfirm.bind(this);
	}

	_menu = null;

    setMenuRef = ref => {
    	this._menu = ref;
  	};

  	hideMenu = () => {
    	this._menu.hide();
  	};

  	showMenu = () => {
    	this._menu.show();
  	};

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
		this.setState({nova:'', senha:'', confirm:''});
	}

	changeNova(t) {
		this.setState({nova:t})
	}

	changeSenha(t) {
		this.setState({senha:t})
	}

	changeConfirm(t) {
		this.setState({confirm:t})
	}

	selectAgenda(item) {
		this.props.navigation.navigate('MarcList', {agenda:item});
	}

	editSenha() {
		this.hideMenu();
		this.setModalVisible(!this.state.modalVisible);
	}

	mudarSenha() {
		if(this.state.nova === '' || this.state.senha === '' || this.state.confirm === '')
			alert('Preencha todos os campos!');
		else if(this.state.nova !== this.state.confirm)
			alert('Senhas não conferem!');
		else
			this.props.altSenha(this.state.senha, this.state.nova);
	}

	config() {
		this.hideMenu();
		this.props.navigation.navigate('Config');
	}

	relatorio() {
		this.hideMenu();
		this.props.navigation.navigate('Relatorio');
	}

	sair() {
		this.hideMenu();
		this.props.signOut();

		this.props.navigation.dispatch(StackActions.reset({
			index:0,
			actions:[NavigationActions.navigate({routeName:'SignIn'})]
		}));
	}

	menu() {
		if(this.props.gestor)
			return(
				<Menu
		        	ref={this.setMenuRef}
		          	button={<Icon name='menu' color='#FFFFFF' onPress={this.showMenu} />}
		        >
		        	<MenuItem onPress={() => this.editSenha()}>Alterar Senha</MenuItem>
		          	<MenuItem onPress={() => this.config()}>Configurações</MenuItem>
		          	<MenuDivider />
		          	<MenuItem onPress={() => this.relatorio()}>Relatórios</MenuItem>
		        </Menu>
			);
		else
			return(
				<Menu
		        	ref={this.setMenuRef}
		          	button={<Icon name='menu' color='#FFFFFF' onPress={this.showMenu} />}
		        >
		        	<MenuItem onPress={() => this.editSenha()}>Alterar Senha</MenuItem>
		        	<MenuDivider />
		          	<MenuItem onPress={() => this.relatorio()}>Relatórios</MenuItem>
		        </Menu>
			);
	}

	render() {
		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{ backgroundColor: '#00A6FF', barStyle: 'light-content' }} 
					backgroundColor={ '#00A6FF' }
				  	leftComponent={this.menu()}
				  	centerComponent={{ text: 'AGENDAS', style: { color: '#fff' } }}
				  	rightComponent={<Icon name='exit-to-app' color='#FFFFFF' onPress={() => this.sair()} />}
				/>

				<View style={styles.container}>
					<List>
				    	<FlatList
				        	data={this.props.agendasPorUid}
				        	renderItem={({item}) => 
				        		<ListItem
							      	//roundAvatar
							      	//avatar={{uri:{item.avatar_url}}}
							      	title={item.especialidade}
							      	subtitle={item.especialista}
							      	onPress={() => this.selectAgenda(item)}
							    />
				        	}
				      	/>
				    </List>
			    </View>

			    <Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<View style={{flex:1, backgroundColor:'#000A'}}>
						<View style={{flex:1, justifyContent:'center'}} >
							<Card title='Alterar Senha'>
								<FormLabel labelStyle={{marginBottom:-10}}>Senha atual</FormLabel>
								<FormInput 
									placeholder='Digite a senha atual'
									onChangeText={this.changeSenha} 
									secureTextEntry
								/>

								<FormLabel labelStyle={{marginBottom:-10}}>Nova senha</FormLabel>
								<FormInput 
									placeholder='Digite a nova senha'
									onChangeText={this.changeNova} 
									secureTextEntry
								/>

								<FormLabel labelStyle={{marginBottom:-10}}>Confirme</FormLabel>
								<FormInput 
									placeholder='Confirme a nova senha'
									onChangeText={this.changeConfirm}
									secureTextEntry
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
											this.mudarSenha();
											this.setModalVisible(!this.state.modalVisible);
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
		senha:state.auth.senha,
		connected:state.auth.connected,
		confirm:state.auth.confirm,
		agendasPorUid:state.agenda.agendasPorUid,
		gestor:state.atend.gestor
	};
};

const screenConnect = connect(mapStateToProps, { 
	getAgendas,
	signOut,
	checkPass,
	getGestor,
	altSenha,
})(AgendaList);

export default screenConnect;