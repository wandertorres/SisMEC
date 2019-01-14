import firebase from './ConnectionDB';

// Ação que retorna todas as agendas ou as agendas por uid
export const getAgendas = (uid) => {
	let ref;

	if(uid)
		ref = firebase.database().ref('atendentes').child(uid).child('agendas');
	else
		ref = firebase.database().ref('agendas');

	return(dispatch) => {
		ref.on('value', (snapshot) => {
			let agendas = [];

			snapshot.forEach((agenda) => {
				agendas.push({
					key:agenda.val().id,
					id:agenda.val().id,
					especialista:agenda.val().especialista,
					especialidade:agenda.val().especialidade,
				});
			});

			if(uid)
				dispatch({
					type:'setAgendasPorUid',
					payload:{
						agendasPorUid:agendas
					}
				});
			else
				dispatch({
					type:'setAgendas',
					payload:{
						agendas:agendas
					}
				});
		});
	};
};

// Ação que retorna uma agenda
export const getMarcacoes = (agenda, data) => {
	return(dispatch) => {
		let datas = firebase.database().ref('agendas').child(agenda.id);

		datas.child(data).on('value', (snapshot) => {
			let marcacoes = [];
			let count = 0;

			snapshot.forEach((marcacao) => {
				count++;
				let a = 'Não atendido';

				if(marcacao.val().atendido)
					a = 'Atendido';
				
				marcacoes.push({
					key:marcacao.key,
					paciente:marcacao.val().nome,
					endereco:marcacao.val().endereco,
					contato:marcacao.val().contato,
					observacao:marcacao.val().observacao,
					data:data,
					atendido:a,
				});
			});

			dispatch({
				type:'setMarcacoes',
				payload:{
					marcacoes:marcacoes,
					data:data,
					count:count,
				}
			});
		});
	};
};

// Ação de checagem se há usuário logado
export const getMarcacao = (marcacao) => {
	return {
		type:'setMarcacao',
		payload:{
			marcacao:marcacao
		}
	}
};

// Ação que cadastra uma nova marcaçao
export const addMarc = (data, agendaId, cpf, nome, endereco, contato, observacao, proceds) => {
	return(dispatch) => {
		//if(especialista.lenght > 0 && especialidade.lenght > 0) {
			let c = firebase.database().ref('consolidado');
			let procedimentos = [];

			proceds.map((item) => {
				c.child(agendaId).child(data).child(item.nome).child('qtd').once('value').then((count) => {
					let registros = c.child(agendaId).child(data);

					registros.child(item.nome).set({
						qtd:count.val() + 1
					});
				});

				procedimentos.push({
					id:item.id,
					nome:item.nome
				});
			});

			let marcacoes = firebase.database().ref('agendas').child(agendaId).child(data);

			marcacoes.child(marcacoes.push().key).set({
				atendido:false,
				cpf:cpf,
				nome:nome,
				endereco:endereco,
				contato:contato,
				observacao:observacao,
				procedimentos:procedimentos
			});
		//}else {
		//	alert('Digite o nome do procedimento.');
		//}
	};
};

// Ação que cadastra uma nova agenda
export const addAgenda = (especialista, especialidade) => {
	return(dispatch) => {
		//if(especialista.lenght > 0 && especialidade.lenght > 0) {
			let agendas = firebase.database().ref('agendas');
			let key = agendas.push().key;

			agendas.child(key).set({
				ativa:true,
				id:key,
				especialista:especialista,
				especialidade:especialidade
			});
		//}else {
		//	alert('Digite o nome do procedimento.');
		//}
	};
};

export const editAgenda = (agendaId, especialista, especialidade) => {
	return(dispatch) => {
		let agendas = firebase.database().ref('agendas');

		agendas.child(agendaId).child('especialidade').set(especialidade);
		agendas.child(agendaId).child('especialista').set(especialista);

		firebase.database().ref('atendentes').once('value').then((snapshot) => {
			snapshot.forEach((atendente) => {
				firebase.database().ref('atendentes').child(atendente.key).child('agendas').once('value').then((snap) => {
					snap.forEach((agenda) => {
						if(agenda.val().id == agendaId) {
							let ref = firebase.database().ref('atendentes').child(atendente.key).child('agendas').child(agenda.key);
							ref.child('especialidade').set(especialidade);
							ref.child('especialista').set(especialista);
							ref.child('id').set(atendente.id);
						}
					});
				});
			});
		});
	};
};

// Ação que remove uma agenda
export const delAgenda = (agendaId) => {
	return(dispatch) => {
		firebase.database().ref('atendentes').once('value').then((snapshot) => {
			snapshot.forEach((atendente) => {
				firebase.database().ref('atendentes').child(atendente.key).child('agendas').once('value').then((snap) => {
					snap.forEach((agenda) => {
						if(agenda.val().id == agendaId) {
							firebase.database().ref('atendentes').child(atendente.key).child('agendas').child(agenda.key).remove();
						}
					});
				});
			});
		});

		firebase.database().ref('agendas').child(agendaId).remove();
	};
};

export const changeAtivo = (agenda, atendente) => {
	return(dispatch) => {
		let agendas = firebase.database().ref('atendentes').child(atendente).child('especialistas');

		if(agenda.ativo) {
			agendas.child(agenda.key).set({
				ativo:false,
				nome:agenda.especialista,
				especialidade:agenda.especialidade
			});
		}else {
			agendas.child(agenda.key).set({
				ativo:true,
				nome:agenda.especialista,
				especialidade:agenda.especialidade
			});
		}
	};
};

// Ação de alteração do campo especialista
export const changeEspecialista = (especialista) => {
	return {
		type:'changeEspecialista',
		payload: {
			especialista:especialista
		}
	}
};

// Ação de alteração do campo especialidade
export const changeEspecialidade = (especialidade) => {
	return {
		type:'changeEspecialidade',
		payload: {
			especialidade:especialidade
		}
	}
};

// Ação de alteração do campo cpf
export const changeCpf = (cpf) => {
	return {
		type:'changeCpf',
		payload: {
			cpf:cpf
		}
	}
};

// Ação de alteração do campo nome
export const changeNome = (nome) => {
	return {
		type:'changeNome',
		payload: {
			nome:nome
		}
	}
};

// Ação de alteração do campo endereco
export const changeEndereco = (endereco) => {
	return {
		type:'changeEndereco',
		payload: {
			endereco:endereco
		}
	}
};

// Ação de alteração do campo contato
export const changeContato = (contato) => {
	return {
		type:'changeContato',
		payload: {
			contato:contato
		}
	}
};

// Ação de alteração do campo observação
export const changeObservacao = (observacao) => {
	return {
		type:'changeObservacao',
		payload: {
			observacao:observacao
		}
	}
};