import { FlatList, View } from 'react-native';
import React from 'react';
import Reusabletile from '../reusable/Reusabletile';
import { useNavigation } from '@react-navigation/native';

const Popularlist = ({ data }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return ( // Ajoutez un 'return' ici
      <View style={{marginBottom:10}}>
        <Reusabletile item={item} onPress={() => navigation.navigate("Destinationsdetails", item._id)} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item._id} // Ajoutez une clé pour chaque élément
    />
  );
};

export default Popularlist;


