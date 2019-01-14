const initialState = {
	dataI:'',
	dataF:''
};

const MarcReducer = (state = initialState, action) => {
	if(action.type == 'setProcedMarcados') {
		return {...state, procedimentos:action.payload.procedimentos}
	}

	if(action.type == 'changeDataI') {
		return {...state, dataI:action.payload.dataI}
	}

	if(action.type == 'changeDataF') {
		return {...state, dataF:action.payload.dataF}
	}

	if(action.type == 'setConsolidado') {
		return {...state, procedAgenda:action.payload.procedAgenda}
	}

	return state;
};

export default MarcReducer;