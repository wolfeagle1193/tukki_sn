

/*import { TouchableOpacity, View, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style.js";
import ReusableText from "../../components/reusable/ReusableText.jsx";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT, SIZES } from "../../components/constants/Theme.js";
import styles from "./home.style.js";
import HeightSpacer from "../../components/reusable/HeightSpacer.jsx";
import Mainplaces_store from "../../components/Home/Mainplaces_store.jsx";
import PlacesbyregionStore from "../../components/Home/PlacesbyregionStore.jsx";
import ActualitesStore from "../../components/Home/ActualitesStore.jsx";
import BestHotels from "../../components/Home/BestHotels.jsx";
import Eventsdata from "../../components/Home/Eventsdata.jsx";
import { AuthContext } from "../../context"; // Importation du contexte d'authentification

const HomeScreen = ({ navigation }) => {
  // Utilisation du contexte d'authentification pour accéder aux informations utilisateur
  const { userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={Reusable.container}>
      <View style={{ paddingTop: 8 }}>
        <View style={Reusable.rowWithSpace("space-between")}>
          {/* Image de profil récupérée depuis le contexte d'authentification 
          <TouchableOpacity 
            onPress={() => navigation.navigate("Profile")} 
            style={styles.profileImageContainer}
          >
            <Image 
              source={{ 
                uri:  userInfo?.profile || "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png" 
              }}
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Searchecran")}
            style={[styles.box, { backgroundColor: "#6D9F3D" }]}
          >
            <AntDesign
              name="search1"
              size={TEXT.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Merveilles du Sénégal"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <Mainplaces_store />

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Destinations par Région"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlacesbyregionStore />
        <HeightSpacer height={SIZES.small} />
        <Eventsdata />
        <HeightSpacer height={SIZES.small} />
        <BestHotels />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;*/



/*import { TouchableOpacity, View, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style.js";
import ReusableText from "../../components/reusable/ReusableText.jsx";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT, SIZES } from "../../components/constants/Theme.js";
import styles from "./home.style.js";
import HeightSpacer from "../../components/reusable/HeightSpacer.jsx";
import Mainplaces_store from "../../components/Home/Mainplaces_store.jsx";
import PlacesbyregionStore from "../../components/Home/PlacesbyregionStore.jsx";
import ActualitesStore from "../../components/Home/ActualitesStore.jsx";
import BestHotels from "../../components/Home/BestHotels.jsx";
import Eventsdata from "../../components/Home/Eventsdata.jsx";
import { AuthContext } from "../../context";

// Image par défaut locale
const defaultProfileImage = require("../../assets/images/users/user2.jpg");

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);

  // Fonction pour déterminer la source de l'image
  const getProfileImageSource = () => {
    // Si pas d'userInfo ou profil null/undefined ou chemin relatif, utiliser l'image locale
    if (!userInfo?.profile || 
        userInfo.profile === null || 
        userInfo.profile.includes('../../') || 
        userInfo.profile.includes('assets/')) {
      return defaultProfileImage;
    }
    
    // Sinon, utiliser l'URL de l'image de profil
    return { uri: userInfo.profile };
  };

  return (
    <SafeAreaView style={Reusable.container}>
      <View style={{ paddingTop: 8 }}>
        <View style={Reusable.rowWithSpace("space-between")}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Profil")} 
            style={styles.profileImageContainer}
          >
            <Image 
              source={getProfileImageSource()}
              style={styles.profileImage}
              defaultSource={defaultProfileImage} // Fallback si l'image ne charge pas
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Searchecran")}
            style={[styles.box, { backgroundColor: "#6D9F3D" }]}
          >
            <AntDesign
              name="search1"
              size={TEXT.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Merveilles du Sénégal"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <Mainplaces_store />

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Destinations par Région"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlacesbyregionStore />
        <HeightSpacer height={SIZES.small} />
        <Eventsdata />
        <HeightSpacer height={SIZES.small} />
        <BestHotels />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;*/


