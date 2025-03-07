import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import NetworkingImage from "./NetworkingImage";
import WidthSpacer from "./WidthSpacer";
import Reusable from "./Reusable.style";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import ReusableText from "./ReusableText";
import HeightSpacer from "./HeightSpacer";
import Rating from "./Rating";
import ReusableTextCard from "./ReusableTextCard";



const Container = ({ item, onPress }) => {
  return (
    <View style={styles.container} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <NetworkingImage
          source={item.roomImage}
          width={"100%"}
          height={190}
          radius={12}
        />
      </View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
});
