import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../components/constants/Theme";
import {
  Appbar,
  HeightSpacer,
  ReusableText,
  SettingsTile,
} from "../../components";

const Settings = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ height: 120 }}>
        <Appbar
          top={50}
          left={20}
          right={20}
          color={COLORS.green_accueil}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <ReusableText
          text={"Parametres de compte"}
          family={"regular"}
          size={SIZES.xlarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <SettingsTile title={"Langue"} />
        <HeightSpacer height={3} />
        <SettingsTile title={"Pays"} title1={"SENEGAL"} />
        <HeightSpacer height={3} />
        <SettingsTile title={"Devise"} title1={"FCFA"} />

        <HeightSpacer height={40} />
        <ReusableText
          text={"Assistance"}
          family={"regular"}
          size={SIZES.xlarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <SettingsTile title={"Besoin d'aide ?"} title1={""} />
        <HeightSpacer height={3} />
        <SettingsTile title={"Donnez votre avis"} title1={""} />
        <HeightSpacer height={40} />
        <ReusableText
          text={"Mentions légales"}
          family={"regular"}
          size={SIZES.xlarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <SettingsTile title={"Conditions d'utilisation"} title1={""} />
        <HeightSpacer height={3} />
        <SettingsTile title={"Politique de Confidentialite"} title1={""} />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
