import { FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Slides from './slides';


const OnBoarding = () => {
  const slides = [
    {
      id: 1,
      image: require('../../assets/images/1.jpg'),
      title: "Visite Sénégal",
    },
    {
      id: 2,
      image: require('../../assets/images/2.jpg'),
      title: "Découvre le Sénégal",
    },
    {
      id: 3,
      image: require('../../assets/images/3.jpg'),
      title: "Les incontournables du Sénégal",
    },
  ];

  return (
    <FlatList
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={slides}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Slides item={item}/>}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
 
});



/*

import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import Slides from './slides';
import Video from 'react-native-video';

const OnBoarding = () => {
  const slides = [
    {
      id: 1,
      video: require('../../assets/videos/tourisme_senegal.mp4'), // Chemin de votre vidéo
      title: "Visite Sénégal",
    },
    {
      id: 2,
      image: require('../../assets/images/2.jpg'),
      title: "Découvre le Sénégal",
    },
    {
      id: 3,
      image: require('../../assets/images/3.jpg'),
      title: "Les incontournables du Sénégal",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        {item.video ? (
          <Video
            source={item.video}
            style={styles.video}
            resizeMode="cover"
            repeat={false}
           
          />
        ) : (
          <Slides item={item} />
        )}
      </View>
    );
  };

  return (
    <FlatList
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={slides}
      keyExtractor={(item) => item.id.toString()} // Convertir id en chaîne
      renderItem={renderItem}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  slideContainer: {
    width: '100%', // Assurez-vous que chaque slide prend toute la largeur
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%', // Ajustez selon vos besoins
  },
});*/