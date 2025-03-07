import {  View, Image } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";


const user1 = require("../../assets/images/users/user2.jpg");

const bgImage = require("../../assets/images/iconesdeco/profile.jpg");

const Tab = createMaterialTopTabNavigator();
const Toptap = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={() => {}}
          />
          <View style={stylesTopTab.profile}>
            <Image
              source={user1}
              style={stylesTopTab.image}
              onError={() => console.log("Erreur de chargement de l'image")}
            />
            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={"Baltazar Some"}
                  family={"medium"}
                  size={SIZES.large}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={"baltazarsome93@gmail.com"}
                  family={"medium"}
                  size={SIZES.large}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
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
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;

