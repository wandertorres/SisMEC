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
		height:315,
		marginLeft:20,
		marginRight:20,
		marginBottom:20,
	},
	plus: {
		marginTop:-68,		
		justifyContent:'flex-end',
		alignItems:'flex-end',
	}
});

export default styles;