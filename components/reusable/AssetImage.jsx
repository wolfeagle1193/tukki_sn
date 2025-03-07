
/*import { StyleSheet, Image } from "react-native";
import React from "react";

const AssetImage = ({ source, width, height, radius,resizeMode ,style}) => {
  return (
    <Image 
      source={source} // Utilisez 'source' au lieu de 'src'
      style={styles.image(width, height, radius,resizeMode)} 
    />
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  image: (width, height, radius,resizeMode) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: resizeMode,
  }),
});*/
import { StyleSheet, Image } from "react-native";
import React from "react";

const AssetImage = ({ source, width, height, radius, resizeMode, style }) => {
  return (
    <Image
      source={source} // Utilisez 'source' au lieu de 'src'
      style={[styles.image(width, height, radius, resizeMode), style]} // Ajoutez la prop 'style'
    />
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  image: (width, height, radius, resizeMode) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: resizeMode,
  }),
});