import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./components"; // Vérifiez cette importation
/*import BottomTabs from "./components/navigation/ButtomTabNavigation"; // Vérifiez également ici*/
import { OnBoarding,Roomdetails, Search, Mainplacesdetails, Hotelsdetails,EventsfullList,HotelsfullList, Regiondetails,HotelSearch, Payments, Settings, SelectRoom } from "./screens";


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
    return null; // Afficher un écran de chargement ou rien tant que les polices ne sont pas chargées
  }

  // Vérifiez si onBoarding est défini
  if (!OnBoarding) {
    console.error("OnBoarding is undefined");
    return null; // ou un écran de chargement
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard"
          component={OnBoarding}
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
          name="SearchHotel"
          component={HotelSearch}
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
          name="Hotelslist"
          component={HotelsfullList}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Hotelsdetails"
          component={Hotelsdetails}
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
});
