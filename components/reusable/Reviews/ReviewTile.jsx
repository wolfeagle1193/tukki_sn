import { StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesReviews from "./Review.style";
import NetworkingImage from "../NetworkingImage";
import Reusable from "../Reusable.style";
import WidthSpacer from "../WidthSpacer";
import ReusableText from "../ReusableText";
import { SIZES, COLORS } from "../../constants/Theme";
import Rating from "../Rating";
import DescriptionText from "../DescriptionText";

const ReviewTile = ({ review }) => {
  return (
    <View style={stylesReviews.ReviewBorder}>
      <View style={Reusable.rowWithSpace("space-between")}>
        <View style={Reusable.rowWithSpace("flex-start")}>
          <NetworkingImage
            source={review.user.profile}
            width={54}
            height={54}
            radius={10}
          />
          <WidthSpacer width={20} />
          <View style={{width:"80%"}}>
            <View style={Reusable.rowWithSpace("space-between")}>
              <ReusableText
                text={review.user.username}
                family={"medium"}
                size={SIZES.small + 2}
                color={COLORS.black}
              />
              <WidthSpacer width={"20%"} />
              <View style={Reusable.rowWithSpace("space-between")}>
                <Rating rating={review.rating} />
                <WidthSpacer width={10} />
                <ReusableText
                  text={review.updatedAt}
                  family={"medium"}
                  size={SIZES.small + 2}
                  color={COLORS.black}
                />
              </View>
            </View>
            <DescriptionText text={review.review} lines={2}/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewTile;

const styles = StyleSheet.create({});
