
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assurez-vous d'importer la bibliothèque d'icônes
import ReusableText from './ReusableText'; // Assurez-vous d'importer ReusableText
import WidthSpacer from './WidthSpacer'; // Assurez-vous d'importer WidthSpacer
import { COLORS, SIZES } from '../constants/Theme'; // Assurez-vous d'importer les constantes

const ProfileTile = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <View style={styles.container}>
        {/* Icône de gauche avec titre */}
        <View style={styles.leftSection}>
          <AntDesign name={icon} size={20} color={COLORS.black} />
          <WidthSpacer width={10} />
          <ReusableText
            text={title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>

        {/* Icône de droite */}
        <AntDesign name="right" size={20} color={COLORS.black} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2, // Ombre pour Android
    shadowColor: COLORS.black, // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileTile;
