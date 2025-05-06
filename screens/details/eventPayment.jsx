import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Appbar, HeightSpacer, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { MaterialIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const BookEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const [selectedOption, setSelectedOption] = useState("solo");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Custom date picker modal
  const [dateModalVisible, setDateModalVisible] = useState(false);
  
  // Paiement
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Date options - generate next 30 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const dateOptions = generateDateOptions();

  // Calculer le prix total en fonction de l'option et de la quantité
  const calculateTotalPrice = () => {
    if (selectedOption === "solo") {
      return parseFloat(event.price.solo.replace(/[^\d]/g, "")) * quantity;
    } else if (selectedOption === "couple") {
      return parseFloat(event.price.couple.replace(/[^\d]/g, ""));
    } else if (selectedOption === "group") {
      return parseFloat(event.price.group.replace(/[^\d]/g, "")) * quantity;
    }
    return 0;
  };

  // Formatage du prix pour l'affichage
  const formatPrice = (price) => {
    return `${price.toLocaleString()} Fcfa`;
  };

  // Ouvrir le modal de paiement
  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };

  // Traiter le paiement
  const processPayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Erreur", "Veuillez sélectionner une méthode de paiement");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 8) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide");
      return;
    }

    // Simuler le traitement du paiement
    setProcessingPayment(true);
    
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentModalVisible(false);
      
      // Afficher la confirmation
      Alert.alert(
        "Confirmation de réservation",
        `Votre réservation pour ${event.title} est confirmée pour le ${selectedDate.toLocaleDateString()}.\n\nPaiement effectué via ${selectedPaymentMethod} (${phoneNumber}).\n\nTotal: ${formatPrice(calculateTotalPrice() + 1000)}`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
    }, 2000);
  };

  // Custom date formatter
  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Appbar personnalisée */}
      <Appbar
        top={Platform.OS === "ios" ? 10 : 30}
        left={20}
        right={20}
        title={"Réserver un événement"}
        color={COLORS.green_accueil}
        icon={"left"}
        color1={COLORS.black}
        onPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info événement */}
        <View style={styles.eventInfoContainer}>
          <Image source={event.eventImage} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.infoRow}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons
                name="event"
                size={16}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>
          </View>
        </View>

        <HeightSpacer height={20} />

        {/* Options de prix */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choisir votre option</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "solo" && styles.selectedOptionCard,
              ]}
              onPress={() => setSelectedOption("solo")}
            >
              <View
                style={[
                  styles.optionIconContainer,
                  { backgroundColor: COLORS.green_accueil },
                ]}
              >
                <FontAwesome name="user" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.optionTitle}>Solo</Text>
              <Text style={styles.optionPrice}>{event.price.solo}</Text>
              {selectedOption === "solo" && (
                <View style={styles.checkIconContainer}>
                  <AntDesign name="check" size={16} color={COLORS.white} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "couple" && styles.selectedOptionCard,
              ]}
              onPress={() => setSelectedOption("couple")}
            >
              <View
                style={[
                  styles.optionIconContainer,
                  { backgroundColor: COLORS.pink },
                ]}
              >
                <FontAwesome name="users" size={24} color={COLORS.white} />
              </View>
              <Text style={styles.optionTitle}>Couple</Text>
              <Text style={styles.optionPrice}>{event.price.couple}</Text>
              {selectedOption === "couple" && (
                <View style={styles.checkIconContainer}>
                  <AntDesign name="check" size={16} color={COLORS.white} />
                </View>
              )}
            </TouchableOpacity>

            {event.price.group && (
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedOption === "group" && styles.selectedOptionCard,
                ]}
                onPress={() => setSelectedOption("group")}
              >
                <View
                  style={[
                    styles.optionIconContainer,
                    { backgroundColor: COLORS.purple },
                  ]}
                >
                  <FontAwesome name="group" size={24} color={COLORS.white} />
                </View>
                <Text style={styles.optionTitle}>Groupe</Text>
                <Text style={styles.optionPrice}>{event.price.group}</Text>
                {selectedOption === "group" && (
                  <View style={styles.checkIconContainer}>
                    <AntDesign name="check" size={16} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <HeightSpacer height={20} />

        {/* Sélection de quantité */}
        {selectedOption !== "couple" && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {selectedOption === "solo" ? "Nombre de billets" : "Nombre de personnes"}
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <AntDesign name="minus" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <AntDesign name="plus" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <HeightSpacer height={20} />

        {/* Sélection de date - Nouveau composant qui remplace DateTimePicker */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choisir une date</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setDateModalVisible(true)}
          >
            <MaterialIcons name="calendar-today" size={24} color={COLORS.green_accueil} />
            <Text style={styles.dateText}>
              {formatDate(selectedDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <HeightSpacer height={20} />

        {/* Inclusions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ce qui est inclus</Text>
          {event.inclusions.map((item, index) => (
            <View key={index} style={styles.inclusionItem}>
              <AntDesign name="check" size={16} color={COLORS.green_accueil} />
              <Text style={styles.inclusionText}>{item}</Text>
            </View>
          ))}
        </View>

        <HeightSpacer height={20} />

        {/* Récapitulatif de prix */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {selectedOption === "solo"
                ? `Billet Solo x ${quantity}`
                : selectedOption === "couple"
                ? "Billet Couple"
                : `Billet Groupe x ${quantity}`}
            </Text>
            <Text style={styles.summaryValue}>
              {formatPrice(calculateTotalPrice())}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frais de service</Text>
            <Text style={styles.summaryValue}>1.000 Fcfa</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatPrice(calculateTotalPrice() + 1000)}
            </Text>
          </View>
        </View>

        {/* Information de paiement */}
        <View style={styles.paymentInfoContainer}>
          <MaterialIcons name="info-outline" size={20} color={COLORS.blue} />
          <Text style={styles.paymentInfoText}>
            Nous acceptons le paiement mobile via Orange Money, Wave et autres portefeuilles mobiles
          </Text>
        </View>

        <HeightSpacer height={100} />
      </ScrollView>

      {/* Modal de sélection de date personnalisé */}
      <Modal
        transparent={true}
        visible={dateModalVisible}
        animationType="slide"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner une date</Text>
              <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                <AntDesign name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dateScrollView}>
              {dateOptions.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateOption,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDateOption
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setDateModalVisible(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.dateOptionText,
                      selectedDate.toDateString() === date.toDateString() && styles.selectedDateText
                    ]}
                  >
                    {formatDate(date)}
                  </Text>
                  {selectedDate.toDateString() === date.toDateString() && (
                    <AntDesign name="check" size={20} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de paiement */}
      <Modal
        transparent={true}
        visible={paymentModalVisible}
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un mode de paiement</Text>
              <TouchableOpacity onPress={() => setPaymentModalVisible(false)}>
                <AntDesign name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.paymentMethodsContainer}>
              <Text style={styles.paymentMethodTitle}>Mobile Money</Text>
              
              <TouchableOpacity
                style={[
                  styles.paymentMethodCard,
                  selectedPaymentMethod === "Orange Money" && styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Orange Money")}
              >
                <View style={[styles.paymentIconContainer, { backgroundColor: "#FF6600" }]}>
                  <MaterialCommunityIcons name="cellphone" size={24} color={COLORS.white} />
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>Orange Money</Text>
                  <Text style={styles.paymentMethodDesc}>Paiement rapide et sécurisé</Text>
                </View>
                {selectedPaymentMethod === "Orange Money" && (
                  <AntDesign name="check" size={20} color={COLORS.green_accueil} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.paymentMethodCard,
                  selectedPaymentMethod === "Wave" && styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Wave")}
              >
                <View style={[styles.paymentIconContainer, { backgroundColor: "#1DB3E7" }]}>
                  <Fontisto name="wallet" size={24} color={COLORS.white} />
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>Wave</Text>
                  <Text style={styles.paymentMethodDesc}>Sans frais supplémentaires</Text>
                </View>
                {selectedPaymentMethod === "Wave" && (
                  <AntDesign name="check" size={20} color={COLORS.green_accueil} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.paymentMethodCard,
                  selectedPaymentMethod === "Moov Money" && styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod("Moov Money")}
              >
                <View style={[styles.paymentIconContainer, { backgroundColor: "#5C2D91" }]}>
                  <MaterialCommunityIcons name="wallet-outline" size={24} color={COLORS.white} />
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>Moov Money</Text>
                  <Text style={styles.paymentMethodDesc}>Paiement sécurisé</Text>
                </View>
                {selectedPaymentMethod === "Moov Money" && (
                  <AntDesign name="check" size={20} color={COLORS.green_accueil} />
                )}
              </TouchableOpacity>
              
              <View style={styles.phoneInputContainer}>
                <Text style={styles.phoneInputLabel}>Numéro de téléphone</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Entrez votre numéro"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
              
              <View style={styles.totalContainer}>
                <Text style={styles.totalPaymentLabel}>Total à payer:</Text>
                <Text style={styles.totalPaymentValue}>{formatPrice(calculateTotalPrice() + 1000)}</Text>
              </View>
              
              <ReusableBtn
                onPress={processPayment}
                btnText={processingPayment ? "Traitement en cours..." : "Payer maintenant"}
                width={SIZES.width - 80}
                backgroundColor={COLORS.green_button_back}
                borderColor={COLORS.green_button_back}
                borderWidth={0}
                textColor={COLORS.white}
                disabled={processingPayment}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bouton de confirmation fixe en bas */}
      <View style={styles.confirmButtonContainer}>
        <ReusableBtn
          onPress={openPaymentModal}
          btnText={"Procéder au paiement"}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  eventInfoContainer: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.verylightgray,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.verylightgray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  optionCard: {
    width: "31%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    position: "relative",
  },
  selectedOptionCard: {
    borderColor: COLORS.green_accueil,
    borderWidth: 2,
    shadowColor: COLORS.green_accueil,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.black,
  },
  checkIconContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: COLORS.green_accueil,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    borderRadius: 8,
    paddingVertical: 10,
    width: "50%",
    alignSelf: "center",
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.verylightgray,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    borderRadius: 8,
    paddingVertical: 15,
    backgroundColor: COLORS.verylightgray,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.black,
    fontWeight: "500",
  },
  inclusionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inclusionText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 10,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 20,
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.verylightgray,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  paymentInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBlue,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  paymentInfoText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginLeft: 10,
    flex: 1,
  },
  confirmButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightgray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  dateScrollView: {
    maxHeight: 400,
  },
  dateOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.verylightgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDateOption: {
    backgroundColor: COLORS.green_accueil,
    borderRadius: 8,
    marginVertical: 2,
  },
  dateOptionText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedDateText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  // Styles pour le modal de paiement
  paymentMethodsContainer: {
    paddingBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray,
    marginBottom: 15,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: COLORS.green_accueil,
    borderWidth: 2,
    backgroundColor: COLORS.verylightgray,
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 4,
  },
  paymentMethodDesc: {
    fontSize: 12,
    color: COLORS.gray,
  },
  phoneInputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  phoneInputLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.verylightgray,
  },
  totalPaymentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  totalPaymentValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
});