/*import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
  const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
  const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
  const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
  const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
  const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
  const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
  const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
  const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
  const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
  const logo=require("../../assets/icon.png");
  const banner=require("../../assets/hotel.jpg")


// Données fictives pour les différentes catégories
const DUMMY_DATA = {
  hotels: [
    { id: '1', name: " Novotel", address: 'Av. Abdoulaye Fadiga', rating: 5, image: Novotel },
    { id: '2', name: 'Archotel', address: '64 Rue Felix faure', rating: 5, image: Archotel },
    { id: '3', name: 'Azalai', address: '12 Rue des Palmiers', rating: 4, image: Azalai},
    { id: '4', name: 'Hotellesokhamon', address: '35 Avenue Principale', rating: 4, image: Hotellesokhamon },
  ],
  villas: [
    { id: '1', name: 'Villa Blanche', address: 'Route de la Corniche', rating: 5, image: Kingfahdpalace },
    { id: '2', name: 'Villa Palmier', address: '23 Chemin des Cocotiers', rating: 4, image: hotel_nina },
    { id: '3', name: 'Villa Océan', address: 'Quartier des Almadies', rating: 5, image: radisson_blue_blue },
    { id: '4', name: 'Villa Royale', address: '48 Rue du Cap', rating: 5, image: cafe_de_rome },
  ],
  appartements: [
    { id: '1', name: 'Appart Maritime', address: 'Résidence Les Flamboyants', rating: 4, image:FleurdeLyshotel  },
    { id: '2', name: 'Appart Dakar Centre', address: '55 Avenue de la République', rating: 3, image: cafe_de_rome },
    { id: '3', name: 'Le Petit Nid', address: 'Cité Keur Gorgui', rating: 4, image: cafe_de_rome },
    { id: '4', name: 'Résidence Baobab', address: '12 Rue des Artisans', rating: 5, image: cafe_de_rome },
  ],
  chambres: [
    { id: '1', name: 'Chambre Élégance', address: 'Médina - 28 Rue Kaolack', rating: 4, image: cafe_de_rome },
    { id: '2', name: 'Chambre Cosy', address: 'Plateau - 43 Avenue Pompidou', rating: 3, image: cafe_de_rome },
    { id: '3', name: 'Chambre Vue Mer', address: 'Corniche - Résidence Marina', rating: 5, image: radisson_blue_blue },
    { id: '4', name: 'Chambre Familiale', address: 'Point E - 67 Rue des Écoles', rating: 4, image: Hotellesokhamon },
  ],
};

const HebergementScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  
  // Rendu des étoiles selon la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#FFD700' : COLORS.gray, fontSize: 12 }}>★</Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  // Rendu d'un élément individuel dans la liste
  const renderItem = ({ item, index }) => {
    return (
      <View style={[
        styles.itemContainer, 
        index % 2 === 0 ? { marginRight: 6} : { marginLeft: 6}
      ]}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemOverlay}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.pink} />
            <Text style={styles.itemAddress}>{item.address}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.pink} />
        </TouchableOpacity>
      </View>
    );
  };

  // Fonction pour rendre les catégories
  const renderCategories = () => {
    const categories = [
      { id: 'hotels', name: 'Hotels', icon: 'business' },
      { id: 'villas', name: 'Villas', icon: 'home' },
      { id: 'appartements', name: 'Appartements', icon: 'apartment' },
      { id: 'chambres', name: 'chambres', icon: 'hotel' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={24} 
              color={activeCategory === category.id ? COLORS.green_accueil : COLORS.black} 
            />
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {/* Header }
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image 
            source={logo} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Banner }
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Réservez votre meilleur hôtel avec nous !</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Réservez ici</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={banner} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories }
      {renderCategories()}

      {/* Item List }
      <FlatList
        data={DUMMY_DATA[activeCategory]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: 80,
    height: 80,
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.gray,
    width: 70,
    height: 70,
    margin: 2,
  },
  activeCategoryButton: {
    borderColor: COLORS.green_favoris,
    borderWidth: 3,
    //backgroundColor: COLORS.lightgreen,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    height: 235,
    maxWidth: '50%',
    marginHorizontal:8
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemAddress: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HebergementScreen;*/


//////////////////////////////////////////////////

