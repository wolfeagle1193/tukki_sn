import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SIZES, COLORS, TEXT } from "../../components/constants/Theme";

import {
  FavoritesIcon,
  NetworkingImage,
  Appbar,
  HeightSpacer,
  CategoryGrid,
} from "../../components/index";

import { Feather } from "@expo/vector-icons";
import Reusable from "../../components/reusable/Reusable.style";
import ImageGrid from "../../components/reusable/images_roms";

const goree = require("../../assets/images/incontournables/gore.jpg");
const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");



const Roomdetails = ({ navigation }) => {
  const route = useRoute();
  /* const { item } = route.params; // Si `item` est utilisé, sinon, vous pouvez le retirer.*/

  // Filter rooms based on selected category
 

  const roomdetail = {
    _id: "1",
    label: "Reserver cette Chambre", // Ajout d'un titre pour la région
    images: [
      goree,
      artsvillage,
      divinityMosquee,
      ngorIsle,
      RenaissancePlace,
      phareMamellesplace,
    ],

    room_generalities: [
      { type: "single room" },
      { square: 25 },
      { capacity: 3 },
    ],

    equipements_room_hotel: [
      {
        icone: "bed",
        description: "Lit king-size avec matelas confortable.",
        isPresent: true,
      },
      {
        icone: "tv",
        description: "Télévision à écran plat avec chaînes câblées.",
        isPresent: true,
      },
      {
        icone: "ac_unit",
        description: "Unité de climatisation réglable.",
        isPresent: true,
      },
      {
        icone: "local_drink",
        description:
          "Mini-bar entièrement approvisionné avec collations et boissons.",
        isPresent: false,
      },
      {
        icone: "lock",
        description: "Coffre-fort dans la chambre pour les objets de valeur.",
        isPresent: true,
      },
      {
        icone: "work",
        description: "Bureau avec lampe et chaise.",
        isPresent: true,
      },
      {
        icone: "wifi",
        description: "Accès Internet haut débit gratuit.",
        isPresent: true,
      },
      {
        icone: "bathroom",
        description:
          "Salle de bain privée avec douche et articles de toilette.",
        isPresent: true,
      },
      {
        icone: "coffee",
        description: "Cafetière dans la chambre avec café gratuit.",
        isPresent: false,
      },
      {
        icone: "closet",
        description: "Armoire avec cintres et draps supplémentaires.",
        isPresent: true,
      },
    ],

    commodites_hotel: [
      {
        icone: "restaurant",
        description: "Restaurant sur place servant une cuisine variée.",
        isPresent: true,
      },
      {
        icone: "fitness_center",
        description: "Salle de gym équipée pour les entraînements.",
        isPresent: true,
      },
      {
        icone: "pool",
        description: "Piscine extérieure avec espace de détente.",
        isPresent: true,
      },
      {
        icone: "spa",
        description: "Spa proposant divers soins relaxants.",
        isPresent: false,
      },
      {
        icone: "business_center",
        description:
          "Centre d'affaires avec accès Internet et services d'impression.",
        isPresent: true,
      },
      {
        icone: "local_parking",
        description: "Parking gratuit pour les clients de l'hôtel.",
        isPresent: true,
      },
      {
        icone: "room_service",
        description: "Service de chambre disponible 24h/24.",
        isPresent: true,
      },
      {
        icone: "pets",
        description: "Animaux de compagnie acceptés sur demande.",
        isPresent: false,
      },
      {
        icone: "wifi",
        description: "Wi-Fi gratuit disponible dans tout l'hôtel.",
        isPresent: true,
      },
      {
        icone: "event",
        description: "Salles de réunion et d'événements disponibles.",
        isPresent: true,
      },
    ],
  };

  const [selectedImageIndex, setImageIndex] = useState(0);

  return (
    <ScrollView backgroundColor={"#ffffff"}>
      <View>
        <NetworkingImage
          source={roomdetail.images[selectedImageIndex]}
          width={"100%"}
          height={450}
          radius={20}
        />

        <ImageGrid
          images={roomdetail.images}
          selectedImage={selectedImageIndex}
          onSelectImage={setImageIndex}
          bottom={5}
          left={2}
          right={2}
        />
        <Appbar
          top={55}
          left={20}
          right={20}
          title={roomdetail.label} // Utilisation du titre de la région
          color={COLORS.green_accueil}
          icon={<FavoritesIcon top={-4} />}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
        />
      </View>
    
     
    </ScrollView>
  );
};

export default Roomdetails;

