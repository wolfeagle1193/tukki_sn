/*import {
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
      {/* Appbar 
      <View style={{ height: 100, marginTop: 5 }}>
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
      {/* Room List 
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
                      <Rating
                        rating={item.rating}
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
                          style={{ transform: [{ rotate: "45deg" }] }} // Rotation de 45 degrés
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
;

/*export default SelectRoom;
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
});*/

import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
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

const { width } = Dimensions.get('window');

const SelectRoom = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories for filtering
  const categories = [
    { id: "all", label: "Tous", icon: "home" },
    { id: "single", label: "Chambre Simple", icon: "single-bed" },
    { id: "double", label: "Chambre Double", icon: "king-bed" },
    { id: "family", label: "Chambre Familiale", icon: "family-restroom" },
    { id: "suite", label: "Suite", icon: "weekend" },
    { id: "deluxe", label: "Deluxe", icon: "star" },
  ];

  // Updated rooms data with categories
  const rooms = [
    {
      _id: "456a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      name: "Suite Présidentielle",
      description: "Suite spacieuse avec vue panoramique et service exclusif",
      price: "165.000",
      category: "suite",
      availability: false,
      rating: 4.8,
      review: "2312",
      features: [
        { icon: 'square-foot', value: '48m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit king' },
      ],
    },
    {
      _id: "450a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Hotellesokhamon,
      name: "Suite Executive",
      description: "Suite élégante avec salon privé et prestations haut de gamme",
      price: "180.000",
      category: "suite",
      availability: true,
      rating: 4.4,
      review: "1985",
      features: [
        { icon: 'square-foot', value: '42m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit king' },
      ],
    },
    {
      _id: "454a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: cafe_de_rome,
      name: "Chambre Double Supérieure",
      description: "Chambre confortable avec vue sur la ville et espace détente",
      price: "65.000",
      category: "double",
      availability: false,
      rating: 4.3,
      review: "1204",
      features: [
        { icon: 'square-foot', value: '28m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit double' },
      ],
    },
    {
      _id: "480a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: radisson_blue_blue,
      name: "Chambre Double Standard",
      description: "Chambre double élégante avec tous les services essentiels",
      price: "65.000",
      category: "double",
      availability: true,
      rating: 4.7,
      review: "2045",
      features: [
        { icon: 'square-foot', value: '24m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit double' },
      ],
    },
    {
      _id: "490a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Novotel,
      name: "Chambre Simple Confort",
      description: "Chambre simple avec tout le nécessaire pour un séjour agréable",
      price: "45.000",
      category: "single",
      availability: false,
      rating: 4.0,
      review: "1578",
      features: [
        { icon: 'square-foot', value: '18m²' },
        { icon: 'person', value: '1 personne' },
        { icon: 'single-bed', value: '1 lit simple' },
      ],
    },
    {
      _id: "410a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      name: "Chambre Simple Vue Mer",
      description: "Chambre individuelle avec vue imprenable sur l'océan",
      price: "55.000",
      category: "single",
      availability: true,
      rating: 4.1,
      review: "1325",
      features: [
        { icon: 'square-foot', value: '20m²' },
        { icon: 'person', value: '1 personne' },
        { icon: 'single-bed', value: '1 lit simple' },
      ],
    },
    {
      _id: "400a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: FleurdeLyshotel,
      name: "Chambre Familiale Standard",
      description: "Spacieuse chambre pour famille avec espace enfants",
      price: "95.000",
      category: "family",
      availability: false,
      rating: 4.6,
      review: "1865",
      features: [
        { icon: 'square-foot', value: '36m²' },
        { icon: 'person', value: '4 personnes' },
        { icon: 'king-bed', value: '2 lits doubles' },
      ],
    },
    {
      _id: "340a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Azalai,
      name: "Suite Familiale",
      description: "Suite familiale avec chambres séparées et salon commun",
      price: "120.000",
      category: "family",
      availability: true,
      rating: 4.8,
      review: "2254",
      features: [
        { icon: 'square-foot', value: '52m²' },
        { icon: 'person', value: '5 personnes' },
        { icon: 'king-bed', value: '2 lits + canapé' },
      ],
    },
    {
      _id: "350a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Archotel,
      name: "Chambre Deluxe Premium",
      description: "Chambre deluxe avec équipements premium et service personnalisé",
      price: "220.000",
      category: "deluxe",
      availability: true,
      rating: 4.9,
      review: "2415",
      features: [
        { icon: 'square-foot', value: '38m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit king' },
      ],
    },
    {
      _id: "150a1a1a56un904523aprf211m",
      hotel_id: "23er6749345dfd98vger34",
      roomImage: Terroubi,
      name: "Chambre Deluxe Vue Océan",
      description: "Expérience deluxe avec terrasse privée et vue panoramique",
      price: "250.000",
      category: "deluxe",
      availability: true,
      rating: 4.9,
      review: "2587",
      features: [
        { icon: 'square-foot', value: '45m²' },
        { icon: 'person', value: '2 personnes' },
        { icon: 'king-bed', value: '1 lit king' },
      ],
    },
  ];

  // Filter rooms based on selected category
  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((room) => room.category === selectedCategory);

  // Render room item
  const renderRoomItem = ({ item }) => (
    <View style={styles.roomCard}>
      {/* Room Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={item.roomImage} 
          style={styles.roomImage}
          resizeMode="cover"
        />
        <FavoritesIcon top={10} right={10} />
        
        {/* Availability Badge */}
        <View style={[
          styles.availabilityBadge,
          {backgroundColor: item.availability ? COLORS.green_accueil : '#FF6B6B'}
        ]}>
          <Text style={styles.availabilityText}>
            {item.availability ? 'Disponible' : 'Complet'}
          </Text>
        </View>
      </View>
      
      {/* Room Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{item.price}</Text>
            <Text style={styles.priceLabel}>Fcfa/nuit</Text>
          </View>
        </View>
        
        <Text style={styles.roomDescription}>{item.description}</Text>
        
        {/* Features */}
        <View style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcons name={feature.icon} size={16} color={COLORS.green_accueil} />
              <Text style={styles.featureValue}>{feature.value}</Text>
            </View>
          ))}
        </View>
        
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Rating
            rating={item.rating}
            maxStars={5}
            stars={item.rating}
            bordered={false}
            color={"#FD9942"}
            width={5}
          />
          <Text style={styles.reviewCount}>({item.review} avis)</Text>
        </View>
        
        {/* Book Button */}
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate("Roomdetails")}
        >
          <Text style={styles.bookButtonText}>Explorer cette chambre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <View style={styles.appbarContainer}>
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

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <MaterialIcons
                name={category.icon}
                size={24}
                color={selectedCategory === category.id ? COLORS.white : COLORS.green_accueil}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.selectedCategoryText,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Room List */}
      <FlatList
        data={filteredRooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.roomList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  appbarContainer: {
    height: 100,
    marginTop: 5,
  },
  categoryContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  categoriesScrollContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.green_accueil,
  },
  selectedCategory: {
    backgroundColor: COLORS.green_accueil,
  },
  categoryLabel: {
    color: COLORS.green_accueil,
    marginLeft: 8,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  roomList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  roomCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  roomImage: {
    width: "100%",
    height: 180,
  },
  availabilityBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availabilityText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 12,
  },
  detailsContainer: {
    padding: 15,
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  priceLabel: {
    fontSize: 12,
    color: "#666",
  },
  roomDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  featureValue: {
    fontSize: 13,
    color: "#555",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  reviewCount: {
    fontSize: 13,
    color: "#777",
    marginLeft: 8,
  },
  bookButton: {
    backgroundColor: COLORS.green_accueil,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SelectRoom;
