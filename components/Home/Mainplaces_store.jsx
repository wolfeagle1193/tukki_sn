
import React, { useEffect, useState } from "react";
import { View, VirtualizedList, ActivityIndicator } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import Main_places from "../Tiles/Main_places";
import axios from "axios";

const Mainplaces_store = () => {
  const [mainPlacesData, setMainPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // URL de base du serveur backend
  const BASE_URL = 'http://192.168.1.2:5002';

  useEffect(() => {
    const fetchMainPlaces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/treasures/getTreasure`);
        
        if (response.data.success && Array.isArray(response.data.treasures)) {
          const modifiedData = response.data.treasures.map(item => ({
            ...item,
            // Construire correctement l'URL de l'image
            placeImage: { uri: `${BASE_URL}${item.placeImage}` },
          }));
          setMainPlacesData(modifiedData);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainPlaces();
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
      <HeightSpacer height={8} />
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

