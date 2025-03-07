import { StyleSheet } from "react-native";
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
export default stylesTopTab;
