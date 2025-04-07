import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    Dimensions,
    Animated,
    TextInput,
  } from "react-native";
  import React, { useState, useRef } from "react";
  import { Rating } from "react-native-stock-star-rating";
  import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
  
  // Constantes pour les couleurs et tailles
  const COLORS = {
    primary: "#E5AF42", // Couleur dorée pour une sensation de luxe
    white: "#FFFFFF",
    black: "#000000",
    gray: "#666666",
    lightGray: "#EEEEEE",
    pink: "#FF6B81",
    orange: "#FFA500",
    darkGray: "#333333",
    beige: "#F5F1E9",
  };
  
  const SIZES = {
    padding: 15,
    radius: 12,
  };
  
  const { width, height } = Dimensions.get('window');
  const HEADER_HEIGHT = height * 0.4;
  
  // Images (à remplacer par vos vraies images)
  const mainRoomImage = require("../../assets/images/rooms/main-room.jpg");
  const user1 = require("../../assets/images/users/user1.jpg");
  const user2 = require("../../assets/images/users/user2.jpg");
  
  const PrivateRoomDetails = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [expandedReviews, setExpandedReviews] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [userName, setUserName] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    // Images d'exemple pour la chambre
    const roomImages = [
      mainRoomImage,
      require("../../assets/images/rooms/bathroom.jpg"),
      require("../../assets/images/rooms/closet.jpg"),
      require("../../assets/images/rooms/desk.jpg"),
      require("../../assets/images/rooms/view.jpg"),
    ];
  
    const room = {
      availability: {
        start: "2025-05-01T00:00:00.000Z",
        end: "2025-12-31T00:00:00.000Z",
      },
      coordinates: {
        latitude: 14.7645,
        longitude: -17.3660,
      },
      _id: "room987654321",
      title: "Chambre Raffinée au Cœur de Dakar",
      description:
        "Découvrez notre chambre meublée de luxe idéalement située dans le quartier résidentiel prisé de Mermoz à Dakar. Cette chambre élégante et moderne offre un espace de vie intime et confortable, parfaite pour les voyageurs d'affaires ou les touristes recherchant un séjour de qualité dans la capitale sénégalaise.\n\nLa chambre est spacieuse (18m²) et lumineuse grâce à ses grandes fenêtres qui offrent une vue imprenable sur le quartier. Elle est dotée d'un lit queen-size avec matelas orthopédique premium assurant un sommeil réparateur, d'une armoire spacieuse, d'un bureau de travail ergonomique, et d'une climatisation silencieuse dernière génération.\n\nLa salle de bain privative attenante est équipée d'une douche à l'italienne avec eau chaude en permanence, de produits d'accueil de qualité, et de serviettes douces changées régulièrement.\n\nBénéficiez d'un WiFi haut débit pour rester connecté, d'une télévision à écran plat, et d'un petit réfrigérateur pour conserver vos boissons fraîches. Un espace commun avec machine à café et micro-ondes est accessible à tous les résidents.\n\nNotre emplacement stratégique vous place à seulement 10 minutes du centre-ville, 15 minutes de l'aéroport international Blaise Diagne, et à quelques pas des meilleurs restaurants, supermarchés et commodités de Dakar. La plage des Almadies est accessible en 20 minutes en voiture.\n\nUn service de ménage hebdomadaire est inclus, et notre équipe locale est disponible 24h/7j pour vous assister et rendre votre séjour aussi agréable que possible.",
      contact: "77-123-45-67",
      placeImage: mainRoomImage,
      rating: 4.8,
      review: "28 avis",
      location: "Mermoz - Dakar, Sénégal",
      price: 25000,
      facilities: [
        {
          wifi: true,
          aircon: true,
          tv: true,
          bathroom: true,
          desk: true,
          fridge: true,
          security: true,
          _id: "987654321",
        },
      ],
      _v: 0,
      reviews: [
        {
          id: "rev234567",
          review:
            "Chambre impeccable avec une propreté irréprochable! Le lit est très confortable et la douche fonctionne parfaitement. L'hôte est attentif et disponible pour répondre à toutes les questions. L'emplacement est parfait, près de tout ce dont vous avez besoin. Je reviendrai sans hésiter lors de mon prochain voyage à Dakar.",
          rating: 5.0,
          user: {
            id: "user234567",
            username: "Marie Diop",
            profile: user1,
          },
          updatedAt: "23-03-2025",
        },
        {
          id: "rev345678",
          review:
            "Excellent rapport qualité-prix pour Dakar. La chambre est bien équipée et le quartier est calme et sécurisé. La climatisation fonctionne très bien, ce qui est essentiel à Dakar. Seul bémol: la connexion WiFi était parfois instable.",
          rating: 4.5,
          user: {
            id: "user345678",
            username: "Paul Seck",
            profile: user2,
          },
          updatedAt: "12-04-2025",
        },
      ],
    };
  
    // Caractéristiques de la chambre avec icônes
    const roomFeatures = [
      { icon: 'hotel', label: 'Lit Queen-Size' },
      { icon: 'wifi', label: 'WiFi Haut Débit' },
      { icon: 'ac-unit', label: 'Climatisation' },
      { icon: 'tv', label: 'TV Écran Plat' },
      { icon: 'bathroom', label: 'Salle de Bain Privée' },
      { icon: 'kitchen', label: 'Mini-Réfrigérateur' },
      { icon: 'desk', label: 'Bureau de Travail' },
      { icon: 'cleaning-services', label: 'Ménage Hebdomadaire' },
      { icon: 'security', label: 'Sécurité 24/7' },
    ];
  
    let coordinates = {
      id: room._id,
      title: room.title,
      latitude: room.coordinates.latitude,
      longitude: room.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  
    const handleImageChange = (index) => {
      setCurrentImageIndex(index);
    };
  
    // Format date string for display
    const formatDateRange = () => {
      const startDate = new Date(room.availability.start);
      const endDate = new Date(room.availability.end);
      
      const startDay = startDate.getDate();
      const startMonth = startDate.toLocaleString('default', { month: 'short' });
      const startYear = startDate.getFullYear();
      
      const endDay = endDate.getDate();
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      const endYear = endDate.getFullYear();
      
      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
    };
  
    // Toggle description expand/collapse
    const toggleDescription = () => {
      setExpandedDescription(!expandedDescription);
    };
  
    // Toggle review expand/collapse
    const toggleReview = (reviewId) => {
      setExpandedReviews(prev => ({
        ...prev,
        [reviewId]: !prev[reviewId]
      }));
    };
  
    // Toggle favorite status
    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };
  
    // Toggle review form
    const toggleReviewForm = () => {
      setShowReviewForm(!showReviewForm);
    };
  
    // Submit user review
    const submitReview = () => {
      // Cette fonction simule l'ajout d'un avis
      if (userName && userRating > 0 && userReview) {
        const newReview = {
          id: `rev${Date.now()}`,
          review: userReview,
          rating: userRating,
          user: {
            id: `user${Date.now()}`,
            username: userName,
            profile: null,
          },
          updatedAt: new Date().toLocaleDateString('fr-FR'),
        };
        
        // Ajout de l'avis à la liste (simulation)
        room.reviews.push(newReview);
        
        // Réinitialisation du formulaire
        setUserName("");
        setUserRating(0);
        setUserReview("");
        setShowReviewForm(false);
        
        // Afficher un message de confirmation
        alert("Merci pour votre avis!");
      } else {
        alert("Veuillez remplir tous les champs");
      }
    };
  
    // Animation pour l'opacité du header pendant le défilement
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 100, 200],
      outputRange: [1, 0.8, 0.6],
      extrapolate: 'clamp'
    });
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Bouton Retour */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
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
        
        {/* Header fixe avec Galerie d'Images */}
        <Animated.View 
          style={[
            styles.fixedHeader,
            { opacity: headerOpacity }
          ]}
        >
          <Image 
            source={roomImages[currentImageIndex]}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <View style={styles.thumbnailContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailScrollContent}
            >
              {roomImages.map((image, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => handleImageChange(index)}
                  style={[
                    styles.thumbnailButton,
                    currentImageIndex === index && styles.activeThumbnail
                  ]}
                >
                  <Image 
                    source={image}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
        
        {/* Background Overlay */}
        <View style={styles.headerOverlay} />
        
        {/* Contenu principal défilable */}
        <Animated.ScrollView 
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Informations sur la chambre */}
          <View style={styles.roomHeader}>
            <Text style={styles.roomTitle}>{room.title}</Text>
            
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
              <Text style={styles.locationText}>{room.location}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <Rating
                maxStars={5}
                stars={room.rating}
                bordered={false}
                color={COLORS.orange}
              />
              <Text style={styles.reviewsText}>({room.review})</Text>
            </View>
          </View>
          
          {/* Badge "Coup de Cœur" */}
          <View style={styles.badgeContainer}>
            <MaterialIcons name="favorite" size={18} color={COLORS.white} />
            <Text style={styles.badgeText}>Coup de Cœur</Text>
          </View>
          
          {/* Section Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View>
              <Text 
                style={styles.descriptionText} 
                numberOfLines={expandedDescription ? undefined : 3}
              >
                {room.description}
              </Text>
              <TouchableOpacity onPress={toggleDescription} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                  {expandedDescription ? "Afficher moins" : "Afficher plus"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Section Points Forts */}
          <View style={styles.highlightsSection}>
            <Text style={styles.highlightsTitle}>Les Points Forts</Text>
            <View style={styles.highlightsList}>
              <View style={styles.highlightItem}>
                <MaterialIcons name="location-on" size={22} color={COLORS.primary} />
                <Text style={styles.highlightText}>Quartier prisé et sécurisé</Text>
              </View>
              <View style={styles.highlightItem}>
                <MaterialIcons name="king-bed" size={22} color={COLORS.primary} />
                <Text style={styles.highlightText}>Literie premium ultra-confortable</Text>
              </View>
              <View style={styles.highlightItem}>
                <MaterialIcons name="wb-sunny" size={22} color={COLORS.primary} />
                <Text style={styles.highlightText}>Chambre lumineuse et spacieuse</Text>
              </View>
              <View style={styles.highlightItem}>
                <MaterialIcons name="local-parking" size={22} color={COLORS.primary} />
                <Text style={styles.highlightText}>Stationnement gratuit</Text>
              </View>
            </View>
          </View>
          
          {/* Section Caractéristiques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements</Text>
            <View style={styles.featuresGrid}>
              {roomFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <MaterialIcons name={feature.icon} size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Section Emplacement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emplacement</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
              <Text style={[styles.locationText, { fontSize: 15 }]}>{room.location}</Text>
            </View>
            <View style={styles.mapContainer}>
              {/* Remplacer cette View par un composant Map réel */}
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Carte de l'emplacement</Text>
              </View>
            </View>
            
            <View style={styles.proximityContainer}>
              <Text style={styles.proximityTitle}>Distances:</Text>
              <View style={styles.proximityItem}>
                <MaterialIcons name="restaurant" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Restaurants (5 min à pied)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="local-grocery-store" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Supermarché Casino (10 min à pied)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="beach-access" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Plage des Almadies (20 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="airport-shuttle" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Aéroport (15 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="business" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Centre-ville (10 min en voiture)</Text>
              </View>
            </View>
          </View>
          
          {/* Section Tarifs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarifs & Options</Text>
            <View style={styles.pricingContainer}>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Journalier</Text>
                <Text style={styles.pricingValue}>{room.price.toLocaleString()} FCFA</Text>
              </View>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Hebdomadaire</Text>
                <Text style={styles.pricingValue}>{(room.price * 7 * 0.9).toLocaleString()} FCFA</Text>
                <Text style={styles.discountTag}>-10%</Text>
              </View>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Mensuel</Text>
                <Text style={styles.pricingValue}>{(room.price * 30 * 0.8).toLocaleString()} FCFA</Text>
                <Text style={styles.discountTag}>-20%</Text>
              </View>
            </View>
            
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsTitle}>Services inclus:</Text>
              <View style={styles.optionItem}>
                <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>Ménage hebdomadaire</Text>
              </View>
              <View style={styles.optionItem}>
                <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>Charges (eau, électricité) incluses</Text>
              </View>
              <View style={styles.optionItem}>
                <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>WiFi illimité</Text>
              </View>
              
              <Text style={[styles.optionsTitle, {marginTop: 15}]}>Services en option:</Text>
              <View style={styles.optionItem}>
                <MaterialIcons name="add-circle-outline" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>Service de petit-déjeuner (5.000 FCFA/jour)</Text>
              </View>
              <View style={styles.optionItem}>
                <MaterialIcons name="add-circle-outline" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>Ménage quotidien (15.000 FCFA/semaine)</Text>
              </View>
              <View style={styles.optionItem}>
                <MaterialIcons name="add-circle-outline" size={16} color={COLORS.primary} />
                <Text style={styles.optionText}>Service de blanchisserie (prix selon volume)</Text>
              </View>
            </View>
          </View>
          
          {/* Section Avis */}
          <View style={styles.section}>
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>Avis des clients</Text>
              <TouchableOpacity onPress={toggleReviewForm}>
                <MaterialIcons name="rate-review" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            {/* Formulaire pour ajouter un avis */}
            {showReviewForm && (
              <View style={styles.reviewForm}>
                <Text style={styles.reviewFormTitle}>Partagez votre expérience</Text>
                
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Votre nom</Text>
                  <TextInput
                    style={styles.formInput}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Entrez votre nom"
                  />
                </View>
                
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Note</Text>
                  <View style={styles.ratingInput}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity 
                        key={star}
                        onPress={() => setUserRating(star)}
                      >
                        <MaterialIcons 
                          name={userRating >= star ? "star" : "star-border"} 
                          size={30} 
                          color={COLORS.orange} 
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Votre avis</Text>
                  <TextInput
                    style={[styles.formInput, styles.multilineInput]}
                    value={userReview}
                    onChangeText={setUserReview}
                    placeholder="Partagez votre expérience dans cette chambre..."
                    multiline
                    numberOfLines={4}
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={submitReview}
                >
                  <Text style={styles.submitButtonText}>Soumettre</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Liste des avis */}
            <View style={styles.reviewsListContainer}>
              {room.reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewerContainer}>
                    {review.user.profile ? (
                      <Image 
                        source={review.user.profile} 
                        style={styles.reviewerImage} 
                      />
                    ) : (
                      <View style={[styles.reviewerImage, styles.reviewerImagePlaceholder]}>
                        <Text style={styles.reviewerImageInitial}>
                          {review.user.username.charAt(0)}
                        </Text>
                      </View>
                    )}
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{review.user.username}</Text>
                      <Text style={styles.reviewDate}>{review.updatedAt}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.reviewRating}>
                    <Rating
                      maxStars={5}
                      stars={review.rating}
                      bordered={false}
                      color={COLORS.orange}
                      size={14}
                    />
                  </View>
                  
                  <View>
                    <Text 
                      style={styles.reviewText}
                      numberOfLines={expandedReviews[review.id] ? undefined : 3}
                    >
                      {review.review}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => toggleReview(review.id)} 
                      style={styles.toggleButton}
                    >
                      <Text style={styles.toggleButtonText}>
                        {expandedReviews[review.id] ? "Afficher moins" : "Afficher plus"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          {/* Section Politique de réservation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Politique de réservation</Text>
            <View style={styles.policyContainer}>
              <View style={styles.policyItem}>
                <MaterialIcons name="access-time" size={18} color={COLORS.primary} />
                <Text style={styles.policyText}>Check-in: 14h00 - 22h00</Text>
              </View>
              <View style={styles.policyItem}>
                <MaterialIcons name="access-time" size={18} color={COLORS.primary} />
                <Text style={styles.policyText}>Check-out: avant 12h00</Text>
              </View>
              <View style={styles.policyItem}>
                <MaterialIcons name="smoke-free" size={18} color={COLORS.primary} />
                <Text style={styles.policyText}>Non-fumeur</Text>
              </View>
              <View style={styles.policyItem}>
                <MaterialIcons name="pets" size={18} color={COLORS.gray} />
                <Text style={styles.policyText}>Animaux non admis</Text>
              </View>
              <View style={styles.policyItem}>
                <MaterialIcons name="credit-card" size={18} color={COLORS.primary} />
                <Text style={styles.policyText}>Caution: 50.000 FCFA (remboursable)</Text>
              </View>
              <View style={styles.policyItem}>
                <MaterialIcons name="event-busy" size={18} color={COLORS.primary} />
                <Text style={styles.policyText}>Annulation gratuite jusqu'à 48h avant l'arrivée</Text>
              </View>
            </View>
          </View>
          
          {/* Espace en bas pour le bas de page fixe */}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>
        
        {/* Barre de réservation fixe en bas */}
        <View style={styles.bottom}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{room.price.toLocaleString()} FCFA</Text>
            <Text style={styles.priceLabel}>par nuit</Text>
            <Text style={styles.dateText}>Disponible: {formatDateRange()}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate("BookRoom", { roomId: room._id })}
          >
            <Text style={styles.bookButtonText}>Réserver maintenant</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.beige,
    },
    fixedHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      zIndex: 10,
      overflow: 'hidden',
    },
    headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      backgroundColor: COLORS.beige,
      zIndex: 5,
    },
    mainImage: {
      width: '100%',
      height: HEADER_HEIGHT - 60,
    },
    thumbnailContainer: {
      width: '100%',
      height: 60,
      backgroundColor: COLORS.white,
      paddingVertical: 10,
    },
    thumbnailScrollContent: {
      paddingHorizontal: 5,
    },
    thumbnailButton: {
      width: 70,
      height: 40,
      marginHorizontal: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      overflow: 'hidden',
    },
    activeThumbnail: {
      borderColor: COLORS.primary,
      borderWidth: 2,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    scrollContent: {
      flex: 1,
      marginBottom: 90,
      zIndex: 7,
    },
    scrollContentContainer: {
      paddingTop: HEADER_HEIGHT + 20,
      paddingHorizontal: 15,
      paddingBottom: 3,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
    },
    favoriteButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
      },
      roomHeader: {
        marginBottom: 15,
      },
      roomTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        marginBottom: 8,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      locationText: {
        fontSize: 14,
        color: COLORS.gray,
        marginLeft: 5,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      reviewsText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.gray,
      },
      badgeContainer: {
        backgroundColor: COLORS.pink,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 15,
      },
      badgeText: {
        color: COLORS.white,
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 12,
      },
      section: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        marginBottom: 12,
      },
      descriptionText: {
        fontSize: 14,
        lineHeight: 22,
        color: COLORS.gray,
      },
      toggleButton: {
        marginTop: 8,
        alignSelf: 'flex-end',
      },
      toggleButtonText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
      },
      highlightsSection: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      highlightsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        marginBottom: 15,
      },
      highlightsList: {
        marginTop: 10,
      },
      highlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      highlightText: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.darkGray,
      },
      featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      featureItem: {
        width: '30%',
        marginBottom: 15,
        alignItems: 'center',
      },
      featureIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      featureLabel: {
        fontSize: 12,
        color: COLORS.gray,
        textAlign: 'center',
      },
      mapContainer: {
        height: 180,
        marginVertical: 15,
        borderRadius: 10,
        overflow: 'hidden',
      },
      mapPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      mapPlaceholderText: {
        color: COLORS.gray,
        fontWeight: '500',
      },
      proximityContainer: {
        marginTop: 10,
      },
      proximityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkGray,
        marginBottom: 10,
      },
      proximityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      proximityText: {
        marginLeft: 8,
        fontSize: 14,
        color: COLORS.gray,
      },
      pricingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      pricingItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
        position: 'relative',
        marginHorizontal: 5,
      },
      pricingLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkGray,
        marginBottom: 8,
      },
      pricingValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
      },
      discountTag: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: COLORS.pink,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 10,
        fontSize: 10,
        color: COLORS.white,
        fontWeight: 'bold',
      },
      optionsContainer: {
        marginTop: 10,
      },
      optionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkGray,
        marginBottom: 10,
      },
      optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      optionText: {
        marginLeft: 8,
        fontSize: 14,
        color: COLORS.gray,
      },
      reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      reviewForm: {
        backgroundColor: COLORS.lightGray,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      },
      reviewFormTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkGray,
        marginBottom: 15,
      },
      formField: {
        marginBottom: 15,
      },
      formLabel: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginBottom: 5,
      },
      formInput: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      multilineInput: {
        height: 100,
        textAlignVertical: 'top',
      },
      ratingInput: {
        flexDirection: 'row',
      },
      submitButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
      },
      submitButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
      },
      reviewsListContainer: {
        marginTop: 5,
      },
      reviewItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
        marginBottom: 15,
      },
      reviewerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      reviewerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      reviewerImagePlaceholder: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
      },
      reviewerImageInitial: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
      },
      reviewerInfo: {
        marginLeft: 10,
      },
      reviewerName: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkGray,
      },
      reviewDate: {
        fontSize: 12,
        color: COLORS.gray,
      },
      reviewRating: {
        marginBottom: 8,
      },
      reviewText: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.gray,
      },
      policyContainer: {
        marginTop: 5,
      },
      policyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      policyText: {
        marginLeft: 8,
        fontSize: 14,
        color: COLORS.gray,
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      priceContainer: {
        flex: 1,
      },
      priceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
      },
      priceLabel: {
        fontSize: 12,
        color: COLORS.gray,
      },
      dateText: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 3,
      },
      bookButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      bookButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
      }
    });
    
    export default PrivateRoomDetails;