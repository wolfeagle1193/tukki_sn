import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, TEXT } from "../constants/Theme";
import ReusableText from "./ReusableText";

const FavoritesIcon = ({ title, onPress, top, right }) => {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <View style={styles.overlay(top, right)}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <MaterialIcons
          name={isLoved ? "favorite" : "favorite-border"}
          size={24}
          color={isLoved ? COLORS.pink : COLORS.white}
          onPress={() => setIsLoved(!isLoved)}
        />
      </TouchableOpacity>
      <ReusableText
        text={title}
        family={"medium"}
        size={TEXT.medium}
        color={COLORS.black}
      />
    </View>
  );
};

export default FavoritesIcon;

const styles = StyleSheet.create({
  overlay: (top, right) => ({
    position: "absolute",
    top: top,
    right: right,
    justifyContent: "center",
    alignItems: "flex-end",
  }),
  iconContainer: {
    backgroundColor: COLORS.transparent, // Change as needed
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});