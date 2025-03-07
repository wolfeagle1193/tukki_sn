import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Header = () => {
  return (
    <View
      style={{
        backgroundColor: "green",
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 25,
          padding: 6,
        }}
      >
        <Ionicons name="bed-outline" size={26} color="#ffffff" />
        <Text
          style={{
            marginLeft: 6,
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            textAlign:"center" ,
          }}
        >
          Réservations 
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
         
        }}
      >
        <MaterialIcons name="hotel" size={26} color="white" />
        <Text
          style={{
            marginLeft: 6,
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            textAlign:"center"
          }}
        >
          Logements
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
         
        }}
      >
       <FontAwesome name="circle-thin" size={26} color="white" /> 
        <Text
          style={{
            marginLeft: 6,
            fontWeight: "bold",
            color: "white",
            fontSize: 10
          }}
        >
        Loisirs 
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
        
        }}
      >
        
        <AntDesign name="calendar" size={26} color="white" />
        <Text
          style={{
            marginLeft: 6,
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            
          }}
        >
          Evènements
          
        </Text>
      </Pressable>
    </View>
  );
  
};

export default Header;

const styles = StyleSheet.create({});
