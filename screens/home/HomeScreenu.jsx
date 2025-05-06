import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style.js";
import ReusableText from "../../components/reusable/ReusableText.jsx";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT, SIZES } from "../../components/constants/Theme.js";
import styles from "./home.style.js";
import HeightSpacer from "../../components/reusable/HeightSpacer.jsx";
import Mainplaces_store from "../../components/Home/Mainplaces_store.jsx";
import PlacesbyregionStore from "../../components/Home/PlacesbyregionStore.jsx";
import ActualitesStore from "../../components/Home/ActualitesStore.jsx";
import BestHotels from "../../components/Home/BestHotels.jsx";
import Eventsdata from "../../components/Home/Eventsdata.jsx";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={Reusable.container}>
      <View>
        <View style={Reusable.rowWithSpace("space-between")}>
          <ReusableText
            text={"Salut !"}
            family={"regular"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Searchecran")}
            style={[styles.box,{backgroundColor:"#6D9F3D"}]}
          >
            <AntDesign // Assurez-vous que le nom du composant est correct
              name="search1"
              size={TEXT.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.medium} />
        <ReusableText
          text={"Merveilles du Sénégal"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <Mainplaces_store />

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Destinations par Région"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlacesbyregionStore />
        <HeightSpacer height={SIZES.small} />
        <Eventsdata/>
        <HeightSpacer height={SIZES.small} />
        <BestHotels/>
       
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
