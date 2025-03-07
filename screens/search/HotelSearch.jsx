import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style";
import stylesearch from "./search.style";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../components/constants/Theme";
import { HeightSpacer } from "../../components";
import HotelsCard from "../../components/Tiles/Hotels/hotelsCard";
import Appbar from "../../components/reusable/Appbar";

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
const searchImage = require("../../assets/images/iconesdeco/search.png");

const HotelSearch = ({navigation}) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const hotelsList = [
    {
      _id: "2b1a16756uv23aprf210m",
      region_id: "23er6749345dfd98vger34",
      title: "Terrou-Bi",
      placeImage: Terroubi,
      rating: 4.9,
      review: "712 Avis",
      adresse: "Lac Rose",
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
      review: "1204 Avis",
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
    },
    {
      _id: "1a1a1a56uv23aprf214uryur9084",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Nina",
      placeImage: hotel_nina,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "8993451a1a1a56uv23aprf215m90934",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel King Fahd ",
      placeImage: Kingfahdpalace,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "1a1a1a56uv23aprf216m89393",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Radisson Blue",
      placeImage: radisson_blue_blue,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "oiiee1a1a1a56uv23aprf217m",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Cafe de Rome",
      placeImage: cafe_de_rome,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "1a1a1a56uvururu8984823aprf218m",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Sokhamon",
      placeImage: Hotellesokhamon,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
    {
      _id: "8484rjfnfnjrj1a1a1a56uv23aprf219m",
      region_id: "23er6749345dfd98vger34",
      title: "Hotel Novotel",
      placeImage: Novotel,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
  ];
  return (
    <SafeAreaView style={Reusable.Container}>
         <View style={{ height: 50 }}>
        <Appbar
          top={20}
          left={20}
          right={20}
          title={'Trouver un hotel'}
          color={COLORS.green_accueil}
          icon={"filter"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={stylesearch.searchContainer}>
        <View style={stylesearch.Wrapper}>
          <TextInput
            style={stylesearch.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Ou voulez-vous sejourner ?"
          />
        </View>
        <TouchableOpacity style={stylesearch.searchBtn}>
          <Feather name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {hotelsList.length === 0 ? (
        <View>
          <HeightSpacer height={"20%"} />
          <Image source={searchImage} style={stylesearch.searchImage} />
        </View>
      ) : (
        <View style={{ padding: 10 }}>
          <FlatList
            data={hotelsList}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={()=>(<View style={{height:16}}/>)}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 255}} 
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={stylesearch.tile}>
                <HotelsCard item={item}  onPress={() => navigation.navigate("HotelsDetails",item._id)} />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HotelSearch;
