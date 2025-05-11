

import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/Theme";
import Signin from "../../screens/Authentication/signin";
import Registration from "../../screens/Authentication/registration";
import AssetImage from "../reusable/AssetImage";

const Stack = createStackNavigator();
const screenHeight = Dimensions.get('window').height;

const AuthNavigation = () => {
  return (
    <View style={styles.container}>
      {/* Logo fixe en position absolue */}
      <View style={styles.logoWrapper}>
        <AssetImage
          source={require("../../assets/images/tukkisn_logo.png")}
          width={190}
          height={190}
          resizeMode={"contain"}
        />
      </View>
      
      {/* Contenu de la navigation avec margin-top pour laisser place au logo */}
      <View style={styles.contentContainer}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: COLORS.white },
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="Login" component={Signin} />
          <Stack.Screen name="Register" component={Registration} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoWrapper: {
    position: 'absolute',
    top: '0.8%',
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    height: 100,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 120, // Laisse de l'espace pour le logo (100px hauteur + 20px padding)
  }
});

export default AuthNavigation;
