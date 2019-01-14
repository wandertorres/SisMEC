import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
	screen: {
		flex:1,
		backgroundColor:colors.white
	},
	areaHeader: {
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		backgroundColor:colors.primary,
		height:60,
	},
	titleHeader: {
		color:colors.white,
		fontSize:fonts.regular,
		fontWeight:'bold'
	},
	areaBtnHeader: {
		width:40,
		height:40,
		alignItems:'center',
		justifyContent:'center'
	},
	imageBtnHeader: {
		width:20,
		height:20,
	},
	container:{
		flex:1,
		flexDirection:'column',
		margin:metrics.marginLadoContainer,
	},
	areaInput:{
		flex:1,
	},
	areaButton:{
		flex:1,
		justifyContent:'flex-end'
	},
	input:{
        fontSize:fonts.big,
        color:colors.dark,
        padding:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderColor:colors.light,
        margin:2
	},
	areaBtn: {
        height:metrics.heightButton,
        padding:metrics.paddingButton,
        justifyContent:metrics.justifyContentButton,
        alignItems:metrics.alignItemsButton,
        borderRadius:metrics.borderRadiusButton,
        backgroundColor:colors.primary,
        margin:2
    },
    textBtn: {
        fontSize:fonts.big,
        color:colors.white
    },
    areaBtnCancelar:{
    	backgroundColor:colors.white,
    	borderWidth:1,
    	borderColor:colors.primary
    },
    textBtnCancelar:{
    	color:colors.primary
    },
});

export default styles;