/*import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Modal
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

// Images
const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
const logo = require("../../assets/icon.png");

// Images pour chaque catégorie
const bannerImages = {
  hotels: require("../../assets/hotel.jpg"),
  villas: require("../../assets/images/hotels/dakar/mirammar.jpg"),
  appartements: require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg"),
  chambres: require("../../assets/images/hotels/dakar/cafe_de_rome.jpg"),
};

// Données avec prix ajoutés
const DUMMY_DATA = {
  hotels: [
    { id: '1', name: "Novotel", address: 'Av. Abdoulaye Fadiga', rating: 5, image: Novotel, price: 120000 },
    { id: '2', name: 'Archotel', address: '64 Rue Felix faure', rating: 5, image: Archotel, price: 150000 },
    { id: '3', name: 'Azalai', address: '12 Rue des Palmiers', rating: 4, image: Azalai, price: 95000 },
    { id: '4', name: 'Hotellesokhamon', address: '35 Avenue Principale', rating: 4, image: Hotellesokhamon, price: 80000 },
    { id: '5', name: 'Terroubi', address: 'Route de la Corniche', rating: 5, image: Terroubi, price: 200000 },
    { id: '6', name: 'Radisson Blu', address: 'Place de l\'Indépendance', rating: 5, image: radisson_blue_blue, price: 45000 },
  ],
  villas: [
    { id: '1', name: 'Villa Blanche', address: 'Route de la Corniche', rating: 5, image: Kingfahdpalace, price: 125000 },
    { id: '2', name: 'Villa Palmier', address: '23 Chemin des Cocotiers', rating: 4, image: hotel_nina, price: 100000 },
    { id: '3', name: 'Villa Océan', address: 'Quartier des Almadies', rating: 5, image: radisson_blue_blue, price: 400000 },
    { id: '4', name: 'Villa Royale', address: '48 Rue du Cap', rating: 5, image: cafe_de_rome, price: 700000 },
  ],
  appartements: [
    { id: '1', name: 'Appart Maritime', address: 'Résidence Les Flamboyants', rating: 4, image: FleurdeLyshotel, price: 85000 },
    { id: '2', name: 'Appart Dakar Centre', address: '55 Avenue de la République', rating: 3, image: cafe_de_rome, price: 70000 },
    { id: '3', name: 'Le Petit Nid', address: 'Cité Keur Gorgui', rating: 4, image: Azalai, price: 90000 },
    { id: '4', name: 'Résidence Baobab', address: '12 Rue des Artisans', rating: 5, image: Novotel, price: 110000 },
  ],
  chambres: [
    { id: '1', name: 'Chambre Élégance', address: 'Médina - 28 Rue Kaolack', rating: 4, image: cafe_de_rome, price: 45000 },
    { id: '2', name: 'Chambre Cosy', address: 'Plateau - 43 Avenue Pompidou', rating: 3, image: FleurdeLyshotel, price: 15000 },
    { id: '3', name: 'Chambre Vue Mer', address: 'Corniche - Résidence Marina', rating: 5, image: radisson_blue_blue, price: 20000 },
    { id: '4', name: 'Chambre Familiale', address: 'Point E - 67 Rue des Écoles', rating: 4, image: Hotellesokhamon, price: 25000 },
  ],
};

const HebergementScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [filteredData, setFilteredData] = useState(DUMMY_DATA.hotels);

  // Textes personnalisés pour chaque catégorie
  const categoryTexts = {
    hotels: {
      title: "Réservez votre meilleur hôtel avec nous !",
      buttonText: "Choisir mon hôtel"
    },
    villas: {
      title: "Des villas de luxe pour votre séjour à Dakar",
      buttonText: "Choisir ma villa"
    },
    appartements: {
      title: "Appartements confortables et bien situés",
      buttonText: "Choisir mon appartement"
    },
    chambres: {
      title: "Chambres privées à prix abordables",
      buttonText: "Choisir ma chambre"
    }
  };

  // Mise à jour des données filtrées quand la catégorie change
  useEffect(() => {
    applyFilters();
  }, [activeCategory, priceRange, ratingFilter]);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let data = [...DUMMY_DATA[activeCategory]];
    
    // Filtre par prix
    data = data.filter(item => 
      item.price >= priceRange.min && 
      item.price <= priceRange.max
    );
    
    // Filtre par étoiles (uniquement pour les hôtels)
    if (activeCategory === 'hotels' && ratingFilter > 0) {
      data = data.filter(item => item.rating >= ratingFilter);
    }
    
    setFilteredData(data);
  };

  // Gestion des favoris
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Navigation vers la page de détails
  const navigateToDetails = (item) => {
    // Ici vous pourriez naviguer vers une page de détails
    console.log(`Navigating to details for ${item.name}`);
    // Exemple: navigation.navigate('HebergementDetails', { item });
    alert(`Détails de ${item.name} - Prix: ${item.price}Fcfa/nuit`);
  };

  // Rendu des étoiles selon la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#FFD700' : COLORS.gray, fontSize: 12 }}>★</Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  // Rendu d'un élément individuel dans la liste
  const renderItem = ({ item, index }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.itemContainer, 
          index % 2 === 0 ? { marginRight: 6} : { marginLeft: 6}
        ]}
        onPress={() => navigateToDetails(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemOverlay}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.pink} />
            <Text style={styles.itemAddress}>{item.address}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price}Fcfa<Text style={styles.pricePerNight}>/nuit</Text></Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? COLORS.pink : "white"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Fonction pour rendre les catégories
  const renderCategories = () => {
    const categories = [
      { id: 'hotels', name: 'Hotels', icon: 'business' },
      { id: 'villas', name: 'Villas', icon: 'home' },
      { id: 'appartements', name: 'Appartements', icon: 'apartment' },
      { id: 'chambres', name: 'Chambres', icon: 'hotel' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={24} 
              color={activeCategory === category.id ? COLORS.green_accueil : COLORS.black} 
            />
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Modal de filtrage
  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer les résultats</Text>
            
            <Text style={styles.filterLabel}>Fourchette de prix :</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.max === 25000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 25000 })}
              >
                <Text style={styles.priceButtonText}>0-25000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 25000 && priceRange.max === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 25000, max: 50000 })}
              >
                <Text style={styles.priceButtonText}>25 000-50 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 50000, max: 100000 })}
              >
                <Text style={styles.priceButtonText}>100 000+</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 0 && priceRange.max === 500000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 500000 })}
              >
                <Text style={styles.priceButtonText}>Tous</Text>
              </TouchableOpacity>
            </View>
            
            {activeCategory === 'hotels' && (
              <>
                <Text style={styles.filterLabel}>Nombre d'étoiles :</Text>
                <View style={styles.starsFilterContainer}>
                  {[0, 3, 4, 5].map((stars) => (
                    <TouchableOpacity 
                      key={stars}
                      style={[styles.starButton, ratingFilter === stars && styles.activeStarButton]}
                      onPress={() => setRatingFilter(stars)}
                    >
                      <Text style={styles.starButtonText}>
                        {stars === 0 ? 'Tous' : `${stars}★ +`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => {
                  applyFilters();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      
      {/* Header avec fond teinté }
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image 
              source={logo} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner qui change selon la catégorie }
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{categoryTexts[activeCategory].title}</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>{categoryTexts[activeCategory].buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={bannerImages[activeCategory]} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories }
      {renderCategories()}

      {/* Item List avec filtrage }
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Aucun résultat ne correspond à vos critères</Text>
          </View>
        }
      />
      
      {/* Modal de filtrage }
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.gray,
    width: 70,
    height: 70,
    margin: 2,
  },
  activeCategoryButton: {
    borderColor: COLORS.green_favoris,
    borderWidth: 3,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    height: 235,
    maxWidth: '50%',
    marginHorizontal: 8
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemAddress: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pricePerNight: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activePriceButton: {
    backgroundColor: COLORS.green_accueil,
  },
  priceButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  starsFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  starButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activeStarButton: {
    backgroundColor: COLORS.green_accueil,
  },
  starButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: COLORS.green_accueil,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});

export default HebergementScreen;*/

