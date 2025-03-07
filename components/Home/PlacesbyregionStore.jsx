import React from "react";
import {  View, VirtualizedList} from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../constants/Theme";
import PlacesbyRegion from "../Tiles/PlacesbyRegion";

// Importez les images
const dakar = require("../../assets/images/region/dakar.jpg");
const saintLouis = require("../../assets/images/region/saintlouis.jpg");
const lapetiteCote = require("../../assets/images/region/petitecote.jpg");
const casamence = require("../../assets/images/region/casamance.jpg");
const sineSaloum = require("../../assets/images/region/sinesaloum.jpg");
const senegalOriental = require("../../assets/images/region/senegal_oriental.jpg");

const PlacesbyregionStore = () => {
  const placesRegionList = [
    { _id: "2000", name: "Dakar", placeImage: dakar},
    { _id: "2001", name: " Saint-Louis", placeImage: saintLouis },
    { _id: "2002", name: "La Petite Cote", placeImage: lapetiteCote },
    { _id: "2003", name: "Casamence", placeImage: casamence },
    { _id: "2004", name: "Sine Saloum", placeImage: sineSaloum },
    { _id: "2005", name: "Senegal Oriental", placeImage: senegalOriental},
  ];

  return (
    <View>
      <HeightSpacer height={10} />
      <VirtualizedList
        data={placesRegionList}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: SIZES.small }}>
            <PlacesbyRegion item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default PlacesbyregionStore;
