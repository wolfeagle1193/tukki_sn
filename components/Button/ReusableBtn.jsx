import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/Theme'

const ReusableBtn = ({onPress,btnText,width,backgroundColor,borderWidth,borderColor,textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyles(width,backgroundColor,borderWidth,borderColor)}>
   <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default ReusableBtn

const styles = StyleSheet.create({
     btnText :(textColor)=>({
        fontFamily:"medium",
        fontSize :SIZES.medium,
        color :textColor,

     }),
     btnStyles:(width,backgroundColor,borderWidth,borderColor) => ({
        width :width,
        backgroundColor:backgroundColor,
        borderWidth : borderWidth ,
        borderColor :borderColor,
        borderRadius :SIZES.small,
        height : 45,
        alignItems:"center",
        justifyContent:"center" ,
    


     })

     

})