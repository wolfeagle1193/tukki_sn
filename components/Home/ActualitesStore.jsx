import React from "react";
import { Text, View, VirtualizedList, Image } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../constants/Theme";
import Actualites from "../Tiles/Actualites";

// Importez les images
const actualitesone = require("../../assets/images/actualites/lutte.jpg");
const actualitestwo = require("../../assets/images/actualites/restoimage.jpg");
const actualitesthree = require("../../assets/images/actualites/toubainfo.jpg");
const actualitesfour = require("../../assets/images/actualites/visaapplicationcenter.jpg");


const ActualitesStore = () => {
  const Actualites_data = [
    { _id: "3000", name: "Quid des 5 repas senegalais a absolument gouter", placeImage:actualitestwo },
    { _id: "3001", name: " Vibrez avec la lutte senegalaise", placeImage: actualitesone},
    { _id: "3002", name: "La merveille culturelle qui fascine encore aujourd'hui", placeImage: actualitesthree},
    { _id: "3003", name: "Ce qu'il faut savoir", placeImage: actualitesfour }
  
  ];

  return (
    <View>
      <HeightSpacer height={6} />
      <VirtualizedList
        data={Actualites_data}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: SIZES.small }}>
            <Actualites item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default ActualitesStore;
