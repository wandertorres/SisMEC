const initialState = {
	nome:'',
	email:'',
	senha:'',
	nova:'',
	confirm:'',
	uid:'',
	connected:null
};

const AuthReducer = (state = initialState, action) => {
	if(action.type == 'changeConnected') {
		return {...state, connected:action.payload.connected, senha:''};
	}

	if(action.type == 'changeNome') {
		return {...state, nome:action.payload.nome};
	}

	if(action.type == 'changeEmail') {
		return {...state, email:action.payload.email};
	}

	if(action.type == 'changeSenha') {
		return {...state, senha:action.payload.senha};
	}

	if(action.type == 'changeNova') {
		return {...state, nova:action.payload.nova};
	}

	if(action.type == 'changeUid') {
		return {...state, uid:action.payload.uid, connected:true};
	}

	if(action.type == 'changeConfirm') {
		return {...state, confirm:action.payload.confirm};
	}

	return state;
};

export default AuthReducer;