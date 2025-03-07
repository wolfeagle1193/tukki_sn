import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ReusableText from "../reusable/ReusableText";
import Reusable from "../reusable/Reusable.style.js";
import { TEXT, COLORS, SIZES } from "../../components/constants/Theme.js";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HotelsCard from "../Tiles/Hotels/hotelsCard.jsx";

const BestHotels = () => {
  const navigation = useNavigation();

  const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
  const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
  const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
  const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
  const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
  const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
  const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
  const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
  const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
  const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");

  const Hotels = [
    {
      _id: "2b1a16756uv23aprf210m",
      region_id: "23er6749345dfd98vger34",
      title: "TerrouBi",
      placeImage: Terroubi,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "450a1a1a56un904523aprf211m",
      region_id: "23er6749345dfd98vger34",
      title: "Archotel",
      placeImage: Archotel,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "79823q1a1a56uv23aprf212m",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Azalai",
      placeImage: Azalai,
      rating: 4.9,
      review: "1204 avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "1a1a1a56uv6783ertaprf213m",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Fleur de Lys",
      placeImage: FleurdeLyshotel,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    }
   
  ];
  return (
    <View>
      <View
        style={[Reusable.rowWithSpace("space-between"), { paddingBottom: 10 }]}
      >
        <ReusableText
          text={"Hôtels à proximité"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Hotelslist")}>
          <Feather name="list" size={18} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={Hotels}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
        renderItem={({ item }) => (
          <HotelsCard item={item} margin={0} onPress={() => navigation.navigate("HotelsDetails",item._id)} />
        )}
      />
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});
