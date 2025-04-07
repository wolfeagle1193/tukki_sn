/*import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
 

 /* const roomdetail = {
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
*/


/*import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

const Roomdetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const goree = require("../../assets/images/incontournables/gore.jpg");
const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");
  
  // Images de la chambre d'hôtel
  const roomImages = [
    goree,
    artsvillage,
    divinityMosquee,
    ngorIsle,
    RenaissancePlace,
    phareMamellesplace,
  ];

  // Prix par nuit
  const pricePerNight = "120.000";
  
  // Caractéristiques de la chambre
  const roomFeatures = [
    { icon: 'square-foot', label: 'Superficie', value: '24m²' },
    { icon: 'hotel', label: 'Type', value: 'Single Room' },
    { icon: 'person', label: 'Capacité', value: '1-2 personnes' },
  ];
  
  // Équipements dans la chambre
  const roomEquipments = [
    { icon: 'tv', label: 'TV LCD' },
    { icon: 'ac-unit', label: 'Climatisation' },
    { icon: 'wifi', label: 'Wi-Fi gratuit' },
    { icon: 'coffee', label: 'Machine à café' },
    { icon: 'iron', label: 'Fer à repasser' },
    { icon: 'access-time', label: 'Réveil' },
  ];
  
  // Commodités de l'hôtel
  const hotelAmenities = [
    { icon: 'pool', label: 'Piscine' },
    { icon: 'fitness-center', label: 'Salle de sport' },
    { icon: 'restaurant', label: 'Restaurant' },
    { icon: 'spa', label: 'Spa' },
    { icon: 'local-parking', label: 'Parking' },
    { icon: 'room-service', label: 'Service de chambre' },
  ];
  
  // Gérer le changement d'image
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header fixe avec image principale *//*
      <View style={styles.fixedHeader}>
        <Image 
          source={{ uri: roomImages[currentImageIndex] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        {/* Miniatures pour changer d'image *
        <View style={styles.thumbnailContainer}>
          {roomImages.map((image, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleImageChange(index)}
              style={[
                styles.thumbnailButton,
                currentImageIndex === index && styles.activeThumbnail
              ]}
            >
              <Image 
                source={{ uri: image }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Contenu défilant *
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Section Généralités *
        <View style={styles.generalSection}>
          <Text style={styles.sectionTitle}>Généralités</Text>
          <View style={styles.featuresContainer}>
            {roomFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name={feature.icon} size={24} color={COLORS.green_accueil} />
                <Text style={styles.featureLabel}>{feature.label}</Text>
                <Text style={styles.featureValue}>{feature.value}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Équipements de la chambre *
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Équipements de la chambre</Text>
          <View style={styles.amenitiesContainer}>
            {roomEquipments.map((equipment, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={equipment.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{equipment.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Commodités de l'hôtel *
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commodités de l'hôtel</Text>
          <View style={styles.amenitiesContainer}>
            {hotelAmenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={amenity.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Description *
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Profitez d'un séjour confortable dans notre chambre élégante et bien aménagée. 
            La chambre offre tout le confort nécessaire pour un séjour agréable, avec une 
            vue imprenable et une atmosphère paisible.
          </Text>
        </View>
        
        {/* Espace pour que le contenu ne soit pas caché par le bouton de réservation *
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      {/* Footer fixe avec bouton de réservation et prix *
      <View style={styles.fixedFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix par nuit</Text>
          <Text style={styles.priceValue}>{pricePerNight}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Réserver cette chambre</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};*/

/*const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 240; // Hauteur de l'image et des miniatures
const FOOTER_HEIGHT = 80; // Hauteur du bouton de réservation et du prix

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: StatusBar.currentHeight || 0,
  },
  fixedHeader: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  thumbnailButton: {
    width: 60,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: COLORS.green_accueil,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
    marginBottom: FOOTER_HEIGHT,
  },
  scrollContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  generalSection: {
    marginTop:15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3.5,
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  featureValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  amenityLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  bottomSpace: {
    height: 20,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.green_accueil,
  },
  bookButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 2,
    marginLeft: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Roomdetails;*/

