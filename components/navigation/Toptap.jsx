
/*import { View, Image } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context"; // Importation du contexte d'authentification

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout } = useContext(AuthContext);
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth"); // Rediriger vers l'écran d'authentification
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout} // Utilisation de la fonction de déconnexion du contexte
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil, utilise celle du contexte ou l'image par défaut 
            {userInfo?.profile ? (
              <Image
                source={{ uri: userInfo.profile }}
                style={stylesTopTab.image}
                onError={() => console.log("Erreur de chargement de l'image")}
              />
            ) : (
              <Image
                source={defaultUser}
                style={stylesTopTab.image}
                onError={() => console.log("Erreur de chargement de l'image")}
              />
            )}
            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={userInfo?.username || "Utilisateur"} // Utilisation du nom d'utilisateur du contexte
                  family={"medium"}
                  size={SIZES.large}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={userInfo?.email || "email@example.com"} // Utilisation de l'email du contexte
                  family={"medium"}
                  size={SIZES.large}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false, // très important pour que le trait d'activité se fasse bien
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/


/*import { View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Assurez-vous que expo/vector-icons est installé

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        // Si vous avez une fonction pour mettre à jour l'image de profil dans votre contexte
        if (updateUserProfile) {
          await updateUserProfile({ profile: result.assets[0].uri });
        } else {
          // Afficher un message si la fonction de mise à jour n'existe pas
          Alert.alert("Information", "La mise à jour de l'image de profil n'est pas disponible pour le moment");
        }
      }
    } catch (error) {
      console.log("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    }
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
              <View style={stylesTopTab.imageContainer}>
                {userInfo?.profile ? (
                  <Image
                    source={{ uri: userInfo.profile }}
                    style={stylesTopTab.image}
                    onError={() => console.log("Erreur de chargement de l'image")}
                  />
                ) : (
                  <Image
                    source={defaultUser}
                    style={stylesTopTab.image}
                    onError={() => console.log("Erreur de chargement de l'image")}
                  />
                )}
                
                {/* Overlay semi-transparent quand on appuie sur l'image 
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Icône d'appareil photo plus visible 
                <View style={stylesTopTab.uploadIconContainer}>
                  <Ionicons name="camera" size={16} color={COLORS.white} />
                </View>
                
                {/* Texte indicatif sous l'image 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text="Modifier"
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium} // Taille réduite
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small} // Taille réduite
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/

/*import { View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        // Ici, vous devez gérer l'upload de l'image vers votre serveur
        // puis mettre à jour le profil de l'utilisateur avec l'URL retournée par le serveur
        
        // Exemple d'envoi de l'image au serveur (à implémenter selon votre API)
        try {
          const uri = result.assets[0].uri;
          const formData = new FormData();
          
          // Créer un nom de fichier unique basé sur l'utilisateur et la date
          const fileName = `profile_${userInfo._id}_${Date.now()}.jpg`;
          
          formData.append('profileImage', {
            uri,
            name: fileName,
            type: 'image/jpeg',
          });
          
          // Supposons que votre API d'upload soit à cette URL
          // Remplacez par votre URL réelle
          const uploadResponse = await fetch('https://votre-api.com/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${userInfo.token}`, // Si vous avez un token d'auth
            },
            body: formData,
          });
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult.success) {
            // Mettre à jour les informations utilisateur avec l'URL retournée
            await updateUserProfile({ profile: uploadResult.imageUrl });
            Alert.alert("Succès", "Votre photo de profil a été mise à jour");
          } else {
            throw new Error("Échec de l'upload");
          }
        } catch (error) {
          console.error("Erreur lors de l'upload de l'image:", error);
          Alert.alert("Erreur", "Impossible de mettre à jour votre photo de profil");
          
          // Pour tester localement, vous pouvez utiliser l'URI local (ne pas faire en production)
          // Ceci est juste pour le développement
          if (__DEV__) {
            await updateUserProfile({ profile: result.assets[0].uri });
          }
        }
      }
    } catch (error) {
      console.log("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    }
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fonction pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    if (!userInfo?.profile || 
        userInfo.profile === null || 
        userInfo.profile.includes('../../') || 
        userInfo.profile.includes('assets/')) {
      return defaultUser;
    }
    
    return { uri: userInfo.profile };
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
              <View style={stylesTopTab.imageContainer}>
                <Image
                  source={getProfileImageSource()}
                  style={stylesTopTab.image}
                  defaultSource={defaultUser}
                />
                
                {/* Overlay semi-transparent 
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Icône d'appareil photo 
                <View style={stylesTopTab.uploadIconContainer}>
                  <Ionicons name="camera" size={16} color={COLORS.white} />
                </View>
                
                {/* Texte indicatif 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text="Modifier"
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/



/*import { View, Image, TouchableOpacity, Alert, ActivityIndicator ,Text } from "react-native";
import React, { useContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/profile.png");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  // État pour suivre le chargement de l'image
  const [isUploading, setIsUploading] = useState(false);
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fonction robuste pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    // Vérification détaillée de la validité de l'image de profil
    const hasValidProfileImage = 
      userInfo && 
      userInfo.profile && 
      typeof userInfo.profile === 'string' && 
      userInfo.profile.trim() !== '' &&
      !userInfo.profile.includes('../../') &&
      !userInfo.profile.includes('assets/');
    
    if (hasValidProfileImage) {
      return { uri: userInfo.profile };
    }
    
    return defaultUser;
  };

  // Fonction pour afficher l'initiale de l'utilisateur (fallback)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <Text style={stylesTopTab.initialText}>
        {initial}
      </Text>
    );
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    if (isUploading) {
      Alert.alert("Chargement en cours", "Veuillez patienter pendant le téléchargement de l'image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        setIsUploading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        try {
          // Appel à la fonction updateUserProfile du contexte
          const updateResult = await updateUserProfile({ profile: result.assets[0].uri });
          
          if (updateResult.success) {
            Alert.alert("Succès", updateResult.message || "Votre photo de profil a été mise à jour");
          } else {
            Alert.alert("Erreur", updateResult.message || "Échec de la mise à jour de la photo de profil");
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour du profil:", error);
          Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour de la photo de profil");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity 
              onPress={pickImage} 
              activeOpacity={0.7}
              disabled={isUploading}
            >
              <View style={stylesTopTab.imageContainer}>
                {/* Fallback avec initiale 
                <View style={stylesTopTab.fallbackContainer}>
                  {renderUserInitial()}
                </View>
                
                {/* Image de profil 
                <Image
                  source={getProfileImageSource()}
                  style={stylesTopTab.image}
                  defaultSource={defaultUser}
                  onError={(e) => console.log("Erreur de chargement de l'image:", e.nativeEvent.error)}
                />
                
                {/* Overlay semi-transparent 
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Indicateur de chargement ou icône d'appareil photo 
                <View style={stylesTopTab.uploadIconContainer}>
                  {isUploading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  )}
                </View>
                
                {/* Texte indicatif 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text={isUploading ? "Chargement..." : "Modifier"}
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/


/*import { View, Image, TouchableOpacity, Alert, Text, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // État pour suivre le chargement de l'image
  const [isUploading, setIsUploading] = useState(false);
  
  // Log pour débogage
  useEffect(() => {
    console.log("Toptap - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fonction pour vérifier si une URL d'image est valide
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    // Vérifier si c'est une URL Google Images (non valide)
    if (url.includes('google.com/imgres')) return false;
    
    // Vérifier si c'est une URL d'image directe
    // (se termine par une extension d'image ou provient d'un service connu)
    const validPatterns = [
      /\.(jpeg|jpg|png|gif|bmp)(\?.*)?$/i,  // Se termine par une extension d'image
      /cloudinary\.com/i,                    // URL Cloudinary
      /firebasestorage\.googleapis\.com/i    // URL Firebase Storage
    ];
    
    return validPatterns.some(pattern => pattern.test(url));
  };

  // Fonction pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    // Vérifier si l'utilisateur a une URL d'image valide
    if (userInfo?.profile && isValidImageUrl(userInfo.profile)) {
      return { uri: userInfo.profile };
    }
    
    // Sinon, utiliser l'image par défaut
    return defaultUser;
  };

  // Fonction pour afficher l'initiale de l'utilisateur (fallback)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <Text style={stylesTopTab.initialText}>
        {initial}
      </Text>
    );
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    if (isUploading) {
      Alert.alert("Chargement en cours", "Veuillez patienter pendant le téléchargement de l'image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Log l'état de userInfo avant de commencer
      console.log("pickImage - userInfo:", userInfo);
      
      // Demander la permission d'accéder à la galerie (nouvelle API)
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        setIsUploading(false);
        return;
      }

      // Lancer le sélecteur d'images (nouvelle API)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.IMAGE],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        console.log("Image sélectionnée:", imageUri);
        
        try {
          // Log avant d'appeler updateUserProfile
          console.log("Tentative de mise à jour du profil avec image:", imageUri);
          
          // Vérifier si userInfo est disponible
          if (!userInfo) {
            Alert.alert("Erreur", "Vous devez être connecté pour mettre à jour votre profil.");
            setIsUploading(false);
            return;
          }
          
          // Si en mode développement et problèmes avec l'API
          if (__DEV__ && !updateUserProfile) {
            console.log("Mode DEV: Mise à jour locale du profil");
            const updatedUser = { ...userInfo, profile: imageUri };
            // Mettre à jour localement (cette fonction devrait être disponible dans votre AuthContext)
            await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
            Alert.alert("Succès (DEV)", "Photo de profil mise à jour localement");
            setIsUploading(false);
            return;
          }
          
          // Appel normal à updateUserProfile
          const updateResult = await updateUserProfile({ profile: imageUri });
          
          console.log("Résultat de updateUserProfile:", updateResult);
          
          if (updateResult.success) {
            Alert.alert("Succès", updateResult.message || "Votre photo de profil a été mise à jour");
          } else {
            Alert.alert("Erreur", updateResult.message || "Échec de la mise à jour du profil");
          }
        } catch (error) {
          console.error("Erreur détaillée lors de la mise à jour:", error);
          Alert.alert("Erreur", error.message || "Échec de la mise à jour du profil");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity 
              onPress={pickImage} 
              activeOpacity={0.7}
              disabled={isUploading}
            >
              <View style={stylesTopTab.imageContainer}>
                {/* Fallback avec initiale 
                <View style={stylesTopTab.fallbackContainer}>
                  {renderUserInitial()}
                </View>
                
                {/* Image de profil (conditionnelle) 
                {userInfo?.profile && isValidImageUrl(userInfo.profile) && (
                  <Image
                    source={{ uri: userInfo.profile }}
                    style={[stylesTopTab.image, { position: 'absolute' }]}
                    onError={(e) => console.log("Erreur de chargement d'image:", e.nativeEvent.error)}
                  />
                )}
                
                {/* Overlay semi-transparent 
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Indicateur de chargement ou icône d'appareil photo 
                <View style={stylesTopTab.uploadIconContainer}>
                  {isUploading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  )}
                </View>
                
                {/* Texte indicatif 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text={isUploading ? "Chargement..." : "Modifier"}
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/



/*import { View, Image, TouchableOpacity, Alert, Text, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // État pour suivre le chargement de l'image
  const [isUploading, setIsUploading] = useState(false);
  
  // Log pour débogage
  useEffect(() => {
    console.log("Toptap - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fonction pour vérifier si une URL d'image est valide
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    // Vérifier si c'est une URL Google Images (non valide)
    if (url.includes('google.com/imgres')) return false;
    
    // Vérifier si c'est une URL d'image directe
    // (se termine par une extension d'image ou provient d'un service connu)
    const validPatterns = [
      /\.(jpeg|jpg|png|gif|bmp)(\?.*)?$/i,  // Se termine par une extension d'image
      /cloudinary\.com/i,                    // URL Cloudinary
      /firebasestorage\.googleapis\.com/i    // URL Firebase Storage
    ];
    
    return validPatterns.some(pattern => pattern.test(url));
  };

  // Fonction pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    // Vérifier si l'utilisateur a une URL d'image valide
    if (userInfo?.profile && isValidImageUrl(userInfo.profile)) {
      return { uri: userInfo.profile };
    }
    
    // Sinon, utiliser l'image par défaut
    return defaultUser;
  };

  // Fonction pour afficher l'initiale de l'utilisateur (fallback)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <Text style={stylesTopTab.initialText}>
        {initial}
      </Text>
    );
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    if (isUploading) {
      Alert.alert("Chargement en cours", "Veuillez patienter pendant le téléchargement de l'image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Log l'état de userInfo avant de commencer
      console.log("pickImage - userInfo:", userInfo);
      
      // Demander la permission d'accéder à la galerie (nouvelle API)
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        setIsUploading(false);
        return;
      }

      // Lancer le sélecteur d'images (nouvelle API)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.IMAGE],
        
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        console.log("Image sélectionnée:", imageUri);
        
        try {
          // Log avant d'appeler updateUserProfile
          console.log("Tentative de mise à jour du profil avec image:", imageUri);
          
          // Vérifier si userInfo est disponible
          if (!userInfo) {
            Alert.alert("Erreur", "Vous devez être connecté pour mettre à jour votre profil.");
            setIsUploading(false);
            return;
          }
          
          // Si en mode développement et problèmes avec l'API
          if (__DEV__ && !updateUserProfile) {
            console.log("Mode DEV: Mise à jour locale du profil");
            const updatedUser = { ...userInfo, profile: imageUri };
            // Mettre à jour localement (cette fonction devrait être disponible dans votre AuthContext)
            await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
            Alert.alert("Succès (DEV)", "Photo de profil mise à jour localement");
            setIsUploading(false);
            return;
          }
          
          // Appel normal à updateUserProfile
          const updateResult = await updateUserProfile({ profile: imageUri });
          
          console.log("Résultat de updateUserProfile:", updateResult);
          
          if (updateResult.success) {
            Alert.alert("Succès", updateResult.message || "Votre photo de profil a été mise à jour");
          } else {
            Alert.alert("Erreur", updateResult.message || "Échec de la mise à jour du profil");
          }
        } catch (error) {
          console.error("Erreur détaillée lors de la mise à jour:", error);
          Alert.alert("Erreur", error.message || "Échec de la mise à jour du profil");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity 
              onPress={pickImage} 
              activeOpacity={0.7}
              disabled={isUploading}
            >
              <View style={stylesTopTab.imageContainer}>
                {/* Fallback avec initiale 
                <View style={stylesTopTab.fallbackContainer}>
                  {renderUserInitial()}
                </View>
                
                {/* Image de profil (conditionnelle) 
                {userInfo?.profile && isValidImageUrl(userInfo.profile) && (
                  <Image
                    source={{ uri: userInfo.profile }}
                    style={[stylesTopTab.image, { position: 'absolute' }]}
                    onError={(e) => console.log("Erreur de chargement d'image:", e.nativeEvent.error)}
                  />
                )}
                
                {/* Overlay semi-transparent 
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Indicateur de chargement ou icône d'appareil photo 
                <View style={stylesTopTab.uploadIconContainer}>
                  {isUploading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  )}
                </View>
                
                {/* Texte indicatif 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text={isUploading ? "Chargement..." : "Modifier"}
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/


/*import { View, Image, TouchableOpacity, Alert, Text, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // État pour suivre le chargement de l'image
  const [isUploading, setIsUploading] = useState(false);
  
  // Log pour débogage
  useEffect(() => {
    console.log("Toptap - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

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

  // Fonction pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    // Vérifier si l'utilisateur a une URL d'image valide
    if (userInfo?.profile && isValidImageUrl(userInfo.profile)) {
      return { uri: userInfo.profile };
    }
    
    // Sinon, utiliser l'image par défaut
    return defaultUser;
  };

  // Fonction pour afficher l'initiale de l'utilisateur (fallback)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <Text style={stylesTopTab.initialText}>
        {initial}
      </Text>
    );
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    // Debug: afficher les propriétés disponibles de ImagePicker
    console.log("ImagePicker properties:", Object.keys(ImagePicker));
    console.log("MediaTypeOptions available?", !!ImagePicker.MediaTypeOptions);
    
    if (isUploading) {
      Alert.alert("Chargement en cours", "Veuillez patienter pendant le téléchargement de l'image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Demander la permission d'accéder à la galerie
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        setIsUploading(false);
        return;
      }

      // Utiliser la syntaxe correcte pour expo-image-picker 16.0.6
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      console.log("Résultat de ImagePicker:", result);

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        console.log("Image sélectionnée:", imageUri);
        
        try {
          // Vérifier si userInfo est disponible
          if (!userInfo) {
            Alert.alert("Erreur", "Vous devez être connecté pour mettre à jour votre profil");
            setIsUploading(false);
            return;
          }
          
          // Si en mode développement et problèmes avec l'API
          if (__DEV__ && !updateUserProfile) {
            console.log("Mode DEV: Mise à jour locale du profil");
            const updatedUser = { ...userInfo, profile: imageUri };
            await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
            Alert.alert("Succès (DEV)", "Photo de profil mise à jour localement");
            setIsUploading(false);
            return;
          }
          
          // Récupérer l'ID utilisateur (peut être id ou _id selon votre backend)
          const userId = userInfo.id || userInfo._id;
          
          if (!userId) {
            console.error("ID utilisateur manquant", userInfo);
            Alert.alert("Erreur", "Impossible d'identifier l'utilisateur");
            setIsUploading(false);
            return;
          }
          
          console.log(`Tentative de mise à jour du profil pour l'utilisateur: ${userId}`);
          console.log("Image URI:", imageUri);
          
          // Appel normal à updateUserProfile
          const updateResult = await updateUserProfile({ profile: imageUri });
          
          console.log("Résultat de updateUserProfile:", updateResult);
          
          if (updateResult && updateResult.success) {
            Alert.alert("Succès", updateResult.message || "Votre photo de profil a été mise à jour");
          } else {
            Alert.alert("Erreur", (updateResult && updateResult.message) || "Échec de la mise à jour du profil");
          }
        } catch (error) {
          console.error("Erreur détaillée lors de la mise à jour:", error);
          Alert.alert("Erreur", error.message || "Échec de la mise à jour du profil");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image 
            <TouchableOpacity 
              onPress={pickImage} 
              activeOpacity={0.7}
              disabled={isUploading}
            >
              <View style={stylesTopTab.imageContainer}>
                {/* Fallback avec initiale - toujours visible
                <View style={stylesTopTab.fallbackContainer}>
                  {renderUserInitial()}
                </View>
                
                {/* Image de profil (conditionnelle) 
                {userInfo?.profile && isValidImageUrl(userInfo.profile) && (
                  <Image
                    source={{ uri: userInfo.profile }}
                    style={[stylesTopTab.image, { position: 'absolute' }]}
                    onError={(e) => console.log("Erreur de chargement d'image:", e.nativeEvent.error)}
                  />
                )}
                
                {/* Overlay semi-transparent
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Indicateur de chargement ou icône d'appareil photo 
                <View style={stylesTopTab.uploadIconContainer}>
                  {isUploading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  )}
                </View>
                
                {/* Texte indicatif 
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text={isUploading ? "Chargement..." : "Modifier"}
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;*/


