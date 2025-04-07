/*import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    TextInput,
    Alert,
    Platform,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
  import DateTimePicker from '@react-native-community/datetimepicker';
  
  // Constantes pour les couleurs et tailles (reprises du fichier source)
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
  
  const ReserveApartment = ({ navigation, route }) => {
    const { apartmentId } = route.params;
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 3)));
    const [guests, setGuests] = useState(2);
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [apartment, setApartment] = useState(null);
  
    // Simuler le chargement des données de l'appartement depuis une API
    useEffect(() => {
      // Simulons une récupération de données d'API
      setTimeout(() => {
        // Données fictives pour simuler l'appartement récupéré
        const fetchedApartment = {
          _id: apartmentId,
          title: "Appartement Vue Mer Dakar",
          placeImage: require("../../assets/images/apartments/main-apartment.jpg"),
          price: 75000,
          cleaningFee: 15000,
          serviceFee: 7500,
          taxRate: 0.18,
          location: "Almadies - Dakar, Sénégal",
          maxGuests: 4,
          availability: {
            start: "2025-05-01T00:00:00.000Z",
            end: "2025-05-31T00:00:00.000Z",
          },
        };
        
        setApartment(fetchedApartment);
        setIsLoading(false);
        calculateTotal(checkInDate, checkOutDate, fetchedApartment.price);
      }, 1000);
    }, [apartmentId]);
  
    // Calculer le nombre de nuits entre deux dates
    const calculateNights = (start, end) => {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    // Calculer le prix total
    const calculateTotal = (start, end, basePrice) => {
      const nights = calculateNights(start, end);
      const subtotal = basePrice * nights;
      const cleaningFee = apartment ? apartment.cleaningFee : 0;
      const serviceFee = apartment ? apartment.serviceFee : 0;
      const taxes = (subtotal + cleaningFee + serviceFee) * (apartment ? apartment.taxRate : 0);
      
      setTotalPrice(subtotal + cleaningFee + serviceFee + taxes);
    };
  
    // Gérer le changement de date d'arrivée
    const onCheckInChange = (event, selectedDate) => {
      const currentDate = selectedDate || checkInDate;
      setShowCheckInPicker(Platform.OS === 'ios');
      
      // Vérifier que la date d'arrivée est avant la date de départ
      if (currentDate >= checkOutDate) {
        // Si la date d'arrivée est après ou égale à la date de départ,
        // définir la date de départ à un jour après la date d'arrivée
        const newCheckOutDate = new Date(currentDate);
        newCheckOutDate.setDate(currentDate.getDate() + 1);
        setCheckOutDate(newCheckOutDate);
        setCheckInDate(currentDate);
        if (apartment) {
          calculateTotal(currentDate, newCheckOutDate, apartment.price);
        }
      } else {
        setCheckInDate(currentDate);
        if (apartment) {
          calculateTotal(currentDate, checkOutDate, apartment.price);
        }
      }
    };
  
    // Gérer le changement de date de départ
    const onCheckOutChange = (event, selectedDate) => {
      const currentDate = selectedDate || checkOutDate;
      setShowCheckOutPicker(Platform.OS === 'ios');
      
      // Vérifier que la date de départ est après la date d'arrivée
      if (currentDate <= checkInDate) {
        Alert.alert("Erreur", "La date de départ doit être après la date d'arrivée");
        return;
      }
      
      setCheckOutDate(currentDate);
      if (apartment) {
        calculateTotal(checkInDate, currentDate, apartment.price);
      }
    };
  
    // Gérer le changement du nombre d'invités
    const handleGuestsChange = (value) => {
      const newValue = Math.max(1, Math.min(apartment ? apartment.maxGuests : 4, value));
      setGuests(newValue);
    };
  
    // Formater la date pour l'affichage
    const formatDate = (date) => {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };
  
    // Effectuer la réservation
    const handleBooking = () => {
      if (!contactName || !contactEmail || !contactPhone) {
        Alert.alert("Information manquante", "Veuillez remplir tous les champs obligatoires");
        return;
      }
  
      // Vérification basique du format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        Alert.alert("Format incorrect", "Veuillez entrer une adresse email valide");
        return;
      }
  
      // Simuler l'envoi de la réservation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Créer l'objet de réservation qui serait normalement envoyé à une API
        const bookingData = {
          apartmentId,
          checkInDate,
          checkOutDate,
          guests,
          contactName,
          contactEmail,
          contactPhone,
          specialRequests,
          totalPrice,
        };
        
        console.log("Booking data:", bookingData);
        
        // Afficher une confirmation et naviguer vers un écran de confirmation
        Alert.alert(
          "Réservation confirmée",
          "Votre réservation a été effectuée avec succès ! Un email de confirmation vous a été envoyé.",
          [
            { 
              text: "OK", 
              onPress: () => navigation.navigate("BookingConfirmation", { 
                bookingData,
                apartmentTitle: apartment.title
              }) 
            }
          ]
        );
      }, 1500);
    };
  
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement des informations...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header }
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Réserver l'appartement</Text>
          <View style={styles.placeholderView} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Résumé de l'appartement }
          <View style={styles.apartmentSummary}>
            <Image 
              source={apartment.placeImage}
              style={styles.apartmentImage}
              resizeMode="cover"
            />
            <View style={styles.apartmentInfo}>
              <Text style={styles.apartmentTitle} numberOfLines={2}>
                {apartment.title}
              </Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
                <Text style={styles.locationText}>{apartment.location}</Text>
              </View>
              <Text style={styles.priceText}>
                {apartment.price.toLocaleString()} FCFA <Text style={styles.priceSubtext}>/ nuit</Text>
              </Text>
            </View>
          </View>
          
          {/* Section des dates }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates de séjour</Text>
            
            <View style={styles.datePickerRow}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Arrivée</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => setShowCheckInPicker(true)}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkInDate)}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.datePickerSeparator}>
                <FontAwesome name="arrow-right" size={16} color={COLORS.gray} />
              </View>
              
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Départ</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => setShowCheckOutPicker(true)}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkOutDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Afficher les date pickers si nécessaire }
            {showCheckInPicker && (
              <DateTimePicker
                value={checkInDate}
                mode="date"
                display="default"
                onChange={onCheckInChange}
                minimumDate={new Date(apartment.availability.start)}
                maximumDate={new Date(apartment.availability.end)}
              />
            )}
            
            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOutDate}
                mode="date"
                display="default"
                onChange={onCheckOutChange}
                minimumDate={new Date(checkInDate.getTime() + 86400000)} // +1 jour
                maximumDate={new Date(apartment.availability.end)}
              />
            )}
            
            <Text style={styles.stayDuration}>
              Durée du séjour: <Text style={styles.stayDurationValue}>{calculateNights(checkInDate, checkOutDate)} nuits</Text>
            </Text>
          </View>
          
          {/* Section des invités }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voyageurs</Text>
            
            <View style={styles.guestsSelectorContainer}>
              <Text style={styles.guestsLabel}>Nombre de personnes</Text>
              
              <View style={styles.guestsSelector}>
                <TouchableOpacity 
                  style={[styles.guestButton, guests <= 1 && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests - 1)}
                  disabled={guests <= 1}
                >
                  <FontAwesome name="minus" size={16} color={guests <= 1 ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
                
                <Text style={styles.guestsCount}>{guests}</Text>
                
                <TouchableOpacity 
                  style={[styles.guestButton, guests >= apartment.maxGuests && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests + 1)}
                  disabled={guests >= apartment.maxGuests}
                >
                  <FontAwesome name="plus" size={16} color={guests >= apartment.maxGuests ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.maxGuestsText}>
              Maximum {apartment.maxGuests} personnes
            </Text>
          </View>
          
          {/* Section des coordonnées }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vos coordonnées</Text>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Nom complet <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactName}
                onChangeText={setContactName}
                placeholder="Entrez votre nom complet"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Email <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactEmail}
                onChangeText={setContactEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Téléphone <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="Entrez votre numéro de téléphone"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Demandes spéciales</Text>
              <TextInput
                style={[styles.formInput, styles.multilineInput]}
                value={specialRequests}
                onChangeText={setSpecialRequests}
                placeholder="Précisez vos demandes particulières (heure d'arrivée, équipements spécifiques, etc.)"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          
          {/* Section du résumé des prix }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé des prix</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>
                {apartment.price.toLocaleString()} FCFA x {calculateNights(checkInDate, checkOutDate)} nuits
              </Text>
              <Text style={styles.priceItemValue}>
                {(apartment.price * calculateNights(checkInDate, checkOutDate)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de ménage</Text>
              <Text style={styles.priceItemValue}>{apartment.cleaningFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de service</Text>
              <Text style={styles.priceItemValue}>{apartment.serviceFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Taxes (18%)</Text>
              <Text style={styles.priceItemValue}>
                {(totalPrice - (apartment.price * calculateNights(checkInDate, checkOutDate) + apartment.cleaningFee + apartment.serviceFee)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{totalPrice.toLocaleString()} FCFA</Text>
            </View>
          </View>
          
          {/* Section des politiques }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Politiques de réservation</Text>
            
            <View style={styles.policyItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Heure d'arrivée et de départ</Text>
                <Text style={styles.policyText}>Arrivée à partir de 14h. Départ avant 11h.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <Ionicons name="close-circle-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Politique d'annulation</Text>
                <Text style={styles.policyText}>Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, remboursement de 50% du montant total.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Règles de l'hébergement</Text>
                <Text style={styles.policyText}>Pas de fêtes ni d'événements. Non-fumeur. Pas d'animaux.</Text>
              </View>
            </View>
          </View>
          
          {/* Espace pour le bas de page fixe }
          <View style={{ height: 100 }} />
        </ScrollView>
        
        {/* Barre de réservation fixe en bas }
        <View style={styles.bottom}>
          <View style={styles.bottomPriceContainer}>
            <Text style={styles.bottomTotalLabel}>Total</Text>
            <Text style={styles.bottomTotalValue}>{totalPrice.toLocaleString()} FCFA</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>Confirmer la réservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: COLORS.gray,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    placeholderView: {
      width: 24,
    },
    scrollView: {
      flex: 1,
    },
    apartmentSummary: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    apartmentImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    apartmentInfo: {
      flex: 1,
      marginLeft: 15,
      justifyContent: 'space-between',
    },
    apartmentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    locationText: {
      fontSize: 14,
      color: COLORS.gray,
      marginLeft: 5,
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    priceSubtext: {
      fontWeight: 'normal',
      fontSize: 14,
      color: COLORS.gray,
    },
    section: {
      padding: SIZES.padding,
      backgroundColor: COLORS.white,
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: SIZES.radius,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: COLORS.primary,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    datePickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    datePickerContainer: {
      flex: 1,
    },
    datePickerSeparator: {
      width: 30,
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 14,
      color: COLORS.gray,
      marginBottom: 8,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
      borderRadius: 5,
      backgroundColor: COLORS.white,
    },
    dateText: {
      marginLeft: 10,
      fontSize: 14,
      color: COLORS.darkGray,
    },
    stayDuration: {
      marginTop: 15,
      fontSize: 14,
      color: COLORS.gray,
      textAlign: 'center',
    },
    stayDurationValue: {
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    guestsSelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    guestsLabel: {
      fontSize: 14,
      color: COLORS.gray,
    },
    guestsSelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    guestButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      borderColor: COLORS.lightGray,
    },
    guestsCount: {
      marginHorizontal: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    maxGuestsText: {
      marginTop: 10,
      fontSize: 12,
      color: COLORS.gray,
      fontStyle: 'italic',
    },
    formField: {
      marginBottom: 15,
    },
    formLabel: {
      fontSize: 14,
      marginBottom: 5,
      color: COLORS.darkGray,
    },
    requiredStar: {
      color: COLORS.pink,
    },
    formInput: {
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    priceItemLabel: {
      fontSize: 14,
      color: COLORS.gray,
    },
    priceItemValue: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.darkGray,
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.lightGray,
      marginVertical: 15,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    policyItem: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    policyContent: {
      marginLeft: 15,
      flex: 1,
    },
    policyTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.darkGray,
      marginBottom: 3,
    },
    policyText: {
      fontSize: 13,
      color: COLORS.gray,
      lineHeight: 18,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightGray,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    bottomPriceContainer: {
      alignItems: 'flex-start',
    },
    bottomTotalLabel: {
      fontSize: 12,
      color: COLORS.gray,
    },
    bottomTotalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    bookButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: SIZES.radius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bookButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default ReserveApartment;*/

  /*import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    TextInput,
    Alert,
    Platform,
    Modal,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
  import { Calendar } from 'react-native-calendars'; // Remplacer DateTimePicker par Calendar
  
  // Nouvelle charte graphique
  const COLORS = {
    primary: "#6D9F3D", // green_accueil (couleur dominante)
    white: "#FFFFFF",
    black: "#000000",
    gray: "#E5E5E5",
    lightGray: "#D3D3D3", // verylightgray
    pink: "#FC4579",
    orange: "#FD9942", // gardé original car pas d'équivalent dans la charte
    darkGray: "#696969", // lightgray
    lightwhite: "#FFFFF0",
    lightgreen: "#FBFEF8",
    red: "#B22222",
    transparent: "#00000000",
    green_button_back: "#4B7F2C",
    green_favoris: "#2A5D34",
    green_profil: "#3D550C",
  };
  
  const SIZES = {
    padding: 15,
    radius: 15,
  };
  
  const ReserveApartment = ({ navigation, route }) => {
    const { apartmentId } = route.params;
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 3)));
    const [guests, setGuests] = useState(2);
    const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
    const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [apartment, setApartment] = useState(null);
    
    // Variables pour le nouveau calendrier
    const [markedDates, setMarkedDates] = useState({});
  
    // Simuler le chargement des données de l'appartement depuis une API
    useEffect(() => {
      // Simulons une récupération de données d'API
      setTimeout(() => {
        // Données fictives pour simuler l'appartement récupéré
        const fetchedApartment = {
          _id: apartmentId,
          title: "Appartement Vue Mer Dakar",
          placeImage: require("../../assets/images/apartments/main-apartment.jpg"),
          price: 75000,
          cleaningFee: 15000,
          serviceFee: 7500,
          taxRate: 0.18,
          location: "Almadies - Dakar, Sénégal",
          maxGuests: 4,
          availability: {
            start: "2025-05-01T00:00:00.000Z",
            end: "2025-05-31T00:00:00.000Z",
          },
        };
        
        setApartment(fetchedApartment);
        setIsLoading(false);
        calculateTotal(checkInDate, checkOutDate, fetchedApartment.price);
        
        // Initialiser les dates marquées pour le calendrier
        updateMarkedDates(checkInDate, checkOutDate);
      }, 1000);
    }, [apartmentId]);
  
    // Fonction pour formatter une date au format YYYY-MM-DD pour le calendrier
    const formatCalendarDate = (date) => {
      return date.toISOString().split('T')[0];
    };
  
    // Mettre à jour les dates marquées pour le calendrier
    const updateMarkedDates = (startDate, endDate) => {
      const start = formatCalendarDate(startDate);
      const end = formatCalendarDate(endDate);
      
      // Créer un objet pour les dates marquées
      const newMarkedDates = {};
      
      // Marquer la date de début
      newMarkedDates[start] = {
        startingDay: true,
        color: COLORS.primary,
        textColor: COLORS.white
      };
      
      // Marquer les dates entre le début et la fin
      let currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);
      
      while (formatCalendarDate(currentDate) < end) {
        newMarkedDates[formatCalendarDate(currentDate)] = {
          color: COLORS.lightgreen,
          textColor: COLORS.darkGray
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Marquer la date de fin
      newMarkedDates[end] = {
        endingDay: true,
        color: COLORS.primary,
        textColor: COLORS.white
      };
      
      setMarkedDates(newMarkedDates);
    };
  
    // Calculer le nombre de nuits entre deux dates
    const calculateNights = (start, end) => {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    // Calculer le prix total
    const calculateTotal = (start, end, basePrice) => {
      const nights = calculateNights(start, end);
      const subtotal = basePrice * nights;
      const cleaningFee = apartment ? apartment.cleaningFee : 0;
      const serviceFee = apartment ? apartment.serviceFee : 0;
      const taxes = (subtotal + cleaningFee + serviceFee) * (apartment ? apartment.taxRate : 0);
      
      setTotalPrice(subtotal + cleaningFee + serviceFee + taxes);
    };
  
    // Gérer la sélection de date d'arrivée dans le calendrier
    const handleCheckInSelect = (day) => {
      const selectedDate = new Date(day.dateString);
      
      // Vérifier que la date sélectionnée n'est pas après la date de départ
      if (selectedDate >= checkOutDate) {
        // Si la date d'arrivée est après ou égale à la date de départ,
        // définir la date de départ à un jour après la date d'arrivée
        const newCheckOutDate = new Date(selectedDate);
        newCheckOutDate.setDate(selectedDate.getDate() + 1);
        setCheckOutDate(newCheckOutDate);
        setCheckInDate(selectedDate);
        updateMarkedDates(selectedDate, newCheckOutDate);
        if (apartment) {
          calculateTotal(selectedDate, newCheckOutDate, apartment.price);
        }
      } else {
        setCheckInDate(selectedDate);
        updateMarkedDates(selectedDate, checkOutDate);
        if (apartment) {
          calculateTotal(selectedDate, checkOutDate, apartment.price);
        }
      }
      
      setShowCheckInCalendar(false);
    };
  
    // Gérer la sélection de date de départ dans le calendrier
    const handleCheckOutSelect = (day) => {
      const selectedDate = new Date(day.dateString);
      
      // Vérifier que la date sélectionnée n'est pas avant la date d'arrivée
      if (selectedDate <= checkInDate) {
        Alert.alert("Erreur", "La date de départ doit être après la date d'arrivée");
        return;
      }
      
      setCheckOutDate(selectedDate);
      updateMarkedDates(checkInDate, selectedDate);
      if (apartment) {
        calculateTotal(checkInDate, selectedDate, apartment.price);
      }
      
      setShowCheckOutCalendar(false);
    };
  
    // Gérer le changement du nombre d'invités
    const handleGuestsChange = (value) => {
      const newValue = Math.max(1, Math.min(apartment ? apartment.maxGuests : 4, value));
      setGuests(newValue);
    };
  
    // Formater la date pour l'affichage
    const formatDate = (date) => {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };
  
    // Effectuer la réservation
    const handleBooking = () => {
      if (!contactName || !contactEmail || !contactPhone) {
        Alert.alert("Information manquante", "Veuillez remplir tous les champs obligatoires");
        return;
      }
  
      // Vérification basique du format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        Alert.alert("Format incorrect", "Veuillez entrer une adresse email valide");
        return;
      }
  
      // Simuler l'envoi de la réservation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Créer l'objet de réservation qui serait normalement envoyé à une API
        const bookingData = {
          apartmentId,
          checkInDate,
          checkOutDate,
          guests,
          contactName,
          contactEmail,
          contactPhone,
          specialRequests,
          totalPrice,
        };
        
        console.log("Booking data:", bookingData);
        
        // Afficher une confirmation et naviguer vers un écran de confirmation
        Alert.alert(
          "Réservation confirmée",
          "Votre réservation a été effectuée avec succès ! Un email de confirmation vous a été envoyé.",
          [
            { 
              text: "OK", 
              onPress: () => navigation.navigate("BookingConfirmation", { 
                bookingData,
                apartmentTitle: apartment.title
              }) 
            }
          ]
        );
      }, 1500);
    };
  
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement des informations...</Text>
        </View>
      );
    }
  
    // Définir les dates min et max pour le calendrier
    const minDate = apartment ? new Date(apartment.availability.start) : new Date();
    const maxDate = apartment ? new Date(apartment.availability.end) : new Date();
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header }
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Réserver l'appartement</Text>
          <View style={styles.placeholderView} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Résumé de l'appartement }
          <View style={styles.apartmentSummary}>
            <Image 
              source={apartment.placeImage}
              style={styles.apartmentImage}
              resizeMode="cover"
            />
            <View style={styles.apartmentInfo}>
              <Text style={styles.apartmentTitle} numberOfLines={2}>
                {apartment.title}
              </Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
                <Text style={styles.locationText}>{apartment.location}</Text>
              </View>
              <Text style={styles.priceText}>
                {apartment.price.toLocaleString()} FCFA <Text style={styles.priceSubtext}>/ nuit</Text>
              </Text>
            </View>
          </View>
          
          {/* Section des dates }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates de séjour</Text>
            
            <View style={styles.datePickerRow}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Arrivée</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => setShowCheckInCalendar(true)}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkInDate)}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.datePickerSeparator}>
                <FontAwesome name="arrow-right" size={16} color={COLORS.darkGray} />
              </View>
              
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Départ</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => setShowCheckOutCalendar(true)}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkOutDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Modal pour le calendrier d'arrivée }
            <Modal
              visible={showCheckInCalendar}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarTitle}>Sélectionnez la date d'arrivée</Text>
                    <TouchableOpacity onPress={() => setShowCheckInCalendar(false)}>
                      <MaterialIcons name="close" size={24} color={COLORS.darkGray} />
                    </TouchableOpacity>
                  </View>
                  <Calendar
                    minDate={formatCalendarDate(minDate)}
                    maxDate={formatCalendarDate(maxDate)}
                    onDayPress={handleCheckInSelect}
                    markingType="period"
                    markedDates={markedDates}
                    theme={{
                      backgroundColor: COLORS.white,
                      calendarBackground: COLORS.white,
                      textSectionTitleColor: COLORS.darkGray,
                      selectedDayBackgroundColor: COLORS.primary,
                      selectedDayTextColor: COLORS.white,
                      todayTextColor: COLORS.primary,
                      dayTextColor: COLORS.black,
                      textDisabledColor: COLORS.lightGray,
                      dotColor: COLORS.primary,
                      arrowColor: COLORS.primary,
                      monthTextColor: COLORS.primary,
                      indicatorColor: COLORS.primary,
                    }}
                  />
                </View>
              </View>
            </Modal>
            
            {/* Modal pour le calendrier de départ }
            <Modal
              visible={showCheckOutCalendar}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarTitle}>Sélectionnez la date de départ</Text>
                    <TouchableOpacity onPress={() => setShowCheckOutCalendar(false)}>
                      <MaterialIcons name="close" size={24} color={COLORS.darkGray} />
                    </TouchableOpacity>
                  </View>
                  <Calendar
                    minDate={formatCalendarDate(new Date(checkInDate.getTime() + 86400000))} // +1 jour
                    maxDate={formatCalendarDate(maxDate)}
                    onDayPress={handleCheckOutSelect}
                    markingType="period"
                    markedDates={markedDates}
                    theme={{
                      backgroundColor: COLORS.white,
                      calendarBackground: COLORS.white,
                      textSectionTitleColor: COLORS.darkGray,
                      selectedDayBackgroundColor: COLORS.primary,
                      selectedDayTextColor: COLORS.white,
                      todayTextColor: COLORS.primary,
                      dayTextColor: COLORS.black,
                      textDisabledColor: COLORS.lightGray,
                      dotColor: COLORS.primary,
                      arrowColor: COLORS.primary,
                      monthTextColor: COLORS.primary,
                      indicatorColor: COLORS.primary,
                    }}
                  />
                </View>
              </View>
            </Modal>
            
            <Text style={styles.stayDuration}>
              Durée du séjour: <Text style={styles.stayDurationValue}>{calculateNights(checkInDate, checkOutDate)} nuits</Text>
            </Text>
          </View>
          
          {/* Section des invités }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voyageurs</Text>
            
            <View style={styles.guestsSelectorContainer}>
              <Text style={styles.guestsLabel}>Nombre de personnes</Text>
              
              <View style={styles.guestsSelector}>
                <TouchableOpacity 
                  style={[styles.guestButton, guests <= 1 && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests - 1)}
                  disabled={guests <= 1}
                >
                  <FontAwesome name="minus" size={16} color={guests <= 1 ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
                
                <Text style={styles.guestsCount}>{guests}</Text>
                
                <TouchableOpacity 
                  style={[styles.guestButton, guests >= apartment.maxGuests && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests + 1)}
                  disabled={guests >= apartment.maxGuests}
                >
                  <FontAwesome name="plus" size={16} color={guests >= apartment.maxGuests ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.maxGuestsText}>
              Maximum {apartment.maxGuests} personnes
            </Text>
          </View>
          
          {/* Section des coordonnées }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vos coordonnées</Text>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Nom complet <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactName}
                onChangeText={setContactName}
                placeholder="Entrez votre nom complet"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Email <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactEmail}
                onChangeText={setContactEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Téléphone <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="Entrez votre numéro de téléphone"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Demandes spéciales</Text>
              <TextInput
                style={[styles.formInput, styles.multilineInput]}
                value={specialRequests}
                onChangeText={setSpecialRequests}
                placeholder="Précisez vos demandes particulières (heure d'arrivée, équipements spécifiques, etc.)"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          
          {/* Section du résumé des prix }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé des prix</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>
                {apartment.price.toLocaleString()} FCFA x {calculateNights(checkInDate, checkOutDate)} nuits
              </Text>
              <Text style={styles.priceItemValue}>
                {(apartment.price * calculateNights(checkInDate, checkOutDate)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de ménage</Text>
              <Text style={styles.priceItemValue}>{apartment.cleaningFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de service</Text>
              <Text style={styles.priceItemValue}>{apartment.serviceFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Taxes (18%)</Text>
              <Text style={styles.priceItemValue}>
                {(totalPrice - (apartment.price * calculateNights(checkInDate, checkOutDate) + apartment.cleaningFee + apartment.serviceFee)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{totalPrice.toLocaleString()} FCFA</Text>
            </View>
          </View>
          
          {/* Section des politiques }
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Politiques de réservation</Text>
            
            <View style={styles.policyItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Heure d'arrivée et de départ</Text>
                <Text style={styles.policyText}>Arrivée à partir de 14h. Départ avant 11h.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <Ionicons name="close-circle-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Politique d'annulation</Text>
                <Text style={styles.policyText}>Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, remboursement de 50% du montant total.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Règles de l'hébergement</Text>
                <Text style={styles.policyText}>Pas de fêtes ni d'événements. Non-fumeur. Pas d'animaux.</Text>
              </View>
            </View>
          </View>
          
          {/* Espace pour le bas de page fixe }
          <View style={{ height: 100 }} />
        </ScrollView>
        
        {/* Barre de réservation fixe en bas }
        <View style={styles.bottom}>
          <View style={styles.bottomPriceContainer}>
            <Text style={styles.bottomTotalLabel}>Total</Text>
            <Text style={styles.bottomTotalValue}>{totalPrice.toLocaleString()} FCFA</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>Confirmer la réservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightwhite,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: COLORS.darkGray,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    placeholderView: {
      width: 24,
    },
    scrollView: {
      flex: 1,
    },
    apartmentSummary: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    apartmentImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    apartmentInfo: {
      flex: 1,
      marginLeft: 15,
      justifyContent: 'space-between',
    },
    apartmentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    locationText: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginLeft: 5,
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    priceSubtext: {
      fontWeight: 'normal',
      fontSize: 14,
      color: COLORS.darkGray,
    },
    section: {
      padding: SIZES.padding,
      backgroundColor: COLORS.white,
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: SIZES.radius,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: COLORS.primary,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    datePickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    datePickerContainer: {
      flex: 1,
    },
    datePickerSeparator: {
      width: 30,
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginBottom: 8,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
      borderRadius: 5,
      backgroundColor: COLORS.white,
    },
    dateText: {
      marginLeft: 10,
      fontSize: 14,
      color: COLORS.green_favoris,
    },
    stayDuration: {
      marginTop: 15,
      fontSize: 14,
      color: COLORS.darkGray,
      textAlign: 'center',
    },
    stayDurationValue: {
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    guestsSelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    guestsLabel: {
      fontSize: 14,
      color: COLORS.darkGray,
    },
    guestsSelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    guestButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      borderColor: COLORS.lightGray,
    },
    guestsCount: {
      marginHorizontal: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    maxGuestsText: {
      marginTop: 10,
      fontSize: 12,
      color: COLORS.darkGray,
      fontStyle: 'italic',
    },
    formField: {
      marginBottom: 15,
    },
    formLabel: {
      fontSize: 14,
      marginBottom: 5,
      color: COLORS.green_favoris,
    },
    requiredStar: {
      color: COLORS.pink,
    },
    formInput: {
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
   
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceItemLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  priceItemValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.green_favoris,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green_favoris,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  policyItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  policyContent: {
    flex: 1,
    marginLeft: 10,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.green_favoris,
    marginBottom: 2,
  },
  policyText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomPriceContainer: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
  },
  bottomTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.green_button_back,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 15,
  },
  bookButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default ReserveApartment;*/

