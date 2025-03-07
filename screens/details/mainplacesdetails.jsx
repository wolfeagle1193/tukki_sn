import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, TEXT } from "../../components/constants/Theme";

import {
  NetworkingImage,
  Appbar,
  Popularlist,
  DescriptionText,
  ReusableBtn,
  ReusableText,
  HeightSpacer,
  Services,
  Media,
} from "../../components/index";

import { Feather } from "@expo/vector-icons";
import Reusable from "../../components/reusable/Reusable.style";

const goree = require("../../assets/images/incontournables/gore.jpg");
const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");

const Mainplacesdetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params; // Si `item` est utilisé, sinon, vous pouvez le retirer.

  const tresor = {
    _id: "1",
    title: "Ile de Gorée", // Ajout d'un titre pour la région
    description:
      "L'île de Gorée, au large de Dakar, est un site emblématique de la mémoire de la traite des esclaves. Classée au patrimoine mondial de l'UNESCO, elle charme les visiteurs avec ses maisons colorées et ses rues pavées. La Maison des Esclaves témoigne d'un passé poignant, tandis que ses plages paisibles offrent un havre de paix. Gorée est aussi un lieu vibrant de culture sénégalaise, avec des festivals et des artisans locaux. Une visite à Gorée, c'est plonger dans l'histoire tout en savourant la beauté de l'océan.",

    imageUrl: goree,
    popular: [
      {
        _id: "10",
        title: "Village des arts",
        placeImage: artsvillage,
        rating: 4.7,
        review: "84329 Avis",
        location: "Baie de Dakar",
      },
      {
        _id: "11",
        title: "Mosquee de la divinite",
        placeImage: divinityMosquee,
        rating: 4.7,
        review: "2090 avis",
        location: "au large de Dakar",
      },
      {
        _id: "12",
        title: "Ile de Ngor",
        placeImage: ngorIsle,
        rating: 4.7,
        review: "7129 avis",
        location: "au large de Dakar",
      },
      {
        _id: "13",
        title: "Monument de la Renaissance",
        placeImage: RenaissancePlace,
        rating: 4.7,
        review: "12090 avis",
        location: "au large de Dakar",
      },
      {
        _id: "14",
        title: "Phare des Mamelles",
        placeImage: phareMamellesplace,
        rating: 4.7,
        review: "1209 avis",
        location: "au large de Dakar",
      },
    ],
    location: "Sud-Ouest du Sénégal",
  };

  return (
    <ScrollView backgroundColor={"#ffffff"}>
      <View>
        <NetworkingImage
          source={tresor.imageUrl}
          width={"100%"}
          height={450}
          radius={20}
        />

        <Appbar
          top={55}
          left={20}
          right={20}
          title={tresor.title} // Utilisation du titre de la région
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
        />
      </View>
      <View style={styles.description}>
        <ReusableText
          text={tresor.location}
          family={"medium"}
          size={TEXT.xlarge}
          color={COLORS.green_accueil}
          align={"left"}
        />
        <DescriptionText text={tresor.description} lines={15} />
        <View style={{ alignContent: "center" }}>
          <HeightSpacer height={10} />
          <View style={Reusable.rowWithSpace("space-between")}>
            <ReusableText
              text={"Planifier votre voyage"}
              family={"medium"}
              size={TEXT.xlarge}
              color={COLORS.green_accueil}
              align={"center"}
            />
          </View>
          <HeightSpacer height={15} />
          <Services />

          <HeightSpacer height={15} />
          <View style={{ alignContent: "center" }}>
            <HeightSpacer height={20} />
            <View style={Reusable.rowWithSpace("space-between")}>
              <ReusableText
                text={"Gorée en Images"}
                family={"medium"}
                size={TEXT.xlarge}
                color={COLORS.green_accueil}
                align={"center"}
              />
              <TouchableOpacity onPress={() => {}}>
                <Feather name="list" size={20} />
              </TouchableOpacity>
            </View>
            <HeightSpacer height={20} />
            <Media />
            <ReusableBtn
              onPress={() => navigation.navigate("SearchHotel")}
              btnText={" Trouvez les Hotels"}
              width={(SIZES.width - 50) / 2.2}
              backgroundColor={COLORS.green_button_back}
              borderColor={COLORS.green_button_back}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Mainplacesdetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
    marginHorizontal: 0,
  },
  description: {
    marginHorizontal: 20,
    padding: 10,
  },
});
