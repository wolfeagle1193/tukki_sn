import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Appbar from "../../components/reusable/Appbar";
import { COLORS } from "../../components/constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusabletile from "../../components/reusable/Reusabletile";


const HotelsfullList = ({navigation}) => {
  

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
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View style={{ height: 50 }}>
        <Appbar
          top={10}
          left={0}
          right={0}
          title={"Hotels"}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={hotelsList}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100}} // Ajoutez de l'espace en bas
          renderItem={({ item }) => (
            <View style={{marginBottom:10}}>
              <Reusabletile item={item} onPress={() => navigation.navigate('HotelsDetails',item._id)}/>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HotelsfullList;

const styles = StyleSheet.create({});
