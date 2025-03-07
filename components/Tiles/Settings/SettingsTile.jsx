/*import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Reusable from "../../reusable/Reusable.style";
import { COLORS, TEXT } from "../../constants/Theme";
import ReusableText from "../../reusable/ReusableText";
import WidthSpacer from "../../reusable/WidthSpacer";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

const SettingsTile = ({ onPress, title, title1 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Reusable.rowWithSpace("space-between"), styles.container]}
    >
      <ReusableText
        text={title}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
      />
      {title === "langue" ? (
        <View style={Reusable.rowWithSpace("flex-start")}>
          <Image
            source={ require("../../../assets/images/iconesdeco/search.png")}
            style={styles.image}
          />
          <WidthSpacer width={5} />
          <ReusableText
            text={"Francais"}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.black}
          />
          <WidthSpacer width={5} />
          <AntDesign name="right" size={20} color={COLORS.black} />
        </View>
      ) : (
        <View style={Reusable.rowWithSpace("flex-start")}>
          <ReusableText
            text={title1}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.black}
          />
          <WidthSpacer width={5} />
          <AntDesign name="right" size={20} color={COLORS.black} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingsTile;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray,
    paddingVertical: 15,
  },
  image: {
    width: 40,
    height: 30,
    ResizeMode: "contain",
  },
});*/
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Reusable from "../../reusable/Reusable.style";
import { COLORS, TEXT } from "../../constants/Theme";
import ReusableText from "../../reusable/ReusableText";
import WidthSpacer from "../../reusable/WidthSpacer";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

const SettingsTile = ({ onPress, title, title1 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Reusable.rowWithSpace("space-between"), styles.container]}
    >
      <ReusableText
        text={title}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
      />
      {title === "Langue" ? (
        <View style={Reusable.rowWithSpace("flex-start")}>
          <Image
            source={require("../../../assets/images/iconesdeco/france.png")}
            style={styles.image}
          />
          <WidthSpacer width={5} />
          <ReusableText
            text={"Francais"}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.lightgray}
          />
          <WidthSpacer width={5} />
          <AntDesign name="right" size={20} color={COLORS.black} />
        </View>
      ) : (
        <View style={Reusable.rowWithSpace("flex-start")}>
          <ReusableText
            text={title1}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.lightgray}
          />
          <WidthSpacer width={5} />
          <AntDesign name="right" size={20} color={COLORS.black} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingsTile;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray,
    paddingVertical: 15,
  },
  image: {
    width: 40,
    height: 30,
    resizeMode: "contain", // Correction ici
  },
});
