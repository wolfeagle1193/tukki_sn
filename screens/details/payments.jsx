import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../components/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const PaymentScreen = ({ navigation, route }) => {
  // Récupération des données de réservation
  const reservationData = route?.params?.reservationData || {
    room: {
      title: "Chambre Deluxe",
      price: "120.000",
      image: require("../../assets/images/incontournables/gore.jpg"),
    },
    startDate: "2025-03-20",
    endDate: "2025-03-25",
    nights: 5,
    adults: 2,
    children: 1,
    totalPrice: 600000,
  };

  // État pour le mode de paiement sélectionné
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // État pour les informations de paiement (selon la méthode)
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileOperator, setMobileOperator] = useState(""); // Pour OrangeMoney ou Wave

  // État pour l'animation
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  // Méthodes de paiement disponibles
  const paymentMethods = [
    {
      id: "credit_card",
      name: "Carte de crédit",
      icon: "credit-card",
      description: "Visa, Mastercard, etc.",
      color: "#2d5aaa",
    },
    {
      id: "orange_money",
      name: "Orange Money",
      icon: "phone-android",
      description: "Paiement mobile via Orange",
      color: "#FF6600",
    },
    {
      id: "wave",
      name: "Wave",
      icon: "waves",
      description: "Paiement mobile via Wave",
      color: "#33CCFF",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "account-balance-wallet",
      description: "Paiement sécurisé en ligne",
      color: "#003087",
    },
  ];

  // Fonction pour vérifier la validité des informations de paiement
  const isPaymentValid = () => {
    if (!selectedPaymentMethod) return false;

    switch (selectedPaymentMethod) {
      case "credit_card":
        return (
          cardNumber.length >= 16 &&
          cardName.trim().length > 3 &&
          cardExpiry.length === 5 &&
          cardCvv.length >= 3
        );
      case "orange_money":
      case "wave":
        return mobileNumber.length >= 8;
      case "paypal":
        return true; // Redirection vers PayPal
      default:
        return false;
    }
  };

  // Animation de secouement pour les erreurs
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation pour afficher le formulaire
  useEffect(() => {
    if (selectedPaymentMethod) {
      Animated.timing(fadeInAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeInAnimation.setValue(0);
    }
  }, [selectedPaymentMethod]);

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

  // Formatter l'entrée du numéro de carte
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = [];

    for (let i = 0; i < cleaned.length && i < 16; i++) {
      if (i % 4 === 0 && i > 0) formatted.push(" ");
      formatted.push(cleaned[i]);
    }

    return formatted.join("");
  };

  // Formatter la date d'expiration
  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");

    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    } else if (cleaned.length === 2) {
      return `${cleaned}/`;
    }

    return cleaned;
  };

  // Gestion de la soumission du paiement
  const handleSubmitPayment = () => {
    if (!isPaymentValid()) {
      startShake();
      Alert.alert(
        "Informations incomplètes",
        "Veuillez remplir tous les champs requis pour ce mode de paiement."
      );
      return;
    }

    // Simuler le traitement du paiement
    Alert.alert(
      "Traitement en cours",
      "Votre paiement est en cours de traitement...",
      [
        {
          text: "OK",
          onPress: () => {
            // Simuler un paiement réussi après délai
            setTimeout(() => {
              navigation.navigate("PaymentConfirmation", {
                reservationData,
                paymentMethod: paymentMethods.find(
                  (method) => method.id === selectedPaymentMethod
                ),
              });
            }, 1500);
          },
        },
      ]
    );
  };

  // Fonction pour revenir à l'écran précédent
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Rendu des détails de paiement selon la méthode sélectionnée
  const renderPaymentDetails = () => {
    if (!selectedPaymentMethod) return null;

    return (
      <Animated.View
        style={[
          styles.paymentDetailsContainer,
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
        {selectedPaymentMethod === "credit_card" && (
          <View style={styles.cardInputContainer}>
            <Text style={styles.inputLabel}>Nom sur la carte</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom complet"
                value={cardName}
                onChangeText={setCardName}
                placeholderTextColor="#aaa"
              />
            </View>

            <Text style={styles.inputLabel}>Numéro de carte</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="credit-card"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19} // 16 chiffres + 3 espaces
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.cardExtraRow}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="date-range"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChangeText={(text) =>
                      setCardExpiry(formatExpiryDate(text))
                    }
                    keyboardType="numeric"
                    maxLength={5} // MM/YY
                    placeholderTextColor="#aaa"
                  />
                </View>
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>CVV</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="lock"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={cardCvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                  />
                </View>
              </View>
            </View>

            <View style={styles.securityNote}>
              <MaterialIcons
                name="security"
                size={16}
                color={COLORS.green_accueil}
              />
              <Text style={styles.securityText}>
                Vos informations de paiement sont sécurisées et cryptées
              </Text>
            </View>
          </View>
        )}

        {(selectedPaymentMethod === "orange_money" ||
          selectedPaymentMethod === "wave") && (
          <View style={styles.mobilePaymentContainer}>
            <Text style={styles.inputLabel}>Numéro de téléphone</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Exemple: 77 123 45 67"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.mobileInstructions}>
              <MaterialIcons
                name="info-outline"
                size={20}
                color={
                  selectedPaymentMethod === "orange_money"
                    ? "#FF6600"
                    : "#33CCFF"
                }
              />
              <Text style={styles.instructionsText}>
                {selectedPaymentMethod === "orange_money"
                  ? "Vous recevrez un message de confirmation sur votre téléphone Orange. Veuillez suivre les instructions pour valider le paiement."
                  : "Vous recevrez une notification Wave sur votre téléphone. Veuillez confirmer le paiement dans l'application Wave."}
              </Text>
            </View>

            <View style={styles.serviceIcon}>
              <MaterialIcons
                name={
                  selectedPaymentMethod === "orange_money"
                    ? "phone-android"
                    : "waves"
                }
                size={50}
                color={
                  selectedPaymentMethod === "orange_money"
                    ? "#FF6600"
                    : "#33CCFF"
                }
              />
            </View>
          </View>
        )}

        {selectedPaymentMethod === "paypal" && (
          <View style={styles.paypalContainer}>
            <View style={styles.paypalIcon}>
              <MaterialIcons
                name="account-balance-wallet"
                size={50}
                color="#003087"
              />
            </View>
            <Text style={styles.paypalText}>
              Vous allez être redirigé vers PayPal pour finaliser votre paiement
              de façon sécurisée.
            </Text>
            <Text style={styles.paypalNote}>
              Aucune information bancaire n'est conservée par notre application.
            </Text>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.green_accueil}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement</Text>
        <View style={styles.emptyRight} />
      </View>

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Résumé de la réservation */}
        <View style={styles.reservationSummaryCard}>
          <Text style={styles.cardTitle}>Résumé de votre réservation</Text>

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

              <View style={styles.nightsContainer}>
                <MaterialIcons
                  name="hotel"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.nightsText}>
                  {reservationData.nights} nuit
                  {reservationData.nights > 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.priceSummary}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Prix total</Text>
              <Text style={styles.priceValue}>
                {formatPrice(reservationData.totalPrice)}{" "}
                <Text style={styles.priceUnit}>FCFA</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Options de paiement */}
        <View style={styles.paymentMethodsCard}>
          <Text style={styles.cardTitle}>Choisir un mode de paiement</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodOption,
                selectedPaymentMethod === method.id &&
                  styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View
                style={[
                  styles.methodIconContainer,
                  { backgroundColor: method.color + "20" },
                ]}
              >
                <MaterialIcons
                  name={method.icon}
                  size={24}
                  color={method.color}
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              </View>
              <MaterialIcons
                name={
                  selectedPaymentMethod === method.id
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color={
                  selectedPaymentMethod === method.id
                    ? COLORS.green_accueil
                    : "#999"
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Détails du paiement (formulaire conditionnel) */}
        {renderPaymentDetails()}

        {/* Termes et conditions */}
        <View style={styles.termsContainer}>
          <MaterialIcons name="info-outline" size={16} color="#666" />
          <Text style={styles.termsText}>
            En effectuant ce paiement, vous acceptez nos{" "}
            <Text style={styles.termsLink}>conditions générales</Text> et notre{" "}
            <Text style={styles.termsLink}>politique de confidentialité</Text>.
          </Text>
        </View>

        {/* Espace supplémentaire pour éviter que le bouton fixe ne cache du contenu */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bouton de paiement fixé en bas */}
      <Animated.View
        style={[
          styles.fixedBottomSection,
          { transform: [{ translateX: shakeAnimation }] },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.paymentButton,
            !isPaymentValid() && styles.disabledPaymentButton,
          ]}
          onPress={handleSubmitPayment}
          disabled={!isPaymentValid()}
        >
          <LinearGradient
            colors={
              isPaymentValid()
                ? [COLORS.green_accueil, "#0f7d3b"]
                : ["#aaa", "#888"]
            }
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.paymentButtonText}>Payer maintenant</Text>
            <MaterialIcons name="lock" size={20} color="#fff" />
          </LinearGradient>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
  // Carte de résumé de réservation
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
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
  nightsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nightsText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  priceSummary: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
    marginTop: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: "normal",
  },
  // Carte des méthodes de paiement
  paymentMethodsCard: {
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
  paymentMethodOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  selectedPaymentMethod: {
    borderColor: COLORS.green_accueil,
    backgroundColor: "#f0f7f0",
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 13,
    color: "#666",
  },
  // Détails du paiement
  paymentDetailsContainer: {
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
  // Champs de carte de crédit
  cardInputContainer: {
    marginTop: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: "#333",
  },
  cardExtraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f7f0",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  securityText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  // Style pour les paiements mobiles
  mobilePaymentContainer: {
    marginTop: 5,
  },
  mobileInstructions: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  instructionsText: {
    marginLeft: 5,
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  serviceIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  // Styles spécifiques pour PayPal
  paypalContainer: {
    alignItems: "center",
    padding: 10,
  },
  paypalIcon: {
    marginVertical: 15,
  },
  paypalText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  paypalNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  // Termes et conditions
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    marginHorizontal: 10,
  },
  termsText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  termsLink: {
    color: COLORS.green_accueil,
    textDecorationLine: "underline",
  },
  // Section inférieure fixe
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  paymentButton: {
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
    padding: 15,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  disabledPaymentButton: {
    opacity: 0.7,
  },
  // Espacement supplémentaire en bas
  bottomSpacer: {
    height: 80,
  },
});

export default PaymentScreen;
