import firebase from './ConnectionDB';
import moment from 'moment';

// Ação de checagem se há usuário logado
export const getProcedMarcados = (agendaId, data, marcacaoId) => {
	return(dispatch) => {
		let marcacao = firebase.database().ref('agendas').child(agendaId).child(data).child(marcacaoId);

		marcacao.child('procedimentos').once('value').then((snapshot) => {
			let procedimentos = [];

			snapshot.forEach((procedimento) => {
				procedimentos.push({
					key:procedimento.key,
					id:procedimento.val().id,
					nome:procedimento.val().nome
				});
			});

			dispatch({
				type:'setProcedMarcados',
				payload:{
					procedimentos:procedimentos,
				}
			});
		});
	};
};

export const editMarcacao = (marcacao, agenda, nome, endereco, contato, observacao, proceds) => {
	return(dispatch) => {
		//alert(marcacao.data+'-'+agenda.key+'-'+nome+'-'+endereco+'-'+contato);
		let procedimentos = [];

		proceds.map((item) => {
			procedimentos.push({
				id:item.id,
				nome:item.nome
			});
		});

		let marcacoes = firebase.database().ref('agendas').child(agenda.key).child(marcacao.data);

		marcacoes.child(marcacao.key).set({
			atendido:false,
			nome:nome,
			endereco:endereco,
			contato:contato,
			observacao:observacao,
			procedimentos:procedimentos
		});
	};
};

export const altMarcacao = (agendaId, data, marcacao, proceds) => {
	return(dispatch) => {
		let procedimentos = [];

		proceds.map((item) => {
			procedimentos.push({
				id:item.id,
				nome:item.nome
			});
		});

		let marcacoes = firebase.database().ref('agendas').child(agendaId).child(data);

		marcacoes.child(marcacoes.push().key).set({
			atendido:marcacao.atendido,
			contato:marcacao.contato,
			endereco:marcacao.endereco,
			observacao:marcacao.observacao,
			nome:marcacao.paciente,
			procedimentos:procedimentos
		});

		firebase.database().ref('agendas').child(agendaId).child(marcacao.data).child(marcacao.key).remove();
	};
};

// Ação de checagem se há usuário logado
export const delMarcacao = (agendaId, data, marcacaoId) => {
	return(dispatch) => {
		firebase.database().ref('agendas').child(agendaId).child(data).child(marcacaoId).remove();
	};
};

//
export const getConsolidado = (dataI, dataF, agendaKey) => {
	return(dispatch) => {
		let t = 'DD-M-YYYY';
		let i = moment(dataI, t);
		let f = moment(dataF, t);

		if(i.isValid() && f.isValid()) {
			if(moment(i).isAfter(f))
				alert('A data inicial não pode ser posterior a data final.')
			else {
				firebase.database().ref('consolidado').child(agendaKey).once('value').then((c) => {
					let procedimentos = [];
					let procedAgenda = [];

					c.forEach((d) => {
						if(moment(d.key, t).isBetween(i, f) || moment(d.key, t).isSame(i) || moment(d.key, t).isSame(f)) {
							d.forEach((p) => {
								procedimentos.push({
									key:p.key,
									qtd:p.val().qtd
								});
							});
						}
					});

					let consolidado = procedimentos.reduce((acc, currValue) => {
						let proced = currValue.key
						let somaProced = acc[proced] ? acc[proced] + currValue.qtd : currValue.qtd;

						return {
							...acc,
							[proced]: somaProced,
						};
					}, {});

					let agendas = firebase.database().ref('agendas');
		
					agendas.child(agendaKey).child('procedimentos').on('value', (snapshot) => {
						snapshot.forEach((childItem) => {
							procedAgenda.push({
								nome:childItem.val().nome,
								qtd:consolidado[childItem.val().nome] ? consolidado[childItem.val().nome] : 0
							});
						});

						dispatch({
							type:'setConsolidado',
							payload:{
								procedAgenda:procedAgenda,
							}
						});
					});
				});
			}
		}else {
			alert('Data inválida!');
		}
	};
};

// Ação de alteração do campo dataI
export const changeDataI = (dataI) => {
	return {
		type:'changeDataI',
		payload: {
			dataI:dataI
		}
	}
};

// Ação de alteração do campo dataF
export const changeDataF = (dataF) => {
	return {
		type:'changeDataF',
		payload: {
			dataF:dataF
		}
	}
};