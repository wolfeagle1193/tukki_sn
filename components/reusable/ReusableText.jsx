/*import { StyleSheet, Text } from "react-native";
import React from "react";

const ReusableText = ({ text, family, size, color, align, style,margin={} }) => {
  return (
    <Text style={styles.textStyle(family, size, color, align, margin,style)}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, margin,style) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    marginTop: margin.marginTop || 0, // Utilise marginTop spécifié ou 0
    marginBottom: margin.marginBottom || 0, // Utilise marginBottom ou 0
    marginLeft: margin.marginLeft || 0, // Utilise marginLeft ou 0
    marginRight: margin.marginRight || 0, // Utilise marginRight ou 0
    style:style
   
  }),
});
*/

import { StyleSheet, Text } from "react-native";
import React from "react";

const ReusableText = ({ text, family, size, color, align, style, margin = {} }) => {
  return (
    <Text style={[styles.textStyle(family, size, color, align, margin),style]}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, margin) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    marginTop: margin.marginTop || 0,
    marginBottom: margin.marginBottom || 0,
    marginLeft: margin.marginLeft || 0,
    marginRight: margin.marginRight || 0,
  }),
});
/*import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/Theme";

const ReusableText = ({
  text,
  family,
  size,
  color,
  align,
  style,
  margin = {},
  numberOfLines = 3, // Nouvelle propriété pour définir le nombre de lignes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text
        style={[styles.textStyle(family, size, color, align, margin), style]}
        numberOfLines={isExpanded ? undefined : numberOfLines} // Limite les lignes
      >
        {text}
      </Text>
      <TouchableOpacity onPress={toggleText}>
        <Text style={styles.toggleText}>
          {isExpanded ? "Afficher moins" : "Afficher plus"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, margin) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    marginTop: margin.marginTop || 0,
    marginBottom: margin.marginBottom || 0,
    marginLeft: margin.marginLeft || 0,
    marginRight: margin.marginRight || 0,
  }),
  toggleText: {
    color: COLORS.green_accueil, // Couleur du texte pour "Afficher plus/moins"
    marginTop: 5,
  },
});*/