import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../components/constants/Theme";
const stylesearch = StyleSheet.create({
    searchContainer: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:SIZES.small,
        borderColor:COLORS.green_button_back,
        borderWidth:1,
        borderRadius:SIZES.medium,
        marginVertical:SIZES.medium,
        height:50
    },
    Wrapper:{
        flex:1,
        marginRight:SIZES.medium,
        borderRadius:SIZES.small,
       
    },
    input :{
        fontFamily:'regular',
        width:"100%",
        height:"100%",
        paddingHorizontal:70
    },
    searchBtn :{
      width:50,
      height:'100%',
      borderRadius:SIZES.small,
      justifyContent:'center' ,
      alignItems:'center' ,
      backgroundColor:COLORS.green_button_back
    },
    searchImage :{
        resizeMode:"contain",
        width:"100%",
        height:SIZES.height/2.2,
        paddingHorizontal:20
    },
    tile:{
        marginHorizontal:10,
        marginBottom:12

    }


});
export default stylesearch