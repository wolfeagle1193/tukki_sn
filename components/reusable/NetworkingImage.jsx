import { StyleSheet, Image } from "react-native";
import React from "react";

const NetworkingImage = ({ source, width, height, radius }) => {
  return (
    <Image 
      source={source} // Utilisez 'source' au lieu de 'src'
      style={styles.image(width, height, radius)} 
    />
  );
};

export default NetworkingImage;

const styles = StyleSheet.create({
  image: (width, height, radius) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: "cover",
  }),
});