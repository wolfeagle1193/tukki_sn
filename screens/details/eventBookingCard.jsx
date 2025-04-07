/*import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Appbar, HeightSpacer, ReusableBtn } from "../../components";
  import { COLORS, SIZES } from "../../components/constants/Theme";
  import {
    MaterialIcons,
    FontAwesome,
    AntDesign,
    Ionicons,
  } from "@expo/vector-icons";
  import DateTimePicker from "@react-native-community/datetimepicker";
  
  const BookEvent = ({ route, navigation }) => {
    const { event } = route.params;
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("solo");
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    });
    const [cardData, setCardData] = useState({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    });
    const [dateOptions, setDateOptions] = useState([]);
    const [selectedDateOption, setSelectedDateOption] = useState(0);
  
    // Calcul du prix en fonction de l'option et du nombre de billets
    useEffect(() => {
      if (!event) return;
  
      let basePrice = 0;
      switch (selectedOption) {
        case "solo":
          basePrice = parseInt(event.price.solo.replace(/[^\d]/g, ""));
          setTotalPrice(basePrice * numberOfTickets);
          break;
        case "couple":
          basePrice = parseInt(event.price.couple.replace(/[^\d]/g, ""));
          setTotalPrice(basePrice);
          break;
        case "group":
          basePrice = parseInt(
            event.price.group.replace(/[^\d]/g, "").split("/")[0]
          );
          setTotalPrice(basePrice * numberOfTickets);
          break;
      }
  
      // Préparation des dates disponibles de l'événement
      if (event.upcomingDates) {
        const dates = event.upcomingDates.map((dateStr) => {
          return {
            label: dateStr,
            value: dateStr.split(" - ")[0],
          };
        });
        setDateOptions(dates);
      }
    }, [event, selectedOption, numberOfTickets]);
  
    const handleInputChange = (field, value) => {
      setFormData({
        ...formData,
        [field]: value,
      });
    };
  
    const handleCardInputChange = (field, value) => {
      setCardData({
        ...cardData,
        [field]: value,
      });
    };
  
    const formatCardNumber = (text) => {
      // Format to #### #### #### ####
      const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      const chunks = [];
  
      for (let i = 0; i < cleaned.length && i < 16; i += 4) {
        chunks.push(cleaned.substring(i, i + 4));
      }
  
      return chunks.join(" ");
    };
  
    const formatExpiryDate = (text) => {
      // Format to MM/YY
      const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      if (cleaned.length <= 2) {
        return cleaned;
      }
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    };
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setSelectedDate(selectedDate);
      }
    };
  
    const decreaseTickets = () => {
      if (numberOfTickets > 1) {
        setNumberOfTickets(numberOfTickets - 1);
      }
    };
  
    const increaseTickets = () => {
      if (selectedOption === "couple") return; // Couple option is always 2 people
      setNumberOfTickets(numberOfTickets + 1);
    };
  
    const submitBooking = () => {
      // Validation basique
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        Alert.alert(
          "Champs obligatoires",
          "Veuillez remplir tous les champs obligatoires."
        );
        return;
      }
  
      if (paymentMethod === "card") {
        if (
          !cardData.cardNumber ||
          !cardData.cardName ||
          !cardData.expiryDate ||
          !cardData.cvv
        ) {
          Alert.alert(
            "Informations de paiement",
            "Veuillez remplir tous les champs de paiement."
          );
          return;
        }
      }
  
      setLoading(true);
  
      // Simuler un délai de traitement
      setTimeout(() => {
        setLoading(false);
        // Navigation vers la confirmation
        navigation.navigate("BookingConfirmation", {
          event,
          booking: {
            ticketOption: selectedOption,
            numberOfTickets,
            totalPrice,
            selectedDate: dateOptions[selectedDateOption]?.label || event.date,
            customerInfo: formData,
            paymentMethod,
          },
        });
      }, 1500);
    };
  
    const renderDateOption = (option, index) => {
      const isSelected = selectedDateOption === index;
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateOption,
            isSelected && { borderColor: COLORS.green_accueil },
          ]}
          onPress={() => setSelectedDateOption(index)}
        >
          <Text style={styles.dateOptionText}>{option.label}</Text>
          {isSelected && (
            <View style={styles.dateSelectedCheckmark}>
              <AntDesign name="check" size={16} color={COLORS.white} />
            </View>
          )}
        </TouchableOpacity>
      );
    };
  
    if (!event) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Chargement...</Text>
        </View>
      );
    }
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.container}>
          {/* Appbar personnalisée 
          <Appbar
            top={50}
            left={20}
            right={20}
            title={"Réservation"}
            color={COLORS.white}
            icon={"left"}
            color1={COLORS.black}
            onPress={() => navigation.goBack()}
          />
  
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Bannière de l'événement 
            <View style={styles.eventBanner}>
              <Image source={event.eventImage} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <View style={styles.eventMetaRow}>
                  <MaterialIcons
                    name="location-on"
                    size={14}
                    color={COLORS.green_accueil}
                  />
                  <Text style={styles.eventMetaText}>{event.location}</Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <MaterialIcons
                    name="event"
                    size={14}
                    color={COLORS.green_accueil}
                  />
                  <Text style={styles.eventMetaText}>{event.date}</Text>
                </View>
              </View>
            </View>
  
            {/* Options de billets 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Options de billets</Text>
  
              <View style={styles.ticketOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.ticketOption,
                    selectedOption === "solo" && styles.selectedTicketOption,
                  ]}
                  onPress={() => setSelectedOption("solo")}
                >
                  <View
                    style={[
                      styles.ticketOptionIcon,
                      selectedOption === "solo" && styles.selectedTicketOptionIcon,
                    ]}
                  >
                    <FontAwesome
                      name="user"
                      size={20}
                      color={
                        selectedOption === "solo" ? COLORS.white : COLORS.gray
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.ticketOptionLabel,
                      selectedOption === "solo" &&
                        styles.selectedTicketOptionLabel,
                    ]}
                  >
                    Solo
                  </Text>
                  <Text style={styles.ticketOptionPrice}>{event.price.solo}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={[
                    styles.ticketOption,
                    selectedOption === "couple" && styles.selectedTicketOption,
                  ]}
                  onPress={() => {
                    setSelectedOption("couple");
                    setNumberOfTickets(1); // Couple is 1 ticket (2 people)
                  }}
                >
                  <View
                    style={[
                      styles.ticketOptionIcon,
                      { backgroundColor: COLORS.pink },
                      selectedOption === "couple" &&
                        styles.selectedTicketOptionIcon,
                    ]}
                  >
                    <FontAwesome
                      name="users"
                      size={20}
                      color={
                        selectedOption === "couple" ? COLORS.white : COLORS.white
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.ticketOptionLabel,
                      selectedOption === "couple" &&
                        styles.selectedTicketOptionLabel,
                    ]}
                  >
                    Couple
                  </Text>
                  <Text style={styles.ticketOptionPrice}>
                    {event.price.couple}
                  </Text>
                </TouchableOpacity>
  
                {event.price.group && (
                  <TouchableOpacity
                    style={[
                      styles.ticketOption,
                      selectedOption === "group" && styles.selectedTicketOption,
                    ]}
                    onPress={() => setSelectedOption("group")}
                  >
                    <View
                      style={[
                        styles.ticketOptionIcon,
                        { backgroundColor: COLORS.purple },
                        selectedOption === "group" &&
                          styles.selectedTicketOptionIcon,
                      ]}
                    >
                      <FontAwesome
                        name="group"
                        size={20}
                        color={
                          selectedOption === "group" ? COLORS.white : COLORS.white
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.ticketOptionLabel,
                        selectedOption === "group" &&
                          styles.selectedTicketOptionLabel,
                      ]}
                    >
                      Groupe
                    </Text>
                    <Text style={styles.ticketOptionPrice}>
                      {event.price.group}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
  
              {/* Nombre de billets 
              {selectedOption !== "couple" && (
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Nombre de billets</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={decreaseTickets}
                    >
                      <AntDesign name="minus" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{numberOfTickets}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={increaseTickets}
                    >
                      <AntDesign name="plus" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
  
            {/* Date selection 
            {dateOptions.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Choisir une date</Text>
                <View style={styles.dateOptionsContainer}>
                  {dateOptions.map((option, index) => renderDateOption(option, index))}
                </View>
              </View>
            )}
  
            {/* Informations personnelles 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Informations personnelles</Text>
  
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Prénom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                />
              </View>
  
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Nom *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange("lastName", text)}
                />
              </View>
  
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />
              </View>
  
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Téléphone *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre numéro de téléphone"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                />
              </View>
  
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Demandes particulières</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Indiquez toute demande particulière..."
                  multiline
                  numberOfLines={4}
                  value={formData.specialRequests}
                  onChangeText={(text) =>
                    handleInputChange("specialRequests", text)
                  }
                />
              </View>
            </View>
  
            {/* Méthode de paiement 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Méthode de paiement</Text>
  
              <View style={styles.paymentMethodsContainer}>
                <TouchableOpacity
                  style={[
                    styles.paymentMethodOption,
                    paymentMethod === "card" && styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setPaymentMethod("card")}
                >
                  <FontAwesome
                    name="credit-card"
                    size={20}
                    color={paymentMethod === "card" ? COLORS.green_accueil : COLORS.gray}
                  />
                  <Text
                    style={[
                      styles.paymentMethodLabel,
                      paymentMethod === "card" && styles.selectedPaymentMethodLabel,
                    ]}
                  >
                    Carte bancaire
                  </Text>
                  {paymentMethod === "card" && (
                    <AntDesign
                      name="check"
                      size={16}
                      color={COLORS.green_accueil}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={[
                    styles.paymentMethodOption,
                    paymentMethod === "orange" && styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setPaymentMethod("orange")}
                >
                  <MaterialIcons
                    name="phone-android"
                    size={20}
                    color={paymentMethod === "orange" ? COLORS.green_accueil : COLORS.gray}
                  />
                  <Text
                    style={[
                      styles.paymentMethodLabel,
                      paymentMethod === "orange" && styles.selectedPaymentMethodLabel,
                    ]}
                  >
                    Orange Money
                  </Text>
                  {paymentMethod === "orange" && (
                    <AntDesign
                      name="check"
                      size={16}
                      color={COLORS.green_accueil}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={[
                    styles.paymentMethodOption,
                    paymentMethod === "wave" && styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setPaymentMethod("wave")}
                >
                  <FontAwesome
                    name="money"
                    size={20}
                    color={paymentMethod === "wave" ? COLORS.green_accueil : COLORS.gray}
                  />
                  <Text
                    style={[
                      styles.paymentMethodLabel,
                      paymentMethod === "wave" && styles.selectedPaymentMethodLabel,
                    ]}
                  >
                    Wave
                  </Text>
                  {paymentMethod === "wave" && (
                    <AntDesign
                      name="check"
                      size={16}
                      color={COLORS.green_accueil}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
  
              {/* Détails de la carte bancaire 
              {paymentMethod === "card" && (
                <View style={styles.cardDetailsContainer}>
                  <View style={styles.formGroup}>
                    <Text style={styles.inputLabel}>Numéro de carte</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="1234 5678 9012 3456"
                      keyboardType="number-pad"
                      maxLength={19} // 16 digits + 3 spaces
                      value={cardData.cardNumber}
                      onChangeText={(text) => {
                        const formattedText = formatCardNumber(text);
                        handleCardInputChange("cardNumber", formattedText);
                      }}
                    />
                  </View>
  
                  <View style={styles.formGroup}>
                    <Text style={styles.inputLabel}>Nom sur la carte</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="PRÉNOM NOM"
                      autoCapitalize="characters"
                      value={cardData.cardName}
                      onChangeText={(text) =>
                        handleCardInputChange("cardName", text)
                      }
                    />
                  </View>
  
                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                      <Text style={styles.inputLabel}>Date d'expiration</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        keyboardType="number-pad"
                        maxLength={5} // MM/YY
                        value={cardData.expiryDate}
                        onChangeText={(text) => {
                          const formattedText = formatExpiryDate(text);
                          handleCardInputChange("expiryDate", formattedText);
                        }}
                      />
                    </View>
  
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="123"
                        keyboardType="number-pad"
                        maxLength={3}
                        secureTextEntry
                        value={cardData.cvv}
                        onChangeText={(text) => handleCardInputChange("cvv", text)}
                      />
                    </View>
                  </View>
                </View>
              )}
  
              {/* Détails Orange Money ou Wave 
              {(paymentMethod === "orange" || paymentMethod === "wave") && (
                <View style={styles.mobilePaymentInfo}>
                  <MaterialIcons
                    name="info-outline"
                    size={20}
                    color={COLORS.gray}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.mobilePaymentText}>
                    {paymentMethod === "orange"
                      ? "Vous recevrez un code de paiement Orange Money après avoir confirmé la réservation."
                      : "Vous recevrez un code de paiement Wave après avoir confirmé la réservation."}
                  </Text>
                </View>
              )}
            </View>
  
            {/* Récapitulatif de la commande 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Récapitulatif</Text>
  
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Type de billet</Text>
                  <Text style={styles.summaryValue}>
                    {selectedOption === "solo"
                      ? "Solo"
                      : selectedOption === "couple"
                      ? "Couple"
                      : "Groupe"}
                  </Text>
                </View>
  
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Nombre de billets</Text>
                  <Text style={styles.summaryValue}>{numberOfTickets}</Text>
                </View>
  
                {dateOptions.length > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Date sélectionnée</Text>
                    <Text style={styles.summaryValue}>
                      {dateOptions[selectedDateOption]?.label || event.date}
                    </Text>
                  </View>
                )}
  
                <View style={styles.divider} />
  
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Sous-total</Text>
                  <Text style={styles.summaryValue}>
                    {totalPrice.toLocaleString()} Fcfa
                  </Text>
                </View>
  
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Frais de service (5%)</Text>
                  <Text style={styles.summaryValue}>
                    {Math.round(totalPrice * 0.05).toLocaleString()} Fcfa
                  </Text>
                </View>
  
                <View style={styles.summaryTotal}>
                  <Text style={styles.summaryTotalLabel}>Total</Text>
                  <Text style={styles.summaryTotalValue}>
                    {Math.round(totalPrice * 1.05).toLocaleString()} Fcfa
                  </Text>
                </View>
              </View>
  
              {/* Politique d'annulation 
              <View style={styles.cancellationPolicy}>
                <MaterialIcons
                  name="event-busy"
                  size={22}
                  color={COLORS.red}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.cancellationText}>
                  Annulation gratuite jusqu'à 48h avant l'événement. Après cette
                  période, aucun remboursement ne sera possible.
                </Text>
              </View>
            </View>
          </ScrollView>
  
          {/* Bouton de confirmation fixe en bas 
          <View style={styles.confirmButtonContainer}>
            <ReusableBtn
              onPress={submitBooking}
              btnText={
                loading ? "Traitement en cours..." : "Confirmer la réservation"
              }
              width={SIZES.width - 40}
              backgroundColor={COLORS.green_button_back}
              borderColor={COLORS.green_button_back}
              borderWidth={0}
              textColor={COLORS.white}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default BookEvent;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    eventBanner: {
      flexDirection: "row",
      padding: 15,
      backgroundColor: COLORS.verylightgray,
      marginTop: 60,
    },
    eventImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    eventInfo: {
      flex: 1,
      marginLeft: 15,
      justifyContent: "center",
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: COLORS.black,
      marginBottom: 5,
    },
    eventMetaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    eventMetaText: {
      fontSize: 14,
      color: COLORS.gray,
      marginLeft: 5,
    },
    sectionContainer: {
      padding: 20,
      borderBottomWidth: 8,
      borderBottomColor: COLORS.verylightgray,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: COLORS.black,
    },
    ticketOptionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ticketOption: {
      flex: 1,
      borderWidth: 1,
      borderColor: COLORS.lightgray,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 5,
      alignItems: "center",
    },
    selectedTicketOption: {
      borderColor: COLORS.green_accueil,
      backgroundColor: COLORS.white,
    },
    ticketOptionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.lightgray,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    selectedTicketOptionIcon: {
      backgroundColor: COLORS.green_accueil,
    },
    ticketOptionLabel: {
      fontSize: 14,
      color: COLORS.gray,
      marginBottom: 5,
    },
    selectedTicketOptionLabel: {
      color: COLORS.green_accueil,
      fontWeight: "bold",
    },
    ticketOptionPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: COLORS.black,
    },
    quantityContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: COLORS.verylightgray,
    },
    quantityLabel: {
      fontSize: 16,
      color: COLORS.black,
    },
    quantityControls: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: COLORS.lightgray,
      justifyContent: "center",
      alignItems: "center",
    },
    quantityValue: {
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 15,
    },
    dateOptionsContainer: {
      flexDirection: "column",
    },
    dateOption: {
      borderWidth: 1,
      borderColor: COLORS.lightgray,
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateOptionText: {
      fontSize: 15,
      color: COLORS.black,
    },
    dateSelectedCheckmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: COLORS.green_accueil,
      justifyContent: "center",
      alignItems: "center",
    },
    formGroup: {
      marginBottom: 15,
    },
    formRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    inputLabel: {
      fontSize: 14,
      color: COLORS.gray,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.lightgray,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    paymentMethodsContainer: {
      flexDirection: "column",
    },
    paymentMethodOption: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderWidth: 1,
      borderColor: COLORS.lightgray,
      borderRadius: 8,
      marginBottom: 10,
    },
    selectedPaymentMethod: {
      borderColor: COLORS.green_accueil,
    },
    paymentMethodLabel: {
      fontSize: 16,
      color: COLORS.black,
      marginLeft: 15,
      flex: 1,
    },
    selectedPaymentMethodLabel: {
      color: COLORS.green_accueil,
      fontWeight: "500",
    },
    checkIcon: {
      marginLeft: 10,
    },
    cardDetailsContainer: {
      marginTop: 15,
      padding: 15,
      backgroundColor: COLORS.verylightgray,
      borderRadius: 8,
    },
    mobilePaymentInfo: {
      flexDirection: "row",
      backgroundColor: COLORS.verylightgray,
      padding: 15,
      borderRadius: 8,
      marginTop: 15,
      alignItems: "center",
    },
    mobilePaymentText: {
        flex: 1,
        fontSize: 14,
        color: COLORS.gray,
      },
      summaryContainer: {
        backgroundColor: COLORS.verylightgray,
        borderRadius: 8,
        padding: 15,
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
        fontWeight: "500",
        color: COLORS.black,
      },
      divider: {
        height: 1,
        backgroundColor: COLORS.lightgray,
        marginVertical: 10,
      },
      summaryTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightgray,
      },
      summaryTotalLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.black,
      },
      summaryTotalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.green_accueil,
      },
      cancellationPolicy: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.verylightgray,
        borderRadius: 8,
      },
      cancellationText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.darkgray,
        lineHeight: 18,
      },
      confirmButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightgray,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    });*/

    /*import React, { useState } from "react";
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
} from "react-native";
import { Appbar, HeightSpacer, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const [selectedOption, setSelectedOption] = useState("solo");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Gestion du changement de date
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
  };

  // Confirmation de réservation
  const confirmBooking = () => {
    Alert.alert(
      "Confirmation de réservation",
      `Votre réservation pour ${event.title} est confirmée pour le ${selectedDate.toLocaleDateString()}. Total: ${formatPrice(calculateTotalPrice())}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Appbar personnalisée 
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
        {/* Info événement 
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

        {/* Options de prix 
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

        {/* Sélection de quantité 
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

        {/* Sélection de date 
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choisir une date</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons name="calendar-today" size={24} color={COLORS.green_accueil} />
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <HeightSpacer height={20} />

        {/* Inclusions 
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

        {/* Récapitulatif de prix 
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

        {/* Information de paiement 
        <View style={styles.paymentInfoContainer}>
          <MaterialIcons name="info-outline" size={20} color={COLORS.blue} />
          <Text style={styles.paymentInfoText}>
            Le paiement sera effectué lors de la confirmation
          </Text>
        </View>

        <HeightSpacer height={100} />
      </ScrollView>

      {/* Bouton de confirmation fixe en bas
      <View style={styles.confirmButtonContainer}>
        <ReusableBtn
          onPress={confirmBooking}
          btnText={"Confirmer ma réservation"}
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
});*/


