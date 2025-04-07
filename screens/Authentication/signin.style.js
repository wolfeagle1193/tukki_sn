/*import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../components/constants/Theme";

/*const styles= StyleSheet.create({

    container:{
        flex:1,
        padding:20,
        backgroundColor:COLORS.white,

    },
    inputWrapper:(borderColor)=>({
       backgroundColor:COLORS.gray,
       borderColor:borderColor , 
       borderWidth:1,
       height:50,
       borderRadius:12,
       flexDirection:"row",
       paddingHorizontal:15,
       alignItems:"center"

    }),
    wrapper :{
        marginBottom :20
    },
    label :{
        fontFamily:"regular",
        fontSize:SIZES.small,
        marginBottom:5,
        marginEnd:5,
        textAlign:"right",


    },
    errorMessage :{
        color: COLORS.red,
        fontSize:SIZES.small,
        fontFamily:"regular",
        marginTop:5,
        marginLeft:5

    }
})

export default styles;*/

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../components/constants/Theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    welcomeText: {
        fontSize: SIZES.xLarge,
        fontFamily: "bold",
        marginTop: 10,
        color: COLORS.black,
    },
    loginText: {
        fontSize: SIZES.medium,
        fontFamily: "regular",
        color: COLORS.gray,
        marginTop: 5,
    },
    inputWrapper: (borderColor) => ({
        backgroundColor: COLORS.gray,
        borderColor: borderColor, 
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    wrapper: {
        marginBottom: 20
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "left",
    },
    errorMessage: {
        color: COLORS.red,
        fontSize: SIZES.small,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5
    },
    forgotPassword: {
        alignSelf: "flex-end",
    },
    forgotPasswordText: {
        color: COLORS.red,
        fontSize: SIZES.small,
        fontFamily: "regular",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.lightgray,
    },
    orText: {
        color: COLORS.gray,
        paddingHorizontal: 10,
        fontSize: SIZES.small,
        fontFamily: "medium",
    },
    socialButtonsContainer: {
        marginVertical: 10,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.lightgray,
        backgroundColor: COLORS.white,
    },
    socialButtonText: {
        fontFamily: "medium",
        fontSize: SIZES.medium,
        color: COLORS.black,
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    noAccountText: {
        color: COLORS.black,
        fontFamily: "regular",
        fontSize: SIZES.medium,
    },
    signupText: {
        color: COLORS.green_accueil,
        fontFamily: "bold",
        fontSize: SIZES.medium,
    }
});

export default styles;