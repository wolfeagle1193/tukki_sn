/*import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Reusable from "./Reusable.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT } from "../constants/Theme";
import ReusableText from "./ReusableText";

const Appbar = ({
  color,
  title,
  color1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={Reusable.rowWithSpace("space-between")}>
        <TouchableOpacity style={styles.box(color)}>
          <AntDesign
            name="left"
            size={18}
            style={{ color: "white" }}
            onPress={onPress}
          />
        </TouchableOpacity>
        <ReusableText
          text={title}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <TouchableOpacity style={styles.box1(color1)}>
          <AntDesign
            name={icon}
            size={18}
            style={{ color: "white" }}
            onPress={onPress1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
  }),
  box: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
  box1: (color1) => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
});*/

import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Reusable from "./Reusable.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT } from "../constants/Theme";
import ReusableText from "./ReusableText";

const Appbar = ({
  color,
  title,
  color1,
  icon, // Nom de l'icône ou composant d'icône
  onPress,
  onPress1,
  top,
  left,
  right,
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={Reusable.rowWithSpace("space-between")}>
        <TouchableOpacity style={styles.box(color)}>
          <AntDesign
            name="left"
            size={18}
            style={{ color: "white" }}
            onPress={onPress}
          />
        </TouchableOpacity>
        <ReusableText
          text={title}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <TouchableOpacity style={styles.box1(color1)}>
          {typeof icon === "string" ? (
            <AntDesign name={icon} size={18} style={{ color: "white" }} onPress={onPress1} />
          ) : (
            icon // Si icon est un composant, l'afficher directement
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
    zIndex: 999
  }),
  box: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
  box1: (color1) => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
});
