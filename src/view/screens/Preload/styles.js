import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
	screen: {
		flex:1,
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:colors.white
	},
	logo: {
		alignItems:'center',
	},
});

export default styles;