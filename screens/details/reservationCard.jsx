

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../components/constants/Theme";
import { Appbar } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const ReservationCard = ({ navigation, route }) => {
  // Données de la chambre (à récupérer depuis la route)
  const roomDetails = route?.params?.roomDetails || {
    title: "Chambre Deluxe",
    price: "120.000",
    image: require("../../assets/images/incontournables/gore.jpg"),
    capacity: 3, // Capacité max de la chambre
  };

  // États pour les dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  // États pour les compteurs
  const [adults, setAdults] = useState(1); // Initialiser à 1 adulte
  const [children, setChildren] = useState(0);

  // État pour les informations supplémentaires
  const [additionalInfo, setAdditionalInfo] = useState("");

  // État pour la validation
  const [isFormValid, setIsFormValid] = useState(false);
  const [capacityExceeded, setCapacityExceeded] = useState(false);

  // Nouvel état pour contrôler l'affichage du résumé
  const [showSummary, setShowSummary] = useState(false);
  
  // Nouvel état pour contrôler l'affichage du popup d'informations supplémentaires
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  
  // État pour savoir si le formulaire principal est rempli
  const [isPrimaryInfoFilled, setIsPrimaryInfoFilled] = useState(false);

  // Animation pour les informations supplémentaires
  const infoPopupAnim = useRef(new Animated.Value(0)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;

  // Vérifier la validité du formulaire et afficher le popup au bon moment
  useEffect(() => {
    // Vérifier les champs requis
    const formIsValid = startDate !== null && endDate !== null && adults > 0;
    const primaryInfoFilled = startDate !== null && endDate !== null && adults > 0;

    // Vérifier si la capacité est dépassée
    const totalGuests = adults + children;
    const isCapacityExceeded = totalGuests > roomDetails.capacity;

    setIsFormValid(formIsValid && !isCapacityExceeded);
    setCapacityExceeded(isCapacityExceeded);
    setIsPrimaryInfoFilled(primaryInfoFilled && !isCapacityExceeded);

    // Contrôler l'affichage du résumé
    if (formIsValid) {
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
    
    // Afficher automatiquement le popup d'infos supplémentaires quand les données principales sont remplies
    if (primaryInfoFilled && !isCapacityExceeded && !showInfoPopup) {
      // On attend un peu avant d'afficher le popup pour laisser le temps à l'utilisateur de voir que les données sont validées
      const timer = setTimeout(() => {
        setShowInfoPopup(true);
        animateInfoPopup(1);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [startDate, endDate, adults, children, roomDetails.capacity]);

  // Animer l'apparition et la disparition du popup
  const animateInfoPopup = (toValue) => {
    Animated.spring(infoPopupAnim, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
    
    if (toValue === 1) {
      // Animation du contenu pour attirer l'attention
      Animated.sequence([
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(highlightAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(highlightAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Fermer le popup et le considérer comme complété
  const handleCloseInfoPopup = () => {
    animateInfoPopup(0);
    setTimeout(() => setShowInfoPopup(false), 300);
  };

  const handleViewInfoDetails = () => {
    // Ouvrir le popup avec les informations existantes
    setShowInfoPopup(true);
    animateInfoPopup(1);
  };

  // Calculer le total
  const calculateNights = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const totalPrice = parseInt(roomDetails.price.replace(/\./g, "")) * nights;

  // Formater le prix
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Gestion des dates
  const handleStartDateSelect = (date) => {
    const selectedDate = date.dateString;
    setStartDate(selectedDate);

    // Mise à jour des dates marquées
    const newMarkedDates = {};
    newMarkedDates[selectedDate] = {
      selected: true,
      startingDay: true,
      color: COLORS.green_accueil,
    };

    // Si une date de fin est déjà sélectionnée et après la date de début
    if (endDate && endDate > selectedDate) {
      newMarkedDates[endDate] = {
        selected: true,
        endingDay: true,
        color: COLORS.green_accueil,
      };

      // Marquer les dates intermédiaires
      let currentDate = new Date(selectedDate);
      currentDate.setDate(currentDate.getDate() + 1);

      const endDateObj = new Date(endDate);

      while (currentDate < endDateObj) {
        const dateString = currentDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = {
          selected: true,
          color: COLORS.green_accueil,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      // Si la date de fin est avant la nouvelle date de début, on la réinitialise
      setEndDate(null);
    }

    setMarkedDates(newMarkedDates);
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (date) => {
    const selectedDate = date.dateString;

    // Vérifier que la date de fin est après la date de début
    if (startDate && selectedDate < startDate) {
      return;
    }

    setEndDate(selectedDate);

    // Mise à jour des dates marquées
    const newMarkedDates = { ...markedDates };
    newMarkedDates[selectedDate] = {
      selected: true,
      endingDay: true,
      color: COLORS.green_accueil,
    };

    // Si une date de début est déjà sélectionnée
    if (startDate) {
      // Marquer les dates intermédiaires
      let currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);

      const endDateObj = new Date(selectedDate);

      while (currentDate < endDateObj) {
        const dateString = currentDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = {
          selected: true,
          color: COLORS.green_accueil,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    setMarkedDates(newMarkedDates);
    setShowEndCalendar(false);
  };

  // Formatage des dates pour l'affichage
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Sélectionner";

    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Gestion des compteurs avec vérification de capacité
  const incrementAdults = () => {
    const newAdults = adults + 1;
    if (newAdults <= 4) {
      setAdults(newAdults);
      // Vérifier la capacité totale
      if (newAdults + children > roomDetails.capacity) {
        Alert.alert(
          "Capacité dépassée",
          `Cette chambre peut accueillir au maximum ${roomDetails.capacity} personnes.`,
          [{ text: "OK", onPress: () => {} }]
        );
      }
    }
  };

  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => {
    const newChildren = children + 1;
    if (newChildren <= 4) {
      setChildren(newChildren);
      // Vérifier la capacité totale
      if (adults + newChildren > roomDetails.capacity) {
        Alert.alert(
          "Capacité dépassée",
          `Cette chambre peut accueillir au maximum ${roomDetails.capacity} personnes.`,
          [{ text: "OK", onPress: () => {} }]
        );
      }
    }
  };

  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  // Fonction pour naviguer vers l'écran de paiement
  const handleProceedToPayment = () => {
    if (!isFormValid) {
      let errorMessage = "Veuillez vérifier les informations suivantes:\n";
      if (!startDate || !endDate) errorMessage += "- Dates de séjour\n";
      if (adults <= 0) errorMessage += "- Nombre d'adultes\n";
      if (capacityExceeded)
        errorMessage += `- Le nombre de personnes dépasse la capacité maximale de ${roomDetails.capacity}`;

      Alert.alert("Informations incomplètes", errorMessage);
      return;
    }

    // Créer un objet de réservation à transmettre à l'écran de paiement
    const reservationData = {
      room: roomDetails,
      startDate,
      endDate,
      nights,
      adults,
      children,
      additionalInfo,
      totalPrice,
    };

    // Naviguer vers l'écran de paiement
    navigation.navigate("FailureHotel", { reservationData });
  };

  // Fonction pour revenir à l'écran précédent
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Couleur d'arrière-plan animée pour la section d'infos supplémentaires
  const highlightBackground = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#f0f8ff"],
  });

  // Position et opacité animées pour le popup d'informations supplémentaires
  const infoPopupStyle = {
    opacity: infoPopupAnim,
    transform: [
      {
        translateY: infoPopupAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.green_accueil}
        barStyle="light-content"
      />
      {/* Header avec barre de navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de réservation</Text>
        <View style={styles.emptyRight} />
      </View>

      {/* Image de chambre en arrière-plan avec dégradé */}
      <View style={styles.roomImageContainer}>
        <Image
          source={roomDetails.image}
          style={styles.roomHeroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.imageGradient}
        />
        <View style={styles.roomHeroInfo}>
          <Text style={styles.roomHeroTitle}>{roomDetails.title}</Text>
          <Text style={styles.roomHeroPrice}>
            {roomDetails.price} <Text style={styles.heroPriceUnit}>FCFA</Text> /
            nuit
          </Text>
          <View style={styles.capacityContainer}>
            <MaterialIcons name="person" size={16} color="#fff" />
            <Text style={styles.capacityText}>
              Max: {roomDetails.capacity} personnes
            </Text>
          </View>
        </View>
      </View>

      {/* Section dates avec design amélioré */}
      <View style={styles.datesSectionContainer}>
        <Text style={styles.datesSectionTitle}>Dates de séjour</Text>
        <View style={styles.dateSelection}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartCalendar(true)}
          >
            <Text style={styles.dateLabel}>Arrivée</Text>
            <View style={styles.dateValueContainer}>
              <MaterialIcons
                name="event"
                size={20}
                color={COLORS.green_accueil}
              />
              <Text
                
                  //suite

                  style={[styles.dateValue, !startDate && styles.dateValueEmpty]}
              >
                {formatDisplayDate(startDate)}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.dateDivider}>
            <MaterialIcons name="arrow-forward" size={20} color="#aaa" />
          </View>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndCalendar(true)}
          >
            <Text style={styles.dateLabel}>Départ</Text>
            <View style={styles.dateValueContainer}>
              <MaterialIcons
                name="event"
                size={20}
                color={COLORS.green_accueil}
              />
              <Text
                style={[styles.dateValue, !endDate && styles.dateValueEmpty]}
              >
                {formatDisplayDate(endDate)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenu scrollable avec design amélioré */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Voyageurs</Text>

          <View style={styles.guestCounterContainer}>
            <View style={styles.guestCounter}>
              <View style={styles.guestLabelContainer}>
                <MaterialIcons
                  name="person"
                  size={18}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.guestLabel}>Adultes</Text>
              </View>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    adults <= 1 && styles.disabledButton,
                  ]}
                  onPress={decrementAdults}
                  disabled={adults <= 1}
                >
                  <MaterialIcons
                    name="remove"
                    size={20}
                    color={adults <= 1 ? "#ccc" : "#333"}
                  />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{adults}</Text>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    adults >= 4 && styles.disabledButton,
                  ]}
                  onPress={incrementAdults}
                  disabled={adults >= 4}
                >
                  <MaterialIcons
                    name="add"
                    size={20}
                    color={adults >= 4 ? "#ccc" : "#333"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.guestCounter}>
              <View style={styles.guestLabelContainer}>
                <MaterialIcons
                  name="child-care"
                  size={18}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.guestLabel}>Enfants</Text>
              </View>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    children <= 0 && styles.disabledButton,
                  ]}
                  onPress={decrementChildren}
                  disabled={children <= 0}
                >
                  <MaterialIcons
                    name="remove"
                    size={20}
                    color={children <= 0 ? "#ccc" : "#333"}
                  />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{children}</Text>
                <TouchableOpacity
                  style={[
                    styles.counterButton,
                    children >= 4 && styles.disabledButton,
                  ]}
                  onPress={incrementChildren}
                  disabled={children >= 4}
                >
                  <MaterialIcons
                    name="add"
                    size={20}
                    color={children >= 4 ? "#ccc" : "#333"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {capacityExceeded && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="warning" size={16} color="red" />
              <Text style={styles.errorMessage}>
                Le nombre de personnes dépasse la capacité maximale de{" "}
                {roomDetails.capacity} personnes
              </Text>
            </View>
          )}
        </View>

        {/* Espace supplémentaire pour que le contenu soit visible derrière le résumé fixe */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Popup flottant pour les informations supplémentaires */}
      {showInfoPopup && (
        <Animated.View style={[styles.infoPopupContainer, infoPopupStyle]}>
          <Animated.View style={[styles.infoPopupCard, { backgroundColor: highlightBackground }]}>
            <View style={styles.infoHeaderRow}>
              <MaterialIcons
                name="info-outline"
                size={22}
                color={COLORS.green_accueil}
                style={styles.infoIcon}
              />
              <Text style={styles.sectionTitle}>
                Informations supplémentaires
              </Text>
              <TouchableOpacity 
                style={styles.closeInfoButton}
                onPress={handleCloseInfoPopup}
              >
                <MaterialIcons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoImportantContainer}>
              <MaterialIcons
                name="priority-high"
                size={18}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoImportantText}>
                Pour une meilleure expérience, veuillez nous informer de vos
                besoins particuliers (allergies, mobilité réduite, etc.)
              </Text>
            </View>

            <View style={styles.infoInputContainer}>
              <MaterialIcons
                name="note-add"
                size={20}
                color={COLORS.green_accueil}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.additionalInfoInput}
                placeholder="Précisez vos besoins particuliers..."
                multiline={true}
                numberOfLines={4}
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                placeholderTextColor="#aaa"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.confirmInfoButton}
              onPress={handleCloseInfoPopup}
            >
              <Text style={styles.confirmInfoText}>Confirmer</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {/* Résumé et bouton fixes en bas avec affichage conditionnel */}
      <View style={styles.fixedBottomSection}>
        {showSummary && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryLabelContainer}>
                <MaterialIcons
                  name="nights-stay"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.summaryLabel}>Nuits</Text>
              </View>
              <Text style={styles.summaryValue}>{nights}</Text>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryLabelContainer}>
                <MaterialIcons
                  name="group"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.summaryLabel}>Voyageurs</Text>
              </View>
              <Text style={styles.summaryValue}>
                {adults} adulte{adults > 1 ? "s" : ""}
                {children > 0
                  ? `, ${children} enfant${children > 1 ? "s" : ""}`
                  : ""}
              </Text>
            </View>
            
            {additionalInfo.trim() !== "" && (
         
              <View style={styles.summaryRow}>
  <View style={styles.summaryLabelContainer}>
    <MaterialIcons
      name="info-outline"
      size={16}
      color={COLORS.green_accueil}
    />
    <Text style={styles.summaryLabel}>Infos</Text>
  </View>
  <TouchableOpacity onPress={handleViewInfoDetails}>
    <Text style={styles.summaryInfoLink}>Voir les détails</Text>
  </TouchableOpacity>
</View>
            )}

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {nights > 0 ? formatPrice(totalPrice) : "0"}{" "}
                <Text style={styles.priceUnit}>FCFA</Text>
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.paymentButton,
            !isFormValid && styles.disabledPaymentButton,
          ]}
          onPress={handleProceedToPayment}
          disabled={!isFormValid}
        >
          <LinearGradient
            colors={
              isFormValid ? [COLORS.green_accueil, "#0f7d3b"] : ["#aaa", "#888"]
            }
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.paymentButtonText}>Procéder au paiement</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Modales de calendrier améliorées */}
      <Modal
        transparent={true}
        visible={showStartCalendar || showEndCalendar}
        animationType="slide"
        onRequestClose={() => {
          setShowStartCalendar(false);
          setShowEndCalendar(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>
                {showStartCalendar
                  ? "Sélectionnez la date d'arrivée"
                  : "Sélectionnez la date de départ"}
              </Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => {
                  setShowStartCalendar(false);
                  setShowEndCalendar(false);
                }}
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Calendar
              minDate={
                showStartCalendar
                  ? new Date().toISOString().split("T")[0]
                  : startDate
              }
              markedDates={markedDates}
              onDayPress={
                showStartCalendar ? handleStartDateSelect : handleEndDateSelect
              }
              monthFormat={"MMMM yyyy"}
              hideExtraDays={true}
              firstDay={1}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#333333",
                selectedDayBackgroundColor: COLORS.green_accueil,
                selectedDayTextColor: "#ffffff",
                todayTextColor: COLORS.green_accueil,
                dayTextColor: "#333333",
                textDisabledColor: "#d9e1e8",
                dotColor: COLORS.green_accueil,
                selectedDotColor: "#ffffff",
                arrowColor: COLORS.green_accueil,
                monthTextColor: "#333333",
                indicatorColor: COLORS.green_accueil,
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "bold",
              }}
            />
          </View>
        </View>
      </Modal>
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
  // Nouveau design pour l'image héro
  roomImageContainer: {
    position: "relative",
    height: 200,
    width: "100%",
  },
  roomHeroImage: {
    height: "100%",
    width: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  roomHeroInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  roomHeroTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  roomHeroPrice: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  heroPriceUnit: {
    fontSize: 14,
    fontWeight: "normal",
  },
  capacityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  capacityText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  // Section dates améliorée
  datesSectionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1,
  },
  datesSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  dateSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateDivider: {
    paddingHorizontal: 10,
  },
  dateLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  dateValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateValue: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  dateValueEmpty: {
    color: "#999",
  },
  // Contenu principal
  scrollView: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  card: {
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
  // Style supplémentaire pour la carte mise en évidence
  highlightedCard: {
    borderWidth: 1,
    borderColor: COLORS.green_accueil,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  // Compteurs améliorés
  guestCounterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  guestCounter: {
    width: "48%",
  },
  guestLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  guestLabel: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
    fontWeight: "500",
  },
  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  counterButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  disabledButton: {
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  // Message d'erreur amélioré
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  errorMessage: {
    color: "red",
    fontSize: 13,
    marginLeft: 5,
    flex: 1,
  },
  // Nouveaux styles pour la section d'informations supplémentaires
  infoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    
    
  },
  infoIcon: {
    marginRight: 10,
    marginBottom:17     // Espace entre l'icône et le texte
  },
  

  // Nouveau conteneur animé pour les informations supplémentaires
  additionalInfoContainer: {
    // Cette partie sera contrôlée par l'animation
  },
  // Zone de texte
  infoInputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputIcon: {
    marginTop: 12,
    marginRight: 10,
  },
  additionalInfoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
    fontSize: 14,
  },
  // Section inférieure améliorée
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
  summaryCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  // Bouton de paiement amélioré
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
  // Calendrier modal amélioré
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarModal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  closeModalButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  // Additional space needed at the bottom to account for the fixed summary section
  bottomSpacer: {
    height: 150, // Adjust based on the height of your fixedBottomSection
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: "normal",
  },
  disabledPaymentButton: {
    opacity: 0.7,
  },
