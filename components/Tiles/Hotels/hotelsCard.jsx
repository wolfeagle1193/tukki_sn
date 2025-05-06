import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES, COLORS, TEXT } from "../../constants/Theme";
import NetworkingImage from "../../reusable/NetworkingImage";
import HeightSpacer from "../../reusable/HeightSpacer";
import ReusableText from "../../reusable/ReusableText";
import Rating from "../../reusable/Rating";
import Reusable from "../../reusable/Reusable.style";
import ReusableTextCard from '../../reusable/ReusableTextCard'

const HotelsCard = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      <View >
        <View style={styles.imageContainer}>
          <NetworkingImage
            source={item.placeImage}
            width={"90%"}
            height={"100%"}
            radius={18}
          />
        </View>
        <HeightSpacer height={0} />
        <View style={{ padding: 10 }}>
          <ReusableText
            text={item.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={4} />

          <ReusableText
            text={item.adresse}
            family={"medium"}
            size={SIZES.xSmall}
            color={COLORS.lightgray}
          />
          <HeightSpacer height={4} />
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

export default HotelsCard;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: SIZES.width / 2.39,
    height: 195,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    margin: margin,
  }),
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    height: 100,
  },
});
