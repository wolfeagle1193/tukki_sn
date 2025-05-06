


import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Slides from './slides';

const OnBoarding = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef(null);

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

  // Function to move to next slide
  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    // Set timer for automatic slide transition
    timerRef.current = setInterval(goToNextSlide, 7000);
    
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Slides 
        slides={slides}
        currentIndex={currentSlideIndex}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});