import React from "react";
import { Text, View, VirtualizedList, Image } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../constants/Theme";
import Main_places from "../Tiles/Main_places";

// Importez les images
const desertLompoul = require("../../assets/images/incontournables/Désert-Lompoul_pint.jpg");
const parcNational = require("../../assets/images/incontournables/djoudjbirds.jpg");
const lacRose = require("../../assets/images/incontournables/lacrose.jpg");
const cascadeDindefelo = require("../../assets/images/incontournables/kedougou.jpg");
const ileGoree = require("../../assets/images/incontournables/goree.jpg");
const saintLouis = require("../../assets/images/incontournables/louisville.jpg");

const Mainplaces_store = () => {
  const Mainplaces_data = [
    { _id: "1000", name: "Désert de Lompoul", placeImage: desertLompoul },
    { _id: "1001", name: " Parc du Djoudj", placeImage: parcNational },
    { _id: "1002", name: "Lac Rose", placeImage: lacRose },
    { _id: "1003", name: "Cascade de Dindefelo", placeImage: cascadeDindefelo },
    { _id: "1004", name: "L'ile de Gorée", placeImage: ileGoree },
    { _id: "1005", name: "Saint-Louis", placeImage: saintLouis },
  ];

  return (
    <View>
      <HeightSpacer height={10} />
      <VirtualizedList
        data={Mainplaces_data}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 5 }}>
            <Main_places item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Mainplaces_store;