//code new button
// Ajoutez ces styles à la fin du StyleSheet
closeInfoButton: {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: 5,
},
showInfoButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
},
showInfoText: {
  color: COLORS.green_accueil,
  fontSize: 14,
  fontWeight: '500',
  marginRight: 5,
},
infoImportantContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: '#f0f7ff',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
},
infoImportantText: {
  color: '#444',
  fontSize: 13,
  marginLeft: 8,
  flex: 1,
},

//suite nouveau
infoPopupContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
},
infoPopupCard: {
  width: width * 0.9,
  backgroundColor: '#fff',
  borderRadius: 15,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,
},
infoHeaderRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 15,
  position: 'relative',
},
infoIcon: {
  marginRight: 10,
},
closeInfoButton: {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: 5,
},
infoImportantContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: '#f0f7ff',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
},
infoImportantText: {
  color: '#444',
  fontSize: 13,
  marginLeft: 8,
  flex: 1,
},
infoInputContainer: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 15,
},
inputIcon: {
  marginTop: 12,
  marginRight: 10,
},
additionalInfoInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 12,
  height: 100,
  textAlignVertical: "top",
  backgroundColor: "#f9f9f9",
  fontSize: 14,
},
confirmInfoButton: {
  backgroundColor: COLORS.green_accueil,
  borderRadius: 10,
  padding: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
},
confirmInfoText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '500',
},
summaryInfoLink: {
  color: COLORS.green_accueil,
  fontSize: 14,
  textDecorationLine: 'underline',
},
//voir details css
// Ajoutez ces styles dans votre StyleSheet
infoDetailsContainer: {
  marginTop: 10,
  padding: 10,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  borderLeftWidth: 3,
  borderLeftColor: COLORS.green_accueil,
},
infoDetailsText: {
  fontSize: 14,
  color: '#444',
  fontStyle: 'italic',
},
infoDetailsEmptyText: {
  fontSize: 14,
  color: '#888',
  fontStyle: 'italic',
},


});

export default ReservationCard;
