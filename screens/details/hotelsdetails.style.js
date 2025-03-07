import { StyleSheet } from "react-native";
import { COLORS } from "../../components/constants/Theme";
const hoteldetailstyles= StyleSheet.create({
    container:{
        paddingTop:20,
        marginHorizontal:20
    },
    titleContainer:{
        margin:15,
        backgroundColor:COLORS.green_accueil,
        height:120 ,
        position:"absolute",
        top:170,
        left:0,
        right:0,
        borderRadius:20
    },
    
    titleColumn:{
        padding:15

    },
    bottom:{
        paddingHorizontal:30,
        backgroundColor:"#F5F5F5",
        height:90,
        paddingVertical:20
    }

})
export default hoteldetailstyles