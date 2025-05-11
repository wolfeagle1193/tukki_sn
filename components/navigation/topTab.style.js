/*import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor:COLORS.white,
    borderWidth:2,
    borderRadius:90
  },
  name :{
    backgroundColor :COLORS.white,
    borderRadius:14,
    padding:7
  }
});
export default stylesTopTab;*/


/*import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25, // Centré verticalement
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15, // Plus d'espace horizontal
    maxWidth: "80%", // Limiter la largeur pour conserver le design
  }
});

export default stylesTopTab;*/



/*import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15,
    maxWidth: "80%",
  }
});

export default stylesTopTab;*/


/*import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white, // Fond blanc par défaut
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90,
    position: 'absolute', // Pour permettre le fallback
  },
  // Nouveau style pour le conteneur de fallback
  fallbackContainer: {
    width: '100%',
    height: '100%', 
    borderRadius: 90,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour l'initiale de l'utilisateur
  initialText: {
    fontSize: TEXT.large,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15,
    maxWidth: "80%",
  }
});

export default stylesTopTab;*/


/*import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90,
  },
  // Conteneur pour l'avatar fallback avec initiale
  fallbackContainer: {
    width: '100%',
    height: '100%', 
    borderRadius: 90,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour l'initiale de l'utilisateur
  initialText: {
    fontSize: TEXT.xLarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
    zIndex: 2,
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 2,
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15,
    maxWidth: "80%",
  }
});

export default stylesTopTab;*/



/*import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90,
  },
  // Conteneur pour l'avatar fallback avec initiale
  fallbackContainer: {
    width: '100%',
    height: '100%', 
    borderRadius: 90,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour l'initiale de l'utilisateur
  initialText: {
    fontSize: TEXT.xLarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
    zIndex: 2,
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 2,
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15,
    maxWidth: "80%",
  }
});

export default stylesTopTab;*/

import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../constants/Theme";

const stylesTopTab = StyleSheet.create({
  profile: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 110,
    alignItems: "center",
    zIndex: 10, // S'assurer que le profil est au-dessus
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    overflow: 'hidden', // Assurer que le contenu est contenu dans le cercle
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 90,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Conteneur pour l'avatar fallback avec initiale
  fallbackContainer: {
    width: '100%',
    height: '100%', 
    borderRadius: 90,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  // Style pour l'initiale de l'utilisateur
  initialText: {
    fontSize: TEXT.xLarge,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 90,
    opacity: 0.5,
    zIndex: 5,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 2,
    zIndex: 15, // Plus élevé que l'overlay
  },
  changePhotoTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 15, // Plus élevé que l'overlay
  },
  name: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 7,
    paddingHorizontal: 15,
    maxWidth: "80%",
    elevation: 2, // Ajouter une ombre pour le rendre plus visible
  }
});

export default stylesTopTab;