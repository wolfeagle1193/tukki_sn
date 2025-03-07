
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

const logements = require("../../assets/images/services_icon/logement_one.png");
const accessibility = require("../../assets/images/services_icon/bus.png");
const administration = require("../../assets/images/services_icon/administration.png");
const restaurants = require("../../assets/images/services_icon/kitchen.png");
const loisirs = require("../../assets/images/services_icon/leisure_goree.png");
const touristicguide = require("../../assets/images/services_icon/guide_touristique.png");

const Services = ({ onImagePress }) => {
  const images = [
    { src: logements, title: "Hébergement", description: "Trouvez votre logement" },
    { src: accessibility, title: "Accessibilité", description: "Reservez votre ticket" },
    { src: administration, title: "Administration", description: "Nous le faisons pour vous" },
    { src: restaurants, title: "Restaurants", description: "10% de reduction sur l'application" },
    { src: loisirs, title: "Loisirs", description: "Decouvrez et Reservez" },
    { src: touristicguide, title: "Guide Touristique", description: "Choisir votre guide" },
  ];

  return (
    <View style={styles.container}>
      {images.map(({ src, title, description }, id) => (
        <TouchableOpacity key={id} style={styles.box} onPress={() => onImagePress(id)}>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={src}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  box: {
    width: "48%",
    height: 120, // Hauteur réduite pour un aspect carré
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    padding: 5, // Ajustement du padding pour éviter le débordement
  },
  image: {
    width: "100%",
    height: "55%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 3,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    marginBottom:4
  },
});