/*import React, { useState, useRef } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

/*const Roomdetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const roomImages = [
    require("../../assets/images/incontournables/gore.jpg"),
    require("../../assets/images/popularplacesDakar/village-des-arts.jpg"),
    require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg"),
    require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg"),
    require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg"),
    require("../../assets/images/popularplacesDakar/phare_mamelles.jpg"),
  ];

  const pricePerNight = "120.000";
  
  const roomFeatures = [
    { icon: 'square-foot', label: 'Superficie', value: '24m²' },
    { icon: 'hotel', label: 'Type', value: 'Single Room' },
    { icon: 'person', label: 'Capacité', value: '1-2 personnes' },
  ];
  
  const roomEquipments = [
    { icon: 'tv', label: 'TV LCD' },
    { icon: 'ac-unit', label: 'Climatisation' },
    { icon: 'wifi', label: 'Wi-Fi gratuit' },
    { icon: 'coffee', label: 'Machine à café' },
    { icon: 'iron', label: 'Fer à repasser' },
    { icon: 'access-time', label: 'Réveil' },
  ];
  
  const hotelAmenities = [
    { icon: 'pool', label: 'Piscine' },
    { icon: 'fitness-center', label: 'Salle de sport' },
    { icon: 'restaurant', label: 'Restaurant' },
    { icon: 'spa', label: 'Spa' },
    { icon: 'local-parking', label: 'Parking' },
    { icon: 'room-service', label: 'Service de chambre' },
  ];
  
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image 
          source={roomImages[currentImageIndex]}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <View style={styles.thumbnailContainer}>
          {roomImages.map((image, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleImageChange(index)}
              style={[
                styles.thumbnailButton,
                currentImageIndex === index && styles.activeThumbnail
              ]}
            >
              <Image 
                source={image}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.generalSection}>
          <Text style={styles.sectionTitle}>Généralités</Text>
          <View style={styles.featuresContainer}>
            {roomFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name={feature.icon} size={24} color={COLORS.green_accueil} />
                <Text style={styles.featureLabel}>{feature.label}</Text>
                <Text style={styles.featureValue}>{feature.value}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Équipements de la chambre</Text>
          <View style={styles.amenitiesContainer}>
            {roomEquipments.map((equipment, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={equipment.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{equipment.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commodités de l'hôtel</Text>
          <View style={styles.amenitiesContainer}>
            {hotelAmenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={amenity.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Profitez d'un séjour confortable dans notre chambre élégante et bien aménagée. 
            La chambre offre tout le confort nécessaire pour un séjour agréable, avec une 
            vue imprenable et une atmosphère paisible.
          </Text>
        </View>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      <View style={styles.fixedFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix par nuit</Text>
          <Text style={styles.priceValue}>{pricePerNight}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Réserver cette chambre</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/*const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 240; 
const FOOTER_HEIGHT = 80; 

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: StatusBar.currentHeight || 0,
  },
  fixedHeader: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  thumbnailButton: {
    width: 60,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: COLORS.green_accueil,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
    marginBottom: FOOTER_HEIGHT,
  },
  scrollContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  generalSection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3.5,
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  featureValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  amenityLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  bottomSpace: {
    height: 20,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.green_accueil,
  },
  bookButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 2,
    marginLeft: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Roomdetails;*/

import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

const Roomdetails = ({navigation}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const roomImages = [
    require("../../assets/images/incontournables/gore.jpg"),
    require("../../assets/images/popularplacesDakar/village-des-arts.jpg"),
    require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg"),
    require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg"),
    require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg"),
    require("../../assets/images/popularplacesDakar/phare_mamelles.jpg"),
  ];

  const pricePerNight = "120.000";

  const roomFeatures = [
    { icon: 'square-foot', label: 'Superficie', value: '24m²' },
    { icon: 'hotel', label: 'Type', value: 'Single Room' },
    { icon: 'person', label: 'Capacité', value: '1-2 personnes' },
   
  ];

  const roomEquipments = [
    { icon: 'tv', label: 'TV LCD' },
    { icon: 'ac-unit', label: 'Climatisation' },
    { icon: 'wifi', label: 'Wi-Fi gratuit' },
    { icon: 'coffee', label: 'Machine à café' },
    { icon: 'iron', label: 'Fer à repasser' },
    { icon: 'access-time', label: 'Réveil' },
  ];

  const hotelAmenities = [
    { icon: 'pool', label: 'Piscine' },
    { icon: 'fitness-center', label: 'Salle de sport' },
    { icon: 'restaurant', label: 'Restaurant' },
    { icon: 'spa', label: 'Spa' },
    { icon: 'local-parking', label: 'Parking' },
    { icon: 'room-service', label: 'Service de chambre' },
  ];

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image 
          source={roomImages[currentImageIndex]}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <View style={styles.thumbnailContainer}>
          {roomImages.map((image, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleImageChange(index)}
              style={[
                styles.thumbnailButton,
                currentImageIndex === index && styles.activeThumbnail
              ]}
            >
              <Image 
                source={image}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.generalSection}>
          <Text style={styles.sectionTitle}>Généralités</Text>
          <View style={styles.featuresContainer}>
            {roomFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name={feature.icon} size={24} color={COLORS.green_accueil} />
                <Text style={styles.featureLabel}>{feature.label}</Text>
                <Text style={styles.featureValue}>{feature.value}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Équipements de la chambre</Text>
          <View style={styles.amenitiesContainer}>
            {roomEquipments.map((equipment, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={equipment.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{equipment.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commodités de l'hôtel</Text>
          <View style={styles.amenitiesContainer}>
            {hotelAmenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name={amenity.icon} size={20} color={COLORS.green_accueil} />
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Profitez d'un séjour confortable dans notre chambre élégante et bien aménagée. 
            La chambre offre tout le confort nécessaire pour un séjour agréable, avec une 
            vue imprenable et une atmosphère paisible.
          </Text>
        </View>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      <View style={styles.fixedFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix par nuit</Text>
          <Text style={styles.priceValue}>{pricePerNight}</Text>
        </View>
        <TouchableOpacity  onPress={() => navigation.navigate("ReservationCard")} style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Réserver cette chambre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 240; 
const FOOTER_HEIGHT = 80; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0, // Suppression de l'espace en haut
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  thumbnailButton: {
    width: 60,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: COLORS.green_accueil,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
    marginBottom: FOOTER_HEIGHT,
  },
  scrollContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  generalSection: {
    marginTop: 110,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3.5,
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  featureValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  amenityLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  bottomSpace: {
    height: 3,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.green_accueil,
  },
  bookButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 2,
    marginLeft: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Roomdetails;