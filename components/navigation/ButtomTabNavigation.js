import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenu from "../../screens/home/HomeScreenu";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {BookingScreen,ProfileScreen,SavedScreen,PlacesScreen, Success,Failed} from "../../screens";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import Toptap from "./Toptap";
import AuthTopTab from "./AuthTopTab";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          // Couleur de fond du Tab.Navigator
          height: 65, // Hauteur de la barre d'onglets
          // Rembourrage en bas pour centrer les icônes
          width: "100%",
          backgroundColor: "#E5E5E5", // Couleur de fond
          paddingBottom: 10, 
          /* borderBottomLeftRadius: 10, // Arrondi coin inférieur gauche
        borderBottomRightRadius: 10,*/ // Arrondi coin inférieur droit
          position: "absolute", // Assurez-vous que la barre d'onglets est positionnée correctement
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop:15 
        },
        
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreenu}
        options={{
          headerShown: false,

          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.focusedButton}>
                <Feather name="home" size={30} color="white" />
                <Text style={styles.focusedLabel}>Accueil</Text>
              </View>
            ) : (
              <Feather name="home" size={30} color="#6D9F3D" />
            ),
        }}
      />

      <Tab.Screen
        name="Favoris"
        component={AuthTopTab}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.focusedButtonFavoris}>
                <Entypo name="heart-outlined" size={30} color="white" />
                <Text style={styles.focusedLabel}>Favoris</Text>
              </View>
            ) : (
              <Entypo name="heart-outlined" size={30} color="#4B7F2C" />
            ),
        }}
      />

      <Tab.Screen
        name="Réservés"
        component={Success}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.focusedButtonReservations}>
                <Feather name="bell" size={30} color="white" />
                <Text style={styles.focusedLabel}>Réservés</Text>
              </View>
            ) : (
              <Feather name="bell" size={30} color="#2A5D34" />
            ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={Toptap}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.focusedButtonProfil}>
                <Ionicons name="person-outline" size={30} color="white" />
                <Text style={styles.focusedLabel}>Profil</Text>
              </View>
            ) : (
              <Ionicons name="person-outline" size={30} color="#3D550C" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  focusedButton: {
    backgroundColor: "#6D9F3D",
    borderRadius: 40,
    padding: 5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width: 102,
    height: 53,
  },
  focusedLabel: {
    color: "white",
    paddingLeft: 5,
    fontWeight: "bold",
  },

  focusedButtonFavoris: {
    backgroundColor: "#4B7F2C",
    borderRadius: 40,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 102,
    height: 53,
  },
  focusedButtonReservations: {
    borderRadius: 40,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A5D34",
    justifyContent: "center",
    width: 102,
    height: 53,
  },

  focusedButtonProfil: {
    borderRadius: 40,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D550C",
    justifyContent: "center",
    width: 102,
    height: 53,
  },
});
