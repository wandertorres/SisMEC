const initialState = {

};

const AtendReducer = (state = initialState, action) => {
	if(action.type == 'setAgendasVinc') {
		return { ...state, agendas:action.payload.agendas}
	}

	if(action.type == 'setAtendentes') {
		return { ...state, atendentes:action.payload.atendentes}
	}

	if(action.type == 'setAtendente') {
		return { ...state, atendente:action.payload.atendente}
	}

	if(action.type == 'setGestor') {
		return { ...state, gestor:action.payload.gestor}
	}
	
	if(action.type == 'changeAtendente') {
		return {...state, atendente:action.payload.atendente};
	}

	return state;
};

export default AtendReducer;