import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
	screen:{
		flex:1,
		backgroundColor:colors.white
	},
	container: {
		flex:1,
		marginTop:-22
	},
	plus: {
		marginTop:-78,
		margin:10,
		justifyContent:'flex-end',
		alignItems:'flex-end',
	},
    calendar: {
		justifyContent:'flex-end'
	},
});

export default styles;