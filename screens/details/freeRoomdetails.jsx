import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-stock-star-rating";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Constantes pour les couleurs et tailles (cohérentes avec le code d'origine)
const COLORS = {
  primary: "#4CAF50",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#666666",
  lightGray: "#EEEEEE",
  pink: "#FF6B81",
  orange: "#FD9942",
  darkGray: "#333333",
};

const SIZES = {
  padding: 15,
  radius: 15,
};

const { width } = Dimensions.get('window');

const RoomBookingCard = ({ navigation, room }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Exemple de données pour une chambre
  const roomData = room || {
    _id: "room123456",
    title: "Chambre Deluxe Vue sur Mer",
    description: "Chambre spacieuse et élégante avec vue panoramique sur l'océan Atlantique. Inclut un lit king-size, une salle de bain privée avec douche à l'italienne, et un balcon privé.",
    placeImage: require("../../assets/images/1.jpg"),
    images: [
      require("../../assets/images/users/user1.jpg"),
      require("../../assets/images/users/user2.jpg"),
      require("../../assets/images/users/user2.jpg"),
    ],
    rating: 4.8,
    review: "48 avis",
    location: "Hôtel Teranga Palace - Dakar, Sénégal",
    price: 95000,
    facilities: ["WiFi", "Climatisation", "TV", "Mini-bar", "Coffre-fort"],
    capacity: {
      adults: 2,
      children: 1,
    },
    availability: {
      start: "2025-05-01T00:00:00.000Z",
      end: "2025-08-31T00:00:00.000Z",
    },
    mealOptions: ["Petit-déjeuner inclus", "Demi-pension (+15000 FCFA)", "Pension complète (+30000 FCFA)"],
    checkIn: "14:00",
    checkOut: "12:00",
    cancellationPolicy: "Annulation gratuite jusqu'à 48h avant l'arrivée",
  };

  // Format date string for display
  const formatDateRange = () => {
    const startDate = new Date(roomData.availability.start);
    const endDate = new Date(roomData.availability.end);
    
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {/* Image principale de la chambre */}
      <View style={styles.imageContainer}>
        <Image 
          source={roomData.placeImage}
          style={styles.roomImage}
          resizeMode="cover"
        />
        
        {/* Badge de disponibilité */}
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>Disponible</Text>
        </View>
        
        {/* Bouton Favori */}
        <TouchableOpacity 
          onPress={toggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorite && { backgroundColor: COLORS.pink }
          ]}
        >
          <MaterialIcons 
            name={isFavorite ? "favorite" : "favorite-border"} 
            size={24} 
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      
      {/* Informations sur la chambre */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.roomTitle}>{roomData.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{roomData.price.toLocaleString()} FCFA</Text>
            <Text style={styles.priceLabel}>par nuit</Text>
          </View>
        </View>
        
        {/* Localisation */}
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
          <Text style={styles.locationText}>{roomData.location}</Text>
        </View>
        
        {/* Note et avis */}
        <View style={styles.ratingContainer}>
          <Rating
            maxStars={5}
            stars={roomData.rating}
            bordered={false}
            color={COLORS.orange}
            size={16}
          />
          <Text style={styles.reviewsText}>({roomData.review})</Text>
        </View>
        
        {/* Capacité de la chambre */}
        <View style={styles.capacityContainer}>
          <View style={styles.capacityItem}>
            <MaterialIcons name="person" size={16} color={COLORS.primary} />
            <Text style={styles.capacityText}>{roomData.capacity.adults} adultes</Text>
          </View>
          {roomData.capacity.children > 0 && (
            <View style={styles.capacityItem}>
              <MaterialIcons name="child-care" size={16} color={COLORS.primary} />
              <Text style={styles.capacityText}>{roomData.capacity.children} enfant</Text>
            </View>
          )}
        </View>
        
        {/* Caractéristiques/Équipements */}
        <View style={styles.facilitiesContainer}>
          {roomData.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityItem}>
              <Ionicons 
                name={
                  facility === "WiFi" ? "wifi" : 
                  facility === "Climatisation" ? "snow" : 
                  facility === "TV" ? "tv" : 
                  facility === "Mini-bar" ? "wine" : 
                  facility === "Coffre-fort" ? "lock-closed" : "checkmark-circle"
                } 
                size={12} 
                color={COLORS.primary} 
              />
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>
        
        {/* Informations importantes */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="event-available" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Disponibilité: </Text>
              {formatDateRange()}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Check-in/out: </Text>
              {roomData.checkIn} - {roomData.checkOut}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="restaurant" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Repas: </Text>
              {roomData.mealOptions[0]}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="event-busy" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Annulation: </Text>
              {roomData.cancellationPolicy.split(' ')[0]} {roomData.cancellationPolicy.split(' ')[1]}
            </Text>
          </View>
        </View>
        
        {/* Boutons d'action */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate("RoomDetails", { roomId: roomData._id })}
          >
            <Text style={styles.detailsButtonText}>Voir détails</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate("BookRoom", { roomId: roomData._id })}
          >
            <Text style={styles.bookButtonText}>Réserver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: SIZES.padding,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  reviewsText: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.gray,
  },
  capacityContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  capacityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  capacityText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 4,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  facilityText: {
    fontSize: 11,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  infoSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 6,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  detailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: width * 0.3,
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: width * 0.3,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RoomBookingCard;