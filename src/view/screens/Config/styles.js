import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
	screen: {
		flex:1,
		backgroundColor:colors.base,
	},
	container:{
		flex:1,
	},
	containerList:{
		height:195,
		marginTop:-37,
		marginBottom:5
	}
});

export default styles;