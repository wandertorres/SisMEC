const initialState = {
	especialista:'',
	especialidade:'',
	cpf:'',
	nome:'',
	endereco:'',
	contato:'',
	observacao:''
};

const ClassReducer = (state = initialState, action) => {
	if(action.type == 'setAgendas') {
		return { ...state, agendas:action.payload.agendas}
	}

	if(action.type == 'setAgendasPorUid') {
		return { ...state, agendasPorUid:action.payload.agendasPorUid}
	}

	if(action.type == 'setMarcacoes') {
		return { ...state, marcacoes:action.payload.marcacoes, especialidade:action.payload.especialidade, data:action.payload.data, count:action.payload.count}
	}

	if(action.type == 'setMarcacao') {
		return {...state, nome:action.payload.marcacao.paciente, endereco:action.payload.marcacao.endereco, contato:action.payload.marcacao.contato, observacao:action.payload.marcacao.observacao}
	}

	if(action.type == 'changeEspecialista') {
		return {...state, especialista:action.payload.especialista};
	}

	if(action.type == 'changeEspecialidade') {
		return {...state, especialidade:action.payload.especialidade};
	}

	if(action.type == 'changeCpf') {
		return {...state, cpf:action.payload.cpf};
	}

	if(action.type == 'changeNome') {
		return {...state, nome:action.payload.nome};
	}

	if(action.type == 'changeEndereco') {
		return {...state, endereco:action.payload.endereco};
	}

	if(action.type == 'changeContato') {
		return {...state, contato:action.payload.contato};
	}

	if(action.type == 'changeObservacao') {
		return {...state, observacao:action.payload.observacao};
	}

	if(action.type == 'changeAtivo') {
		return {...state, ativo:action.payload.ativo};
	}

	return state;
};

export default ClassReducer;