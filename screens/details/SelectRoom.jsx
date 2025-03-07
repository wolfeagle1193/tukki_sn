import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  HeightSpacer,
  ReusableBtn,
  CategoryGrid,
  ReusableText,
  AssetImage,
  Rating,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../components/constants/Theme";
import Reusabletile from "../../components/reusable/Reusabletile";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FavoritesIcon,
  LoveIcon,
  AvailabilityIcon,
  Reusabletilefirst,
  Container,
} from "../../components";
import Reusable from "../../components/reusable/Reusable.style";

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

const SelectRoom = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Updated rooms data with categories
  const rooms = [
    {
      _id: "456a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      review: "1204 Avis",
      price: "165.000 Fcfa/nuit",
      category: "suite", // Updat// Updated with category
      availability: false,
      rating: 4.8,
      review: "2312 avis",
    },
    {
      _id: "450a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Hotellesokhamon,
      review: "1204 Avis",
      price: "180.000 Fcfa/nuit",
      category: "suite", // Updated with category
      availability: true,
      rating: 4.4,
      review: "2312 avis",
    },
    {
      _id: "454a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: cafe_de_rome,
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "double", // Updat
      availability: false,
      rating: 4.3,
      review: "2312 avis",
    },
    {
      _id: "480a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: radisson_blue_blue,
      
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "double", // Updat
      availability: true,
      rating: 4.7,
      review: "2312 avis",
    },
    {
      _id: "490a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Novotel,
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "single", // Updat
      availability: false,
      rating: 4.0,
      review: "2312 avis",
    },
    {
      _id: "410a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "single", // Updat: "deluxe", // Updated with category
      availability: true,
      rating: 4.0,
      review: "2312 avis",
    },
    {
      _id: "400a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: FleurdeLyshotel,
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "family", // Updat
      availability: false,
      rating: 4.8,
      review: "2312 avis",
    },
    {
      _id: "340a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Azalai,
      review: "1204 Avis",
      price: "65.000 Fcfa/nuit",
      category: "family", // Updat
      availability: true,
      rating: 4.8,
      review: "2312 avis",
    },
    {
      _id: "350a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      review: "1204 Avis",
      price: "650.000 Fcfa/nuit",
      category: "deluxe", // Updat
      availability: true,
      rating: 4.8,
      review: "2312 avis",
    },
    {
      _id: "150a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Terroubi,
      review: "1204 Avis",
      price: "450.000 Fcfa/nuit",
      category: "deluxe", // Updat // Updated with category
      availability: true,
      rating: 4.6,
      review: "2312 avis",
    },
  ];

  // Categories for filtering

  const categories = [
    { id: "all", label: "Tous", icon: "home" }, // Icône d'étoile
    { id: "single", label: "Chambre Simple", icon: "single-bed" }, // Icône de lit simple
    { id: "double", label: "Chambre Double", icon: "king-bed" }, // Icône de lit king
    { id: "family", label: "Chambre Familiale", icon: "family-restroom" }, // Icône de salle de bain familiale
    { id: "suite", label: "Suite", icon: "weekend" }, // Icône de week-end
    { id: "deluxe", label: "Deluxe", icon: "star" }, // Icône d'étoile
  ];
  // Filter rooms based on selected category
  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((room) => room.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Appbar */}
      <View style={{ height: 100 ,marginTop:5}}>
        <Appbar
          top={50}
          left={20}
          right={20}
          title={"Choisir une Chambre"}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray,
          marginBottom: 5,
        }}
      >
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>
      {/* Room List */}
      <FlatList
        data={filteredRooms}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 12 }}>
              <Container item={item} />
              <View style={styles.container}>
                <View style={styles.wrapper}>
                  <View style={styles.box1}>
                    <ReusableText
                      text={item.price}
                      family={"medium"}
                      size={TEXT.xsmall}
                      color={COLORS.green_accueil}
                      align={"left"}
                    />
                  </View>
                  <View style={styles.box1}>
                    <View style={Reusable.rowWithSpace("space-between")}>
                      <Rating rating={item.rating}
                        maxStars={5}
                        stars={item.rating}
                        bordered={false}
                        color={"#FD9942"}
                        width={5}
                      />
                      <ReusableText
                        text={`(${item.review})`}
                        family={"medium"}
                        size={TEXT.xsmall}
                        color={COLORS.lightgray}
                      />
                    </View>
                   
                  </View>
                  <View
                    style={{
                      width: "33%",
                      height: 50,
                      backgroundColor: COLORS.white,

                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <ReusableText
                      text={"Disponibilité"}
                      family={"medium"}
                      size={TEXT.xsmall}
                      color={COLORS.green_accueil}
                      align={"left"}
                    />
                    {item.availability ? (
                      <View>
                        <AssetImage
                          source={require("../../assets/images/iconesdeco/check.png")}
                          width={26}
                          height={26}
                          radius={13}
                          resizeMode={"cover"}
                        />
                      </View>
                    ) : (
                      <View>
                      <AssetImage
                        source={require("../../assets/images/iconesdeco/croix.png")}
                        width={26}
                        height={26}
                        radius={13}
                        resizeMode={"cover"}
                        style={{ transform: [{ rotate: '45deg' }] }} // Rotation de 45 degrés
                      />
                    </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={{ margin: 10, alignItems: "center" }}>
                <ReusableBtn
                  onPress={() => navigation.navigate("Roomdetails")}
                  btnText={"Explorer cette chambre"}
                  width={SIZES.width - 50}
                  backgroundColor={COLORS.green_button_back}
                  borderColor={COLORS.green_button_back}
                  borderWidth={0}
                  textColor={COLORS.white}
                />
              </View>
              <FavoritesIcon top={10} right={20} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SelectRoom;
const styles = StyleSheet.create({
  container: {},
  wrapper: {
    flexDirection: "row",
    marginHorizontal: "0%",
    justifyContent: "center",
  },
  box1: {
    width: "33%",
    height: 50,
    backgroundColor: COLORS.white,
    borderRightWidth: 2,
    borderRightColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
