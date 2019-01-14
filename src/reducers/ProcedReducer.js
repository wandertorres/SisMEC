const initialState = {
	procedimento:'',
};

const ProcedReducer = (state = initialState, action) => {
	if(action.type == 'setProcedimentos') {
		return { ...state, procedimentos:action.payload.procedimentos}
	}

	if(action.type == 'changeProced') {
		return {...state, procedimento:action.payload.procedimento};
	}

	return state;
};

export default ProcedReducer;