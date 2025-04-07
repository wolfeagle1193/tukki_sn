import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Share,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../components/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const PaymentConfirmationScreen = ({ navigation, route }) => {
  // Récupération des données de réservation et de paiement
  const { reservationData, paymentMethod } = route.params;
  
  // Animation pour le succès
  const successAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.9)).current;
  
  // Référence pour l'animation Lottie
  const lottieRef = useRef(null);
  
  // Générer un numéro de réservation unique
  const reservationNumber = `SGNB-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Date de paiement
  const paymentDate = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  
  useEffect(() => {
    // Démarrer les animations
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    
    Animated.sequence([
      Animated.timing(successAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeInAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);
  
  // Formatage des données
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // Partager les détails de la réservation
  const shareReservation = async () => {
    try {
      await Share.share({
        message: `J'ai réservé ${reservationData.room.title} du ${formatDate(reservationData.startDate)} au ${formatDate(reservationData.endDate)} à l'Hôtel Sainte-Geneviève. Numéro de réservation: ${reservationNumber}`,
        title: "Ma réservation à l'Hôtel Sainte-Geneviève",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Retourner à l'accueil
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };
  
  // Voir les détails de la réservation
  const handleViewDetails = () => {
    navigation.navigate("ReservationDetails", {
      reservationData,
      reservationNumber,
      paymentMethod,
      paymentDate,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.green_accueil}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.emptyLeft} />
        <Text style={styles.headerTitle}>Confirmation</Text>
        <View style={styles.emptyRight} />
      </View>

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Animation de succès */}
        <Animated.View
          style={[
            styles.successContainer,
            {
              opacity: successAnimation,
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <View style={styles.successCircle}>
            <LottieView
              ref={lottieRef}
              source={require("../../assets/animations/success.json")}
              style={styles.successAnimation}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={styles.successTitle}>Paiement réussi!</Text>
          <Text style={styles.successSubtitle}>
            Votre réservation a été confirmée
          </Text>
        </Animated.View>

        {/* Carte de détails de la réservation */}
        <Animated.View
          style={[
            styles.reservationCard,
            {
              opacity: fadeInAnimation,
              transform: [
                {
                  translateY: fadeInAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <MaterialIcons name="check-circle" size={22} color={COLORS.green_accueil} />
            <Text style={styles.cardHeaderText}>Détails de la réservation</Text>
          </View>
          
          <View style={styles.reservationNumberContainer}>
            <Text style={styles.reservationNumberLabel}>Numéro de réservation</Text>
            <Text style={styles.reservationNumber}>{reservationNumber}</Text>
          </View>
          
          <View style={styles.roomDetails}>
            <Image
              source={reservationData.room.image}
              style={styles.roomThumbnail}
              resizeMode="cover"
            />
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{reservationData.room.title}</Text>
              <View style={styles.dateRangeContainer}>
                <MaterialIcons
                  name="date-range"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.dateRange}>
                  {formatDate(reservationData.startDate)} -{" "}
                  {formatDate(reservationData.endDate)}
                </Text>
              </View>
              <View style={styles.guestContainer}>
                <MaterialIcons
                  name="people"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.guestText}>
                  {reservationData.adults} adulte
                  {reservationData.adults > 1 ? "s" : ""}
                  {reservationData.children > 0
                    ? `, ${reservationData.children} enfant${
                        reservationData.children > 1 ? "s" : ""
                      }`
                    : ""}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.paymentDetailsSection}>
            <Text style={styles.sectionTitle}>Détails du paiement</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Méthode</Text>
              <View style={styles.paymentMethodContainer}>
                <MaterialIcons
                 /*name={paymentMethod.icon}*/
                  size={16}
                  /*color={paymentMethod.color}*/
                  style={styles.paymentIcon}
                />
                <Text style={styles.detailValue}>{/*{paymentMethod.name}*/}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{paymentDate}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Montant</Text>
              <Text style={styles.detailValuePrice}>
                {formatPrice(reservationData.totalPrice)} <Text style={styles.currency}>FCFA</Text>
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Statut</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Payé</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.thankyouSection}>
            <MaterialIcons name="favorite" size={20} color="#FF6B6B" />
            <Text style={styles.thankyouText}>
              Merci d'avoir choisi l'Hôtel Sainte-Geneviève
            </Text>
          </View>
        </Animated.View>
        
        {/* Instructions */}
        <Animated.View
          style={[
            styles.instructionsCard,
            {
              opacity: fadeInAnimation,
              transform: [
                {
                  translateY: fadeInAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.instructionsTitle}>Que faire maintenant?</Text>
          
          <View style={styles.instructionItem}>
            <MaterialIcons name="email" size={22} color={COLORS.green_accueil} />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Un email de confirmation a été envoyé à votre adresse
              </Text>
            </View>
          </View>
          
          <View style={styles.instructionItem}>
            <MaterialIcons name="info" size={22} color={COLORS.green_accueil} />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Présentez votre numéro de réservation lors de votre arrivée à l'hôtel
              </Text>
            </View>
          </View>
          
          <View style={styles.instructionItem}>
            <MaterialIcons name="access-time" size={22} color={COLORS.green_accueil} />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                L'heure d'arrivée est à partir de 14h00 et le départ jusqu'à 12h00
              </Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Espace supplémentaire pour éviter que les boutons fixes ne cachent du contenu */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Boutons fixes en bas */}
      <Animated.View
        style={[
          styles.fixedBottomSection,
          {
            opacity: fadeInAnimation,
            transform: [
              {
                translateY: fadeInAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={shareReservation}
        >
          <MaterialIcons name="share" size={22} color={COLORS.green_accueil} />
          <Text style={styles.secondaryButtonText}>Partager</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.mainButton}
          onPress={handleViewDetails}
        >
          <LinearGradient
            colors={[COLORS.green_accueil, "#0f7d3b"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.mainButtonText}>Voir les détails</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoHome}
        >
          <MaterialIcons name="home" size={22} color="#666" />
          <Text style={styles.homeButtonText}>Accueil</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    height: 40,
    backgroundColor: COLORS.green_accueil,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  emptyLeft: {
    width: 40,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  // Section animation succès
  successContainer: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f7f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  successAnimation: {
    width: 120,
    height: 120,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.green_accueil,
    marginBottom: 5,
  },
  successSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  // Carte de détails de réservation
  reservationCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
 

    //suite
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      },
      cardHeaderText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 8,
      },
      reservationNumberContainer: {
        backgroundColor: "#f0f7f0",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
      },
      reservationNumberLabel: {
        fontSize: 13,
        color: "#666",
        marginBottom: 2,
      },
      reservationNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.green_accueil,
      },
      roomDetails: {
        flexDirection: "row",
        marginBottom: 15,
      },
      roomThumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
      },
      roomInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "center",
      },
      roomName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
      },
      dateRangeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
      },
      dateRange: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
      },
      guestContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
      },
      guestText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
      },
      divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 15,
      },
      paymentDetailsSection: {
        marginBottom: 15,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
      },
      detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      detailLabel: {
        fontSize: 14,
        color: "#666",
      },
      detailValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
      },
      detailValuePrice: {
        fontSize: 16,
        color: COLORS.green_accueil,
        fontWeight: "bold",
      },
      currency: {
        fontSize: 14,
        fontWeight: "normal",
      },
      paymentMethodContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      paymentIcon: {
        marginRight: 5,
      },
      statusBadge: {
        backgroundColor: "#E6F4EA",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
      },
      statusText: {
        color: "#0B8043",
        fontSize: 12,
        fontWeight: "bold",
      },
      thankyouSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF8E1",
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
      },
      thankyouText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#333",
        fontStyle: "italic",
      },
      // Carte d'instructions
      instructionsCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      instructionsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
      },
      instructionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      },
      instructionTextContainer: {
        flex: 1,
        marginLeft: 10,
      },
      instructionText: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
      },
      // Boutons fixes en bas
      fixedBottomSection: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
      },
      secondaryButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#f0f7f0",
        borderWidth: 1,
        borderColor: COLORS.green_accueil,
      },
      secondaryButtonText: {
        fontSize: 14,
        color: COLORS.green_accueil,
        fontWeight: "500",
        marginLeft: 5,
      },
      mainButton: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      },
      gradientButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
      },
      mainButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 5,
      },
      homeButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#ddd",
      },
      homeButtonText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
        marginLeft: 5,
      },
      // Espacement supplémentaire en bas
      bottomSpacer: {
        height: 80,
      },
    });
    
    export default PaymentConfirmationScreen;