/*import React, { useState } from "react";
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
} from "react-native";
import { Appbar, HeightSpacer, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

const BookEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const [selectedOption, setSelectedOption] = useState("solo");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Custom date picker modal
  const [dateModalVisible, setDateModalVisible] = useState(false);
  
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

  // Confirmation de réservation
  const confirmBooking = () => {
    Alert.alert(
      "Confirmation de réservation",
      `Votre réservation pour ${event.title} est confirmée pour le ${selectedDate.toLocaleDateString()}. Total: ${formatPrice(calculateTotalPrice())}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  // Custom date formatter
  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Appbar personnalisée 
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
        {/* Info événement 
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

        {/* Options de prix 
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

        {/* Sélection de quantité 
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

        {/* Sélection de date - Nouveau composant qui remplace DateTimePicker 
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

        {/* Inclusions
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

        {/* Récapitulatif de prix 
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

        {/* Information de paiement 
        <View style={styles.paymentInfoContainer}>
          <MaterialIcons name="info-outline" size={20} color={COLORS.blue} />
          <Text style={styles.paymentInfoText}>
            Le paiement sera effectué lors de la confirmation
          </Text>
        </View>

        <HeightSpacer height={100} />
      </ScrollView>

      {/* Modal de sélection de date personnalisé 
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

      {/* Bouton de confirmation fixe en bas 
      <View style={styles.confirmButtonContainer}>
        <ReusableBtn
          onPress={confirmBooking}
          btnText={"Confirmer ma réservation"}
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
    maxHeight: '70%',
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
});*/


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
        top={Platform.OS === "ios" ? 10 : 50}
        left={20}
        right={20}
        title={""}
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
    color: COLORS.darkgray,
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
    color: COLORS.darkgray,
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
    color: COLORS.darkgray,
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
    color: COLORS.darkgray,
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
    borderTopColor: COLORS.darkgray,
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
    color: COLORS.darkgray,
    fontWeight: 'bold',
  },
  // Styles pour le modal de paiement
  paymentMethodsContainer: {
    paddingBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.lightgray,
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
    color: COLORS.darkgray,
  },
  phoneInputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  phoneInputLabel: {
    fontSize: 14,
    color: COLORS.darkgray,
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