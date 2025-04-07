/*import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Appbar from "../../components/reusable/Appbar";
import { COLORS } from "../../components/constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusabletile from "../../components/reusable/Reusabletile";


const EventsfullList = ({navigation}) => {
  

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

  const eventsList = [
    {
      _id: "2b1a16756uv23aprf210m",
      region_id: "23er6749345dfd98vger34",
      title: "Week-end glamour",
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
          title={"Excursions ,Circuits & Evenements"}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={eventsList}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100}} // Ajoutez de l'espace en bas
          renderItem={({ item }) => (
            <View style={{marginBottom:10}}>
              <Reusabletile item={item} onPress={() => navigation.navigate('EventsDetails',item._id)}/>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default EventsfullList;

const styles = StyleSheet.create({});*/



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
  Container,
} from "../../components";
import Reusable from "../../components/reusable/Reusable.style";

// Images des événements
const festival_musique = require("../../assets/images/events/festival_musique.jpg");
const randonnee = require("../../assets/images/events/randonnee.jpg");
const conference = require("../../assets/images/events/conference.jpg");
const boite_nuit = require("../../assets/images/events/boite_nuit.jpg");
const plage = require("../../assets/images/events/plage.jpg");
const sport = require("../../assets/images/events/sport.jpg");
const atelier = require("../../assets/images/events/atelier.jpg");
const cours_cuisine = require("../../assets/images/events/cours_cuisine.jpg");
const sortie_culturelle = require("../../assets/images/events/sortie_culturelle.jpg");
const excursion = require("../../assets/images/events/excursion.jpg");*/

