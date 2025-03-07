import React from "react";
import { View, TouchableOpacity } from "react-native";
import stylesImage_Grid from "./Images_rooms.style"; // Assurez-vous que le chemin est correct
import AssetImage from "./AssetImage"; // Assurez-vous que le chemin est correct

const ImageGrid = ({
  images,
  selectedImage,
  onSelectImage,
  bottom,
  left,
  right,
}) => {
  return (
    <View
      style={[
        stylesImage_Grid.imageContainer,
        stylesImage_Grid.overlay(bottom, left, right), // Correction ici
      ]}
    >
      {images.map((imageSrc, index) => (
        <TouchableOpacity
          key={index}
          style={[
            stylesImage_Grid.imageItem,
            selectedImage === index && stylesImage_Grid.selectedImageItem,
          ]}
          onPress={() => onSelectImage(index)}
        >
          <AssetImage
            source={imageSrc} // Utilisez l'image source directement
            width={"100%"}
            height={"100%"}
            radius={5}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ImageGrid;
