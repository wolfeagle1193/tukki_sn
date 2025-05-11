
/*import React, { useEffect, useState } from "react";
import { View, VirtualizedList, ActivityIndicator } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../constants/Theme";
import PlacesbyRegion from "../Tiles/PlacesbyRegion";
import axios from "axios";

const PlacesbyregionStore = () => {
  const [RegionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // URL de base du serveur backend
  const BASE_URL = 'http://192.168.1.6:5002';

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/regions/getRegion`);
        
        if (response.data.success && Array.isArray(response.data.regions)) {
          const modifiedData = response.data.regions.map(item => ({
            ...item,
            
            placeImage: { uri: `${BASE_URL}${item.placeImage}` },
          }));
          setRegionData(modifiedData);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <HeightSpacer height={6} />
      <VirtualizedList
        data={RegionData}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <View style={{ marginRight: SIZES.small }}>
            <PlacesbyRegion item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default PlacesbyregionStore;*/


import React, { useEffect, useState } from "react";
import { View, VirtualizedList, ActivityIndicator, Text } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { COLORS, SIZES } from "../constants/Theme";
import PlacesbyRegion from "../Tiles/PlacesbyRegion";
import { api } from "../../services/api"; // Importation du service API centralisé
import { API_CONFIG } from "../../config"; // Importation de la configuration API

const PlacesbyregionStore = ({ onDataLoaded }) => {
  const [regionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        // Utilisation du service API centralisé
        const response = await api.getRegions();
        
        if (response.data.success && Array.isArray(response.data.regions)) {
          const modifiedData = response.data.regions.map(item => ({
            ...item,
            // Construction de l'URL d'image en utilisant la configuration centralisée
            placeImage: { 
              uri: `${API_CONFIG.BASE_URL.split('/api')[0]}${item.placeImage}` 
            },
          }));
          setRegionData(modifiedData);
          setError(null);
        } else {
          console.error("Format de réponse inattendu:", response.data);
          setError("Impossible de récupérer les données des régions");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors du chargement des régions");
      } finally {
        setLoading(false);
        // Notifier le parent que le chargement est terminé si la fonction est fournie
        if (onDataLoaded) onDataLoaded();
      }
    };

    fetchRegionData();
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

  // Afficher un message si aucune donnée n'est disponible
  if (regionData.length === 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Aucune région disponible.</Text>
      </View>
    );
  }

  return (
    <View>
      <HeightSpacer height={6} />
      <VirtualizedList
        data={regionData}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <View style={{ marginRight: SIZES.small }}>
            <PlacesbyRegion item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default PlacesbyregionStore;