/*const ExploreEvents = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Catégories d'événements
  const categories = [
    { id: "all", label: "Tous", icon: "explore" },
    { id: "festival", label: "Festivals", icon: "music-note" },
    { id: "excursion", label: "Excursions", icon: "terrain" },
    { id: "nightlife", label: "Vie Nocturne", icon: "nightlife" },
    { id: "conference", label: "Conférences", icon: "record-voice-over" },
    { id: "culture", label: "Culture", icon: "museum" },
    { id: "sport", label: "Sports", icon: "sports-basketball" },
    { id: "atelier", label: "Ateliers", icon: "build" },
    { id: "plage", label: "Plages", icon: "beach-access" },
  ];

  // Données des événements
  const events = [
    {
      _id: "e001",
      title: "Festival de Jazz de Saint-Louis",
      location: "Saint-Louis",
      eventImage: festival_musique,
      price: "15.000 Fcfa",
      category: "festival",
      date: "12 mai 2025",
      rating: 4.8,
      review: "1253 avis",
      description: "Le plus grand festival de jazz d'Afrique de l'Ouest",
      isFavorite: false,
    },
    {
      _id: "e002",
      title: "Randonnée dans le Fouta-Djalon",
      location: "Région du Fouta",
      eventImage: randonnee,
      price: "25.000 Fcfa",
      category: "excursion",
      date: "17-18 mai 2025",
      rating: 4.5,
      review: "587 avis",
      description: "Découverte des paysages magnifiques du Fouta-Djalon",
      isFavorite: true,
    },
    {
      _id: "e003",
      title: "Conférence sur l'Entrepreneuriat",
      location: "Dakar, UCAD",
      eventImage: conference,
      price: "Gratuit",
      category: "conference",
      date: "20 mai 2025",
      rating: 4.2,
      review: "312 avis",
      description: "Rencontrez des entrepreneurs à succès du Sénégal",
      isFavorite: false,
    },
    {
      _id: "e004",
      title: "Soirée à Just 4 U",
      location: "Dakar",
      eventImage: boite_nuit,
      price: "10.000 Fcfa",
      category: "nightlife",
      date: "Tous les vendredis",
      rating: 4.7,
      review: "1879 avis",
      description: "Musique live et ambiance garantie",
      isFavorite: true,
    },
    {
      _id: "e005",
      title: "Journée à la plage de Saly",
      location: "Mbour",
      eventImage: plage,
      price: "5.000 Fcfa",
      category: "plage",
      date: "Tous les weekends",
      rating: 4.6,
      review: "2451 avis",
      description: "Détente, sports nautiques et animations",
      isFavorite: false,
    },
    {
      _id: "e006",
      title: "Tournoi de Beach Soccer",
      location: "Plage de Yoff",
      eventImage: sport,
      price: "2.000 Fcfa",
      category: "sport",
      date: "25 mai 2025",
      rating: 4.3,
      review: "423 avis",
      description: "Compétition amicale de beach soccer",
      isFavorite: false,
    },
    {
      _id: "e007",
      title: "Atelier de Création Artisanale",
      location: "Village des Arts",
      eventImage: atelier,
      price: "8.000 Fcfa",
      category: "atelier",
      date: "22 mai 2025",
      rating: 4.4,
      review: "189 avis",
      description: "Apprenez les techniques traditionnelles de tissage",
      isFavorite: true,
    },
    {
      _id: "e008",
      title: "Cours de Cuisine Sénégalaise",
      location: "Centre-ville Dakar",
      eventImage: cours_cuisine,
      price: "12.000 Fcfa",
      category: "atelier",
      date: "19 mai 2025",
      rating: 4.9,
      review: "213 avis",
      description: "Apprenez à préparer un thieboudienne parfait",
      isFavorite: false,
    },
    {
      _id: "e009",
      title: "Visite Guidée de Gorée",
      location: "Île de Gorée",
      eventImage: sortie_culturelle,
      price: "15.000 Fcfa",
      category: "culture",
      date: "Tous les jours",
      rating: 4.8,
      review: "1526 avis",
      description: "Découverte historique de l'île de Gorée",
      isFavorite: true,
    },
    {
      _id: "e010",
      title: "Excursion au Lac Rose",
      location: "Lac Retba",
      eventImage: excursion,
      price: "20.000 Fcfa",
      category: "excursion",
      date: "16 mai 2025",
      rating: 4.7,
      review: "987 avis",
      description: "Visite du fameux lac rose et balade en 4x4",
      isFavorite: false,
    },
  ];

  // Filtrer les événements selon la catégorie sélectionnée
  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Appbar 
      <View style={{ height: 100, marginTop: 5 }}>
        <Appbar
          top={50}
          left={20}
          right={20}
          title={"Découvrez les événements"}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Catégories 
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray,
          marginBottom: 10,
        }}
      >
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {/* Liste des événements *
      <FlatList
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
            <View style={styles.eventCard}>
              {/* Image et image de couverture 
              <Image
                source={item.eventImage}
                style={styles.eventImage}
                resizeMode="cover"
              />
              
              {/* Badge de catégorie 
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {categories.find(cat => cat.id === item.category)?.label || item.category}
                </Text>
              </View>
              
              {/* Informations sur l'événement 
              <View style={styles.eventInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  {item.isFavorite ? (
                    <MaterialIcons name="favorite" size={24} color={COLORS.red} />
                  ) : (
                    <MaterialIcons name="favorite-border" size={24} color={COLORS.gray} />
                  )}
                </View>
                
                <View style={styles.detailsRow}>
                  <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color={COLORS.green_accueil} />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <MaterialIcons name="event" size={16} color={COLORS.green_accueil} />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
                
                <Text style={styles.description}>{item.description}</Text>
                
                <View style={styles.bottomRow}>
                  <View style={styles.ratingContainer}>
                    <Rating
                      rating={item.rating}
                      maxStars={5}
                      stars={item.rating}
                      bordered={false}
                      color={"#FD9942"}
                    />
                    <Text style={styles.reviewText}>{item.review}</Text>
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate("EventDetails", { eventId: item._id })}
                >
                  <Text style={styles.buttonText}>Voir les détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};*/




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
  Container,
} from "../../components";
import Reusable from "../../components/reusable/Reusable.style";

