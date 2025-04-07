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
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../components/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const PaymentFailureScreen = ({ navigation, route }) => {
  // Récupération des données de réservation et de paiement
  const { reservationData, paymentMethod, errorCode, errorMessage } =
    route.params;

  // Animation pour l'échec
  const failureAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.9)).current;

  // Référence pour l'animation Lottie
  const lottieRef = useRef(null);

  // Date de la tentative de paiement
  const paymentAttemptDate = new Date().toLocaleDateString("fr-FR", {
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
      Animated.timing(failureAnimation, {
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

  // Contacter le support
  const contactSupport = () => {
    Alert.alert(
      "Contacter le support",
      "Vous allez être redirigé vers notre service client.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Appeler",
          onPress: () => console.log("Appel au support"),
        },
      ]
    );
  };

  // Retourner à l'accueil
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  // Réessayer le paiement
  const handleRetryPayment = () => {
    navigation.navigate("PaymentScreen", {
      reservationData,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.red_error} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.red_error }]}>
        <View style={styles.emptyLeft} />
        <Text style={styles.headerTitle}>Échec du paiement</Text>
        <View style={styles.emptyRight} />
      </View>

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Animation d'échec */}
        <Animated.View
          style={[
            styles.failureContainer,
            {
              opacity: failureAnimation,
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <View style={styles.failureCircle}>
            <LottieView
              ref={lottieRef}
              source={require("../../assets/animations/failure.json")}
              style={styles.failureAnimation}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={styles.failureTitle}>Paiement échoué</Text>
          <Text style={styles.failureSubtitle}>
            Votre réservation n'a pas pu être confirmée
          </Text>
        </Animated.View>

        {/* Carte de détails de l'erreur */}
        <Animated.View
          style={[
            styles.errorCard,
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
            <MaterialIcons name="error" size={22} color={COLORS.red_error} />
            <Text style={styles.cardHeaderText}>Détails de l'erreur</Text>
          </View>

          <View style={styles.errorCodeContainer}>
            <Text style={styles.errorCodeLabel}>Code d'erreur</Text>
            <Text style={styles.errorCode}>
              {errorCode || "ERR-PAYMENT-01"}
            </Text>
          </View>

          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessageLabel}>Message</Text>
            <Text style={styles.errorMessage}>
              {errorMessage ||
                "Votre transaction n'a pas pu être complétée. Veuillez vérifier vos informations de paiement et réessayer."}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.attemptDetailsSection}>
            <Text style={styles.sectionTitle}>Détails de la tentative</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{paymentAttemptDate}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Méthode</Text>
              <View style={styles.paymentMethodContainer}>
                <MaterialIcons
                  name="credit-card"
                  size={16}
                  color="#666"
                  style={styles.paymentIcon}
                />
                <Text style={styles.detailValue}>
                  {paymentMethod?.name || "Carte bancaire"}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Montant</Text>
              <Text style={styles.detailValuePrice}>
                {formatPrice(reservationData.totalPrice)}{" "}
                <Text style={styles.currency}>FCFA</Text>
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Statut</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Échoué</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Résumé de la réservation */}
        <Animated.View
          style={[
            styles.reservationSummaryCard,
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
          <Text style={styles.sectionTitle}>Résumé de la réservation</Text>

          <View style={styles.roomDetails}>
            <Image
              source={reservationData.room.image}
              style={styles.roomThumbnail}
              resizeMode="cover"
            />
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{reservationData.room.title}</Text>
              <View style={styles.dateRangeContainer}>
                <MaterialIcons name="date-range" size={16} color="#666" />
                <Text style={styles.dateRange}>
                  {formatDate(reservationData.startDate)} -{" "}
                  {formatDate(reservationData.endDate)}
                </Text>
              </View>
              <View style={styles.guestContainer}>
                <MaterialIcons name="people" size={16} color="#666" />
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
            <MaterialIcons name="refresh" size={22} color={COLORS.red_error} />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Vous pouvez réessayer le paiement avec la même méthode ou
                essayer une autre méthode de paiement
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <MaterialIcons
              name="credit-card"
              size={22}
              color={COLORS.red_error}
            />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Vérifiez les informations de votre carte et assurez-vous que
                vous avez suffisamment de fonds
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <MaterialIcons
              name="headset-mic"
              size={22}
              color={COLORS.red_error}
            />
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionText}>
                Si le problème persiste, contactez notre service client ou votre
                banque
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
          onPress={contactSupport}
        >
          <MaterialIcons
            name="headset-mic"
            size={22}
            color={COLORS.red_error}
          />
          <Text
            style={[styles.secondaryButtonText, { color: COLORS.red_error }]}
          >
            Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={handleRetryPayment}
        >
          <LinearGradient
            colors={[COLORS.red_error, "#c41c1c"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.mainButtonText}>Réessayer</Text>
            <MaterialIcons name="refresh" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
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
    backgroundColor: COLORS.red_error,
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
  // Section animation échec
  failureContainer: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  failureCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  failureAnimation: {
    width: 120,
    height: 120,
  },
  failureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.red_error,
    marginBottom: 5,
  },
  failureSubtitle: {
    fontSize: 14,
    color: "#666",
  },

  // Carte de détails d'erreur
  errorCard: {
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
  errorCodeContainer: {
    backgroundColor: "#fff0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorCodeLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  errorCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.red_error,
  },
  errorMessageContainer: {
    backgroundColor: "#fff8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.red_error,
  },
  errorMessageLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  attemptDetailsSection: {
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
    color: COLORS.red_error,
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
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Résumé de la réservation
  reservationSummaryCard: {
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
    backgroundColor: "#fff0f0",
    borderWidth: 1,
    borderColor: COLORS.red_error,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: COLORS.red_error,
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

export default PaymentFailureScreen;
