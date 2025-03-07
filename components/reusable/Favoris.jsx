import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AvailabilityIcon = ({ isAvailable }) => {
  return (
    <View>
      {isAvailable ? (
        <MaterialIcons name="check-circle" size={24} color="green" />
      ) : (
        <MaterialIcons name="cancel" size={24} color="red" />
      )}
    </View>
  );
};

export default AvailabilityIcon;