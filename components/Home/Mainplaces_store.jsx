
import React, { useEffect, useState } from "react";
import { View, VirtualizedList, ActivityIndicator, Text } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import Main_places from "../Tiles/Main_places";
import { api } from "../../services/api";
import { API_CONFIG } from "../../config";

const Mainplaces_store = ({ onDataLoaded }) => {
  const [mainPlacesData, setMainPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainPlaces = async () => {
      try {
        const response = await api.getTreasures();
        
        if (response.data.success && Array.isArray(response.data.treasures)) {
          const modifiedData = response.data.treasures.map(item => ({
            ...item,
            // Construire correctement l'URL de l'image en utilisant la BASE_URL du config
            placeImage: { 
              uri: `${API_CONFIG.BASE_URL.split('/api')[0]}${item.placeImage}` 
            },
          }));
          setMainPlacesData(modifiedData);
          setError(null);
        } else {
          console.error("Format de réponse inattendu:", response.data);
          setError("Impossible de récupérer les données");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
        // Notifier le parent que le chargement est terminé
        if (onDataLoaded) onDataLoaded();
      }
    };

    fetchMainPlaces();
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
  if (mainPlacesData.length === 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Aucune donnée disponible.</Text>
      </View>
    );
  }

  return (
    <View>
      <HeightSpacer height={6} />
      <VirtualizedList
        data={mainPlacesData}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <View style={{ marginRight: 5 }}>
            <Main_places item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Mainplaces_store;

