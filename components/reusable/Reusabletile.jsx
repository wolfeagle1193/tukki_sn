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

const Reusabletile = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={Reusable.rowWithSpace("flex-start")}>
        <NetworkingImage
          source={item.placeImage}
          width={80}
          height={80}
          radius={12}
        />
        <WidthSpacer width={15} />
        <View>
        <ReusableText
            text={item.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />

          <ReusableText
            text={item.adresse}
            family={"medium"}
            size={SIZES.xSmall}
            color={COLORS.lightgray}
          />
          <HeightSpacer height={8} />
          <View style={Reusable.rowWithSpace("flex-start")}>
            <Rating rating={item.rating} />
            <ReusableText
              text={` (${item.review}) `}
              family={"medium"}
              size={SIZES.small}
              color={COLORS.black}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Reusabletile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
});
