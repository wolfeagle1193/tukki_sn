import { Dimensions } from "react-native";
const {height,width}= Dimensions.get('window');

const COLORS = {
    green_accueil: "#6D9F3D",
    green_button_back: "#4B7F2C",
    green_favoris: "#2A5D34",
    green_profil: "#3D550C",
    gray: "#E5E5E5",
    pink: "#FC4579",
    white: "#FFFFFF",
    black: "#000000",
    header_screen: "linear-gradient(to right, rgba(24, 25, 53, 0.5) 50%, rgba(255, 255, 255, 0.9) 90%, rgba(241, 245, 248, 1) 100%)",
    lightgray:"#696969",
    red:"#B22222",
    lightwhite:"#FFFFF0",
    lightgreen:"#FBFEF8"
};

const SIZES = {
    xxSmall:9,
    xSmall:10,
    small:12,
    medium:16,
    large:20,
    xlarge:24,
    xxlarge:44,
    height,
    width
};
   const TEXT={
    xxsmall:11,
    xsmall:13,
    small:15,
    medium:17,
    large:21,
    xlarge:27,
    xxlarge:32,

   }
    export {COLORS,SIZES,TEXT};