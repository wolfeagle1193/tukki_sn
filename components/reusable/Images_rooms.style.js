import { StyleSheet } from "react-native";
import { COLORS } from "../../components/constants/Theme"; // Assurez-vous que ces constantes sont définies

const stylesImage_Grid = StyleSheet.create({
  overlay: (bottom, left, right) => ({
    position: "absolute",
    bottom: bottom,
    left: left,
    right: right,
  }),
  imageContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginBottom: 12,
    flexDirection: "row",
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    borderWidth:1,
    borderColor:COLORS.green_accueil

  },
  imageItem: {
    width: 52,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 0,
  },
  selectedImageItem: {
    borderColor: COLORS.green_profil,
    borderWidth: 2,
  },
});

export default stylesImage_Grid;
