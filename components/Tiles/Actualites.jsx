/*import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, TEXT } from "../constants/Theme.js";
import NetworkingImage from "../reusable/NetworkingImage.jsx";
import ReusableText from "../reusable/ReusableText.jsx";
import HeightSpacer from "../reusable/HeightSpacer.jsx";
import { useNavigation } from "@react-navigation/native";

const Actualites = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("MainplacesDetails",item)}>
      <View style={styles.container}>
        <NetworkingImage
          source={item.placeImage}
          width={118}
          height={160}
          radius={25}
        />
        <HeightSpacer height={5} />
        <ReusableText
          text={item.name} // Utilisez le nom de l'élément ici
          family={"medium"}
          size={TEXT.xsmall}
          color={COLORS.black}
          align={"center"}
        />
        <HeightSpacer height={3}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width:118
  },
});

export default Actualites;*/
/*import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, TEXT } from "../constants/Theme.js";
import NetworkingImage from "../reusable/NetworkingImage.jsx";
import ReusableText from "../reusable/ReusableText.jsx";
import HeightSpacer from "../reusable/HeightSpacer.jsx";
import { useNavigation } from "@react-navigation/native";

const Actualites = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MainplacesDetails", item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <NetworkingImage
            source={item.placeImage}
            width={118}
            height={160}
            radius={25}
            resizeMode="cover" // Assurez-vous que l'image est en mode cover
          />
          <ReusableText
            text={item.name} // Utilisez le nom de l'élément ici
            family={"medium"}
            size={TEXT.xsmall}
            color={COLORS.black} // Changez la couleur pour qu'elle soit visible sur l'image
            align={"center"}
            style={styles.textOverlay} // Style pour positionner le texte
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
    overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bords arrondis
    position: 'relative', // Pour positionner le texte par rapport à l'image
  },
  textOverlay: {
    position: 'absolute',
    bottom: 5, // Ajustez pour positionner le texte
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default Actualites;
*/

/*import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, TEXT } from "../constants/Theme.js";
import NetworkingImage from "../reusable/NetworkingImage.jsx";
import ReusableText from "../reusable/ReusableText.jsx";
import HeightSpacer from "../reusable/HeightSpacer.jsx";
import { useNavigation } from "@react-navigation/native";

const Actualites = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MainplacesDetails", item)}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <NetworkingImage
            source={item.placeImage}
            width={118}
            height={160}
            radius={25}
            resizeMode="cover"
          />
          <ReusableText
            text={item.name}
            family={"medium"}
            size={TEXT.xsmall}
            color={COLORS.white} // Assurez-vous que la couleur est visible
            align={"center"}
            style={styles.textOverlay} // Utilisation du style overlay
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
    overflow: "hidden",
    position: "relative",
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center"
  },
});

export default Actualites;*/

/*import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, TEXT } from "../constants/Theme.js";
import NetworkingImage from "../reusable/NetworkingImage.jsx";
import ReusableText from "../reusable/ReusableText.jsx";
import HeightSpacer from "../reusable/HeightSpacer.jsx";
import { useNavigation } from "@react-navigation/native";

const Actualites = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MainplacesDetails", item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <NetworkingImage
            source={item.placeImage}
            width={118}
            height={160}
            radius={25}
            resizeMode="cover"
          />
          {/* Overlay semi-transparent }
          /*<View style={styles.overlay} />
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur noire avec 50% d'opacité
    zIndex: 1, // Assurez-vous que l'overlay est au-dessus de l'image
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: TEXT.xsmall,
    fontFamily: 'medium',
    zIndex: 2, // Assurez-vous que le texte est au-dessus de l'overlay
  },
});

export default Actualites;*/

/*import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
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
          {/* Image avec effet de luminosité }
          <Image
            source={item.placeImage}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Overlay semi-transparent }
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
    opacity: 0.7, // Réduit l'opacité pour simuler une luminosité plus faible
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Ajustez l'opacité ici si nécessaire
    zIndex: 1, // Assurez-vous que l'overlay est au-dessus de l'image
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontSize: TEXT.xsmall,
    fontFamily: 'medium',
    zIndex: 2, // Assurez-vous que le texte est au-dessus de l'overlay
  },
});

export default Actualites;
*/
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

