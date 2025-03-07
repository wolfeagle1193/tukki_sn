import { StyleSheet, ScrollView, View } from "react-native";
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

const styles = StyleSheet.create({});
