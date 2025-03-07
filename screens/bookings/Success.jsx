import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AssetImage,
  HeightSpacer,
  NetworkingImage,
  ReusableBtn,
  ReusableText,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../components/constants/Theme";
import Reusabletile from "../../components/reusable/Reusabletile";

const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");

const Success = ({ navigation }) => {
  const hotel = {
    _id: "450a1a1a56un904523aprf211m",
    region_id: "23er6749345dfd98vger34",
    title: "Archotel",
    placeImage: Archotel,
    rating: 4.9,
    review: "1204 Avis",
    adresse: "Boulevard Martin Luther King , Dakar",
  };

  return (
    <View>
      <View style={{ marginTop: "25%" }}>
        <AssetImage
          source={require("../../assets/images/iconesdeco/checked.png")}
          width={"100%"}
          height={200}
          resizeMode={"contain"}
        />
        <HeightSpacer height={25} />
        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={"Réservation validée"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <ReusableText
            text={"Ci-dessous les détails de votre réservation"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
        </View>
        <View style={{ margin: 20 }}>
          <ReusableText
            text={"Caractéristiques de la chambre"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <Reusabletile item={hotel} />
          <HeightSpacer height={40} />
          <ReusableBtn
            onPress={() => navigation.navigate("Bottom")}
            btnText={" Votre réservation est terminée"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green_button_back}
            borderColor={COLORS.green_button_back}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