/*import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Modal
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

// Images
const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
const logo = require("../../assets/icon.png");

// Images pour chaque catégorie
const bannerImages = {
  hotels: require("../../assets/hotel.jpg"),
  villas: require("../../assets/images/hotels/dakar/mirammar.jpg"),
  appartements: require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg"),
  chambres: require("../../assets/images/hotels/dakar/cafe_de_rome.jpg"),
};

// Données avec prix ajoutés
const DUMMY_DATA = {
  hotels: [
    { id: '1', name: "Novotel", address: 'Av. Abdoulaye Fadiga', rating: 5, image: Novotel, price: 120000 },
    { id: '2', name: 'Archotel', address: '64 Rue Felix faure', rating: 5, image: Archotel, price: 150000 },
    { id: '3', name: 'Azalai', address: '12 Rue des Palmiers', rating: 4, image: Azalai, price: 95000 },
    { id: '4', name: 'Hotellesokhamon', address: '35 Avenue Principale', rating: 4, image: Hotellesokhamon, price: 80000 },
    { id: '5', name: 'Terroubi', address: 'Route de la Corniche', rating: 5, image: Terroubi, price: 200000 },
    { id: '6', name: 'Radisson Blu', address: 'Place de l\'Indépendance', rating: 5, image: radisson_blue_blue, price: 45000 },
  ],
  villas: [
    { id: '1', name: 'Villa Blanche', address: 'Route de la Corniche', rating: 5, image: Kingfahdpalace, price: 125000 },
    { id: '2', name: 'Villa Palmier', address: '23 Chemin des Cocotiers', rating: 4, image: hotel_nina, price: 100000 },
    { id: '3', name: 'Villa Océan', address: 'Quartier des Almadies', rating: 5, image: radisson_blue_blue, price: 400000 },
    { id: '4', name: 'Villa Royale', address: '48 Rue du Cap', rating: 5, image: cafe_de_rome, price: 700000 },
  ],
  appartements: [
    { id: '1', name: 'Appart Maritime', address: 'Résidence Les Flamboyants', rating: 4, image: FleurdeLyshotel, price: 85000 },
    { id: '2', name: 'Appart Dakar Centre', address: '55 Avenue de la République', rating: 3, image: cafe_de_rome, price: 70000 },
    { id: '3', name: 'Le Petit Nid', address: 'Cité Keur Gorgui', rating: 4, image: Azalai, price: 90000 },
    { id: '4', name: 'Résidence Baobab', address: '12 Rue des Artisans', rating: 5, image: Novotel, price: 110000 },
  ],
  chambres: [
    { id: '1', name: 'Chambre Élégance', address: 'Médina - 28 Rue Kaolack', rating: 4, image: cafe_de_rome, price: 45000 },
    { id: '2', name: 'Chambre Cosy', address: 'Plateau - 43 Avenue Pompidou', rating: 3, image: FleurdeLyshotel, price: 15000 },
    { id: '3', name: 'Chambre Vue Mer', address: 'Corniche - Résidence Marina', rating: 5, image: radisson_blue_blue, price: 20000 },
    { id: '4', name: 'Chambre Familiale', address: 'Point E - 67 Rue des Écoles', rating: 4, image: Hotellesokhamon, price: 25000 },
  ],
};

const HebergementScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [filteredData, setFilteredData] = useState(DUMMY_DATA.hotels);

  // Textes personnalisés pour chaque catégorie
  const categoryTexts = {
    hotels: {
      title: "Réservez votre meilleur hôtel avec nous !",
      buttonText: "Choisir mon hôtel"
    },
    villas: {
      title: "Des villas de luxe pour votre séjour à Dakar",
      buttonText: "Choisir ma villa"
    },
    appartements: {
      title: "Appartements confortables et bien situés",
      buttonText: "Choisir mon appartement"
    },
    chambres: {
      title: "Chambres privées à prix abordables",
      buttonText: "Choisir ma chambre"
    }
  };

  // Mise à jour des données filtrées quand la catégorie change
  useEffect(() => {
    applyFilters();
  }, [activeCategory, priceRange, ratingFilter]);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let data = [...DUMMY_DATA[activeCategory]];
    
    // Filtre par prix
    data = data.filter(item => 
      item.price >= priceRange.min && 
      item.price <= priceRange.max
    );
    
    // Filtre par étoiles (uniquement pour les hôtels)
    if (activeCategory === 'hotels' && ratingFilter > 0) {
      data = data.filter(item => item.rating >= ratingFilter);
    }
    
    setFilteredData(data);
  };

  // Gestion des favoris
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Navigation vers la page de détails selon la catégorie
  const navigateToDetails = (item) => {
    // Définir l'écran de destination en fonction de la catégorie active
    let destinationScreen = '';
    switch (activeCategory) {
      case 'hotels':
        destinationScreen = 'HotelsDetails';
        break;
      case 'villas':
        destinationScreen = 'VillaDetails';
        break;
      case 'appartements':
        destinationScreen = 'AppartementDetails';
        break;
      case 'chambres':
        destinationScreen = 'ChambreDetails';
        break;
      default:
        destinationScreen = 'HotelDetails';
    }
    
    console.log(`Navigating to ${destinationScreen} for ${item.name}`);
    
    // Naviguer vers l'écran de détails approprié avec les données de l'item
    navigation.navigate(destinationScreen, { 
      item,
      categoryType: activeCategory // Envoyer également le type de catégorie
    });
  };

  // Rendu des étoiles selon la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#FFD700' : COLORS.gray, fontSize: 12 }}>★</Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  // Rendu d'un élément individuel dans la liste
  const renderItem = ({ item, index }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.itemContainer, 
          index % 2 === 0 ? { marginRight: 6} : { marginLeft: 6}
        ]}
        onPress={() => navigateToDetails(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemOverlay}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.pink} />
            <Text style={styles.itemAddress}>{item.address}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price}{''}Fcfa<Text style={styles.pricePerNight}>/nuit</Text></Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? COLORS.pink : "white"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Fonction pour rendre les catégories
  const renderCategories = () => {
    const categories = [
      { id: 'hotels', name: 'Hotels', icon: 'business' },
      { id: 'villas', name: 'Villas', icon: 'home' },
      { id: 'appartements', name: 'Appartements', icon: 'apartment' },
      { id: 'chambres', name: 'Chambres', icon: 'hotel' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={24} 
              color={activeCategory === category.id ? COLORS.green_accueil : COLORS.black} 
            />
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Modal de filtrage
  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer les résultats</Text>
            
            <Text style={styles.filterLabel}>Fourchette de prix :</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.max === 25000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 25000 })}
              >
                <Text style={styles.priceButtonText}>0-25000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 25000 && priceRange.max === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 25000, max: 50000 })}
              >
                <Text style={styles.priceButtonText}>25 000-50 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 50000, max: 100000 })}
              >
                <Text style={styles.priceButtonText}>100 000+</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 0 && priceRange.max === 500000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 500000 })}
              >
                <Text style={styles.priceButtonText}>Tous</Text>
              </TouchableOpacity>
            </View>
            
            {activeCategory === 'hotels' && (
              <>
                <Text style={styles.filterLabel}>Nombre d'étoiles :</Text>
                <View style={styles.starsFilterContainer}>
                  {[0, 3, 4, 5].map((stars) => (
                    <TouchableOpacity 
                      key={stars}
                      style={[styles.starButton, ratingFilter === stars && styles.activeStarButton]}
                      onPress={() => setRatingFilter(stars)}
                    >
                      <Text style={styles.starButtonText}>
                        {stars === 0 ? 'Tous' : `${stars}★ +`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => {
                  applyFilters();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      
      {/* Header avec fond teinté }
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image 
              source={logo} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner qui change selon la catégorie }
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{categoryTexts[activeCategory].title}</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>{categoryTexts[activeCategory].buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={bannerImages[activeCategory]} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories }
      {renderCategories()}

      {/* Item List avec filtrage }
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Aucun résultat ne correspond à vos critères</Text>
          </View>
        }
      />
      
      {/* Modal de filtrage }
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.gray,
    width: 70,
    height: 70,
    margin: 2,
  },
  activeCategoryButton: {
    borderColor: COLORS.green_favoris,
    borderWidth: 3,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    height: 235,
    maxWidth: '50%',
    marginHorizontal: 8
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemAddress: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pricePerNight: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activePriceButton: {
    backgroundColor: COLORS.green_accueil,
  },
  priceButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  starsFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  starButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activeStarButton: {
    backgroundColor: COLORS.green_accueil,
  },
  starButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: COLORS.green_accueil,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});

export default HebergementScreen;*/

