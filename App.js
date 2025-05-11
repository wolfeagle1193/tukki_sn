


/*import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs, AuthNavigation } from "./components";

// Import OnBoarding directly instead of from a barrel file
 // Make sure the path is correct!

import {
  
  PrivateRoomDetails,
  VillaDetails,
  ApartmentDetails,
  RoomBookingCard,
  EventDetails,
  PaymentFailureScreen,
  PaymentConfirmationScreen,
  PaymentScreen,
   OnBoard, 
  Roomdetails,
  Search,
  Mainplacesdetails,
  Hotelsdetails,
  EventsfullList,
  HotelsfullList,
  Regiondetails,
  HotelSearch,
  Payments,
  Settings,
  SelectRoom,
  ReservationCard,
  BookEvent,
  HebergementScreen,
  ReserveApartment,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/times_new_roman.ttf"),
    medium: require("./assets/fonts/times new roman medium.otf"),
    italic: require("./assets/fonts/times new roman italic.ttf"),
    light: require("./assets/fonts/timesnewroman_light.ttf"),
    bold: require("./assets/fonts/times new roman bold.ttf"),
    extrabold: require("./assets/fonts/timesnewroman-extrabold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null; // Display loading screen or nothing until fonts are loaded
  }

  // No need to check if OnBoarding exists - we're importing it directly
  // Remove this check as it's causing the error
  /*
  if (!OnBoarding) {
    console.error("OnBoarding is undefined");
    return null;
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard"
          component={OnBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name="Bottom"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Searchecran"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomBookingPrivate"
          component={PrivateRoomDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hebergement"
          component={HebergementScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookApartment"
          component={ReserveApartment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchHotel"
          component={HotelSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApartmentDetails"
          component={ApartmentDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomBooking"
          component={RoomBookingCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VillaDetails"
          component={VillaDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainplacesDetails"
          component={Mainplacesdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelsDetails"
          component={Hotelsdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Eventslist"
          component={EventsfullList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookEvent"
          component={BookEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hotelslist"
          component={HotelsfullList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Regiondetails"
          component={Regiondetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectRoom"
          component={SelectRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Roomdetails"
          component={Roomdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReservationCard"
          component={ReservationCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paiements"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmationHotels"
          component={PaymentConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FailureHotel"
          component={PaymentFailureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payments"
          component={Payments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});*/


import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs, AuthNavigation } from "./components";
import { AuthProvider } from './context'; // Importation de l'AuthProvider

// Import OnBoarding directly instead of from a barrel file
 // Make sure the path is correct!

import {
  
  PrivateRoomDetails,
  VillaDetails,
  ApartmentDetails,
  RoomBookingCard,
  EventDetails,
  PaymentFailureScreen,
  PaymentConfirmationScreen,
  PaymentScreen,
   OnBoard, 
  Roomdetails,
  Search,
  Mainplacesdetails,
  Hotelsdetails,
  EventsfullList,
  HotelsfullList,
  Regiondetails,
  HotelSearch,
  Payments,
  Settings,
  SelectRoom,
  ReservationCard,
  BookEvent,
  HebergementScreen,
  ReserveApartment,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/times_new_roman.ttf"),
    medium: require("./assets/fonts/times new roman medium.otf"),
    italic: require("./assets/fonts/times new roman italic.ttf"),
    light: require("./assets/fonts/timesnewroman_light.ttf"),
    bold: require("./assets/fonts/times new roman bold.ttf"),
    extrabold: require("./assets/fonts/timesnewroman-extrabold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null; // Display loading screen or nothing until fonts are loaded
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboard"
            component={OnBoard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
         
          <Stack.Screen
            name="Bottom"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Searchecran"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoomBookingPrivate"
            component={PrivateRoomDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Hebergement"
            component={HebergementScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookApartment"
            component={ReserveApartment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchHotel"
            component={HotelSearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApartmentDetails"
            component={ApartmentDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoomBooking"
            component={RoomBookingCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VillaDetails"
            component={VillaDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainplacesDetails"
            component={Mainplacesdetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HotelsDetails"
            component={Hotelsdetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Eventslist"
            component={EventsfullList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookEvent"
            component={BookEvent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Hotelslist"
            component={HotelsfullList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Regiondetails"
            component={Regiondetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectRoom"
            component={SelectRoom}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Roomdetails"
            component={Roomdetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReservationCard"
            component={ReservationCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Paiements"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmationHotels"
            component={PaymentConfirmationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FailureHotel"
            component={PaymentFailureScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payments"
            component={Payments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});



/*import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from './context'; // Importation de l'AuthProvider

// Importez uniquement OnBoard pour commencer
import { OnBoard } from "./screens";

// Créez un composant placeholder simple pour les écrans que nous n'importons pas encore
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name} Screen</Text>
    <Text style={{ marginTop: 10 }}>Écran temporaire pour déboguer les importations</Text>
  </View>
);

const Stack = createNativeStackNavigator();

// Empêcher le SplashScreen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/times_new_roman.ttf"),
    medium: require("./assets/fonts/times new roman medium.otf"),
    italic: require("./assets/fonts/times new roman italic.ttf"),
    light: require("./assets/fonts/timesnewroman_light.ttf"),
    bold: require("./assets/fonts/times new roman bold.ttf"),
    extrabold: require("./assets/fonts/timesnewroman-extrabold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) {
    return null; // Display loading screen or nothing until fonts are loaded
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboard"
            component={OnBoard}
            options={{ headerShown: false }}
          />
          {/* Utilisez des composants placeholder pour les écrans problématiques 
          <Stack.Screen
            name="Auth"
            component={() => <PlaceholderScreen name="Auth" />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bottom"
            component={() => <PlaceholderScreen name="Bottom" />}
            options={{ headerShown: false }}
          />
          {/* Ajoutez d'autres écrans placeholder au besoin 
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});*/