/*import { TouchableOpacity, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style.js";
import ReusableText from "../../components/reusable/ReusableText.jsx";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT, SIZES } from "../../components/constants/Theme.js";
import styles from "./home.style.js";
import HeightSpacer from "../../components/reusable/HeightSpacer.jsx";
import Mainplaces_store from "../../components/Home/Mainplaces_store.jsx";
import PlacesbyregionStore from "../../components/Home/PlacesbyregionStore.jsx";
import ActualitesStore from "../../components/Home/ActualitesStore.jsx";
import BestHotels from "../../components/Home/BestHotels.jsx";
import Eventsdata from "../../components/Home/Eventsdata.jsx";
import { AuthContext } from "../../context";

// Image par défaut locale - importation simple et directe
const defaultProfileImage = require("../../assets/images/users/profile.png");

const HomeScreen = ({ navigation }) => {
  // Récupération du contexte d'authentification
  const { userInfo } = useContext(AuthContext);
  
  // Log pour débogage - affiche l'état de userInfo au chargement du composant
  useEffect(() => {
    console.log("HomeScreen - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction simplifiée et robuste pour déterminer la source de l'image
  const getProfileImageSource = () => {
    // Vérification complète et sécurisée
    const hasValidProfileImage = 
      userInfo && 
      userInfo.profile && 
      typeof userInfo.profile === 'string' && 
      userInfo.profile.trim() !== '' &&
      !userInfo.profile.includes('../../') &&
      !userInfo.profile.includes('assets/');
    
    // Retourner l'URI si valide, sinon l'image par défaut
    if (hasValidProfileImage) {
      return { uri: userInfo.profile };
    }
    
    return defaultProfileImage;
  };

  // Avatar de l'utilisateur avec initiale (solution de secours si l'image échoue)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <View style={styles.initialContainer}>
        <ReusableText
          text={initial}
          family="bold"
          size={TEXT.small}
          color={COLORS.white}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={Reusable.container}>
      <View style={{ paddingTop: 8 }}>
        <View style={Reusable.rowWithSpace("space-between")}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Profil")}
            style={styles.profileImageContainer}
          >
            {/* Image de profil avec fallback visuel 
            <View style={styles.fallbackContainer}>
              {renderUserInitial()}
            </View>
            
            <Image
              source={getProfileImageSource()}
              style={[styles.profileImage, { position: 'absolute' }]}
              defaultSource={defaultProfileImage}
              onError={(e) => {
                console.log("Erreur de chargement d'image:", e.nativeEvent.error);
              }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Searchecran")}
            style={[styles.box, { backgroundColor: "#6D9F3D" }]}
          >
            <AntDesign
              name="search1"
              size={TEXT.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Merveilles du Sénégal"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <Mainplaces_store />

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Destinations par Région"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlacesbyregionStore />
        <HeightSpacer height={SIZES.small} />
        <Eventsdata />
        <HeightSpacer height={SIZES.small} />
        <BestHotels />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;*/


import { TouchableOpacity, View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Reusable from "../../components/reusable/Reusable.style.js";
import ReusableText from "../../components/reusable/ReusableText.jsx";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, TEXT, SIZES } from "../../components/constants/Theme.js";
import styles from "./home.style.js";
import HeightSpacer from "../../components/reusable/HeightSpacer.jsx";
import Mainplaces_store from "../../components/Home/Mainplaces_store.jsx";
import PlacesbyregionStore from "../../components/Home/PlacesbyregionStore.jsx";
import ActualitesStore from "../../components/Home/ActualitesStore.jsx";
import BestHotels from "../../components/Home/BestHotels.jsx";
import Eventsdata from "../../components/Home/Eventsdata.jsx";
import { AuthContext } from "../../context";

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  
  // Log pour débogage
  useEffect(() => {
    console.log("HomeScreen - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction pour vérifier si une URL d'image est valide
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    // Vérifier si c'est une URL Google Images (non valide)
    if (url.includes('google.com/imgres')) return false;
    
    // Vérifier si c'est une URL d'image directe
    const validPatterns = [
      /\.(jpeg|jpg|png|gif|bmp)(\?.*)?$/i,  // Se termine par une extension d'image
      /cloudinary\.com/i,                    // URL Cloudinary
      /firebasestorage\.googleapis\.com/i    // URL Firebase Storage
    ];
    
    return validPatterns.some(pattern => pattern.test(url));
  };

  // Obtenir l'initiale de l'utilisateur pour l'avatar
  const getUserInitial = () => {
    if (userInfo?.username) {
      return userInfo.username.charAt(0).toUpperCase();
    }
    return "T"; // T pour Tukki par défaut
  };

  return (
    <SafeAreaView style={Reusable.container}>
      <View style={{ paddingTop: 8 }}>
        <View style={Reusable.rowWithSpace("space-between")}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profil")}
            style={styles.profileImageContainer}
          >
            {/* Avatar basé sur l'initiale - affiché dans tous les cas */}
            <View style={styles.initialCircle}>
              <Text style={styles.initialText}>
                {getUserInitial()}
              </Text>
            </View>
            
            {/* Si l'utilisateur a une image de profil valide, on la superpose */}
            {userInfo?.profile && isValidImageUrl(userInfo.profile) && (
              <Image
                source={{ uri: userInfo.profile }}
                style={[styles.profileImage, { position: 'absolute', top: 0, left: 0 }]}
                onError={(e) => console.log("Erreur de chargement d'image:", e.nativeEvent.error)}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Searchecran")}
            style={[styles.box, { backgroundColor: "#6D9F3D" }]}
          >
            <AntDesign
              name="search1"
              size={TEXT.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Merveilles du Sénégal"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <Mainplaces_store />

        <HeightSpacer height={SIZES.small} />
        <ReusableText
          text={"Destinations par Région"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <PlacesbyregionStore />
        <HeightSpacer height={SIZES.small} />
        <Eventsdata />
        <HeightSpacer height={SIZES.small} />
        <BestHotels />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