//image importantes
const festival_musique = require("../../assets/images/hotels/dakar/terroubi.jpg");
const randonnee = require("../../assets/images/hotels/dakar/archotel.jpg");
const conference = require("../../assets/images/hotels/dakar/azalai.jpg");
const boite_nuit = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
const plage = require("../../assets/images/hotels/dakar/novotel.jpg");
const sport = require("../../assets/images/hotels/dakar/mirammar.jpg");
const atelier = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
const cours_cuisine = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
const excursion = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
const sortie_culturelle = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");

// Images des événements
/*const festival_musique = require("../../assets/images/events/festival_musique.jpg");
const randonnee = require("../../assets/images/events/randonnee.jpg");
const conference = require("../../assets/images/events/conference.jpg");
const boite_nuit = require("../../assets/images/events/boite_nuit.jpg");
const plage = require("../../assets/images/events/plage.jpg");
const sport = require("../../assets/images/events/sport.jpg");
const atelier = require("../../assets/images/events/atelier.jpg");
const cours_cuisine = require("../../assets/images/events/cours_cuisine.jpg");
const sortie_culturelle = require("../../assets/images/events/sortie_culturelle.jpg");
const excursion = require("../../assets/images/events/excursion.jpg");*/

const ExploreEvents = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Catégories d'événements
  const categories = [
    { id: "all", label: "Tous", icon: "explore" },
    { id: "festival", label: "Festivals", icon: "music-note" },
    { id: "excursion", label: "Excursions", icon: "terrain" },
    { id: "nightlife", label: "Vie Nocturne", icon: "nightlife" },
    { id: "conference", label: "Conférences", icon: "record-voice-over" },
    { id: "culture", label: "Culture", icon: "museum" },
    { id: "sport", label: "Sports", icon: "sports-basketball" },
    { id: "atelier", label: "Ateliers", icon: "build" },
    { id: "plage", label: "Plages", icon: "beach-access" },
  ];

  // Données des événements
  const events = [
    {
      _id: "e001",
      title: "Festival de Jazz de Saint-Louis",
      location: "Saint-Louis",
      eventImage: festival_musique,
      price: "15.000 Fcfa",
      category: "festival",
      date: "12 mai 2025",
      rating: 4.8,
      review: "1253 avis",
      description: "Le plus grand festival de jazz d'Afrique de l'Ouest",
      isFavorite: false,
    },
    {
      _id: "e002",
      title: "Randonnée dans le Fouta-Djalon",
      location: "Région du Fouta",
      eventImage: randonnee,
      price: "25.000 Fcfa",
      category: "excursion",
      date: "17-18 mai 2025",
      rating: 4.5,
      review: "587 avis",
      description: "Découverte des paysages magnifiques du Fouta-Djalon",
      isFavorite: true,
    },
    {
      _id: "e003",
      title: "Conférence sur l'Entrepreneuriat",
      location: "Dakar, UCAD",
      eventImage: conference,
      price: "Gratuit",
      category: "conference",
      date: "20 mai 2025",
      rating: 4.2,
      review: "312 avis",
      description: "Rencontrez des entrepreneurs à succès du Sénégal",
      isFavorite: false,
    },
    {
      _id: "e004",
      title: "Soirée à Just 4 U",
      location: "Dakar",
      eventImage: boite_nuit,
      price: "10.000 Fcfa",
      category: "nightlife",
      date: "Tous les vendredis",
      rating: 4.7,
      review: "1879 avis",
      description: "Musique live et ambiance garantie",
      isFavorite: true,
    },
    {
      _id: "e005",
      title: "Journée à la plage de Saly",
      location: "Mbour",
      eventImage: plage,
      price: "5.000 Fcfa",
      category: "plage",
      date: "Tous les weekends",
      rating: 4.6,
      review: "2451 avis",
      description: "Détente, sports nautiques et animations",
      isFavorite: false,
    },
    {
      _id: "e006",
      title: "Tournoi de Beach Soccer",
      location: "Plage de Yoff",
      eventImage: sport,
      price: "2.000 Fcfa",
      category: "sport",
      date: "25 mai 2025",
      rating: 4.3,
      review: "423 avis",
      description: "Compétition amicale de beach soccer",
      isFavorite: false,
    },
    {
      _id: "e007",
      title: "Atelier de Création Artisanale",
      location: "Village des Arts",
      eventImage: atelier,
      price: "8.000 Fcfa",
      category: "atelier",
      date: "22 mai 2025",
      rating: 4.4,
      review: "189 avis",
      description: "Apprenez les techniques traditionnelles de tissage",
      isFavorite: true,
    },
    {
      _id: "e008",
      title: "Cours de Cuisine Sénégalaise",
      location: "Centre-ville Dakar",
      eventImage: cours_cuisine,
      price: "12.000 Fcfa",
      category: "atelier",
      date: "19 mai 2025",
      rating: 4.9,
      review: "213 avis",
      description: "Apprenez à préparer un thieboudienne parfait",
      isFavorite: false,
    },
    {
      _id: "e009",
      title: "Visite Guidée de Gorée",
      location: "Île de Gorée",
      eventImage: sortie_culturelle,
      price: "15.000 Fcfa",
      category: "culture",
      date: "Tous les jours",
      rating: 4.8,
      review: "1526 avis",
      description: "Découverte historique de l'île de Gorée",
      isFavorite: true,
    },
    {
      _id: "e010",
      title: "Excursion au Lac Rose",
      location: "Lac Retba",
      eventImage: excursion,
      price: "20.000 Fcfa",
      category: "excursion",
      date: "16 mai 2025",
      rating: 4.7,
      review: "987 avis",
      description: "Visite du fameux lac rose et balade en 4x4",
      isFavorite: false,
    },
  ];

  // Filtrer les événements selon la catégorie sélectionnée
  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Appbar */}
      <View style={{ height: 100, marginTop: 5 }}>
        <Appbar
          top={50}
          left={20}
          right={20}
          title={"Découvrez les événements"}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Catégories */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray,
          marginBottom: 10,
        }}
      >
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {/* Liste des événements */}
      <FlatList
        data={filteredEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
            <View style={styles.eventCard}>
              {/* Image et image de couverture */}
              <Image
                source={item.eventImage}
                style={styles.eventImage}
                resizeMode="cover"
              />
              
              {/* Badge de catégorie */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {categories.find(cat => cat.id === item.category)?.label || item.category}
                </Text>
              </View>
              
              {/* Informations sur l'événement */}
              <View style={styles.eventInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  {item.isFavorite ? (
                    <MaterialIcons name="favorite" size={24} color={COLORS.red} />
                  ) : (
                    <MaterialIcons name="favorite-border" size={24} color={COLORS.gray} />
                  )}
                </View>
                
                <View style={styles.detailsRow}>
                  <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color={COLORS.green_accueil} />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <MaterialIcons name="event" size={16} color={COLORS.green_accueil} />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
                
                <Text style={styles.description}>{item.description}</Text>
                
                <View style={styles.bottomRow}>
                  <View style={styles.ratingContainer}>
                    <Rating
                      rating={item.rating}
                      maxStars={5}
                      stars={item.rating}
                      bordered={false}
                      color={"#FD9942"}
                    />
                    <Text style={styles.reviewText}>{item.review}</Text>
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate("EventDetails", { eventId: item._id })}
                >
                  <Text style={styles.buttonText}>Voir les détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};


export default ExploreEvents;

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 180,
  },
  categoryBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: COLORS.green_accueil,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  eventInfo: {
    padding: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    flex: 1,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  button: {
    backgroundColor: COLORS.green_button_back,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  }
});