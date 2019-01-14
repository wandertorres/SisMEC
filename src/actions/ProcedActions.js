import firebase from './ConnectionDB';

// Ação que retorna todas as agendas de um atendente
export const getProcedimentos = (agendaId) => {
	return(dispatch) => {
		let agendas = firebase.database().ref('agendas');
		
		agendas.child(agendaId).child('procedimentos').on('value', (snapshot) => {
			let procedimentos = [];

			snapshot.forEach((childItem) => {
				procedimentos.push({
					key:childItem.key,
					id:childItem.val().id,
					nome:childItem.val().nome,
				});
			});

			dispatch({
				type:'setProcedimentos',
				payload:{
					procedimentos:procedimentos,
					//especialista:especialista
				}
			});
		});
	};
};

// Ação que cadastra um novo procedimento
export const addProcedimento = (procedimento, especialista) => {
	return(dispatch) => {
		if(procedimento.length > 0) {
			let procedimentos = firebase.database().ref('agendas').child(especialista.key).child('procedimentos');
			let key = procedimentos.push().key;

			procedimentos.child(key).set({
				id:key,
				nome:procedimento
			});
		}else {
			alert('Digite o nome do procedimento');
		}
	};
};

export const delProcedimento = (procedId, agendaId) => {
	return(dispatch) => {
		firebase.database().ref('agendas').child(agendaId).child('procedimentos').child(procedId).remove();
	};
}

// Ação de alteração do campo procedimento
export const changeProced = (procedimento) => {
	return {
		type:'changeProced',
		payload: {
			procedimento:procedimento
		}
	}
};