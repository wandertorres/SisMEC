import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, FlatList, Modal, TouchableHighlight, TouchableOpacity, Keyboard } from 'react-native';
import { Header, Icon, FormLabel, FormInput, CheckBox, Card, Text, Button, ListItem, List } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'
import Picker from 'react-native-simple-modal-picker';

import { changeDataI, changeDataF, getConsolidado } from '../../../actions/MarcActions';
import { getProcedimentos } from '../../../actions/ProcedActions';
import styles from './styles';

export class Relatorio extends Component {
	constructor(props) {
		super(props);
		this.state={
			selectedIndex: 0,
			agendas: this.props.agendasPorUid,
	      	agenda: this.props.agendasPorUid[0].key
	    }

		this.voltar = this.voltar.bind(this);
	}

	voltar() {
		this.props.navigation.goBack();
	}

	gerar() {
		Keyboard.dismiss();
		this.props.getConsolidado(this.props.dataI, this.props.dataF, this.state.agenda);
	}

	selectAgenda(value, index) {
		this.setState({
			selectedIndex: index,
			agenda: value
		})
	}

	render() {
		let { selectedIndex, agendas } = this.state;

		return(
			<View style={styles.screen}>
				<Header
					statusBarProps={{backgroundColor: '#00A6FF', barStyle: 'light-content'}} 
					backgroundColor={'#00A6FF'}
				  	leftComponent={<Icon name='arrow-back' color='#FFFFFF' onPress={() => this.voltar()} />}
				  	centerComponent={{text: 'RELATÒRIO', style: {color: '#FFFFFF'}}}
				/>

				<View style={styles.container}>
					<Card>
						<View>
							<FormLabel labelStyle={{marginBottom:-14}}>Agenda</FormLabel>
					        <Picker 
					          	ref={instance => this.dropDownPicker = instance} 
					          	data={this.state.agendas} 
					          	label={'especialista'} 
					          	value={'key'}
					          	onValueChange={(value, selectedIndex) => this.selectAgenda(value, selectedIndex)}
					          	//renderRow={(rowData) => <Text style={styles.rowStyle}>{rowData.especialista}</Text>} 
					        />
					        <View style={styles.subContainer}>
					          	<TouchableOpacity 
					          		style={styles.dropDownArea} 
					          		onPress={() => this.dropDownPicker.setModalVisible(true)}>
					            	<Text style={styles.dropDownText}>{agendas[selectedIndex].especialista}</Text>
					          	</TouchableOpacity>
					        </View>
					    </View>

						<View style={{flexDirection:'row', justifyContent: 'space-around',}}>
							<View>
								<FormLabel labelStyle={{marginBottom:-10}}>Data inicial</FormLabel>
								<TextInputMask
									//refInput={(ref) => this.myDateText = ref}
									type={'datetime'}
									onChangeText={this.props.changeDataI}
									value={this.props.dataI}
									placeholder={'DD-MM-AAAA'}
									style={{width:110, marginLeft:3, textAlign:'center'}}
									options={{
										format: 'DD-MM-YYYY'
									}}
								/>
							</View>

							<View>
								<FormLabel labelStyle={{marginBottom:-10}}>Data final</FormLabel>
								<TextInputMask
									///refInput={(ref) => this.myDateText = ref}
									type={'datetime'}
									onChangeText={this.props.changeDataF}
									value={this.props.dataF}
									placeholder={'DD-MM-AAAA'}
									style={{width:110, marginLeft:3, textAlign:'center'}}
									options={{
										format: 'DD-MM-YYYY'
									}}
								/>
							</View>
						</View>

						<Button raise title='GERAR' backgroundColor='#00A6FF' onPress={() => this.gerar()} />
					</Card>

					<Card>
						<View style={styles.containerList}>
							<View style={{flexDirection:'row', justifyContent: 'space-around',}}>
								<View>
									<FormLabel>Procedimento</FormLabel>
								</View>

								<View>
									<FormLabel>Quantidade</FormLabel>
								</View>
							</View>
							
							<FlatList
					        	data={this.props.procedAgenda}
					        	renderItem={({item}) => (
									<ListItem
								      	title={item.nome}
								      	badge={{
								      		value: item.qtd, 
								      		textStyle:{color: 'black'}, 
								      		containerStyle:{backgroundColor: 'transparent', marginLeft: -140}}}
								      	rightIcon={<Icon />}
								    />
					        	)}
					      	/>
			            </View>
					</Card>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dataI:state.marc.dataI,
		dataF:state.marc.dataF,
		agendasPorUid:state.agenda.agendasPorUid,
		procedAgenda:state.marc.procedAgenda,
		procedimentos:state.proced.procedimentos,
	};
};

const screenConnect = connect(mapStateToProps, { changeDataI, changeDataF, getConsolidado, getProcedimentos })(Relatorio);

export default screenConnect;