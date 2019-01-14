import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AgendaReducer from './AgendaReducer';
import ProcedReducer from './ProcedReducer';
import AtendReducer from './AtendReducer';
import MarcReducer from './MarcReducer';

const reducers = combineReducers({
	auth:AuthReducer,
	agenda:AgendaReducer,
	proced:ProcedReducer,
	atend:AtendReducer,
	marc:MarcReducer
});

export default reducers;