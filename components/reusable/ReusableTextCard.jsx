import { StyleSheet, Text } from "react-native";
import React from "react";


const ReusableTextCard = ({ text, family, size, color }) => {
    return (
      <Text
        style={{
          fontFamily: family,
          fontSize: size,
          color: color,
          textShadowColor: "rgba(0, 0, 0, 0.3)", // Ombre du texte
          textShadowOffset: { width: 1, height: 1},
          textShadowRadius: 1,
          letterSpacing: 0.5, // Espacement des lettres
        }}
      >
        {text}
      </Text>
    );
  };

  export default ReusableTextCard;

