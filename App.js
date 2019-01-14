import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import Preload from './src/view/screens/Preload';
import SignIn from './src/view/screens/SignIn';
import SignUp from './src/view/screens/SignUp';
import AgendaAdd from './src/view/screens/AgendaAdd';
import AgendaEdit from './src/view/screens/AgendaEdit';
import AgendaInf from './src/view/screens/AgendaInf';
import AgendaList from './src/view/screens/AgendaList';
import AtendAdd from './src/view/screens/AtendAdd';
import AtendEdit from './src/view/screens/AtendEdit';
import AtendInf from './src/view/screens/AtendInf';
import MarcAdd from './src/view/screens/MarcAdd';
import MarcEdit from './src/view/screens/MarcEdit';
import MarcInf from './src/view/screens/MarcInf';
import MarcList from './src/view/screens/MarcList';
import Config from './src/view/screens/Config';
import Relatorio from './src/view/screens/Relatorio';

console.disableYellowBox = true; // Desabilita mensagens de warnings na tela do app

let store = createStore(reducers, applyMiddleware(ReduxThunk));

const Stack = StackNavigator({
    Preload: {
        screen:Preload
    },
    SignIn: {
        screen:SignIn
    },
    SignUp: {
        screen:SignUp
    },
    AgendaAdd: {
        screen:AgendaAdd
    },
    AgendaEdit: {
        screen:AgendaEdit
    },
    AgendaInf: {
        screen:AgendaInf
    },
    AgendaList: {
        screen:AgendaList
    },
    AtendAdd: {
        screen:AtendAdd
    },
    AtendEdit: {
        screen:AtendEdit
    },
    AtendInf: {
        screen:AtendInf
    },
    MarcAdd: {
        screen:MarcAdd
    },
    MarcEdit: {
        screen:MarcEdit
    },
    MarcInf: {
        screen:MarcInf
    },
    MarcList: {
        screen:MarcList
    },
    Config: {
        screen:Config
    },
    Relatorio: {
        screen:Relatorio
    },
}, {
    navigationOptions:{
        header:null
    }
});

const App = () => (
    <Provider store={store}>
        <Stack />
    </Provider>
); 

export default App;