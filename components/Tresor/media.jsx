import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

const bateau = require("../../assets/images/media/goree/bateau.jpg");
const street = require("../../assets/images/media/goree/street.jpg");
const administration = require("../../assets/images/services_icon/administration.png");
const restaurants = require("../../assets/images/services_icon/kitchen.png");
const loisirs = require("../../assets/images/services_icon/leisure_goree.png");
const touristicguide = require("../../assets/images/services_icon/guide_touristique.png");

const Media = ({ onImagePress }) => {
  const images = [
    {
      src: bateau,
      title: "Hébergement",
      description: "Trouvez votre logement",
    },
    {
      src: street,
      title: "Accessibilité",
      description: "Reservez votre ticket",
    },
  ];

  return (
    <View style={styles.container}>
      {images.map(({ src, title, description }, id) => (
        <TouchableOpacity
          key={id}
          style={styles.box}
          onPress={() => onImagePress(id)}
        >
        
          <Image source={src} style={styles.image} resizeMode="cover" />
          <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  box: {
    width: "48%",
    height: 200, // Hauteur réduite pour un aspect carré
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    
    
    borderRadius: 20,
    padding: 0, // Ajustement du padding pour éviter le débordement
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
 
  description: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
});
