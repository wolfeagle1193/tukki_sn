
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES,COLORS,TEXT } from '../../components/constants/Theme';

import {
  NetworkingImage,
  Appbar,
  Popularlist,
  DescriptionText,
  ReusableBtn,
  ReusableText,
  HeightSpacer,
} from "../../components/index";

import { Feather } from "@expo/vector-icons";
import Reusable from "../../components/reusable/Reusable.style";

const dakar = require("../../assets/images/region/dakar.jpg");
const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");

const Regiondetails = ({ navigation }) => {
  const route = useRoute();
  const {item} = route.params; // Si `item` est utilisé, sinon, vous pouvez le retirer.
 

  const region = {
    _id: "1",
    title: "Dakar", // Ajout d'un titre pour la région
    description:
      "Dakar, la vibrante capitale du Sénégal, est une ville riche en histoire et en culture. Fondée en 1857 comme un port stratégique sous l'égide des Français, elle est rapidement devenue un carrefour commercial important reliant l'Afrique, l'Europe et les Amériques. Les visiteurs peuvent explorer des sites emblématiques tels que l'île de Gorée, classée au patrimoine mondial de l'UNESCO, connue pour son histoire poignante liée à la traite des esclaves. Ne manquez pas le Monument de la Renaissance Africaine, une statue emblématique qui symbolise l'émancipation et le progrès du continent. Flânez dans les marchés colorés, comme le marché Kermel, où vous découvrirez l'artisanat local, des produits frais et la chaleur de l'hospitalité sénégalaise. Que vous soyez passionné d'histoire, amateur de gastronomie ou simplement en quête d'aventure, Dakar a quelque chose à offrir à chaque visiteur.",
    imageUrl: dakar,
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
    location: "Dakar, Ouest du Sénégal",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View >
          <NetworkingImage
            source={region.imageUrl}
            width={"100%"}
            height={350}
            radius={20}
          />
          <Appbar
            top={50}
            left={20}
            right={20}
            title={region.title} // Utilisation du titre de la région
            color={COLORS.green_accueil}
            icon={"search1"}
            color1={COLORS.green_accueil}
            onPress={() => navigation.goBack()}
            onPress1={() => {}}
          />
        </View>
        <View style={styles.description}>
          <ReusableText
            text={region.location}
            family={"medium"}
            size={TEXT.xlarge}
            color={COLORS.green_accueil}
            align={"left"}
          />
          <DescriptionText text={region.description}  lines={15}/>
          <View style={{ alignContent: "center" }}>
            <HeightSpacer height={20}/>
            <View style={Reusable.rowWithSpace("space-between")}>
              <ReusableText
                text={"Meilleures destinations"}
                family={"medium"}
                size={TEXT.xlarge}
                color={COLORS.green_accueil}
                align={"center"}
              />
              <TouchableOpacity onPress={() => {}}>
                <Feather name="list" size={20} />
              </TouchableOpacity>
            </View>
            <HeightSpacer height={20}/> 
            <Popularlist data={region.popular} />
            <ReusableBtn
              onPress={() => navigation.navigate("SearchHotel")}
              btnText={" Trouvez les Hotels"}
              width={(SIZES.width - 50) / 2.2}
              backgroundColor={COLORS.green_button_back}
              borderColor={COLORS.green_button_back}
              borderWidth={0}
              textColor={COLORS.white}
            />
            <HeightSpacer height={20}/>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    
  );
};

export default Regiondetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
    marginHorizontal: 20,
  },
  description: {
    marginHorizontal: 20,
    padding: 10,
  },
});
