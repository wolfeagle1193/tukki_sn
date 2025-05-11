
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { COLORS, TEXT } from "../constants/Theme.js";
import ReusableText from "../reusable/ReusableText.jsx";
import HeightSpacer from "../reusable/HeightSpacer.jsx";
import { useNavigation } from "@react-navigation/native";

const Actualites = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MainplacesDetails", item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* Image sans opacité pour une meilleure netteté */}
          <Image
            source={item.placeImage}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Overlay semi-transparent pour le contraste */}
          <View style={styles.overlay} />
          <ReusableText
            text={item.name}
            family={"medium"}
            size={TEXT.xsmall}
            color={COLORS.white}
            align={"center"}
            style={styles.textOverlay}
          />
        </View>
        <HeightSpacer height={3} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 118,
  },
  imageContainer: {
    width: 118,
    height: 160,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Ajustez l'opacité ici si nécessaire
    zIndex: 1,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 3, // Ajoutez un padding gauche
    right: 3, // Ajoutez un padding droit
    textAlign: 'center',
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontSize: TEXT.xsmall,
    fontFamily: 'medium',
    zIndex: 2,
  },
});

export default Actualites;

