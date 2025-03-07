/*import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { TEXT } from '../constants/Theme'

const DescriptionText = ({lines,text}) => {
  return (
    
      <Text numberOfLines={lines} style={styles.description}>{text}</Text>
    
  )
}

export default DescriptionText

const styles = StyleSheet.create({
    description :{
        paddingVertical:10,
        fontFamily:"regular",
        textAlign:"justify",
        fontSize:TEXT.medium
        
    }
})*/

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, TEXT } from '../constants/Theme';

const DescriptionText = ({ lines = 6, text }) => {
  const [currentLines, setCurrentLines] = useState(lines); // État pour gérer le nombre de lignes
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    if (currentLines === lines) {
      setCurrentLines(undefined); // Affiche tout le texte
      setIsExpanded(true);
    } else {
      setCurrentLines(lines); // Limite à 6 lignes
      setIsExpanded(false);
    }
  };

  return (
    <View>
      <Text numberOfLines={currentLines} style={styles.description}>
        {text}
      </Text>
      <TouchableOpacity onPress={toggleText} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {isExpanded ? "Afficher moins" : "Afficher plus"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DescriptionText;

const styles = StyleSheet.create({
  description: {
    paddingVertical: 10,
    fontFamily: "regular",
    textAlign: "justify",
    fontSize: TEXT.medium,
  },
  toggleButton: {
    marginTop: 5,
  },
  toggleText: {
    color: COLORS.header_screen, // Couleur du texte pour "Afficher plus/moins"
  },
});