import { View, Image, TouchableOpacity, Alert, Text, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBooking, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES, TEXT } from "../constants/Theme";
import NetworkingImage from "../reusable/NetworkingImage";
import Appbar from "../reusable/Appbar";
import stylesTopTab from "./topTab.style";
import HeightSpacer from "../reusable/HeightSpacer";
import ReusableText from "../reusable/ReusableText";
import { AuthContext } from "../../context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images par défaut
const bgImage = require("../../assets/images/iconesdeco/profile.jpg");
const defaultUser = require("../../assets/images/users/user2.jpg");

const Tab = createMaterialTopTabNavigator();

const Toptap = ({ navigation }) => {
  // Utilisation du contexte d'authentification
  const { userInfo, logout, updateUserProfile } = useContext(AuthContext);
  
  // État pour suivre le chargement de l'image
  const [isUploading, setIsUploading] = useState(false);
  
  // Log pour débogage
  useEffect(() => {
    console.log("Toptap - userInfo:", userInfo);
  }, [userInfo]);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Auth");
  };

  // Fonction pour tronquer le texte s'il est trop long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

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

  // Fonction pour déterminer la source de l'image de profil
  const getProfileImageSource = () => {
    // Vérifier si l'utilisateur a une URL d'image valide
    if (userInfo?.profile && isValidImageUrl(userInfo.profile)) {
      return { uri: userInfo.profile };
    }
    
    // Sinon, utiliser l'image par défaut
    return defaultUser;
  };

  // Fonction pour afficher l'initiale de l'utilisateur (fallback)
  const renderUserInitial = () => {
    const initial = userInfo?.username 
      ? userInfo.username.charAt(0).toUpperCase() 
      : "T";
    
    return (
      <Text style={stylesTopTab.initialText}>
        {initial}
      </Text>
    );
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    // Debug: afficher les propriétés disponibles de ImagePicker
    console.log("ImagePicker properties:", Object.keys(ImagePicker));
    console.log("MediaTypeOptions available?", !!ImagePicker.MediaTypeOptions);
    
    if (isUploading) {
      Alert.alert("Chargement en cours", "Veuillez patienter pendant le téléchargement de l'image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Demander la permission d'accéder à la galerie
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à vos photos");
        setIsUploading(false);
        return;
      }

      // Utiliser la syntaxe correcte pour expo-image-picker 16.0.6
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      console.log("Résultat de ImagePicker:", result);

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        console.log("Image sélectionnée:", imageUri);
        
        try {
          // Vérifier si userInfo est disponible
          if (!userInfo) {
            Alert.alert("Erreur", "Vous devez être connecté pour mettre à jour votre profil");
            setIsUploading(false);
            return;
          }
          
          // Si en mode développement et problèmes avec l'API
          if (__DEV__ && !updateUserProfile) {
            console.log("Mode DEV: Mise à jour locale du profil");
            const updatedUser = { ...userInfo, profile: imageUri };
            await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
            Alert.alert("Succès (DEV)", "Photo de profil mise à jour localement");
            setIsUploading(false);
            return;
          }
          
          // Récupérer l'ID utilisateur (peut être id ou _id selon votre backend)
          const userId = userInfo.id || userInfo._id;
          
          if (!userId) {
            console.error("ID utilisateur manquant", userInfo);
            Alert.alert("Erreur", "Impossible d'identifier l'utilisateur");
            setIsUploading(false);
            return;
          }
          
          console.log(`Tentative de mise à jour du profil pour l'utilisateur: ${userId}`);
          console.log("Image URI:", imageUri);
          
          // Appel normal à updateUserProfile
          const updateResult = await updateUserProfile({ profile: imageUri });
          
          console.log("Résultat de updateUserProfile:", updateResult);
          
          if (updateResult && updateResult.success) {
            Alert.alert("Succès", updateResult.message || "Votre photo de profil a été mise à jour");
          } else {
            Alert.alert("Erreur", (updateResult && updateResult.message) || "Échec de la mise à jour du profil");
          }
        } catch (error) {
          console.error("Erreur détaillée lors de la mise à jour:", error);
          Alert.alert("Erreur", error.message || "Échec de la mise à jour du profil");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sélection de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          <NetworkingImage
            source={bgImage}
            width={"100%"}
            height={300}
            radius={0}
          />
          <Appbar
            top={40}
            left={20}
            right={20}
            color={COLORS.green_accueil}
            color1={COLORS.green_accueil}
            icon={"logout"}
            onPress={handleLogout}
          />
          <View style={stylesTopTab.profile}>
            {/* Image de profil avec possibilité de télécharger une nouvelle image */}
            <TouchableOpacity 
              onPress={pickImage} 
              activeOpacity={0.7}
              disabled={isUploading}
            >
              <View style={stylesTopTab.imageContainer}>
                {/* Fallback avec initiale - toujours visible */}
                <View style={stylesTopTab.fallbackContainer}>
                  {renderUserInitial()}
                </View>
                
                {/* Image de profil (conditionnelle) */}
                {userInfo?.profile && isValidImageUrl(userInfo.profile) && (
                  <Image
                    source={{ uri: userInfo.profile }}
                    style={[stylesTopTab.image, { position: 'absolute' }]}
                    onError={(e) => console.log("Erreur de chargement d'image:", e.nativeEvent.error)}
                  />
                )}
                
                {/* Overlay semi-transparent */}
                <View style={stylesTopTab.imageOverlay} />
                
                {/* Indicateur de chargement ou icône d'appareil photo */}
                <View style={stylesTopTab.uploadIconContainer}>
                  {isUploading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Ionicons name="camera" size={16} color={COLORS.white} />
                  )}
                </View>
                
                {/* Texte indicatif */}
                <View style={stylesTopTab.changePhotoTextContainer}>
                  <ReusableText
                    text={isUploading ? "Chargement..." : "Modifier"}
                    family="regular"
                    size={SIZES.xSmall}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <HeightSpacer height={5} />
            <View>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.username || "Utilisateur", 18)}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>

            <HeightSpacer height={5} />
            <View style={stylesTopTab.name}>
              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={truncateText(userInfo?.email || "email@example.com", 25)}
                  family={"medium"}
                  size={SIZES.small}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: COLORS.green_accueil,
            tabBarInactiveTintColor: COLORS.lightgray,
            animationEnabled: false,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.green_accueil,
            },
          }}
        >
          <Tab.Screen name="Réservation" component={TopBooking} />
          <Tab.Screen name="Activités" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Toptap;