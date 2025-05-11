
/*import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import ReusableText from "../reusable/ReusableText";
import Reusable from "../reusable/Reusable.style.js";
import { TEXT, COLORS, SIZES } from "../../components/constants/Theme.js";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HotelsCard from "../Tiles/Hotels/hotelsCard.jsx";
import axios from "axios";

const BestHotels = () => {
  const navigation = useNavigation();
  
  // États pour stocker les données et l'état de chargement
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // URL de base du serveur backend
  const BASE_URL = 'http://192.168.1.6:5002';

  useEffect(() => {
    const fetchBestHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/besthotels/getBestHotels`);
        
        if (response.data.success && Array.isArray(response.data.hotels)) {
          const modifiedData = response.data.hotels.map(item => ({
            ...item,
            // Construire correctement l'URL de l'image
            placeImage: { uri: `${BASE_URL}${item.placeImage}` },
          }));
          setHotelsData(modifiedData);
        } else {
          console.error("Format de réponse inattendu:", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestHotels();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View>
      <View
        style={[Reusable.rowWithSpace("space-between"), { paddingBottom: 6 }]}
      >
        <ReusableText
          text={" Meilleurs Hôtels"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Hotelslist")}>
          <Feather name="list" size={18} />
        </TouchableOpacity>
      </View>
      
      {hotelsData.length > 0 ? (
        <FlatList
          data={hotelsData}
          horizontal
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({ item }) => (
            <HotelsCard 
              item={item} 
              margin={0} 
              onPress={() => navigation.navigate("HotelsDetails", item._id)} 
            />
          )}
        />
      ) : (
        <View style={{ alignItems: 'center', padding: 20 }}>
          <ReusableText
            text={"Aucun hôtel disponible pour le moment"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.gray}
          />
        </View>
      )}
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});*/


import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from "react-native";
import ReusableText from "../reusable/ReusableText";
import Reusable from "../reusable/Reusable.style.js";
import { TEXT, COLORS, SIZES } from "../../components/constants/Theme.js";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import HotelsCard from "../Tiles/Hotels/hotelsCard.jsx";
import { api } from "../../services/api"; // Importation du service API centralisé
import { API_CONFIG } from "../../config"; // Importation de la configuration API

const BestHotels = ({ onDataLoaded }) => {
  const navigation = useNavigation();
  
  // États pour stocker les données et l'état de chargement
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestHotels = async () => {
      try {
        // Utilisation du service API centralisé
        const response = await api.getBestHotels();
        
        if (response.data.success && Array.isArray(response.data.hotels)) {
          const modifiedData = response.data.hotels.map(item => ({
            ...item,
            // Construction de l'URL d'image en utilisant la configuration centralisée
            placeImage: { 
              uri: `${API_CONFIG.BASE_URL.split('/api')[0]}${item.placeImage}` 
            },
          }));
          setHotelsData(modifiedData);
          setError(null);
        } else {
          console.error("Format de réponse inattendu:", response.data);
          setError("Impossible de récupérer les données des hôtels");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors du chargement des hôtels");
      } finally {
        setLoading(false);
        // Notifier le parent que le chargement est terminé si la fonction est fournie
        if (onDataLoaded) onDataLoaded();
      }
    };

    fetchBestHotels();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6D9F3D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={[Reusable.rowWithSpace("space-between"), { paddingBottom: 6 }]}
      >
        <ReusableText
          text={" Meilleurs Hôtels"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Hotelslist")}>
          <Feather name="list" size={18} />
        </TouchableOpacity>
      </View>
      
      {hotelsData.length > 0 ? (
        <FlatList
          data={hotelsData}
          horizontal
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({ item }) => (
            <HotelsCard 
              item={item} 
              margin={0} 
              onPress={() => navigation.navigate("HotelsDetails", item._id)} 
            />
          )}
        />
      ) : (
        <View style={{ alignItems: 'center', padding: 20 }}>
          <ReusableText
            text={"Aucun hôtel disponible pour le moment"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.gray}
          />
        </View>
      )}
    </View>
  );
};

export default BestHotels;
