import { StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReusableText from "./ReusableText";
import { TEXT, COLORS } from "../constants/Theme";
import Reusable from "./Reusable.style.js";
import WidthSpacer from "./WidthSpacer.jsx";
import { View } from "react-native";

const Rating = ({ rating,size ,width}) => {
  return (
    <View style={Reusable.rowWithSpace('flex-start')}>
      <MaterialCommunityIcons name="star" size={15} color={'#C6BF1C'} />
      <WidthSpacer width={width || 5}/>
      <ReusableText
        text={rating}
        family={"medium"}
        size={size  || TEXT.xsmall   }
        color={'#C6BF1C'}
        align={"center"}
        style={styles.textOverlay}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  textOverlay :{marginRight:5}}

);
