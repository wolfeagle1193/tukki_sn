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
  const mainVillaImage = require("../../assets/images/villas/main-villa.jpg");
  const user1 = require("../../assets/images/users/user1.jpg");
  const user2 = require("../../assets/images/users/user2.jpg");
  
  const VillaDetails = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [expandedReviews, setExpandedReviews] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [userName, setUserName] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    // Images d'exemple pour la villa
    const villaImages = [
      mainVillaImage,
      require("../../assets/images/villas/pool.jpg"),
      require("../../assets/images/villas/master-bedroom.jpg"),
      require("../../assets/images/villas/living-room.jpg"),
      require("../../assets/images/villas/garden.jpg"),
      require("../../assets/images/villas/outdoor-dining.jpg"),
    ];
  
    const villa = {
      availability: {
        start: "2025-05-01T00:00:00.000Z",
        end: "2025-05-31T00:00:00.000Z",
      },
      coordinates: {
        latitude: 14.7245,
        longitude: -17.4932,
      },
      _id: "villa123456789",
      title: "Villa de Luxe avec Piscine Privée",
      description:
        "Magnifique villa de luxe avec piscine privée située dans un domaine sécurisé à Dakar. Cette villa spacieuse et lumineuse est parfaite pour des vacances en famille ou entre amis, offrant tout le confort moderne dans un cadre paisible et élégant.\n\nLa villa comprend quatre chambres avec salle de bain privative, dont une suite principale avec dressing et terrasse privée. Le salon ouvert sur la salle à manger donne sur une terrasse ombragée et la piscine. La cuisine entièrement équipée dispose d'appareils haut de gamme et d'un îlot central parfait pour préparer des repas en famille.\n\nL'extérieur offre un jardin tropical bien entretenu, une piscine à débordement chauffée et un pool house avec bar et espace barbecue. Une terrasse sur le toit permet d'admirer le coucher du soleil sur l'océan.\n\nLa villa dispose d'un personnel de maison (gardien et femme de ménage) qui veillera à votre confort pendant votre séjour. Le WiFi haut débit, la climatisation dans toutes les pièces, et un système de sécurité avec caméras sont inclus.\n\nIdéalement située à 10 minutes en voiture des plus belles plages de Dakar et à proximité des commerces et restaurants, cette villa est le point de départ parfait pour explorer la région tout en profitant d'un havre de paix luxueux.",
      contact: "78-123-45-67",
      placeImage: mainVillaImage,
      rating: 4.9,
      review: "18 avis",
      location: "Ngor - Dakar, Sénégal",
      price: 250000,
      facilities: [
        {
          wifi: true,
          parking: true,
          kitchen: true,
          ac: true,
          tv: true,
          pool: true,
          garden: true,
          security: true,
          staff: true,
          _id: "567890123",
        },
      ],
      _v: 0,
      reviews: [
        {
          id: "rev567890",
          review:
            "Villa exceptionnelle! Le service est impeccable, la piscine et le jardin sont magnifiques et très bien entretenus. Les chambres sont spacieuses et confortables. La femme de ménage était très attentionnée et le gardien très professionnel. Nous avons passé des vacances de rêve et reviendrons certainement!",
          rating: 5.0,
          user: {
            id: "user567890",
            username: "Marc Dubois",
            profile: user1,
          },
          updatedAt: "20-03-2025",
        },
        {
          id: "rev123456",
          review:
            "Superbe villa avec tout le confort moderne. L'emplacement est idéal, proche des plages et des commodités tout en étant au calme. La piscine privée est un vrai plus! Seul petit bémol: quelques problèmes avec la connexion WiFi pendant notre séjour, mais le propriétaire a été très réactif pour résoudre le problème.",
          rating: 4.8,
          user: {
            id: "user123456",
            username: "Caroline Lefèvre",
            profile: user2,
          },
          updatedAt: "05-04-2025",
        },
      ],
    };
  
    // Caractéristiques de la villa avec icônes
    const villaFeatures = [
      { icon: 'pool', label: 'Piscine Privée' },
      { icon: 'local-parking', label: 'Parking Privé' },
      { icon: 'kitchen', label: 'Cuisine Équipée' },
      { icon: 'ac-unit', label: 'Climatisation' },
      { icon: 'tv', label: 'Smart TV' },
      { icon: 'meeting-room', label: '4 Chambres' },
      { icon: 'bathroom', label: '4 Salles de Bain' },
      { icon: 'deck', label: 'Terrasse' },
      { icon: 'outdoor-grill', label: 'Barbecue' },
      { icon: 'grass', label: 'Jardin Tropical' },
      { icon: 'visibility', label: 'Vue Panoramique' },
      { icon: 'security', label: 'Sécurité 24/7' },
    ];
  
    let coordinates = {
      id: villa._id,
      title: villa.title,
      latitude: villa.coordinates.latitude,
      longitude: villa.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  
    const handleImageChange = (index) => {
      setCurrentImageIndex(index);
    };
  
    // Format date string for display
    const formatDateRange = () => {
      const startDate = new Date(villa.availability.start);
      const endDate = new Date(villa.availability.end);
      
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
            profile: null,
          },
          updatedAt: new Date().toLocaleDateString('fr-FR'),
        };
        
        // Ajout de l'avis à la liste (simulation)
        villa.reviews.push(newReview);
        
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
            styles.fixedHeader
          ]}
        >
          <Image 
            source={villaImages[currentImageIndex]}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <View style={styles.thumbnailContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailScrollContent}
            >
              {villaImages.map((image, index) => (
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
          {/* Informations sur la villa */}
          <View style={styles.villaHeader}>
            <Text style={styles.villaTitle}>{villa.title}</Text>
            
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
              <Text style={styles.locationText}>{villa.location}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              <Rating
                maxStars={5}
                stars={villa.rating}
                bordered={false}
                color={COLORS.orange}
              />
              <Text style={styles.reviewsText}>({villa.review})</Text>
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
                {villa.description}
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
              {villaFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <MaterialIcons name={feature.icon} size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Section Services Inclus */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Inclus</Text>
            <View style={styles.servicesList}>
              <View style={styles.serviceItem}>
                <MaterialIcons name="cleaning-services" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Femme de ménage (quotidien)</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="security" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Gardien 24h/24</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="spa" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Entretien piscine et jardin</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="local-laundry-service" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Service de blanchisserie</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="airport-shuttle" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Transfert aéroport (sur demande)</Text>
              </View>
            </View>
            
            <Text style={styles.serviceSubtitle}>Services supplémentaires (avec supplément)</Text>
            <View style={styles.servicesList}>
              <View style={styles.serviceItem}>
                <MaterialIcons name="restaurant" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Chef privé</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="child-care" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Garde d'enfants</Text>
              </View>
              <View style={styles.serviceItem}>
                <MaterialIcons name="directions-car" size={22} color={COLORS.primary} />
                <Text style={styles.serviceText}>Location de voiture avec chauffeur</Text>
              </View>
            </View>
          </View>
          
          {/* Section Emplacement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emplacement</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
              <Text style={[styles.locationText, { fontSize: 15 }]}>{villa.location}</Text>
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
                <MaterialIcons name="beach-access" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Plage (5 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="restaurant" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Restaurants (10 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="local-grocery-store" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Supermarché (8 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="local-hospital" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Clinique (15 min en voiture)</Text>
              </View>
              <View style={styles.proximityItem}>
                <MaterialIcons name="flight" size={16} color={COLORS.primary} />
                <Text style={styles.proximityText}>Aéroport (30 min en voiture)</Text>
              </View>
            </View>
          </View>
  
          {/* Section Règlement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Règlement</Text>
            <View style={styles.rulesList}>
              <View style={styles.ruleItem}>
                <MaterialIcons name="access-time" size={20} color={COLORS.primary} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Arrivée / Départ</Text>
                  <Text style={styles.ruleText}>Arrivée à partir de 14h00 - Départ avant 11h00</Text>
                </View>
              </View>
              <View style={styles.ruleItem}>
                <MaterialIcons name="smoke-free" size={20} color={COLORS.primary} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Non-fumeur</Text>
                  <Text style={styles.ruleText}>Interdiction de fumer à l'intérieur de la villa</Text>
                </View>
              </View>
              <View style={styles.ruleItem}>
                <MaterialIcons name="pets" size={20} color={COLORS.primary} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Animaux</Text>
                  <Text style={styles.ruleText}>Animaux de compagnie acceptés sur demande</Text>
                </View>
              </View>
              <View style={styles.ruleItem}>
                <MaterialIcons name="celebration" size={20} color={COLORS.primary} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Événements</Text>
                  <Text style={styles.ruleText}>Événements autorisés avec accord préalable</Text>
                </View>
              </View>
              <View style={styles.ruleItem}>
                <MaterialIcons name="security" size={20} color={COLORS.primary} />
                <View style={styles.ruleTextContainer}>
                  <Text style={styles.ruleTitle}>Caution</Text>
                  <Text style={styles.ruleText}>Caution de 500 000 FCFA demandée à l'arrivée</Text>
                </View>
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
                    placeholder="Partagez votre séjour dans cette villa..."
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
              {villa.reviews.map((review, index) => (
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

          {/*media*/}
          {/* Section Galerie des Clients */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Galerie des Clients</Text>
  <Text style={styles.gallerySubtitle}>Découvrez les souvenirs partagés par nos clients</Text>
  
  <View style={styles.galleryContainer}>
    <View style={styles.mediaRow}>
      {/* Première image/vidéo */}
      <TouchableOpacity 
        style={styles.mediaItem}
        onPress={() => {/* Fonction pour ouvrir le média en plein écran */}}
      >
        <Image 
          source={require("../../assets/images/villas/garden.jpg")} 
          style={styles.mediaImage}
          resizeMode="cover"
        />
        <View style={styles.videoIndicator}>
          <FontAwesome name="play" size={18} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      
      {/* Deuxième image */}
      <TouchableOpacity 
        style={styles.mediaItem}
        onPress={() => {/* Fonction pour ouvrir le média en plein écran */}}
      >
        <Image 
          source={require("../../assets/images/villas/living-room.jpg")} 
          style={styles.mediaImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      
      {/* Bouton "Voir plus" */}
      <TouchableOpacity 
        style={styles.seeMoreButton}
        onPress={() => navigation.navigate("GalleryView", { villaId: villa._id })}
      >
        <View style={styles.seeMoreContent}>
          <Text style={styles.seeMoreText}>+23</Text>
          <Text style={styles.seeMoreSubtext}>Voir plus</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  
  {/* Section pour téléverser des médias */}
  <View style={styles.uploadSection}>
    <Text style={styles.uploadTitle}>Partagez vos souvenirs</Text>
    <Text style={styles.uploadDescription}>
      Téléversez vos photos et vidéos prises pendant votre séjour dans cette villa
    </Text>
    
    <TouchableOpacity 
      style={styles.uploadButton}
      onPress={() => {
        /* Fonction pour ouvrir le sélecteur de médias */
        // Cette fonction simulerait l'ouverture de la galerie/caméra
      }}
    >
      <Feather name="upload" size={22} color={COLORS.white} />
      <Text style={styles.uploadButtonText}>Téléverser vos médias</Text>
    </TouchableOpacity>
    
    {/* Conseils pour le téléversement */}
    <View style={styles.uploadTips}>
      <View style={styles.tipItem}>
        <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
        <Text style={styles.tipText}>Photos de haute qualité recommandées</Text>
      </View>
      <View style={styles.tipItem}>
        <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
        <Text style={styles.tipText}>Vidéos de 30 secondes maximum</Text>
      </View>
      <View style={styles.tipItem}>
        <MaterialIcons name="check-circle" size={16} color={COLORS.primary} />
        <Text style={styles.tipText}>Contenu soumis à modération</Text>
      </View>
    </View>
  </View>
</View>
          
          {/* Espace en bas pour le bas de page fixe */}
          <View style={{ height: 5 }} />
        </Animated.ScrollView>
        
        {/* Barre de réservation fixe en bas */}
        <View style={styles.bottom}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{villa.price.toLocaleString()} FCFA</Text>
            <Text style={styles.priceLabel}>par nuit</Text>
            <Text style={styles.dateText}>Disponible: {formatDateRange()}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate("BookVilla", { villaId: villa._id })}
          >
            <Text style={styles.bookButtonText}>Réserver la villa</Text>
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
    villaHeader: {
      marginBottom: 15,
    },
    villaTitle: {
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
        justifyContent: 'space-between',
      },
      featureItem: {
        width: '30%',
        marginBottom: 20,
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
        textAlign: 'center',
        color: COLORS.gray,
      },
      servicesList: {
        marginBottom: 15,
      },
      serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      serviceText: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.gray,
      },
      serviceSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.darkGray,
      },
      mapContainer: {
        height: 200,
        marginVertical: 15,
        overflow: 'hidden',
        borderRadius: SIZES.radius,
      },
      mapPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
      },
      mapPlaceholderText: {
        color: COLORS.gray,
      },
      proximityContainer: {
        marginTop: 10,
      },
      proximityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.darkGray,
      },
      proximityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      proximityText: {
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.gray,
      },
      rulesList: {
        marginBottom: 10,
      },
      ruleItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
      },
      ruleTextContainer: {
        marginLeft: 10,
        flex: 1,
      },
      ruleTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        marginBottom: 4,
      },
      ruleText: {
        fontSize: 14,
        color: COLORS.gray,
      },
      reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      reviewForm: {
        padding: 15,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        marginBottom: 20,
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
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.darkGray,
      },
      formInput: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
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
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      submitButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
      },
      reviewsListContainer: {
        marginTop: 10,
      },
      reviewItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
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
        fontWeight: 'bold',
        color: COLORS.darkGray,
      },
      reviewDate: {
        fontSize: 12,
        color: COLORS.gray,
      },
      reviewRating: {
        marginBottom: 5,
      },
      reviewText: {
        fontSize: 14,
        lineHeight: 22,
        color: COLORS.gray,
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 20,
      },
      priceContainer: {
        flex: 1,
      },
      priceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkGray,
      },
      priceLabel: {
        fontSize: 12,
        color: COLORS.gray,
      },
      dateText: {
        fontSize: 12,
        color: COLORS.primary,
        marginTop: 5,
      },
      bookButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        width: '50%',
        alignItems: 'center',
      },
      bookButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
      },
      //media

      // Ajoutez ces styles à votre objet StyleSheet existant

// Styles pour la galerie
gallerySubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 15,
  },
  galleryContainer: {
    marginBottom: 20,
  },
  mediaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaItem: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreButton: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  seeMoreContent: {
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  seeMoreSubtext: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  
  // Styles pour la section téléversement
  uploadSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 15,
    lineHeight: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },
  uploadTips: {
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 8,
  },
    });
    
    export default VillaDetails;