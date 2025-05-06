/*import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Sign } from "crypto-browserify";
import { COLORS } from "../constants/Theme";
import HeightSpacer from "../reusable/HeightSpacer";
import AssetImage from "../reusable/AssetImage";
import signin from "../../screens/Authentication/signin";
import registration from "../../screens/Authentication/registration";

const Tab = createMaterialTopTabNavigator();

const AuthTopTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightgray }}>
      <ScrollView>
        <HeightSpacer height={0} />
        <AssetImage
          source={require("../../assets/images/iconesdeco/background.jpg")}
          width={"100%"}
          height={325}
          resizeMode={"cover"}
        />
        <View style={{height:600}}>
          <Tab.Navigator
           screenOptions={{
                      tabBarActiveTintColor: COLORS.green_accueil,
                      tabBarInactiveTintColor: COLORS.lightgray,
                      animationEnabled:false,//tres important pour que le trait d 'activite se fasse bien
                      tabBarIndicatorStyle: {
                        backgroundColor: COLORS.green_accueil,
                      },
                    }}
          >
            <Tab.Screen name="Se Connecter" component={signin} />
            <Tab.Screen name="Inscription" component={registration} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthTopTab;

const styles = StyleSheet.create({});*/


/*import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/Theme";
import Signin from "../../screens/Authentication/signin";
import Registration from "../../screens/Authentication/registration";
import AssetImage from "../reusable/AssetImage";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AssetImage
          source={require("../../assets/images/tukkisn_logo.png")}
          width={"100%"}
          height={150} // Hauteur réduite pour laisser plus de place aux formulaires
          resizeMode={"contain"}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: COLORS.white }
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
  imageContainer: {
    width: "100%",
    height: 50, // Correspondant à la hauteur de l'image
    flex:1, 
    justifyContent: "center",   // Centrer horizontalement
    alignItems: "center",         
  },
  formContainer: {
    flex: 1,
  }
});

export default AuthNavigation;*/

/*import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/Theme";
import Signin from "../../screens/Authentication/signin";
import Registration from "../../screens/Authentication/registration";
import AssetImage from "../reusable/AssetImage";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AssetImage
          source={require("../../assets/images/tukkisn_logo.png")}
          width={"100%"}
          height={180}
          resizeMode={"contain"}
        />
      </View>
      
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.white }
        }}
      >
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Register" component={Registration} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default AuthNavigation;*/


/*import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/Theme";
import Signin from "../../screens/Authentication/signin";
import Registration from "../../screens/Authentication/registration";
import AssetImage from "../reusable/AssetImage";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <AssetImage
            source={require("../../assets/images/tukkisn_logo.png")}
            width={"80%"}
            height={150}
            resizeMode={"contain"}
          />
        </View>
        
        <View style={styles.navigationContainer}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: COLORS.white }
            }}
          >
            <Stack.Screen name="Login" component={Signin} />
            <Stack.Screen name="Register" component={Registration} />
          </Stack.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  navigationContainer: {
    flex: 1,
  }
});

export default AuthNavigation;*/


/*import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/Theme";
import Signin from "../../screens/Authentication/signin";
import Registration from "../../screens/Authentication/registration";
import AssetImage from "../reusable/AssetImage";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AssetImage
          source={require("../../assets/images/tukkisn_logo.png")}
          width={"80%"}
          height={120}
          resizeMode={"contain"}
        />
      </View>
      
      <View style={styles.stackContainer}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: COLORS.white },
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
  logoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  stackContainer: {
    flex: 1,
  }
});

export default AuthNavigation;*/


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
