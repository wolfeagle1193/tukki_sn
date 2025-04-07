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
} from "react-native";
import React, { useState, useRef } from "react";
import { SIZES, COLORS } from "../../components/constants/Theme";
import {
  DescriptionText,
  HeightSpacer,
  HotelMap,
  ReusableText,
  ReviewsList,
} from "../../components";
import Reusable from "../../components/reusable/Reusable.style";
import { Rating } from "react-native-stock-star-rating";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import hoteldetailstyles from "./hotelsdetails.style";

const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const user1 = require("../../assets/images/users/user1.jpg");
const user2 = require("../../assets/images/users/user2.jpg");

const Hotelsdetails = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Sample additional hotel images (you would use actual hotel images)
  const hotelImages = [
    Terroubi,
    require("../../assets/images/incontournables/gore.jpg"),
    require("../../assets/images/popularplacesDakar/village-des-arts.jpg"),
    require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg"),
    require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg"),
  ];

  const hotel = {
    availability: {
      start: "2025-01-24T00:00:00.000Z",
      end: "2025-01-31T00:00:00.000Z",
    },
    coordinates: {
      latitude: 14.6869,
      longitude: -17.4441,
    },
    _id: "450a1a1a56un904523aprf211m",
    title: "Terroubi",
    description:
      "L'Hôtel Terrou Bi est une oasis de confort et de luxe située sur la magnifique côte atlantique de Dakar, au Sénégal. Offrant une vue imprenable sur l'océan, cet établissement combine le charme traditionnel africain avec des commodités modernes, créant une atmosphère accueillante pour les voyageurs d'affaires et de loisirs.\n\nLes chambres de l'hôtel sont spacieuses et élégamment décorées, équipées de toutes les installations nécessaires pour garantir un séjour agréable. Les clients peuvent profiter de la piscine extérieure, du centre de remise en forme, et d'un accès direct à la plage, parfait pour se détendre après une journée d'exploration.\n\nLe restaurant de l'Hôtel Terrou Bi propose une cuisine locale et internationale, mettant en avant des ingrédients frais et de saison. Les clients peuvent savourer leurs repas tout en admirant la vue panoramique sur l'océan.\n\nL'hôtel est également idéalement situé à proximité des attractions majeures de Dakar, telles que l'île de Gorée et le Monument de la Renaissance Africaine, ce qui en fait un point de départ idéal pour découvrir la richesse culturelle et historique de la région.\n\nQue ce soit pour un voyage d'affaires ou des vacances en famille, l'Hôtel Terrou Bi offre une expérience inoubliable, alliant confort, service de qualité et beauté naturelle.",
    contact: "77-493-33-39",
    placeImage: Terroubi,
    rating: 4.8,
    review: "2312 avis",
    location: "Route de la Corniche Ouest-Dakar",
    price: 100000,
    facilities: [
      {
        wifi: true,
        _id: "123456789",
      },
    ],
    _v: 0,
    reviews: [
      {
        id: "123456789abcd",
        review:
          "Un séjour exceptionnel à l'Hôtel Terrou Bi ! Le service était impeccable et les chambres d'une propreté irréprochable. La vue sur l'océan est à couper le souffle. Je recommande vivement cet hôtel à tous !",
        rating: 5.0,
        user: {
          id: "123456789abc43343d",
          username: "Harris Potteman",
          profile: user2,
        },
        updatedAt: "23-08-2024",
      },
      {
        id: "123456789abcde",
        review:
          "Une expérience inoubliable ! L'accueil était chaleureux et le personnel très attentif. La piscine était magnifique et le restaurant propose des plats délicieux. Je reviendrai sans hésiter !",
        rating: 5.0,
        user: {
          id: "123456789abc43343de",
          username: "Iliza Grace",
          profile: user1,
        },
        updatedAt: "03-01-2025",
      },
    ],
  };

  // Hotel services with icons
  const hotelServices = [
    { icon: 'wifi', label: 'Wi-Fi Gratuit' },
    { icon: 'pool', label: 'Piscine' },
    { icon: 'restaurant', label: 'Restaurant' },
    { icon: 'fitness-center', label: 'Salle de sport' },
    { icon: 'spa', label: 'Spa' },
    { icon: 'local-parking', label: 'Parking' },
    { icon: 'beach-access', label: 'Plage Privée' },
    { icon: 'room-service', label: 'Service de chambre' },
    { icon: 'meeting-room', label: 'Salles de réunion' },
  ];

  let coordinates = {
    id: hotel._id,
    title: hotel.title,
    latitude: hotel.coordinates.latitude,
    longitude: hotel.coordinates.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  // Format date string for display
  const formatDateRange = () => {
    const startDate = new Date(hotel.availability.start);
    const endDate = new Date(hotel.availability.end);
    
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

  // Animation for header opacity during scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp'
  });

  return (
    <View style={hoteldetailstyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Back button */}
      <TouchableOpacity 
        style={hoteldetailstyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Favorite button */}
      <TouchableOpacity 
       
        onPress={toggleFavorite}
        style={[
          hoteldetailstyles.favoriteButton,
          isFavorite && { backgroundColor: COLORS.pink }
        ]}
      >
        <MaterialIcons 
          name={isFavorite ? "favorite" : "favorite-border"} 
          size={24} 
          color="#fff" 
         
        />
      </TouchableOpacity>
      
      {/* Fixed Header with Image Gallery */}
      
      <Animated.View 
        style={[
          hoteldetailstyles.fixedHeader, 
          //{ opacity: headerOpacity }
        ]}
      >
        <Image 
          source={hotelImages[currentImageIndex]}
          style={hoteldetailstyles.mainImage}
          resizeMode="cover"
        />
        
        <View style={hoteldetailstyles.thumbnailContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={hoteldetailstyles.thumbnailScrollContent}
          >
            {hotelImages.map((image, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handleImageChange(index)}
                style={[
                  hoteldetailstyles.thumbnailButton,
                  currentImageIndex === index && hoteldetailstyles.activeThumbnail
                ]}
              >
                <Image 
                  source={image}
                  style={hoteldetailstyles.thumbnail}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
      
      
      {/* Background Overlay (prevents content showing through header) */}
      <View style={hoteldetailstyles.headerOverlay} />
      
      {/* Main Scrollable Content */}
      <Animated.ScrollView 
        style={hoteldetailstyles.scrollContent}
        contentContainerStyle={hoteldetailstyles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hotel Header Information */}
        <View style={hoteldetailstyles.hotelHeader}>
          <Text style={hoteldetailstyles.hotelTitle}>{hotel.title}</Text>
          
          <View style={hoteldetailstyles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.green_accueil} />
            <Text style={hoteldetailstyles.locationText}>{hotel.location}</Text>
          </View>
          
          <View style={hoteldetailstyles.ratingContainer}>
            <Rating
              maxStars={5}
              stars={hotel.rating}
              bordered={false}
              color={"#FD9942"}
            />
            <Text style={hoteldetailstyles.reviewsText}>({hotel.review})</Text>
          </View>
        </View>
        
        {/* Description Section */}
        <View style={hoteldetailstyles.section}>
          <Text style={hoteldetailstyles.sectionTitle}>Description</Text>
          <View>
            <Text 
              style={hoteldetailstyles.descriptionText} 
              numberOfLines={expandedDescription ? undefined : 3}
            >
              {hotel.description}
            </Text>
            <TouchableOpacity onPress={toggleDescription} style={hoteldetailstyles.toggleButton}>
              <Text style={hoteldetailstyles.toggleButtonText}>
                {expandedDescription ? "Afficher moins" : "Afficher plus"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Hotel Services Section */}
        <View style={hoteldetailstyles.section}>
          <Text style={hoteldetailstyles.sectionTitle}>Services</Text>
          <View style={hoteldetailstyles.servicesGrid}>
            {hotelServices.map((service, index) => (
              <View key={index} style={hoteldetailstyles.serviceItem}>
                <View style={hoteldetailstyles.serviceIconContainer}>
                  <MaterialIcons name={service.icon} size={24} color={COLORS.white} />
                </View>
                <Text style={hoteldetailstyles.serviceLabel}>{service.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Location Section */}
        <View style={hoteldetailstyles.section}>
          <Text style={hoteldetailstyles.sectionTitle}>Emplacement</Text>
          <View style={hoteldetailstyles.locationContainer}>
            <MaterialIcons name="location-on" size={20} color={COLORS.green_accueil} />
            <Text style={[hoteldetailstyles.locationText, { fontSize: 15 }]}>{hotel.location}</Text>
          </View>
          <View style={hoteldetailstyles.mapContainer}>
            <HotelMap coordinates={coordinates} />
          </View>
        </View>
        
        {/* Reviews Section */}
        <View style={hoteldetailstyles.section}>
          <View style={hoteldetailstyles.reviewHeader}>
            <Text style={hoteldetailstyles.sectionTitle}>Avis des clients</Text>
            <TouchableOpacity>
              <Feather name="list" size={20} color={COLORS.green_accueil} />
            </TouchableOpacity>
          </View>
          
          <View style={hoteldetailstyles.reviewsListContainer}>
            {hotel.reviews.map((review, index) => (
              <View key={index} style={hoteldetailstyles.reviewItem}>
                <View style={hoteldetailstyles.reviewerContainer}>
                  <Image 
                    source={review.user.profile} 
                    style={hoteldetailstyles.reviewerImage} 
                  />
                  <View style={hoteldetailstyles.reviewerInfo}>
                    <Text style={hoteldetailstyles.reviewerName}>{review.user.username}</Text>
                    <Text style={hoteldetailstyles.reviewDate}>{review.updatedAt}</Text>
                  </View>
                </View>
                
                <View style={hoteldetailstyles.reviewRating}>
                  <Rating
                    maxStars={5}
                    stars={review.rating}
                    bordered={false}
                    color={"#FD9942"}
                    size={14}
                  />
                </View>
                
                <View>
                  <Text 
                    style={hoteldetailstyles.reviewText}
                    numberOfLines={expandedReviews[review.id] ? undefined : 3}
                  >
                    {review.review}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => toggleReview(review.id)} 
                    style={hoteldetailstyles.toggleButton}
                  >
                    <Text style={hoteldetailstyles.toggleButtonText}>
                      {expandedReviews[review.id] ? "Afficher moins" : "Afficher plus"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Add some space at the bottom for the fixed footer */}
        <View style={{ height: 1 }} />
      </Animated.ScrollView>
      
      {/* Fixed Bottom Booking Bar */}
      <View style={hoteldetailstyles.bottom}>
        <View style={hoteldetailstyles.priceContainer}>
          <Text style={hoteldetailstyles.priceValue}>{hotel.price.toLocaleString()} FCFA</Text>
          <Text style={hoteldetailstyles.dateText}>{formatDateRange()}</Text>
        </View>
        
        <TouchableOpacity 
          style={hoteldetailstyles.bookButton}
          onPress={() => navigation.navigate("SelectRoom")}
        >
          <Text style={hoteldetailstyles.bookButtonText}>Choisir une chambre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Hotelsdetails;




/*import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Animated,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function RegionDetails({ navigation }) {
  const [saved, setSaved] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Sample data
  const dakar = require("../../assets/images/region/dakar.jpg");
  const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
  const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
  const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
  const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
  const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");

  const comments = [
    {
      id: '1',
      user: 'bakerofarts224',
      time: 'il y a 2 ans',
      comment: 'Super voyage. Bien planifié de A à Z grâce à l\'application ❤️❤️❤️',
      likes: 10,
      profile: null
    },
    {
      id: '2',
      user: 'SenegalExplorer',
      time: 'il y a 1 an',
      comment: 'Dakar est une ville magnifique. La culture, la nourriture, les plages - tout est incroyable!',
      likes: 24,
      profile: null
    },
    {
      id: '3',
      user: 'Traveller2023',
      time: 'il y a 6 mois',
      comment: 'Une expérience inoubliable! Les habitants sont accueillants et les paysages à couper le souffle.',
      likes: 30,
      profile: null
    }
  ];

  const regionImages = [
    RenaissancePlace,
    phareMamellesplace,
    ngorIsle,
    divinityMosquee,
    artsvillage
  ];

  const attractions = [
    {
      id: '1',
      name: 'Phare des Mamelles',
      image: phareMamellesplace,
      rating: 4.7,
    },
    {
      id: '2',
      name: 'Monument de la Renaissance',
      image: RenaissancePlace,
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Île de Ngor',
      image: ngorIsle,
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Mosquée de la Divinité',
      image: divinityMosquee,
      rating: 4.6,
    }
  ];

  const photos = [
    { id: '1', image: RenaissancePlace, user: 'Lily', likes: 24 },
    { id: '2', image: phareMamellesplace, user: 'Kevin', likes: 45 },
    { id: '3', image: ngorIsle, user: 'Paul', likes: 32 },
    { id: '4', image: divinityMosquee, user: 'Lisa', likes: 18 },
  ];

  const services = [
    { icon: 'hotel', label: 'Hôtels' },
    { icon: 'local-activity', label: 'Activités' },
    { icon: 'restaurant-menu', label: 'Restauration' },
    { icon: 'directions-bus', label: 'Transport' },
    { icon: 'shopping-bag', label: 'Shopping' },
    { icon: 'people', label: 'Guide touristique' },
  ];

  // Handle image change for the gallery
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  // Toggle description expand/collapse
  const toggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.username}>{item.user}</Text>
            <Text style={styles.timeAgo}>{item.time}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.commentText}>{item.comment}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="thumbs-up" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Répondre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Animation for header opacity during scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back button *
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack ? navigation.goBack() : null}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Favorite button 
      <TouchableOpacity 
        style={[styles.favoriteButton, saved && styles.favoritedButton]}
        onPress={() => setSaved(!saved)}
      >
        <FontAwesome name={saved ? "heart" : "heart-o"} size={20} color="white" />
      </TouchableOpacity>

      {/* Fixed Header with Image Gallery 
      <Animated.View 
        style={[styles.fixedHeader, { opacity: headerOpacity }]}
      >
        <Image 
          source={regionImages[currentImageIndex]}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <View style={styles.thumbnailContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailScrollContent}
          >
            {regionImages.map((image, index) => (
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

      {/* Main Scrollable Content 
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
        {/* Title Section 
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Visite Dakar</Text>
          <Text style={styles.subtitle}>Sud-ouest du Sénégal</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <FontAwesome key={index} name="star" size={16} color="#FD9942" />
              ))}
            </View>
            <Text style={styles.ratingCount}>4.8 (2158 avis)</Text>
          </View>
        </View>

        {/* Overview Section 
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu</Text>
          <Text 
            style={styles.overviewText}
            numberOfLines={expandedDescription ? undefined : 4}
          >
            L'histoire de Dakar, la capitale du Sénégal, remonte à la période pré-coloniale, lorsque la région était habitée par des peuples de tradition occidentale et cultivateurs. En 1857, Dakar devient une ville portuaire sous l'égide des colonisateurs français et un centre d'échange commercial. Sa position stratégique en fait un point de départ pour le commerce entre l'Afrique, l'Europe et les Amériques.
            {'\n\n'}
            Au fil des décennies, Dakar se développe pour devenir un hub culturel et économique, comme la capitale de l'Afrique Occidentale Française. Après l'indépendance du Sénégal en 1960, Dakar devient la capitale du pays et continue de croître en importance.
            {'\n\n'}
            Aujourd'hui, Dakar est une métropole vibrante qui mélange tradition et modernité. Avec ses marchés colorés, ses musées, ses plages magnifiques et sa scène culinaire diversifiée, la ville attire des visiteurs du monde entier. Le Monument de la Renaissance Africaine, inauguré en 2010, symbolise l'émergence du continent africain et offre une vue panoramique sur la ville.
          </Text>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleDescription}>
            <Text style={styles.toggleButtonText}>
              {expandedDescription ? "Afficher moins" : "Afficher plus"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Services Section 
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceIconContainer}>
                  <MaterialIcons name={service.icon} size={24} color="white" />
                </View>
                <Text style={styles.serviceText}>{service.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Button 
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Préparez votre voyage</Text>
        </TouchableOpacity>

        {/* Photos Section 
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos & Vidéos</Text>
            <TouchableOpacity>
              <MaterialIcons name="arrow-forward" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {photos.map(photo => (
              <View key={photo.id} style={styles.photoCard}>
                <Image 
                  source={photo.image}
                  style={styles.photoImage} 
                />
                <View style={styles.photoInfo}>
                  <View style={styles.photoUser}>
                    <View style={styles.photoAvatar}>
                      <Text style={styles.photoAvatarText}>{photo.user.charAt(0)}</Text>
                    </View>
                    <Text style={styles.photoUsername}>{photo.user}</Text>
                  </View>
                  <View style={styles.photoLikes}>
                    <FontAwesome name="heart" size={12} color="#ff6b6b" />
                    <Text style={styles.photoLikesCount}>{photo.likes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Hébergez vos photos et vidéos</Text>
          </TouchableOpacity>
        </View>

        {/* Attractions Section 
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attractions à proximité</Text>
            <TouchableOpacity>
              <MaterialIcons name="arrow-forward" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={attractions}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.attractionCard}>
                <Image 
                  source={item.image}
                  style={styles.attractionImage} 
                />
                <View style={styles.attractionOverlay}>
                  <Text style={styles.attractionName}>{item.name}</Text>
                  <View style={styles.attractionRating}>
                    <FontAwesome name="star" size={12} color="#FD9942" />
                    <Text style={styles.attractionRatingText}>{item.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Reviews Section 
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voyage & Avis</Text>
            <TouchableOpacity>
              <MaterialIcons name="sort" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewCount}>{comments.length} Commentaires</Text>
          </View>
          
          <View style={styles.userPrompt}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>?</Text>
            </View>
            <Text style={styles.userPromptText}>Partagez votre expérience, votre avis...</Text>
          </View>

          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>Voir tous les avis</Text>
          </TouchableOpacity>
        </View>

        {/* Add some space at the bottom 
        <View style={{ height: 80 }} />
      </Animated.ScrollView>
      
      {/* Fixed Bottom Booking Bar 
      <View style={styles.bottom}>
        <TouchableOpacity 
          style={styles.bookButton}
        >
          <Text style={styles.bookButtonText}>Explorer Dakar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 45,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  favoritedButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  fixedHeader: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  thumbnailScrollContent: {
    paddingHorizontal: 10,
  },
  thumbnailButton: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: '#4CAF50',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flex: 1,
    marginTop: HEADER_HEIGHT - 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    zIndex: 2,
  },
  scrollContentContainer: {
    paddingTop: 20,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingCount: {
    color: '#666',
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    margin: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  toggleButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  toggleButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  photosScroll: {
    marginTop: 15,
    marginBottom: 15,
  },
  photoCard: {
    marginRight: 12,
    width: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photoImage: {
    width: 180,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  photoInfo: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  photoAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  photoUsername: {
    fontSize: 13,
    color: '#444',
  },
  photoLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoLikesCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  uploadButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  attractionCard: {
    width: 200,
    height: 150,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  attractionImage: {
    width: '100%',
    height: '100%',
  },
  attractionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  attractionName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  attractionRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attractionRatingText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  reviewsHeader: {
    marginBottom: 15,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  userPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 20,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatarText: {
    fontSize: 14,
    color: '#666',
  },
  userPromptText: {
    color: '#999',
    fontSize: 14,
  },
  commentContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  timeAgo: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  viewAllButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '90%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});*/