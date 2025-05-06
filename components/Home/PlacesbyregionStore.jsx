
import React, { useEffect, useState } from "react";
import { View, VirtualizedList, ActivityIndicator } from "react-native";
import HeightSpacer from "../reusable/HeightSpacer";
import { SIZES } from "../constants/Theme";
import PlacesbyRegion from "../Tiles/PlacesbyRegion";
import axios from "axios";

const PlacesbyregionStore = () => {
  const [RegionData, setRegionData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // URL de base du serveur backend
  const BASE_URL = 'http://192.168.1.2:5002';

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
      <HeightSpacer height={8} />
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

export default PlacesbyregionStore;
