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
    primary: "#6D9F3D",
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
  
  const { width, height } = Dimensions.get('window');
  const HEADER_HEIGHT = height * 0.4;
  
  // Images d'exemple (à remplacer avec de vraies images)
  const mainApartmentImage = require("../../assets/images/apartments/main-apartment.jpg");
  const user1 = require("../../assets/images/users/user1.jpg");
  const user2 = require("../../assets/images/users/user2.jpg");
  
  const ApartmentDetails = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [expandedReviews, setExpandedReviews] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [userName, setUserName] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    // Images d'exemple pour l'appartement
    const apartmentImages = [
      mainApartmentImage,
      require("../../assets/images/apartments/kitchen.jpg"),
      require("../../assets/images/apartments/bedroom.jpg"),
      require("../../assets/images/apartments/bathroom.jpg"),
      require("../../assets/images/apartments/balcony.jpg"),
    ];
  
    const apartment = {
      availability: {
        start: "2025-05-01T00:00:00.000Z",
        end: "2025-05-31T00:00:00.000Z",
      },
      coordinates: {
        latitude: 14.7167,
        longitude: -17.4677,
      },
      _id: "apt123456789",
      title: "Appartement Vue Mer Dakar",
      description:
        "Magnifique appartement avec vue sur mer situé dans un quartier calme et résidentiel de Dakar. Ce logement spacieux et lumineux est idéal pour les voyageurs qui souhaitent découvrir la ville tout en bénéficiant d'un havre de paix.\n\nL'appartement comprend deux chambres confortables avec climatisation, un salon spacieux avec TV à écran plat et accès à Netflix, une cuisine entièrement équipée, et une salle de bain moderne. Le balcon offre une vue imprenable sur l'océan Atlantique, parfait pour admirer le coucher du soleil.\n\nSitué à seulement 10 minutes à pied des commerces et restaurants locaux, et à 15 minutes en voiture du centre-ville de Dakar, cet appartement vous permettra de profiter pleinement de votre séjour au Sénégal, que ce soit pour le travail ou les loisirs.\n\nLe WiFi haut débit est disponible dans tout l'appartement, et un parking sécurisé est inclus. Notre équipe est disponible 24/7 pour répondre à vos questions et vous aider à organiser votre séjour.",
      contact: "78-456-78-90",
      placeImage: mainApartmentImage,
      rating: 4.7,
      review: "32 avis",
      location: "Almadies - Dakar, Sénégal",
      price: 75000,
      facilities: [
        {
          wifi: true,
          parking: true,
          kitchen: true,
          ac: true,
          tv: true,
          _id: "123456789",
        },
      ],
      _v: 0,
      reviews: [
        {
          id: "rev123456",
          review:
            "Appartement exceptionnel avec une vue spectaculaire! Très propre et bien équipé, on s'y sent comme chez soi. L'hôte était très accueillant et disponible pour répondre à nos questions. L'emplacement est idéal, proche des restaurants et des plages. Je recommande vivement!",
          rating: 5.0,
          user: {
            id: "user123456",
            username: "Sophie Dupont",
            profile: user1,
          },
          updatedAt: "15-03-2025",
        },
        {
          id: "rev789012",
          review:
            "Très bon séjour dans cet appartement. La vue est magnifique et l'emplacement parfait pour explorer Dakar. La cuisine est bien équipée et le WiFi fonctionne parfaitement. Seul petit bémol: la climatisation était un peu bruyante dans la chambre principale.",
          rating: 4.5,
          user: {
            id: "user789012",
            username: "Thomas Martin",
            profile: user2,
          },
          updatedAt: "02-04-2025",
        },
      ],
    };
  
    // Caractéristiques de l'appartement avec icônes
    const apartmentFeatures = [
      { icon: 'wifi', label: 'WiFi Gratuit' },
      { icon: 'local-parking', label: 'Parking Sécurisé' },
      { icon: 'kitchen', label: 'Cuisine Équipée' },
      { icon: 'ac-unit', label: 'Climatisation' },
      { icon: 'tv', label: 'TV & Netflix' },
      { icon: 'bathtub', label: 'Salle de Bain Moderne' },
      { icon: 'visibility', label: 'Vue sur Mer' },
      { icon: 'security', label: 'Sécurité 24/7' },
      { icon: 'local-laundry-service', label: 'Machine à Laver' },
    ];
  
    let coordinates = {
      id: apartment._id,
      title: apartment.title,
      latitude: apartment.coordinates.latitude,
      longitude: apartment.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  
    const handleImageChange = (index) => {
      setCurrentImageIndex(index);
    };
  
    // Format date string for display
    const formatDateRange = () => {
      const startDate = new Date(apartment.availability.start);
      const endDate = new Date(apartment.availability.end);
      
      const startDay = startDate.getDate();
      const startMonth = startDate.toLocaleString('default', { month: 'short' });
      
      const endDay = endDate.getDate();
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
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
      // Dans une application réelle, on enverrait ces données à une API
      if (userName && userRating > 0 && userReview) {
        const newReview = {
          id: `rev${Date.now()}`,
          review: userReview,
          rating: userRating,
          user: {
            id: `user${Date.now()}`,
            username: userName,
            profile: null, // Dans une app réelle, on utiliserait une photo de profil
          },
          updatedAt: new Date().toLocaleDateString('fr-FR'),
        };
        
        // Ajout de l'avis à la liste (simulation)
        apartment.reviews.push(newReview);
        
        // Réinitialisation du formulaire
        setUserName("");
        setUserRating(0);
        setUserReview("");
        setShowReviewForm(false);
        
        // Afficher un message de confirmation (à implémenter selon vos besoins)
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
           // { opacity: headerOpacity }
          ]}
        >
          <Image 
            source={apartmentImages[currentImageIndex]}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <View style={styles.thumbnailContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailScrollContent}
            >
              {apartmentImages.map((image, index) => (
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
          {/* Informations sur l'appartement */}
          <View style={styles.apartmentHeader}>
            <Text style={styles.apartmentTitle}>{apartment.title}</Text>
            
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
              <Text style={styles.locationText}>{apartment.location}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <Rating
                maxStars={5}
                stars={apartment.rating}
                bordered={false}
                color={COLORS.orange}
              />
              <Text style={styles.reviewsText}>({apartment.review})</Text>
            </View>
          </View>
          
          {/* Section Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View>
              <Text 
                style={styles.descriptionText} 
                numberOfLines={expandedDescription ? undefined : 3}
              >
                {apartment.description}
              </Text>
              <TouchableOpacity onPress={toggleDescription} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                  {expandedDescription ? "Afficher moins" : "Afficher plus"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Section Caractéristiques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featuresGrid}>
              {apartmentFeatures.map((feature, index) => (
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
              <Text style={[styles.locationText, { fontSize: 15 }]}>{apartment.location}</Text>
            </View>
            <View style={styles.mapContainer}>
              {/* Remplacer cette View par un composant Map réel */}
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Carte de l'emplacement</Text>
              </View>
            </View>
            
            <View style={styles.proximityContainer}>
              <Text style={styles.proximityTitle}>À proximité:</Text>
              <View style={styles.proximityItem}>
                <MaterialIcons name="restaurant" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Restaurants (5-10 min à pied)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="beach-access" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Plage (15 min à pied)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="local-grocery-store" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Supermarché (8 min à pied)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="directions-bus" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Arrêt de bus (3 min à pied)</Text>
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
                    placeholder="Partagez votre expérience dans cet appartement..."
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
              {apartment.reviews.map((review, index) => (
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
          
          {/* Espace en bas pour le bas de page fixe */}
          <View style={{ height: 5 }} />
        </Animated.ScrollView>
        
        {/* Barre de réservation fixe en bas */}
        <View style={styles.bottom}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{apartment.price.toLocaleString()} FCFA</Text>
            <Text style={styles.priceLabel}>par nuit</Text>
            <Text style={styles.dateText}>Disponible: {formatDateRange()}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate("BookApartment", { apartmentId: apartment._id })}
          >
            <Text style={styles.bookButtonText}>Réserver l'appartement</Text>
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
      backgroundColor: '#f8f8f8',
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
    apartmentHeader: {
      marginBottom: 15,
    },
    apartmentTitle: {
      fontSize: 24,
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
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    reviewsText: {
      marginLeft: 8,
      fontSize: 14,
      color: COLORS.gray,
    },
    section: {
      padding: SIZES.padding,
      backgroundColor: COLORS.white,
      marginBottom: 15,
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
    descriptionText: {
      fontSize: 14,
      lineHeight: 22,
      color: COLORS.gray,
    },
    toggleButton: {
      marginTop: 8,
      alignSelf: 'flex-start',
    },
    toggleButtonText: {
      color: COLORS.primary,
      fontWeight: 'bold',
      fontSize: 14,
    },
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    featureItem: {
      alignItems: 'center',
      width: width / 4.5,
      marginBottom: 15,
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
      textAlign: 'center',
      color: COLORS.gray,
    },
    mapContainer: {
      height: 200,
      borderRadius: SIZES.radius,
      overflow: 'hidden',
      marginTop: 10,
      marginBottom: 15,
    },
    mapPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#D1D1D1',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapPlaceholderText: {
      color: COLORS.gray,
      fontWeight: 'bold',
    },
    proximityContainer: {
      marginTop: 10,
    },
    proximityTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: COLORS.darkGray,
    },
    proximityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    proximityText: {
      marginLeft: 8,
      fontSize: 14,
      color: COLORS.gray,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewForm: {
      backgroundColor: COLORS.lightGray,
      padding: 15,
      borderRadius: 10,
      marginVertical: 15,
    },
    reviewFormTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
      color: COLORS.darkGray,
    },
    formField: {
      marginBottom: 15,
    },
    formLabel: {
      fontSize: 14,
      marginBottom: 5,
      color: COLORS.darkGray,
    },
    formInput: {
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 5,
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
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    submitButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    reviewsListContainer: {
      marginTop: 10,
    },
    reviewItem: {
      padding: 12,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      marginBottom: 10,
    },
    reviewerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
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
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.darkGray,
    },
    reviewDate: {
      fontSize: 12,
      color: '#999',
    },
    reviewRating: {
      marginTop: 5,
      marginBottom: 5,
    },
    reviewText: {
      fontSize: 14,
      color: COLORS.gray,
      lineHeight: 20,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 90,
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightGray,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 20,
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
        marginTop: 2,
      },
      dateText: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 5,
      },
      bookButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
      },
      bookButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
    
    export default ApartmentDetails;