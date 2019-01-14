import firebase from './ConnectionDB';

// Ação que retorna todas os atendentes
export const getAtendentes = () => {
	return(dispatch) => {
		firebase.database().ref('atendentes').on('value', (snapshot) => {
			let atendentes = [];

			snapshot.forEach((atendente) => {
				atendentes.push({
					key:atendente.key,
					nome:atendente.val().nome,
				});
			});

			dispatch({
				type:'setAtendentes',
				payload:{
					atendentes:atendentes
				}
			});
		});
	};
};

// Ação que retorna um atendente pelo id
export const getGestor = (atendenteId) => {
	return(dispatch) => {
		firebase.database().ref('atendentes').child(atendenteId).once('value').then((snapshot) => {
			dispatch({
				type:'setGestor',
				payload:{
					gestor:snapshot.val().gestor
				}
			});
		});
	};
};

// Ação que cadastra um novo atendente
export const addAtendente = (nome, email) => {
	return(dispatch) => {
		firebase.auth().signOut();
		firebase.auth().createUserWithEmailAndPassword(
			email, 
			'123456'
		).catch((error) => {
			alert(error.code);
		});

		var user = firebase.auth().currentUser;
		firebase.database().ref('atendentes').child(user.uid).set({
			nome:nome
		});
	};
};

export const editAtendente = (atendenteId, nome, agendasVinc) => {
	return(dispatch) => {
		let agendas = [];

		agendasVinc.map((item) => {
			agendas.push({
				id:item.id,
				especialista:item.especialista,
				especialidade:item.especialidade
			});
		});

		let atendente = firebase.database().ref('atendentes');

		atendente.child(atendenteId).set({
			nome:nome,
			agendas:agendas
		});
	};
};

export const getAgendasVinc = (atendenteId) => {
	return(dispatch) => {
		let atendente = firebase.database().ref('atendentes').child(atendenteId);

		atendente.child('agendas').once('value').then((snapshot) => {
			let agendas = [];

			snapshot.forEach((agenda) => {
				agendas.push({
					key:agenda.key,
					id:agenda.val().id,
					especialista:agenda.val().especialista,
					especialidade:agenda.val().especialidade
				});
			});

			dispatch({
				type:'setAgendasVinc',
				payload:{
					agendas:agendas,
				}
			});
		});
	};
};

// Ação que remove um atendente
export const delAtendente = (atendenteId) => {
	return(dispatch) => {
		firebase.database().ref('atendentes').child(atendenteId).remove();
	};
};

// Ação de alteração do campo especialidade
export const changeAtendente = (atendente) => {
	return {
		type:'changeAtendente',
		payload: {
			atendente:atendente
		}
	}
};