import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    TextInput,
    Alert,
    Platform,
    Modal,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
  import { Calendar } from 'react-native-calendars';
  
  // Nouvelle charte graphique
  const COLORS = {
    primary: "#6D9F3D", // green_accueil (couleur dominante)
    white: "#FFFFFF",
    black: "#000000",
    gray: "#E5E5E5",
    lightGray: "#D3D3D3", // verylightgray
    pink: "#FC4579",
    orange: "#FD9942", // gardé original car pas d'équivalent dans la charte
    darkGray: "#696969", // lightgray
    lightwhite: "#FFFFF0",
    lightgreen: "#FBFEF8",
    red: "#B22222",
    transparent: "#00000000",
    green_button_back: "#4B7F2C",
    green_favoris: "#2A5D34",
    green_profil: "#3D550C",
  };
  
  const SIZES = {
    padding: 15,
    radius: 15,
  };
  
  const ReserveApartment = ({ navigation, route }) => {
    const { apartmentId } = route.params;
    const today = new Date();
    
    // Initialiser les dates avec aujourd'hui et aujourd'hui + 3 jours
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000));
    const [guests, setGuests] = useState(2);
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarMode, setCalendarMode] = useState('');  // 'checkin' ou 'checkout'
    const [totalPrice, setTotalPrice] = useState(0);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [apartment, setApartment] = useState(null);
    
    // Variables pour le calendrier
    const [markedDates, setMarkedDates] = useState({});
    // Définir les dates minimum et maximum pour la réservation
    const [minDate, setMinDate] = useState(today.toISOString().split('T')[0]);
    const [maxDate, setMaxDate] = useState(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()).toISOString().split('T')[0]);
  
    // Simuler le chargement des données de l'appartement depuis une API
    useEffect(() => {
      // Simulons une récupération de données d'API
      setTimeout(() => {
        // Données fictives pour simuler l'appartement récupéré
        const fetchedApartment = {
          _id: apartmentId,
          title: "Appartement Vue Mer Dakar",
          placeImage: require("../../assets/images/apartments/main-apartment.jpg"),
          price: 75000,
          cleaningFee: 15000,
          serviceFee: 7500,
          taxRate: 0.18,
          location: "Almadies - Dakar, Sénégal",
          maxGuests: 4,
          availability: {
            // Définir une période de disponibilité de 6 mois à partir d'aujourd'hui
            start: today.toISOString(),
            end: new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()).toISOString(),
          },
        };
        
        setApartment(fetchedApartment);
        setIsLoading(false);
        
        // Définir les dates min et max basées sur la disponibilité de l'appartement
        setMinDate(new Date(fetchedApartment.availability.start).toISOString().split('T')[0]);
        setMaxDate(new Date(fetchedApartment.availability.end).toISOString().split('T')[0]);
        
        // Mettre à jour les marqueurs de dates et calculer le prix total
        updateMarkedDates(checkInDate, checkOutDate);
        calculateTotal(checkInDate, checkOutDate, fetchedApartment.price);
      }, 1000);
    }, [apartmentId]);
  
    // Fonction pour formatter une date au format YYYY-MM-DD pour le calendrier
    const formatCalendarDate = (date) => {
      return date.toISOString().split('T')[0];
    };
  
    // Mettre à jour les dates marquées pour le calendrier
    const updateMarkedDates = (startDate, endDate) => {
      const start = formatCalendarDate(startDate);
      const end = formatCalendarDate(endDate);
      
      // Créer un objet pour les dates marquées
      const newMarkedDates = {};
      
      // Marquer la date de début
      newMarkedDates[start] = {
        startingDay: true,
        color: COLORS.primary,
        textColor: COLORS.white
      };
      
      // Marquer les dates entre le début et la fin
      let currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);
      
      while (formatCalendarDate(currentDate) < end) {
        newMarkedDates[formatCalendarDate(currentDate)] = {
          color: COLORS.lightgreen,
          textColor: COLORS.darkGray
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Marquer la date de fin
      newMarkedDates[end] = {
        endingDay: true,
        color: COLORS.primary,
        textColor: COLORS.white
      };
      
      setMarkedDates(newMarkedDates);
    };
  
    // Calculer le nombre de nuits entre deux dates
    const calculateNights = (start, end) => {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    // Calculer le prix total
    const calculateTotal = (start, end, basePrice) => {
      if (!apartment) return;
      
      const nights = calculateNights(start, end);
      const subtotal = basePrice * nights;
      const cleaningFee = apartment.cleaningFee;
      const serviceFee = apartment.serviceFee;
      const taxes = (subtotal + cleaningFee + serviceFee) * apartment.taxRate;
      
      setTotalPrice(subtotal + cleaningFee + serviceFee + taxes);
    };
  
    // Ouvrir le calendrier pour la sélection de date
    const openCalendar = (mode) => {
      setCalendarMode(mode);
      setShowCalendar(true);
    };
  
    // Gérer la sélection de date dans le calendrier
    const handleDateSelect = (day) => {
      const selectedDate = new Date(day.dateString);
      
      if (calendarMode === 'checkin') {
        // Vérifier que la date d'arrivée n'est pas après la date de départ
        if (selectedDate >= checkOutDate) {
          // Si la date d'arrivée est après ou égale à la date de départ,
          // définir la date de départ à un jour après la date d'arrivée
          const newCheckOutDate = new Date(selectedDate);
          newCheckOutDate.setDate(selectedDate.getDate() + 1);
          setCheckOutDate(newCheckOutDate);
          setCheckInDate(selectedDate);
          updateMarkedDates(selectedDate, newCheckOutDate);
          calculateTotal(selectedDate, newCheckOutDate, apartment.price);
        } else {
          setCheckInDate(selectedDate);
          updateMarkedDates(selectedDate, checkOutDate);
          calculateTotal(selectedDate, checkOutDate, apartment.price);
        }
      } else if (calendarMode === 'checkout') {
        // Vérifier que la date sélectionnée n'est pas avant la date d'arrivée
        if (selectedDate <= checkInDate) {
          Alert.alert("Erreur", "La date de départ doit être après la date d'arrivée");
          return;
        }
        
        setCheckOutDate(selectedDate);
        updateMarkedDates(checkInDate, selectedDate);
        calculateTotal(checkInDate, selectedDate, apartment.price);
      }
      
      setShowCalendar(false);
    };
  
    // Gérer le changement du nombre d'invités
    const handleGuestsChange = (value) => {
      if (!apartment) return;
      const newValue = Math.max(1, Math.min(apartment.maxGuests, value));
      setGuests(newValue);
    };
  
    // Formater la date pour l'affichage
    const formatDate = (date) => {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };
  
    // Effectuer la réservation
    const handleBooking = () => {
      if (!contactName || !contactEmail || !contactPhone) {
        Alert.alert("Information manquante", "Veuillez remplir tous les champs obligatoires");
        return;
      }
  
      // Vérification basique du format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        Alert.alert("Format incorrect", "Veuillez entrer une adresse email valide");
        return;
      }
  
      // Simuler l'envoi de la réservation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Créer l'objet de réservation qui serait normalement envoyé à une API
        const bookingData = {
          apartmentId,
          checkInDate,
          checkOutDate,
          guests,
          contactName,
          contactEmail,
          contactPhone,
          specialRequests,
          totalPrice,
        };
        
        console.log("Booking data:", bookingData);
        
        // Afficher une confirmation et naviguer vers un écran de confirmation
        Alert.alert(
          "Réservation confirmée",
          "Votre réservation a été effectuée avec succès ! Un email de confirmation vous a été envoyé.",
          [
            { 
              text: "OK", 
              onPress: () => navigation.navigate("BookingConfirmation", { 
                bookingData,
                apartmentTitle: apartment.title
              }) 
            }
          ]
        );
      }, 1500);
    };
  
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement des informations...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Réserver l'appartement</Text>
          <View style={styles.placeholderView} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Résumé de l'appartement */}
          <View style={styles.apartmentSummary}>
            <Image 
              source={apartment.placeImage}
              style={styles.apartmentImage}
              resizeMode="cover"
            />
            <View style={styles.apartmentInfo}>
              <Text style={styles.apartmentTitle} numberOfLines={2}>
                {apartment.title}
              </Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
                <Text style={styles.locationText}>{apartment.location}</Text>
              </View>
              <Text style={styles.priceText}>
                {apartment.price.toLocaleString()} FCFA <Text style={styles.priceSubtext}>/ nuit</Text>
              </Text>
            </View>
          </View>
          
          {/* Section des dates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates de séjour</Text>
            
            <View style={styles.datePickerRow}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Arrivée</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => openCalendar('checkin')}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkInDate)}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.datePickerSeparator}>
                <FontAwesome name="arrow-right" size={16} color={COLORS.darkGray} />
              </View>
              
              <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>Départ</Text>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => openCalendar('checkout')}
                >
                  <FontAwesome name="calendar" size={18} color={COLORS.primary} />
                  <Text style={styles.dateText}>{formatDate(checkOutDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Modal pour le calendrier unifié */}
            <Modal
              visible={showCalendar}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarHeader}>
                    <Text style={styles.calendarTitle}>
                      {calendarMode === 'checkin' 
                        ? 'Sélectionnez la date d\'arrivée' 
                        : 'Sélectionnez la date de départ'}
                    </Text>
                    <TouchableOpacity onPress={() => setShowCalendar(false)}>
                      <MaterialIcons name="close" size={24} color={COLORS.darkGray} />
                    </TouchableOpacity>
                  </View>
                  <Calendar
                    minDate={calendarMode === 'checkin' ? minDate : formatCalendarDate(new Date(checkInDate.getTime() + 86400000))}
                    maxDate={maxDate}
                    onDayPress={handleDateSelect}
                    markingType="period"
                    markedDates={markedDates}
                    theme={{
                      backgroundColor: COLORS.white,
                      calendarBackground: COLORS.white,
                      textSectionTitleColor: COLORS.darkGray,
                      selectedDayBackgroundColor: COLORS.primary,
                      selectedDayTextColor: COLORS.white,
                      todayTextColor: COLORS.primary,
                      dayTextColor: COLORS.black,
                      textDisabledColor: COLORS.lightGray,
                      dotColor: COLORS.primary,
                      arrowColor: COLORS.primary,
                      monthTextColor: COLORS.primary,
                      indicatorColor: COLORS.primary,
                    }}
                    current={calendarMode === 'checkin' ? formatCalendarDate(checkInDate) : formatCalendarDate(checkOutDate)}
                  />
                  
                  <View style={styles.calendarFooter}>
                    <Text style={styles.calendarFooterText}>
                      {calendarMode === 'checkin' 
                        ? 'Choisissez votre date d\'arrivée' 
                        : 'Choisissez votre date de départ'}
                    </Text>
                    <Text style={styles.calendarFooterSubtext}>
                      Disponibilités du {formatDate(new Date(minDate))} au {formatDate(new Date(maxDate))}
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
            
            <Text style={styles.stayDuration}>
              Durée du séjour: <Text style={styles.stayDurationValue}>{calculateNights(checkInDate, checkOutDate)} nuits</Text>
            </Text>
          </View>
          
          {/* Section des invités */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voyageurs</Text>
            
            <View style={styles.guestsSelectorContainer}>
              <Text style={styles.guestsLabel}>Nombre de personnes</Text>
              
              <View style={styles.guestsSelector}>
                <TouchableOpacity 
                  style={[styles.guestButton, guests <= 1 && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests - 1)}
                  disabled={guests <= 1}
                >
                  <FontAwesome name="minus" size={16} color={guests <= 1 ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
                
                <Text style={styles.guestsCount}>{guests}</Text>
                
                <TouchableOpacity 
                  style={[styles.guestButton, guests >= apartment.maxGuests && styles.disabledButton]}
                  onPress={() => handleGuestsChange(guests + 1)}
                  disabled={guests >= apartment.maxGuests}
                >
                  <FontAwesome name="plus" size={16} color={guests >= apartment.maxGuests ? COLORS.lightGray : COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.maxGuestsText}>
              Maximum {apartment.maxGuests} personnes
            </Text>
          </View>
          
          {/* Section des coordonnées */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vos coordonnées</Text>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Nom complet <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactName}
                onChangeText={setContactName}
                placeholder="Entrez votre nom complet"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Email <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactEmail}
                onChangeText={setContactEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Téléphone <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="Entrez votre numéro de téléphone"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Demandes spéciales</Text>
              <TextInput
                style={[styles.formInput, styles.multilineInput]}
                value={specialRequests}
                onChangeText={setSpecialRequests}
                placeholder="Précisez vos demandes particulières (heure d'arrivée, équipements spécifiques, etc.)"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          
          {/* Section du résumé des prix */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé des prix</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>
                {apartment.price.toLocaleString()} FCFA x {calculateNights(checkInDate, checkOutDate)} nuits
              </Text>
              <Text style={styles.priceItemValue}>
                {(apartment.price * calculateNights(checkInDate, checkOutDate)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de ménage</Text>
              <Text style={styles.priceItemValue}>{apartment.cleaningFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Frais de service</Text>
              <Text style={styles.priceItemValue}>{apartment.serviceFee.toLocaleString()} FCFA</Text>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceItemLabel}>Taxes (18%)</Text>
              <Text style={styles.priceItemValue}>
                {(totalPrice - (apartment.price * calculateNights(checkInDate, checkOutDate) + apartment.cleaningFee + apartment.serviceFee)).toLocaleString()} FCFA
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{totalPrice.toLocaleString()} FCFA</Text>
            </View>
          </View>
          
          {/* Section des politiques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Politiques de réservation</Text>
            
            <View style={styles.policyItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Heure d'arrivée et de départ</Text>
                <Text style={styles.policyText}>Arrivée à partir de 14h. Départ avant 11h.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <Ionicons name="close-circle-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Politique d'annulation</Text>
                <Text style={styles.policyText}>Annulation gratuite jusqu'à 5 jours avant l'arrivée. Ensuite, remboursement de 50% du montant total.</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Règles de l'hébergement</Text>
                <Text style={styles.policyText}>Pas de fêtes ni d'événements. Non-fumeur. Pas d'animaux.</Text>
              </View>
            </View>
          </View>
          
          {/* Espace pour le bas de page fixe */}
          <View style={{ height: 100 }} />
        </ScrollView>
        
        {/* Barre de réservation fixe en bas */}
        <View style={styles.bottom}>
          <View style={styles.bottomPriceContainer}>
            <Text style={styles.bottomTotalLabel}>Total</Text>
            <Text style={styles.bottomTotalValue}>{totalPrice.toLocaleString()} FCFA</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>Confirmer la réservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  
// Le reste des styles CSS pour ReserveApartment
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: COLORS.darkGray,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    placeholderView: {
      width: 24,
    },
    scrollView: {
      flex: 1,
    },
    apartmentSummary: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    apartmentImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    apartmentInfo: {
      flex: 1,
      marginLeft: 15,
      justifyContent: 'space-between',
    },
    apartmentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    locationText: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginLeft: 5,
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    priceSubtext: {
      fontWeight: 'normal',
      fontSize: 14,
      color: COLORS.darkGray,
    },
    section: {
      padding: SIZES.padding,
      backgroundColor: COLORS.white,
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: SIZES.radius,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: COLORS.primary,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    datePickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    datePickerContainer: {
      flex: 1,
    },
    datePickerSeparator: {
      width: 30,
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginBottom: 8,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
      borderRadius: 5,
      backgroundColor: COLORS.white,
    },
    dateText: {
      marginLeft: 10,
      fontSize: 14,
      color: COLORS.green_favoris,
    },
    stayDuration: {
      marginTop: 15,
      fontSize: 14,
      color: COLORS.darkGray,
      textAlign: 'center',
    },
    stayDurationValue: {
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    guestsSelectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    guestsLabel: {
      fontSize: 14,
      color: COLORS.darkGray,
    },
    guestsSelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    guestButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      borderColor: COLORS.lightGray,
    },
    guestsCount: {
      marginHorizontal: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    maxGuestsText: {
      marginTop: 10,
      fontSize: 12,
      color: COLORS.darkGray,
      fontStyle: 'italic',
    },
    formField: {
      marginBottom: 15,
    },
    formLabel: {
      fontSize: 14,
      marginBottom: 5,
      color: COLORS.green_favoris,
    },
    requiredStar: {
      color: COLORS.pink,
    },
    formInput: {
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    priceItemLabel: {
      fontSize: 14,
      color: COLORS.darkGray,
    },
    priceItemValue: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.green_favoris,
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.lightGray,
      marginVertical: 10,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    policyItem: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    policyContent: {
      flex: 1,
      marginLeft: 10,
    },
    policyTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.green_favoris,
      marginBottom: 3,
    },
    policyText: {
      fontSize: 13,
      color: COLORS.darkGray,
      lineHeight: 18,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightGray,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bottomPriceContainer: {
      flex: 1,
    },
    bottomTotalLabel: {
      fontSize: 12,
      color: COLORS.darkGray,
    },
    bottomTotalValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    bookButton: {
      backgroundColor: COLORS.green_button_back,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookButtonText: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarContainer: {
      width: '90%',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 15,
      maxHeight: '80%',
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    calendarTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    calendarFooter: {
      marginTop: 15,
      alignItems: 'center',
    },
    calendarFooterText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: 5,
    },
    calendarFooterSubtext: {
      fontSize: 12,
      color: COLORS.darkGray,
      textAlign: 'center',
    }
  });
  
  export default ReserveApartment;