import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
	screen: {
		flex:1,
		backgroundColor:colors.base
	},
	container:{
		flex:1,
		flexDirection:'column',
	},
	containerList:{
		height:400,
		marginLeft:10,
		marginRight:10,
		marginBottom:20,
	},
});

export default styles;