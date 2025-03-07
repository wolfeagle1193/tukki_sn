import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import styles from "./CategoryGrid.style";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryGrid = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
    >
      {categories.map((item) => (
        <View key={item.id} style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item.id && styles.selectedCategoryItem,
            ]}
            onPress={() => onSelectCategory(item.id)}
          >
            <MaterialIcons name={item.icon} size={24} color="black" />
          </TouchableOpacity>
          {/* Ajoutez une View pour le label avec une marge en haut */}
          <View style={styles.labelContainer}>
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoryGrid;