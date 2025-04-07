
import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, Animated, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';
// Updated color scheme based on your requirements


export default function App({ navigation }) {
  const [saved, setSaved] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'bakerofarts224',
      time: 'il y a 2 ans',
      comment: 'Super voyage. Bien planifié de A à Z grâce à l\'application ❤️❤️❤️',
      likes: 10,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
    {
      id: '2',
      user: 'globetrotter42',
      time: 'il y a 1 an',
      comment: 'Excellent séjour, je recommande vivement cette destination pour la culture et la gastronomie!',
      likes: 15,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
    {
      id: '3',
      user: 'travelbug88',
      time: 'il y a 6 mois',
      comment: 'Les plages sont magnifiques et les habitants très accueillants. Merci pour cette découverte!',
      likes: 30,
      replies: [],
      liked: false,
      showReplyInput: false,
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Sample data for images
  const dakar = require("../../assets/images/region/dakar.jpg");
  const artsvillage = require("../../assets/images/popularplacesDakar/village-des-arts.jpg");
  const divinityMosquee = require("../../assets/images/popularplacesDakar/mosquee_divinity.jpg");
  const ngorIsle = require("../../assets/images/popularplacesDakar/ile_de_ngor.jpg");
  const RenaissancePlace = require("../../assets/images/popularplacesDakar/moment_de_la_renaissance.jpg");
  const phareMamellesplace = require("../../assets/images/popularplacesDakar/phare_mamelles.jpg");

  const attractions = [
    {
      id: '1',
      name: 'Phare des Mamelles',
      image: phareMamellesplace,
    },
    {
      id: '2',
      name: 'Monument de la Renaissance',
      image: RenaissancePlace,
    },
  ];

  const photos = [
    { id: '1', image: RenaissancePlace, user: 'Lily', likes: 24 },
    { id: '2', image: divinityMosquee, user: 'Kevin', likes: 45 },
    { id: '3', image: ngorIsle, user: 'Paul', likes: 32 },
    { id: '4', image: artsvillage, user: 'Lisa', likes: 18 },
  ];

  // Gallery images for the main slider
  const galleryImages = [
    RenaissancePlace,
    divinityMosquee,
    ngorIsle,
    artsvillage,
    phareMamellesplace
  ];

  // Services icons and categories restructured with unified colors
  const serviceCategories = [
    { icon: 'leisure', text: 'Loisirs' },
    { icon: 'bed', text: 'Hébergement' },
    { icon: 'local-activity', text: 'Accessibilité' },
    { icon: 'admin-panel-settings', text: 'Administration' },
    { icon: 'restaurant-menu', text: 'Restauration' },
    { icon: 'people', text: 'Guide touristique' },
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
    setReplyText('');
  };

  const addReply = (id) => {
    if (replyText.trim() === '') return;
    
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply-${Date.now()}`,
              user: 'Vous',
              time: 'à l\'instant',
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
    setReplyText('');
  };

  const addComment = () => {
    if (newComment.trim() === '') return;
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      user: 'Vous',
      time: 'à l\'instant',
      comment: newComment,
      likes: 0,
      replies: [],
      liked: false,
      showReplyInput: false
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
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
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}  onPress={() => navigation.goBack()}>
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

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
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
            <Text style={styles.ratingText}>5/5</Text>
          </View>
        </View>

        {/* Title Container */}
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

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu</Text>
          <Text 
            style={styles.overviewText}
            numberOfLines={expandedDescription ? undefined : 3}
          >
            L'histoire de Dakar, la capitale du Sénégal, remonte à la période pré-coloniale, lorsque la région était habitée par des peuples de tradition occidentale et cultivateurs. En 1857, Dakar devient une ville portuaire sous l'égide des colonisateurs français et un centre d'échange commercial. Sa position stratégique en fait un point de départ pour le commerce entre l'Afrique, l'Europe et les Amériques.
            Au fil des décennies, Dakar se développe pour devenir un hub culturel et économique, comme la capitale de l'Afrique Occidentale...
          </Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={toggleDescription}>
            <Text style={styles.readMoreText}>
              {expandedDescription ? "Afficher moins" : "Lire la suite"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Services Section - Updated with navigation functionality */}
<View style={styles.servicesSection}>
  <Text style={styles.sectionTitle}>Planifiez votre voyage</Text>
  <View style={styles.servicesContainer}>
    {serviceCategories.map((service, index) => (
      <TouchableOpacity 
        key={index} 
        style={styles.serviceItemVertical}
        onPress={() => {
          // Navigation vers l'écran correspondant au service cliqué
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
          console.log(`Naviguer vers: ${service.text}`);
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
            <Text style={styles.sectionTitle}>Photos & Vidéos</Text>
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

        {/* Reviews Section - Updated with better design and functionality */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voyage & Avis</Text>
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

        {/* Nearby Attractions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attractions à proximité</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir plus</Text>
              <MaterialIcons name="arrow-forward" size={16} color={COLORS.green_accueil} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.attractionsContainer}>
            {attractions.map(attraction => (
              <View key={attraction.id} style={styles.attractionCard}>
                <Image 
                  source={attraction.image}
                  style={styles.attractionImage} 
                />
                <Text style={styles.attractionName}>{attraction.name}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Add some space at the bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgreen,
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: 'transparent',
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
    backgroundColor: COLORS.green_button_back,
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
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 400,
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
  titleContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightgray,
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
    color: COLORS.lightgray,
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
    color: COLORS.lightgray,
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
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  photoImage: {
    width: 160,
    height: 200,
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
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  photoAvatarText: {
    fontSize: 12,
    color: COLORS.lightgray,
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
    color: COLORS.lightgray,
    marginLeft: 3,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: COLORS.green_accueil,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadIcon: {
    marginRight: 6,
  },
  uploadButtonText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewCount: {
    fontSize: 14,
    color: COLORS.lightgray,
  },
  sortBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: 14,
    color: COLORS.lightgray,
    marginRight: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.lightgreen,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatarText: {
    fontSize: 14,
    color: COLORS.darkgray,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    fontSize: 14,
    color: COLORS.black,
  },
  postButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  commentContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
    padding: 16,
    backgroundColor: COLORS.lightgreen,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: COLORS.darkgray,
  },
  username: {
    fontSize: 16,
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
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    marginLeft: 5,
    color: COLORS.darkgray,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  replyInput: {
    flex: 1,
    minHeight: 36,
    fontSize: 14,
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.green_accueil,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  repliesContainer: {
    marginTop: 10,
    marginLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.gray,
    paddingLeft: 15,
  },
  replyContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.black,
    marginBottom: 5,
  },
  viewMoreComments: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  viewMoreCommentsText: {
    color: COLORS.green_accueil,
    fontWeight: '500',
    marginRight: 5,
  },
  attractionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  attractionCard: {
    width: '48%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  attractionImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  attractionName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    padding: 10,
    textAlign: 'center',
  }
});





