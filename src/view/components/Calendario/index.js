import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import { View } from 'react-native';

import locale from './locale';
import { getMarcacoes } from '../../../actions/AgendaActions';
import { altMarcacao } from '../../../actions/MarcActions';

class Calendario extends Component {
    constructor(props) {
        super(props);

        let data = moment();
        this.props.getMarcacoes(this.props.agenda, data.format("DD-M-YYYY"));
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.onPress(false);
    }

    render() {
        return (
            <View>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 90}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#00A6FF'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    highlightDateNumberStyle={{color: 'white'}}
                    highlightDateNameStyle={{color: 'white'}}
                    disabledDateNameStyle={{color: 'black'}}
                    disabledDateNumberStyle={{color: 'black'}}
                    iconContainer={{flex: 0.1}}
                    responsiveSizingOffset={-10}
                    locale={locale}
                    onDateSelected={(data) => {
                        if(this.props.marcacao != null) {
                            //alert(this.props.procedMarc.length);
                            this.props.altMarcacao(this.props.agenda.key, data.format("DD-M-YYYY"), this.props.marcacao, this.props.procedMarc);
                            this.closeModal();
                        }else {
                            this.props.getMarcacoes(this.props.agenda, data.format("DD-M-YYYY"));
                        }
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        procedMarc:state.marc.procedimentos,
    };
};

const screenConnect = connect(mapStateToProps, { getMarcacoes, altMarcacao })(Calendario);

export default screenConnect;