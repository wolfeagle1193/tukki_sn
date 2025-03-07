import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProfileTile } from "../../components";

const TopInfo = ({navigation}) => {
  return (
    <View style={{ margin: 20 }}>
      <TouchableOpacity>
        <View>
          <ProfileTile title={"Infos personnelles"} icon={"user"} />
          <ProfileTile title={"Paiements"} icon={"creditcard"} onPress={() => navigation.navigate("Payments") }/>
          <ProfileTile title={"Parametres"} icon={"setting"} onPress={() => navigation.navigate("Settings") } />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopInfo;

const styles = StyleSheet.create({});
