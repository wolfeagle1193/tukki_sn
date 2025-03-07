import { StyleSheet } from "react-native";
import { COLORS } from "../../components/constants/Theme"; // Assurez-vous que ces constantes sont définies

const styles = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  categoryItem: {
    width: 80,
    height: 48,
    backgroundColor:"#F5F5F5" ,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 0,
  },
  selectedCategoryItem: {
    borderColor: COLORS.green_button_back,
    borderWidth: 3,
  },
  labelContainer: {
    marginTop: 8, // Espace entre l'icône et le label
    alignItems: "center", // Centre le label horizontalement
  },
  categoryLabel: {
    color: COLORS.green_accueil,
    textAlign: "center",
    maxWidth: 80,
    fontSize: 12,
  },
});

export default styles;