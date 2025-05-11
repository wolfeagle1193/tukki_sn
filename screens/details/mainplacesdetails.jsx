

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  TextInput
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES, TEXT } from "../../components/constants/Theme";

// Import existing components if needed
import { NetworkingImage, ReusableText, HeightSpacer } from "../../components/index";

const Mainplacesdetails = ({ navigation }) => {
  const route = useRoute();
  const [saved, setSaved] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([
    {
      id: "1",
      user: "bakerofarts224",
      time: "il y a 2 ans",
      comment: "Super voyage à Gorée. L'île est magnifique et chargée d'histoire. À visiter absolument ❤️❤️❤️",
      likes: 12,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
    {
      id: "2",
      user: "globetrotter42",
      time: "il y a 6 mois",
      comment: "La Maison des Esclaves était très émouvante. Un lieu de mémoire important à découvrir.",
      likes: 8,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
    {
      id: "3",
      user: "travelbug88",
      time: "il y a 3 mois",
      comment: "Les artisans locaux font des œuvres magnifiques. J'ai ramené plusieurs souvenirs de qualité.",
      likes: 5,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Assets
  const goree = require("../../assets/images/incontournables/gore.jpg");
  const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
  const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
  const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
  const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
  const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");

  // Gallery images for the main slider
  const galleryImages = [
    goree,
    artsvillage,
    divinityMosquee,
    ngorIsle,
    RenaissancePlace
  ];

  // Limiter les lieux populaires à seulement 2 pour l'affichage initial
  const popularPlaces = [
    {
      _id: "10",
      title: "Village des arts",
      placeImage: artsvillage,
      rating: 4.7,
      review: "84329 Avis",
      location: "Baie de Dakar",
    },
    {
      _id: "11",
      title: "Mosquee de la divinite",
      placeImage: divinityMosquee,
      rating: 4.7,
      review: "2090 avis",
      location: "au large de Dakar",
    },
    {
      _id: "12",
      title: "Ile de Ngor",
      placeImage: ngorIsle,
      rating: 4.7,
      review: "7129 avis",
      location: "au large de Dakar",
    },
    {
      _id: "13",
      title: "Monument de la Renaissance",
      placeImage: RenaissancePlace,
      rating: 4.7,
      review: "12090 avis",
      location: "au large de Dakar",
    },
    {
      _id: "14",
      title: "Phare des Mamelles",
      placeImage: phareMamellesplace,
      rating: 4.7,
      review: "1209 avis",
      location: "au large de Dakar",
    },
  ];

  // Limiter l'affichage à seulement 2 lieux
  const displayedPlaces = popularPlaces.slice(0, 2);

  const photos = [
    { id: "1", image: goree, user: "Maria", likes: 42 },
    { id: "2", image: artsvillage, user: "Jean", likes: 28 },
    { id: "3", image: ngorIsle, user: "Sophie", likes: 35 },
    { id: "4", image: divinityMosquee, user: "Omar", likes: 19 },
  ];

  // Services icons and categories
  const serviceCategories = [
    { icon: "leisure", text: "Loisirs" },
    { icon: "bed", text: "Hébergement" },
    { icon: "local-activity", text: "Accessibilité" },
    { icon: "admin-panel-settings", text: "Administration" },
    { icon: "restaurant-menu", text: "Restauration" },
    { icon: "people", text: "Guide touristique" },
  ];

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  const toggleReplyInput = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          showReplyInput: !comment.showReplyInput
        };
      }
      return comment;
    }));
    setReplyText("");
  };

  const addReply = (id) => {
    if (replyText.trim() === "") return;
    
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply-${Date.now()}`,
              user: "Vous",
              time: "à l'instant",
              comment: replyText,
              likes: 0,
              liked: false
            }
          ],
          showReplyInput: false
        };
      }
      return comment;
    }));
    setReplyText("");
  };

  const addComment = () => {
    if (newComment.trim() === "") return;
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      user: "Vous",
      time: "à l'instant",
      comment: newComment,
      likes: 0,
      replies: [],
      liked: false,
      showReplyInput: false
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const renderReply = (reply, commentId) => (
    <View key={reply.id} style={styles.replyContainer}>
      <View style={styles.replyHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>?</Text>
          </View>
          <View>
            <Text style={styles.username}>{reply.user}</Text>
            <Text style={styles.timeAgo}>{reply.time}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.replyText}>{reply.comment}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {/* Add like functionality for replies */}}
        >
          <FontAwesome name={reply.liked ? "heart" : "heart-o"} size={16} color={reply.liked ? COLORS.pink : COLORS.darkgray} />
          <Text style={styles.actionText}>{reply.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>?</Text>
          </View>
          <View>
            <Text style={styles.username}>{item.user}</Text>
            <Text style={styles.timeAgo}>{item.time}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.commentText}>{item.comment}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <FontAwesome name={item.liked ? "heart" : "heart-o"} size={16} color={item.liked ? COLORS.pink : COLORS.darkgray} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => toggleReplyInput(item.id)}
        >
          <Text style={[styles.actionText, { color: COLORS.green_accueil }]}>Répondre</Text>
        </TouchableOpacity>
      </View>
      
      {item.showReplyInput && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.replyInput}
            placeholder="Écrivez votre réponse..."
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => addReply(item.id)}
          >
            <MaterialIcons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}
      
      {item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.replies.map(reply => renderReply(reply, item.id))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header pour les boutons */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => setSaved(!saved)}>
          <FontAwesome 
            name={saved ? "heart" : "heart-o"} 
            size={24} 
            color={saved ? COLORS.pink : COLORS.white} 
          />
        </TouchableOpacity>
      </View>

      {/* Partie fixe: Hero Image */}
      <View style={styles.fixedTopSection}>
        {/* Main Image Gallery */}
        <View style={styles.heroSection}>
          <Image 
            source={galleryImages[currentImageIndex]} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          
          {/* Image navigation indicators */}
          <View style={styles.imageIndicators}>
            {galleryImages.map((_, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.indicator, 
                  currentImageIndex === index && styles.activeIndicator
                ]}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
          
          {/* See more images button */}
          <TouchableOpacity style={styles.seeMoreImagesButton}>
            <MaterialIcons name="collections" size={20} color={COLORS.white} />
            <Text style={styles.seeMoreText}>Plus d'images</Text>
          </TouchableOpacity>
          
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>4.7/5</Text>
          </View>
        </View>
        
        {/* Partie fixe: Title Container */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ile de Gorée</Text>
          <Text style={styles.subtitle}>Sud-Ouest du Sénégal</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <FontAwesome key={index} name="star" size={16} color="#FD9942" />
              ))}
            </View>
            <Text style={styles.ratingCount}>4.7 (2854 avis)</Text>
          </View>
        </View>
      </View>

      {/* Contenu scrollable en dessous de la partie fixe */}
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu</Text>
          <Text 
            style={styles.overviewText}
            numberOfLines={expandedDescription ? undefined : 3}
          >
            L'île de Gorée, au large de Dakar, est un site emblématique de la mémoire de la traite des esclaves. Classée au patrimoine mondial de l'UNESCO, elle charme les visiteurs avec ses maisons colorées et ses rues pavées. La Maison des Esclaves témoigne d'un passé poignant, tandis que ses plages paisibles offrent un havre de paix. Gorée est aussi un lieu vibrant de culture sénégalaise, avec des festivals et des artisans locaux. Une visite à Gorée, c'est plonger dans l'histoire tout en savourant la beauté de l'océan.
          </Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={toggleDescription}>
            <Text style={styles.readMoreText}>
              {expandedDescription ? "Afficher moins" : "Lire la suite"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Planifiez votre voyage</Text>
          <View style={styles.servicesContainer}>
            {serviceCategories.map((service, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.serviceItemVertical}
                onPress={() => {
                  if (service.text === 'Hébergement') {
                    navigation.navigate('Hebergement');
                  } else if (service.text === 'Loisirs') {
                    navigation.navigate('Loisirs');
                  } else if (service.text === 'Accessibilité') {
                    navigation.navigate('Accessibilite');
                  } else if (service.text === 'Administration') {
                    navigation.navigate('Administration');
                  } else if (service.text === 'Restauration') {
                    navigation.navigate('Restauration');
                  } else if (service.text === 'Guide touristique') {
                    navigation.navigate('GuideTouristique');
                  }
                }}
              >
                <View style={styles.serviceIconContainer}>
                  {service.icon === 'hotel' || service.icon === 'bed' ? (
                    <FontAwesome name={service.icon} size={24} color={COLORS.white} />
                  ) : (
                    <MaterialIcons name={service.icon} size={24} color={COLORS.white} />
                  )}
                </View>
                <Text style={styles.serviceTextVertical}>{service.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gorée en Images</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <MaterialIcons name="arrow-forward" size={16} color={COLORS.green_accueil} />
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
                      <Text style={styles.photoAvatarText}>?</Text>
                    </View>
                    <Text style={styles.photoUsername}>{photo.user}</Text>
                  </View>
                  <View style={styles.photoLikes}>
                    <FontAwesome name="heart" size={12} color={COLORS.pink} />
                    <Text style={styles.photoLikesCount}>{photo.likes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.uploadButton}>
            <MaterialIcons name="file-upload" size={18} color={COLORS.green_accueil} style={styles.uploadIcon} />
            <Text style={styles.uploadButtonText}>Téléverser vos photos et vidéos</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Avis & Commentaires</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <MaterialIcons name="arrow-forward" size={16} color={COLORS.green_accueil} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewCount}>{comments.length} Commentaires</Text>
            <View style={styles.sortBy}>
              <Text style={styles.sortByText}>Trié par</Text>
              <MaterialIcons name="sort" size={18} color={COLORS.darkgray} />
            </View>
          </View>
          
          {/* Comment input section */}
          <View style={styles.commentInputContainer}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>?</Text>
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Partagez votre expérience, votre avis..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.postButton}
              onPress={addComment}
            >
              <MaterialIcons name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
          
          {comments.length > 3 && (
            <TouchableOpacity style={styles.viewMoreComments}>
              <Text style={styles.viewMoreCommentsText}>Voir plus de commentaires</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color={COLORS.green_accueil} />
            </TouchableOpacity>
          )}
        </View>

        {/* Popular Places Section - déplacé à la fin comme demandé */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lieux populaires</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <MaterialIcons name="arrow-forward" size={16} color={COLORS.green_accueil} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.popularPlacesContainer}>
            {displayedPlaces.map((place, index) => (
              <View key={place._id} style={[styles.popularPlaceCard, 
                index % 2 === 0 ? {marginRight: '2%'} : {marginLeft: '2%'}]}>
                <Image 
                  source={place.placeImage}
                  style={styles.popularPlaceImage} 
                />
                <View style={styles.popularPlaceInfo}>
                  <Text style={styles.popularPlaceTitle} numberOfLines={2}>{place.title}</Text>
                  <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={12} color="#FD9942" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                    <Text style={styles.reviewText}>({place.review})</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color={COLORS.darkgray} />
                    <Text style={styles.locationText}>{place.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Espace en bas pour éviter que le contenu ne soit caché par les éléments de navigation */}
        <View style={{ height: 5 }} />
      </ScrollView>
    </View>
  );
};

export default Mainplacesdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgreen || "#F3F4F8",
  },
  // Partie fixe en haut (incluant l'image et le titre)
  fixedTopSection: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 5,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flex: 1,
    marginTop: 418, // Hauteur combinée de heroImage (400) + titleContainer (estimé à 150) + un peu d'espace supplémentaire
  },
  header: {
    height: 80,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back || "rgba(0,0,0,0.5)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 310,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: 3,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  seeMoreImagesButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  seeMoreText: {
    color: COLORS.white,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FD9942',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  titleContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray || "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightgray || "#A0A0A0",
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
    color: COLORS.lightgray || "#A0A0A0",
    flex: 1,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: COLORS.green_accueil,
    marginRight: 4,
    fontSize: 14,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.lightgray || "#A0A0A0",
  },
  readMoreButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  servicesSection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceItemVertical: {
    width: '31%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    backgroundColor: COLORS.green_accueil,
  },
  serviceIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTextVertical: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  photosScroll: {
    marginVertical: 12,
  },
  photoCard: {
    marginRight: 12,
    width: 160,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray || "#E0E0E0",
    backgroundColor: COLORS.white,
  },
  photoImage: {
    width: 160,
    height: 210,
  },
  photoInfo: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.gray || "#E0E0E0",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  photoAvatarText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  photoUsername: {
    fontSize: 12,
    color: COLORS.black,
  },
  photoLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoLikesCount: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.green_accueil,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    color: COLORS.green_accueil,
    fontWeight: '500',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewCount: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  sortBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginRight: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray || "#E0E0E0",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatarText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.lightgreen || "#F3F4F8",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingRight: 40,
    minHeight: 45,
  },
  postButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: COLORS.green_accueil,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray || "#E0E0E0",
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray || "#E0E0E0",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  timeAgo: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    marginBottom: 10,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 5,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
  },
  replyInput: {
    flex: 1,
    backgroundColor: COLORS.lightgreen || "#F3F4F8",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    paddingRight: 40,
    minHeight: 40,
  },
  sendButton: {
    position: 'absolute',
    right: 8,
    backgroundColor: COLORS.green_accueil,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repliesContainer: {
    marginTop: 10,
    marginLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.gray || "#E0E0E0",
    paddingLeft: 15,
  },
  replyContainer: {
    marginBottom: 12,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.black,
    marginBottom: 8,
  },
  viewMoreComments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewMoreCommentsText: {
    color: COLORS.green_accueil,
    fontWeight: '500',
    marginRight: 5,
  },
  popularPlacesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  popularPlaceCard: {
    width: '48%',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray || "#E0E0E0",
  },
  popularPlaceImage: {
    width: '100%',
    height: 120,
  },
  popularPlaceInfo: {
    padding: 10,
  },
  popularPlaceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
    height: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: COLORS.darkgray,
    marginLeft: 3,
  }
});
