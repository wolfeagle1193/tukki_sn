
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Dimensions,
  FlatList,
  TextInput,
  Animated,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Appbar, HeightSpacer, Rating, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../components/constants/Theme";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BookEvent from "./eventBookingCard";

const EventDetails = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showEventBanner, setShowEventBanner] = useState(false);

  // Animation pour le banner flottant
  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Données des événements (à remplacer par un appel API)
  const events = [
    {
      _id: "e001",
      title: "Festival de Jazz de Saint-Louis",
      location: "Saint-Louis",
      eventImage: require("../../assets/images/hotels/dakar/terroubi.jpg"),
      price: {
        solo: "15.000 Fcfa",
        couple: "25.000 Fcfa",
        group: "12.000 Fcfa/personne",
      },
      category: "festival",
      date: "12 mai 2025",
      time: "18h00 - 23h00",
      rating: 4.8,
      review: "1253 avis",
      description: "Le plus grand festival de jazz d'Afrique de l'Ouest",
      longDescription:
        "Le Festival de Jazz de Saint-Louis est l'un des événements culturels majeurs du Sénégal et de l'Afrique de l'Ouest. Pendant une semaine entière, la ville historique de Saint-Louis s'anime au rythme du jazz avec des artistes nationaux et internationaux. L'événement se déroule dans un cadre exceptionnel, sur l'île de Saint-Louis, classée au patrimoine mondial de l'UNESCO. Une occasion unique d'allier découverte musicale et exploration culturelle dans un lieu chargé d'histoire.",
      highlights: [
        "Plus de 20 artistes internationaux",
        "Jam sessions nocturnes",
        "Ateliers de découverte musicale",
        "Concerts sur la plage au coucher du soleil",
      ],
      organisateur: "Association Jazz de Saint-Louis",
      contact: "+221 77 123 45 67",
      website: "www.saintlouisjazz.sn",
      isFavorite: false,
      coordinates: {
        latitude: 16.0326,
        longitude: -16.5012,
      },
      inclusions: [
        "Accès à tous les concerts",
        "Un verre de bienvenue",
        "Programme officiel du festival",
      ],
      exclusions: [
        "Transport vers Saint-Louis",
        "Hébergement",
        "Nourriture et boissons supplémentaires",
      ],
      reviews: [
        {
          id: "r1",
          user: "Amadou D.",
          avatar: require("../../assets/images/users/user2.jpg"),
          rating: 5,
          date: "2 mars 2025",
          comment:
            "Une expérience inoubliable! La qualité des artistes était exceptionnelle et l'ambiance vraiment unique.",
          likes: 24,
          replies: 3,
        },
        {
          id: "r2",
          user: "Marie S.",
          avatar: require("../../assets/images/users/user2.jpg"),
          rating: 4,
          date: "28 février 2025",
          comment:
            "Très beau festival! Seul bémol, il faisait très chaud et pas assez de zones d'ombre.",
          likes: 11,
          replies: 1,
        },
        {
          id: "r3",
          user: "Jean L.",
          avatar: require("../../assets/images/users/user2.jpg"),
          rating: 5,
          date: "15 février 2025",
          comment:
            "Je suis un habitué de ce festival et cette année était vraiment spéciale. Les artistes américains étaient exceptionnels!",
          likes: 32,
          replies: 5,
        },
      ],
      upcomingDates: [
        "12 mai 2025 - Ouverture",
        "13 mai 2025 - Scène internationale",
        "14 mai 2025 - Talents africains",
        "15 mai 2025 - Jazz fusion",
        "16 mai 2025 - Clôture et show final",
      ],
      images: [
        require("../../assets/images/hotels/dakar/terroubi.jpg"),
        require("../../assets/images/hotels/dakar/azalai.jpg"),
        require("../../assets/images/hotels/dakar/novotel.jpg"),
        require("../../assets/images/hotels/dakar/terroubi.jpg"),
        require("../../assets/images/hotels/dakar/azalai.jpg"),
        require("../../assets/images/hotels/dakar/novotel.jpg"),
      ],
    },
    // Autres événements...
  ];

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      const foundEvent = events.find((e) => e._id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
        setIsFavorite(foundEvent.isFavorite);
      }
      setLoading(false);
    }, 500);

    const showBannerTimeout = setTimeout(() => {
      setShowEventBanner(true);
    }, 3000);

    return () => clearTimeout(showBannerTimeout);
  }, [eventId]);

  if (loading || !event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des détails...</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Logique pour sauvegarder l'état des favoris
  };

  const shareEvent = async () => {
    try {
      await Share.share({
        message: `Découvre "${event.title}" sur SenegalExplore! ${event.date} à ${event.location}. ${event.description}`,
        title: event.title,
      });
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };

  const openWebsite = () => {
    if (event.website) {
      Linking.openURL(`https://${event.website}`);
    }
  };

  const callOrganizer = () => {
    if (event.contact) {
      Linking.openURL(`tel:${event.contact}`);
    }
  };

  const getDirections = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${event.coordinates.latitude},${event.coordinates.longitude}`;
    const label = event.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

 

  const submitReview = () => {
    // Logique pour soumettre l'avis
    alert("Merci pour votre avis!");
    setReviewText("");
    setUserRating(0);
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={item.avatar} style={styles.reviewAvatar} />
        <View style={styles.reviewUserInfo}>
          <Text style={styles.reviewUsername}>{item.user}</Text>
          <View style={styles.reviewRatingDate}>
            <Rating
              rating={item.rating}
              maxStars={5}
              stars={item.rating}
              bordered={false}
              color={"#FD9942"}
              size={12}
            />
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.reviewActionButton}>
          <AntDesign name="like2" size={16} color={COLORS.gray} />
          <Text style={styles.reviewActionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reviewActionButton}>
          <MaterialIcons name="comment" size={16} color={COLORS.lightgray} />
          <Text style={styles.reviewActionText}>{item.replies}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Floating event banner component
  const FloatingEventBanner = () => {
    if (!showEventBanner) return null;

    return (
      <Animated.View
        style={[styles.floatingBanner, { opacity: headerOpacity }]}
      >
        <View style={styles.bannerContent}>
          <Image source={event.eventImage} style={styles.bannerImage} />
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerTitle} numberOfLines={1}>
              {event.title}
            </Text>
            <Text style={styles.bannerDate}>{event.date}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookNowButton}    onPress={() => navigation.navigate("BookEvent",{event})} >
          <Text style={styles.bookNowText}>Réserver</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Appbar personnalisée */}
      <View style={styles.header}>
        <Appbar
          top={50}
          left={20}
          right={20}
          title={""}
          color={COLORS.green_accueil}
          icon={"left"}
          color1={COLORS.transparent}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Floating event banner */}
      <FloatingEventBanner />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Section image principale avec overlay */}
        <View style={styles.imageContainer}>
          <Image source={event.eventImage} style={styles.coverImage} />
          <View style={styles.imageDarkOverlay} />

          {/* Boutons sur l'image */}
          <View style={styles.imageActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={28}
                color={isFavorite ? COLORS.red : COLORS.white}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={shareEvent}>
              <MaterialIcons name="share" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Badge catégorie */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>

          {/* Date flag */}
          <View style={styles.dateFlag}>
            <Text style={styles.dateMonth}>MAI</Text>
            <Text style={styles.dateDay}>12</Text>
          </View>
        </View>

        {/* Section titre et infos principales */}
        <View style={styles.mainInfoContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.ratingRow}>
            <Rating
              rating={event.rating}
              maxStars={5}
              stars={event.rating}
              bordered={false}
              color={"#FD9942"}
            />
            <Text style={styles.reviewText}>{event.review}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons
                name="location-on"
                size={18}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons
                name="event"
                size={18}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons
                name="access-time"
                size={18}
                color={COLORS.green_accueil}
              />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>
          </View>
        </View>

        {/* Prix et options banner */}
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingSectionTitle}>Options de prix</Text>
          <View style={styles.priceOptions}>
            <View style={styles.priceOption}>
              <View style={styles.priceOptionIcon}>
                <FontAwesome name="user" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.priceOptionType}>Solo</Text>
              <Text style={styles.priceOptionValue}>{event.price.solo}</Text>
            </View>

            <View style={styles.priceOption}>
              <View
                style={[
                  styles.priceOptionIcon,
                  { backgroundColor: COLORS.pink },
                ]}
              >
                <FontAwesome name="users" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.priceOptionType}>Couple</Text>
              <Text style={styles.priceOptionValue}>{event.price.couple}</Text>
            </View>

            {event.price.group && (
              <View style={styles.priceOption}>
                <View
                  style={[
                    styles.priceOptionIcon,
                    { backgroundColor: COLORS.purple },
                  ]}
                >
                  <FontAwesome name="group" size={20} color={COLORS.white} />
                </View>
                <Text style={styles.priceOptionType}>Groupe</Text>
                <Text style={styles.priceOptionValue}>{event.price.group}</Text>
              </View>
            )}
          </View>
        </View>

        <HeightSpacer height={15} />

        {/* Section description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>À propos de cet événement</Text>
          <Text style={styles.descriptionText}>
            {expanded
              ? event.longDescription
              : `${event.longDescription.substring(0, 150)}...`}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMoreText}>
              {expanded ? "Afficher moins" : "Afficher la suite"}
            </Text>
          </TouchableOpacity>
        </View>

        <HeightSpacer height={15} />

        {/* Section Dates de l'événement */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Programme</Text>
          {event.upcomingDates.map((date, index) => (
            <View key={index} style={styles.dateItem}>
              <View style={styles.dateDot} />
              <Text style={styles.dateItemText}>{date}</Text>
            </View>
          ))}
        </View>

        <HeightSpacer height={15} />

        {/* Section points forts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Points forts</Text>
          {event.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <MaterialIcons
                name="star"
                size={16}
                color={COLORS.green_accueil}
              />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <HeightSpacer height={15} />

        {/* Section Inclus/Non-inclus */}
        <View style={styles.inclusionsContainer}>
          <View style={styles.inclusionColumn}>
            <Text style={styles.inclusionTitle}>Ce qui est inclus</Text>
            {event.inclusions.map((item, index) => (
              <View key={index} style={styles.inclusionItem}>
                <AntDesign
                  name="check"
                  size={16}
                  color={COLORS.green_accueil}
                />
                <Text style={styles.inclusionText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.inclusionColumn}>
            <Text style={styles.inclusionTitle}>Non inclus</Text>
            {event.exclusions.map((item, index) => (
              <View key={index} style={styles.inclusionItem}>
                <AntDesign name="close" size={16} color={COLORS.red} />
                <Text style={styles.inclusionText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <HeightSpacer height={15} />

        {/* Section galerie photos */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Galerie photos</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() =>
                navigation.navigate("GalleryView", {
                  images: event.images,
                  title: event.title,
                })
              }
            >
              <Text style={styles.seeAllText}>Voir tout</Text>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={COLORS.green_accueil}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryContainer}
          >
            {event.images.slice(0, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("GalleryView", {
                    images: event.images,
                    initialIndex: index,
                    title: event.title,
                  })
                }
              >
                <Image
                  source={image}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
                {index === 3 && event.images.length > 4 && (
                  <View style={styles.morePhotosOverlay}>
                    <Text style={styles.morePhotosText}>
                      +{event.images.length - 4}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <HeightSpacer height={15} />

        {/* Section lieu avec carte */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lieu de l'événement</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: event.coordinates.latitude,
                longitude: event.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: event.coordinates.latitude,
                  longitude: event.coordinates.longitude,
                }}
                title={event.title}
                description={event.location}
              />
            </MapView>
          </View>

          <TouchableOpacity
            style={styles.directionsButton}
            onPress={getDirections}
          >
            <MaterialIcons name="directions" size={18} color={COLORS.white} />
            <Text style={styles.directionsButtonText}>Itinéraire</Text>
          </TouchableOpacity>
        </View>

        <HeightSpacer height={15} />

        {/* Section organisateur */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Organisateur</Text>
          <Text style={styles.organizerName}>{event.organisateur}</Text>

          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={[
                styles.contactButton,
                { backgroundColor: COLORS.green_accueil },
              ]}
              onPress={callOrganizer}
            >
              <MaterialIcons name="phone" size={18} color={COLORS.white} />
              <Text style={styles.contactButtonText}>Appeler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: COLORS.blue }]}
              onPress={openWebsite}
            >
              <MaterialIcons name="public" size={18} color={COLORS.white} />
              <Text style={styles.contactButtonText}>Site web</Text>
            </TouchableOpacity>
          </View>
        </View>

        <HeightSpacer height={15} />

        {/* Section Avis utilisateurs */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Vous y avez déjà participé ? Donnez votre avis
          </Text>

          {/* Laisser un avis */}
          <View style={styles.addReviewContainer}>
            <Text style={styles.addReviewLabel}>Votre note:</Text>
            <View style={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setUserRating(star)}
                  style={styles.ratingInputStar}
                >
                  <FontAwesome
                    name={star <= userRating ? "star" : "star-o"}
                    size={24}
                    color={star <= userRating ? "#FD9942" : COLORS.lightgray}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.reviewTextInput}
              placeholder="Partagez votre expérience..."
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
            />

            <TouchableOpacity
              style={[
                styles.submitReviewButton,
                {
                  backgroundColor:
                    userRating > 0 && reviewText.length > 10
                      ? COLORS.green_accueil
                      : COLORS.lightgray,
                },
              ]}
              disabled={userRating === 0 || reviewText.length < 10}
              onPress={submitReview}
            >
              <Text style={styles.submitReviewText}>Publier mon avis</Text>
            </TouchableOpacity>
          </View>

          {/* Liste des avis */}
          <View style={styles.reviewList}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsCounter}>
                {event.reviews.length} avis
              </Text>
              <TouchableOpacity style={styles.filterButton}>
                <MaterialIcons
                  name="filter-list"
                  size={20}
                  color={COLORS.black}
                />
                <Text style={styles.filterText}>Filtrer</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={event.reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />

            {event.reviews.length > 3 && (
              <TouchableOpacity style={styles.seeAllReviewsButton}>
                <Text style={styles.seeAllReviewsText}>Voir tous les avis</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={COLORS.green_accueil}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <HeightSpacer height={100} />
      </Animated.ScrollView>

      {/* Bouton de réservation fixe en bas */}
      <View style={styles.bookButtonContainer}>
        <ReusableBtn
          onPress={() => navigation.navigate("BookEvent",{event})}
          btnText={"Réserver maintenant"}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default EventDetails;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  imageDarkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  imageActions: {
    position: "absolute",
    top: 100,
    right: 20,
    flexDirection: "column",
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryBadge: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: COLORS.green_accueil,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  dateFlag: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  mainInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginLeft: 5,
  },
  pricingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.verylightgray,
  },
  pricingSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 12,
  },
  priceOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceOption: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_accueil,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  priceOptionType: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginBottom: 4,
  },
  priceOptionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.lightgray,
    marginBottom: 10,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.green_accueil,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green_accueil,
    marginRight: 10,
  },
  dateItemText: {
    fontSize: 14,
    color: COLORS.lightgray,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginLeft: 10,
    flex: 1,
  },
  inclusionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    flexDirection: "row",
  },
  inclusionColumn: {
    flex: 1,
    marginRight: 10,
  },
  inclusionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 12,
  },
  inclusionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inclusionText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginLeft: 8,
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.green_accueil,
    fontWeight: "500",
  },
  galleryContainer: {
    paddingBottom: 10,
  },
  galleryImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  morePhotosOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 10,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  morePhotosText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  mapContainer: {
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  directionsButton: {
    backgroundColor: COLORS.green_accueil,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  directionsButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
  organizerName: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 15,
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  contactButtonText: {
    color: COLORS.white,
    fontWeight: "500",
    marginLeft: 8,
  },
  addReviewContainer: {
    padding: 15,
    backgroundColor: COLORS.verylightgray,
    borderRadius: 12,
    marginBottom: 20,
  },
  addReviewLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  ratingInput: {
    flexDirection: "row",
    marginBottom: 15,
  },
  ratingInputStar: {
    marginRight: 8,
  },
  reviewTextInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
    borderColor: COLORS.lightgray,
    borderWidth: 1,
  },
  submitReviewButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitReviewText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  reviewList: {
    marginTop: 10,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  reviewsCounter: {
    fontSize: 16,
    fontWeight: "500",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.verylightgray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
  },
  reviewItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.verylightgray,
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewUserInfo: {
    flex: 1,
    justifyContent: "center",
  },
  reviewUsername: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  reviewRatingDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.darkgray,
    marginBottom: 10,
  },
  reviewActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.verylightgray,
    paddingTop: 10,
  },
  reviewActionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  reviewActionText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginLeft: 5,
  },
  seeAllReviewsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.green_accueil,
    borderRadius: 8,
  },
  seeAllReviewsText: {
    color: COLORS.green_accueil,
    fontWeight: "500",
    marginRight: 5,
  },
  bookButtonContainer: {
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
  floatingBanner: {
    position: "absolute",
    top: Platform.OS === "ios" ? 45 : 35,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bannerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  bannerDate: {
    fontSize: 12,
    color: COLORS.lightgray,
  },
  bookNowButton: {
    backgroundColor: COLORS.green_button_back,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookNowText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});