/*import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Modal
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

// Images
const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
const logo = require("../../assets/icon.png");

// Images pour chaque catégorie
const bannerImages = {
  hotels: require("../../assets/hotel.jpg"),
  villas: require("../../assets/images/hotels/dakar/mirammar.jpg"),
  appartements: require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg"),
  chambres: require("../../assets/images/hotels/dakar/cafe_de_rome.jpg"),
};

// Données avec prix ajoutés
const DUMMY_DATA = {
  hotels: [
    { id: 'hotel-1', name: "Novotel", address: 'Av. Abdoulaye Fadiga', rating: 5, image: Novotel, price: 120000 },
    { id: 'hotel-2', name: 'Archotel', address: '64 Rue Felix faure', rating: 5, image: Archotel, price: 150000 },
    { id: 'hotel-3', name: 'Azalai', address: '12 Rue des Palmiers', rating: 4, image: Azalai, price: 95000 },
    { id: 'hotel-4', name: 'Hotellesokhamon', address: '35 Avenue Principale', rating: 4, image: Hotellesokhamon, price: 80000 },
    { id: 'hotel-5', name: 'Terroubi', address: 'Route de la Corniche', rating: 5, image: Terroubi, price: 200000 },
    { id: 'hotel-6', name: 'Radisson Blu', address: 'Place de l\'Indépendance', rating: 5, image: radisson_blue_blue, price: 45000 },
  ],
  villas: [
    { id: 'villa-1', name: 'Villa Blanche', address: 'Route de la Corniche', rating: 5, image: Kingfahdpalace, price: 125000 },
    { id: 'villa-2', name: 'Villa Palmier', address: '23 Chemin des Cocotiers', rating: 4, image: hotel_nina, price: 100000 },
    { id: 'villa-3', name: 'Villa Océan', address: 'Quartier des Almadies', rating: 5, image: radisson_blue_blue, price: 400000 },
    { id: 'villa-4', name: 'Villa Royale', address: '48 Rue du Cap', rating: 5, image: cafe_de_rome, price: 700000 },
  ],
  appartements: [
    { id: 'appart-1', name: 'Appart Maritime', address: 'Résidence Les Flamboyants', rating: 4, image: FleurdeLyshotel, price: 85000 },
    { id: 'appart-2', name: 'Appart Dakar Centre', address: '55 Avenue de la République', rating: 3, image: cafe_de_rome, price: 70000 },
    { id: 'appart-3', name: 'Le Petit Nid', address: 'Cité Keur Gorgui', rating: 4, image: Azalai, price: 90000 },
    { id: 'appart-4', name: 'Résidence Baobab', address: '12 Rue des Artisans', rating: 5, image: Novotel, price: 110000 },
  ],
  chambres: [
    { id: 'chambre-1', name: 'Chambre Élégance', address: 'Médina - 28 Rue Kaolack', rating: 4, image: cafe_de_rome, price: 45000 },
    { id: 'chambre-2', name: 'Chambre Cosy', address: 'Plateau - 43 Avenue Pompidou', rating: 3, image: FleurdeLyshotel, price: 15000 },
    { id: 'chambre-3', name: 'Chambre Vue Mer', address: 'Corniche - Résidence Marina', rating: 5, image: radisson_blue_blue, price: 20000 },
    { id: 'chambre-4', name: 'Chambre Familiale', address: 'Point E - 67 Rue des Écoles', rating: 4, image: Hotellesokhamon, price: 25000 },
  ],
};

const HebergementScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  // Favoris organisés par catégorie
  const [favorites, setFavorites] = useState({
    hotels: [],
    villas: [],
    appartements: [],
    chambres: []
  });
  const [modalVisible, setModalVisible] = useState(false);
  // Prix maximum pour réglage "Tous" basé sur la catégorie actuelle
  const getMaxPriceForCategory = (category) => {
    if (!DUMMY_DATA[category] || DUMMY_DATA[category].length === 0) return 500000;
    return Math.max(...DUMMY_DATA[category].map(item => item.price)) + 50000; // Ajouter une marge
  };
  
  // Initialiser les filtres sur "Tous"
  const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPriceForCategory('hotels') });
  const [ratingFilter, setRatingFilter] = useState(0); // 0 = Tous
  const [filteredData, setFilteredData] = useState(DUMMY_DATA.hotels);

  // Textes personnalisés pour chaque catégorie
  const categoryTexts = {
    hotels: {
      title: "Réservez votre meilleur hôtel avec nous !",
      buttonText: "Choisir mon hôtel"
    },
    villas: {
      title: "Des villas de luxe pour votre séjour à Dakar",
      buttonText: "Choisir ma villa"
    },
    appartements: {
      title: "Appartements confortables et bien situés",
      buttonText: "Choisir mon appartement"
    },
    chambres: {
      title: "Chambres privées à prix abordables",
      buttonText: "Choisir ma chambre"
    }
  };

  // Mise à jour des filtres et des données quand la catégorie change
  useEffect(() => {
    // Réinitialiser les filtres à "Tous" lors du changement de catégorie
    const maxPrice = getMaxPriceForCategory(activeCategory);
    setPriceRange({ min: 0, max: maxPrice });
    setRatingFilter(0);
    
    // Appliquer les filtres sur la nouvelle catégorie
    applyFilters({ min: 0, max: maxPrice }, 0);
  }, [activeCategory]);

  // Fonction pour appliquer les filtres
  const applyFilters = (priceRangeToApply = priceRange, ratingToApply = ratingFilter) => {
    let data = [...DUMMY_DATA[activeCategory]];
    
    // Filtre par prix
    data = data.filter(item => 
      item.price >= priceRangeToApply.min && 
      item.price <= priceRangeToApply.max
    );
    
    // Filtre par étoiles (si applicable)
    if (ratingToApply > 0) {
      data = data.filter(item => item.rating >= ratingToApply);
    }
    
    setFilteredData(data);
  };

  // Gestion des favoris spécifiques à chaque catégorie
  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => {
      const categoryFavorites = [...prevFavorites[activeCategory]];
      
      if (categoryFavorites.includes(id)) {
        // Retirer des favoris
        const newCategoryFavorites = categoryFavorites.filter(favId => favId !== id);
        return {
          ...prevFavorites,
          [activeCategory]: newCategoryFavorites
        };
      } else {
        // Ajouter aux favoris
        return {
          ...prevFavorites,
          [activeCategory]: [...categoryFavorites, id]
        };
      }
    });
  };

  // Navigation vers la page de détails selon la catégorie
  const navigateToDetails = (item) => {
    // Définir l'écran de destination en fonction de la catégorie active
    let destinationScreen = '';
    switch (activeCategory) {
      case 'hotels':
        destinationScreen = 'HotelsDetails';
        break;
      case 'villas':
        destinationScreen = 'VillaDetails';
        break;
      case 'appartements':
        destinationScreen = 'AppartementDetails';
        break;
      case 'chambres':
        destinationScreen = 'ChambreDetails';
        break;
      default:
        destinationScreen = 'HotelDetails';
    }
    
    console.log(`Navigating to ${destinationScreen} for ${item.name}`);
    
    // Naviguer vers l'écran de détails approprié avec les données de l'item
    navigation.navigate(destinationScreen, { 
      item,
      categoryType: activeCategory, // Envoyer également le type de catégorie
      isFavorite: favorites[activeCategory].includes(item.id) // Passer l'état du favori
    });
  };

  // Rendu des étoiles selon la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#FFD700' : COLORS.gray, fontSize: 12 }}>★</Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  // Rendu d'un élément individuel dans la liste
  const renderItem = ({ item, index }) => {
    const isFavorite = favorites[activeCategory].includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.itemContainer, 
          index % 2 === 0 ? { marginRight: 6} : { marginLeft: 6}
        ]}
        onPress={() => navigateToDetails(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemOverlay}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.pink} />
            <Text style={styles.itemAddress}>{item.address}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price.toLocaleString()}Fcfa<Text style={styles.pricePerNight}>/nuit</Text></Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? COLORS.pink : "white"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Fonction pour rendre les catégories
  const renderCategories = () => {
    const categories = [
      { id: 'hotels', name: 'Hotels', icon: 'business' },
      { id: 'villas', name: 'Villas', icon: 'home' },
      { id: 'appartements', name: 'Appartements', icon: 'apartment' },
      { id: 'chambres', name: 'Chambres', icon: 'hotel' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={24} 
              color={activeCategory === category.id ? COLORS.green_accueil : COLORS.black} 
            />
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Modal de filtrage
  const renderFilterModal = () => {
    // Calculer le prix maximum pour les options de filtre
    const maxPrice = getMaxPriceForCategory(activeCategory);
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer les résultats</Text>
            
            <Text style={styles.filterLabel}>Fourchette de prix :</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.max === 25000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 25000 })}
              >
                <Text style={styles.priceButtonText}>0-25000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 25000 && priceRange.max === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 25000, max: 50000 })}
              >
                <Text style={styles.priceButtonText}>25 000-50 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 50000, max: 100000 })}
              >
                <Text style={styles.priceButtonText}>50 000-100 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 0 && priceRange.max === maxPrice && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: maxPrice })}
              >
                <Text style={styles.priceButtonText}>Tous</Text>
              </TouchableOpacity>
            </View>
            
            {activeCategory === 'hotels' && (
              <>
                <Text style={styles.filterLabel}>Nombre d'étoiles :</Text>
                <View style={styles.starsFilterContainer}>
                  {[0, 3, 4, 5].map((stars) => (
                    <TouchableOpacity 
                      key={stars}
                      style={[styles.starButton, ratingFilter === stars && styles.activeStarButton]}
                      onPress={() => setRatingFilter(stars)}
                    >
                      <Text style={styles.starButtonText}>
                        {stars === 0 ? 'Tous' : `${stars}★ +`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => {
                  applyFilters();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      
      {/* Header avec fond teinté }
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image 
              source={logo} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner qui change selon la catégorie }
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{categoryTexts[activeCategory].title}</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>{categoryTexts[activeCategory].buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={bannerImages[activeCategory]} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories }
      {renderCategories()}

      {/* Item List avec filtrage }
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Aucun résultat ne correspond à vos critères</Text>
          </View>
        }
      />
      
      {/* Modal de filtrage }
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.gray,
    width: 70,
    height: 70,
    margin: 2,
  },
  activeCategoryButton: {
    borderColor: COLORS.green_favoris,
    borderWidth: 3,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    height: 235,
    maxWidth: '50%',
    marginHorizontal: 8
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemAddress: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pricePerNight: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activePriceButton: {
    backgroundColor: COLORS.green_accueil,
  },
  priceButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  starsFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  starButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activeStarButton: {
    backgroundColor: COLORS.green_accueil,
  },
  starButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: COLORS.green_accueil,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});

export default HebergementScreen;*/

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Modal
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../components/constants/Theme';

