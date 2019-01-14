import firebase from './ConnectionDB';

var config = {
		apiKey: "AIzaSyAS9adbyUuINTL1zYMJhJVeSqUTnnrS1Ok",
	    authDomain: "sismec-489d0.firebaseapp.com",
	    databaseURL: "https://sismec-489d0.firebaseio.com",
	    projectId: "sismec-489d0",
	    storageBucket: "sismec-489d0.appspot.com",
	    messagingSenderId: "683132291099"
	};
var firebaseAux = firebase.initializeApp(config, 'FirebaseAux');

// Ação de checagem se há usuário logado
export const checkLogin = () => {
	return(dispatch) => {
		firebase.auth().onAuthStateChanged((user) => {
			// Caso exista usuário logado, o state uid recebe o uid do usuário
			if(user) {
				dispatch({
					type:'changeUid',
					payload: {
						uid:user.uid
					}
				});
			// No caso de não haver usuário logado, o state connected é alterado para false
			}else {
				dispatch({
					type:'changeConnected',
					payload: {
						connected:false
					}
				});
			}
		});
	}
};

export const signUp = (nome, email, senha) => {
	return(dispatch) => {
		firebaseAux.auth().createUserWithEmailAndPassword(email, '123456')
			.then((user) => {
				firebase.database().ref('atendentes').child(user.uid).set({
					nome:nome
				});
			})
			.catch((error) => {
				alert('Erro ' +error.code);
			});

		firebaseAux.auth().signOut();
	}
};

// Ação de logar o usuário
export const signIn = (email, senha) => {
	return(dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, senha)
			.then((user) => {
				let uid = firebase.auth().currentUser.uid;

				dispatch({
					type:'changeUid',
					payload: {
						uid:uid
					}
				});
			})
			.catch((error) => {
				switch(error.code) {
					case 'auth/invalid-email':
						alert('E-mail inválido!');
						break;
					case 'auth/user-disabled':
						alert('Usuário desativado!');
						break;
					case 'auth/user-not-found':
						alert('Usuário não cadastrado!');
						break;
					case 'auth/wrong-password':
						alert('Senha incorreta!');
						break;
				}
			});
	}
};

export const checkPass = (senha) => {
	return(dispatch) => {
		var user = firebase.auth().currentUser;
		var credential = firebase.auth.EmailAuthProvider.credential(user.email, senha);

		user.reauthenticateAndRetrieveDataWithCredential(credential)
			.then(function() {
				dispatch({
					type:'changeConfirm',
					payload: {
						confirm:true
					}
				});
			})
			.catch(function(error) {
				alert('Senha incorreta!');
			});
	}
};

export const altSenha = (senha, novaSenha) => {
	return(dispatch) => {
			var user = firebase.auth().currentUser;
			var credential = firebase.auth.EmailAuthProvider.credential(user.email, senha);

			user.reauthenticateAndRetrieveDataWithCredential(credential)
			.then(function() {
				user.updatePassword(novaSenha).then(function() {
					alert('Senha alterada!')
				}).catch(function(error) {
					alert('Nova senha incorreta!');
				});
			})
			.catch(function(error) {
				alert('Senha atual incorreta!');
			});
	}
};

// Ação de deslogar o usuário
export const signOut = () => {
	firebase.auth().signOut();

	// Após desconectar o usuário, o state connected é alterado para false
	return {
		type:'changeConnected',
		payload:{
			connected:false
		}
	};
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

// Ação de alteração do campo email
export const changeEmail = (email) => {
	return {
		type:'changeEmail',
		payload: {
			email:email
		}
	}
};

// Ação de alteração do campo senha
export const changeSenha = (senha) => {
	return {
		type:'changeSenha',
		payload: {
			senha:senha
		}
	}
};

// Ação de alteração do campo senha
export const changeConfirm = (confirm) => {
	return {
		type:'changeConfirm',
		payload: {
			confirm:confirm
		}
	}
};