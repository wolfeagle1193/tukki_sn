import { StyleSheet, View } from "react-native";
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

const Failed = ({navigation}) => {
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
      <View style={{ marginTop: "40%" }}>
        <AssetImage
          source={require("../../assets/images/iconesdeco/failed.png")}
          width={"100%"}
          height={200}
          resizeMode={"contain"}
        />
        <HeightSpacer height={40} />
        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={"Échec de la réservation"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <ReusableText
            text={"Ci-dessous les détails de votre réservation"}
            family={"regular"}
            size={SIZES.regular}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
        </View>
        <View style={{ margin: 20 }}>
          <ReusableText
            text={"Détails de la réservation"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <Reusabletile item={hotel} />
          <HeightSpacer height={40} />
          <ReusableBtn
              onPress={() => navigation.goBack()}
              btnText={"Réessayer"}
              width={(SIZES.width - 50) }
              backgroundColor={COLORS.red}
              borderColor={COLORS.red}
              borderWidth={0}
              textColor={COLORS.white}
            />
        </View>
      </View>
    </View>
  );
};

export default Failed;

const styles = StyleSheet.create({});