// Images
const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
const logo = require("../../assets/icon.png");

// Images pour chaque catégorie
const bannerImages = {
  hotels: require("../../assets/hotel.jpg"),
  villas: require("../../assets/images/hotels/dakar/mirammar.jpg"),
  appartements: require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg"),
  chambres: require("../../assets/images/hotels/dakar/cafe_de_rome.jpg"),
};

// Données avec prix ajoutés
const DUMMY_DATA = {
  hotels: [
    { id: 'hotel-1', name: "Novotel", address: 'Av. Abdoulaye Fadiga', rating: 5, image: Novotel, price: 120000 },
    { id: 'hotel-2', name: 'Archotel', address: '64 Rue Felix faure', rating: 5, image: Archotel, price: 150000 },
    { id: 'hotel-3', name: 'Azalai', address: '12 Rue des Palmiers', rating: 4, image: Azalai, price: 95000 },
    { id: 'hotel-4', name: 'Hotellesokhamon', address: '35 Avenue Principale', rating: 4, image: Hotellesokhamon, price: 80000 },
    { id: 'hotel-5', name: 'Terroubi', address: 'Route de la Corniche', rating: 5, image: Terroubi, price: 200000 },
    { id: 'hotel-6', name: 'Radisson Blu', address: 'Place de l\'Indépendance', rating: 5, image: radisson_blue_blue, price: 45000 },
  ],
  villas: [
    { id: 'villa-1', name: 'Villa Blanche', address: 'Route de la Corniche', rating: 5, image: Kingfahdpalace, price: 125000 },
    { id: 'villa-2', name: 'Villa Palmier', address: '23 Chemin des Cocotiers', rating: 4, image: hotel_nina, price: 100000 },
    { id: 'villa-3', name: 'Villa Océan', address: 'Quartier des Almadies', rating: 5, image: radisson_blue_blue, price: 400000 },
    { id: 'villa-4', name: 'Villa Royale', address: '48 Rue du Cap', rating: 5, image: cafe_de_rome, price: 700000 },
  ],
  appartements: [
    { id: 'appart-1', name: 'Appart Maritime', address: 'Résidence Les Flamboyants', rating: 4, image: FleurdeLyshotel, price: 85000 },
    { id: 'appart-2', name: 'Appart Dakar Centre', address: '55 Avenue de la République', rating: 3, image: cafe_de_rome, price: 70000 },
    { id: 'appart-3', name: 'Le Petit Nid', address: 'Cité Keur Gorgui', rating: 4, image: Azalai, price: 90000 },
    { id: 'appart-4', name: 'Résidence Baobab', address: '12 Rue des Artisans', rating: 5, image: Novotel, price: 110000 },
  ],
  chambres: [
    { id: 'chambre-1', name: 'Chambre Élégance', address: 'Médina - 28 Rue Kaolack', rating: 4, image: cafe_de_rome, price: 45000 },
    { id: 'chambre-2', name: 'Chambre Cosy', address: 'Plateau - 43 Avenue Pompidou', rating: 3, image: FleurdeLyshotel, price: 15000 },
    { id: 'chambre-3', name: 'Chambre Vue Mer', address: 'Corniche - Résidence Marina', rating: 5, image: radisson_blue_blue, price: 20000 },
    { id: 'chambre-4', name: 'Chambre Familiale', address: 'Point E - 67 Rue des Écoles', rating: 4, image: Hotellesokhamon, price: 25000 },
  ],
};

const HebergementScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  // Favoris organisés par catégorie
  const [favorites, setFavorites] = useState({
    hotels: [],
    villas: [],
    appartements: [],
    chambres: []
  });
  const [modalVisible, setModalVisible] = useState(false);
  // Prix maximum pour réglage "Tous" basé sur la catégorie actuelle
  const getMaxPriceForCategory = (category) => {
    if (!DUMMY_DATA[category] || DUMMY_DATA[category].length === 0) return 500000;
    return Math.max(...DUMMY_DATA[category].map(item => item.price)) + 50000; // Ajouter une marge
  };
  
  // Initialiser les filtres sur "Tous"
  const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPriceForCategory('hotels') });
  const [ratingFilter, setRatingFilter] = useState(0); // 0 = Tous
  const [filteredData, setFilteredData] = useState(DUMMY_DATA.hotels);

  // Textes personnalisés pour chaque catégorie
  const categoryTexts = {
    hotels: {
      title: "Réservez votre meilleur hôtel avec nous !",
      buttonText: "Choisir mon hôtel"
    },
    villas: {
      title: "Des villas de luxe pour votre séjour à Dakar",
      buttonText: "Choisir ma villa"
    },
    appartements: {
      title: "Appartements confortables et bien situés",
      buttonText: "Choisir mon appartement"
    },
    chambres: {
      title: "Chambres privées à prix abordables",
      buttonText: "Choisir ma chambre"
    }
  };

  // Mise à jour des filtres et des données quand la catégorie change
  useEffect(() => {
    // Réinitialiser les filtres à "Tous" lors du changement de catégorie
    const maxPrice = getMaxPriceForCategory(activeCategory);
    setPriceRange({ min: 0, max: maxPrice });
    setRatingFilter(0);
    
    // Appliquer les filtres sur la nouvelle catégorie
    applyFilters({ min: 0, max: maxPrice }, 0);
  }, [activeCategory]);

  // Fonction pour appliquer les filtres
  const applyFilters = (priceRangeToApply = priceRange, ratingToApply = ratingFilter) => {
    let data = [...DUMMY_DATA[activeCategory]];
    
    // Filtre par prix
    data = data.filter(item => 
      item.price >= priceRangeToApply.min && 
      item.price <= priceRangeToApply.max
    );
    
    // Filtre par étoiles (si applicable)
    if (ratingToApply > 0) {
      data = data.filter(item => item.rating >= ratingToApply);
    }
    
    setFilteredData(data);
  };

  // Gestion des favoris spécifiques à chaque catégorie
  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => {
      const categoryFavorites = [...prevFavorites[activeCategory]];
      
      if (categoryFavorites.includes(id)) {
        // Retirer des favoris
        const newCategoryFavorites = categoryFavorites.filter(favId => favId !== id);
        return {
          ...prevFavorites,
          [activeCategory]: newCategoryFavorites
        };
      } else {
        // Ajouter aux favoris
        return {
          ...prevFavorites,
          [activeCategory]: [...categoryFavorites, id]
        };
      }
    });
  };

  // Navigation vers la page de détails selon la catégorie
  const navigateToDetails = (item) => {
    // Définir l'écran de destination en fonction de la catégorie active
    let destinationScreen = '';
    switch (activeCategory) {
      case 'hotels':
        destinationScreen = 'HotelsDetails';
        break;
      case 'villas':
        destinationScreen = 'VillaDetails';
        break;
      case 'appartements':
        destinationScreen = 'ApartmentDetails';
        break;
      case 'chambres':
        destinationScreen = 'RoomBookingPrivate';
        break;
      default:
        destinationScreen = 'HotelDetails';
    }
    
    console.log(`Navigating to ${destinationScreen} for ${item.name}`);
    
    // Naviguer vers l'écran de détails approprié avec les données de l'item
    navigation.navigate(destinationScreen, { 
      item,
      categoryType: activeCategory, // Envoyer également le type de catégorie
      isFavorite: favorites[activeCategory].includes(item.id) // Passer l'état du favori
    });
  };

  // Rendu des étoiles selon la note
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#FFD700' : COLORS.gray, fontSize: 12 }}>★</Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  // Rendu d'un élément individuel dans la liste
  const renderItem = ({ item, index }) => {
    const isFavorite = favorites[activeCategory].includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.itemContainer, 
          index % 2 === 0 ? { marginRight: 6} : { marginLeft: 6}
        ]}
        onPress={() => navigateToDetails(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemOverlay}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={16} color={COLORS.pink} />
            <Text style={styles.itemAddress}>{item.address}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price.toLocaleString()}Fcfa<Text style={styles.pricePerNight}>/nuit</Text></Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? COLORS.pink : "white"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Fonction pour rendre les catégories
  const renderCategories = () => {
    const categories = [
      { id: 'hotels', name: 'Hotels', icon: 'business' },
      { id: 'villas', name: 'Villas', icon: 'home' },
      { id: 'appartements', name: 'Appartements', icon: 'apartment' },
      { id: 'chambres', name: 'Chambres', icon: 'hotel' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category.id)}
            activeOpacity={0.9} // Ajouter cette propriété pour réduire l'effet de flou
          >
            <MaterialIcons 
              name={category.icon} 
              size={24} 
              color={activeCategory === category.id ? COLORS.green_accueil : COLORS.black} 
            />
            <Text 
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Modal de filtrage
  const renderFilterModal = () => {
    // Calculer le prix maximum pour les options de filtre
    const maxPrice = getMaxPriceForCategory(activeCategory);
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer les résultats</Text>
            
            <Text style={styles.filterLabel}>Fourchette de prix :</Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.max === 25000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: 25000 })}
              >
                <Text style={styles.priceButtonText}>0-25000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 25000 && priceRange.max === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 25000, max: 50000 })}
              >
                <Text style={styles.priceButtonText}>25 000-50 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 50000 && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 50000, max: 100000 })}
              >
                <Text style={styles.priceButtonText}>50 000-100 000 Fcfa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.priceButton, priceRange.min === 0 && priceRange.max === maxPrice && styles.activePriceButton]}
                onPress={() => setPriceRange({ min: 0, max: maxPrice })}
              >
                <Text style={styles.priceButtonText}>Tous</Text>
              </TouchableOpacity>
            </View>
            
            {activeCategory === 'hotels' && (
              <>
                <Text style={styles.filterLabel}>Nombre d'étoiles :</Text>
                <View style={styles.starsFilterContainer}>
                  {[0, 3, 4, 5].map((stars) => (
                    <TouchableOpacity 
                      key={stars}
                      style={[styles.starButton, ratingFilter === stars && styles.activeStarButton]}
                      onPress={() => setRatingFilter(stars)}
                    >
                      <Text style={styles.starButtonText}>
                        {stars === 0 ? 'Tous' : `${stars}★ +`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => {
                  applyFilters();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      
      {/* Header avec fond teinté */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image 
              source={logo} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner qui change selon la catégorie */}
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{categoryTexts[activeCategory].title}</Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>{categoryTexts[activeCategory].buttonText}</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={bannerImages[activeCategory]} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Categories */}
      {renderCategories()}

      {/* Item List avec filtrage */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Aucun résultat ne correspond à vos critères</Text>
          </View>
        }
      />
      
      {/* Modal de filtrage */}
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green_button_back,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: COLORS.green_accueil,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  reserveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.gray,
    width: 70,
    height: 70,
    margin: 2,
    elevation: 1, // Ajouté pour améliorer l'apparence sur Android
  },
  activeCategoryButton: {
    borderColor: COLORS.green_favoris,
    borderWidth: 3,
    backgroundColor: COLORS.gray, // Assurer la même couleur de fond
    elevation: 2, // Légère élévation pour l'état actif
  },
  categoryText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.green_accueil,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    height: 235,
    maxWidth: '50%',
    marginHorizontal: 8
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemAddress: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pricePerNight: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activePriceButton: {
    backgroundColor: COLORS.green_accueil,
  },
  priceButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  starsFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  starButton: {
    backgroundColor: COLORS.gray,
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  activeStarButton: {
    backgroundColor: COLORS.green_accueil,
  },
  starButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: COLORS.green_accueil,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});

export default HebergementScreen;