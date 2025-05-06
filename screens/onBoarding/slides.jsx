/*import { Text, View,Image } from 'react-native'
import React from 'react'
import styles from './slides.styles'
import {ReusableText,ReusableBtn,HeightSpacer} from   "../../components"
import { SIZES,COLORS } from '../../components/constants/Theme'
/*import { COLORS } from '../../components/constants/Theme'*/
/*import { useNavigation } from '@react-navigation/native'


const Slides = ({item}) => {
  const navigation =useNavigation();
  return (
    <View>
      <Image source={item.image} style={styles.image}/>

         <View style={styles.stack}>
          <ReusableText text={item.title} 
            family={'large'}
            size={SIZES.xxlarge}
            color={COLORS.white}
          />
          <HeightSpacer height={40}/>
          <ReusableBtn onPress={()=>navigation.navigate('Auth')}
            btnText={"Démarrer"}
            width={(SIZES.width-50)/2.2}
            backgroundColor={COLORS.green_button_back}
            borderColor={COLORS.green_button_back}
            borderWidth={0}
            textColor={COLORS.white}
            />

         </View>

    </View>
    
  )
}

export default Slides


/*import { Text, View, Image } from 'react-native';
import React from 'react';
import styles from './slides.styles';
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components";
import { SIZES, COLORS } from '../../components/constants/Theme';
import { useNavigation } from '@react-navigation/native';

const Slides = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Image source={item.image} style={styles.image} />

      <View style={styles.stack}>
        <ReusableText 
          text={item.title} 
          family={'large'}
          size={SIZES.xxlarge}
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Bottom')}
          btnText={"Démarrer"}
          width={(SIZES.width - 50) / 2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default Slides;*/


/*import { Text, View, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

// Types d'effet de transition
const TRANSITION_TYPES = [
  'fade',           // Fondu enchaîné
  'slideLeft',      // Glissement depuis la gauche
  'slideUp',        // Glissement depuis le bas
  'zoomIn',         // Zoom avant
  'fadeRotate'      // Fondu avec rotation
];

const Slides = ({ items }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SIZES.width)).current;
  const slideUpAnim = useRef(new Animated.Value(SIZES.height)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [transitionType, setTransitionType] = useState('fade');

  useEffect(() => {
    const interval = setInterval(() => {
      // Choisir un type de transition aléatoire
      const nextTransition = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
      setTransitionType(nextTransition);
      
      // Animation de sortie
      animateOut().start(() => {
        // Changer l'image
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        
        // Réinitialiser les animations
        resetAnimations();
        
        // Animation d'entrée
        animateIn().start();
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const resetAnimations = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(SIZES.width);
    slideUpAnim.setValue(SIZES.height);
    scaleAnim.setValue(0.8);
    rotateAnim.setValue(0);
  };

  const animateOut = () => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
  };

  const animateIn = () => {
    let animation;
    
    switch (transitionType) {
      case 'fade':
        animation = Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        });
        break;
      case 'slideLeft':
        animation = Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        });
        break;
      case 'slideUp':
        animation = Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        });
        break;
      case 'zoomIn':
        animation = Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          })
        ]);
        break;
      case 'fadeRotate':
        animation = Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          })
        ]);
        break;
      default:
        animation = Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        });
    }
    
    return animation;
  };

  const getAnimatedStyle = () => {
    let style = { opacity: fadeAnim };
    
    switch (transitionType) {
      case 'fade':
        style = { opacity: fadeAnim };
        break;
      case 'slideLeft':
        style = { 
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }] 
        };
        break;
      case 'slideUp':
        style = { 
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }] 
        };
        break;
      case 'zoomIn':
        style = { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }] 
        };
        break;
      case 'fadeRotate':
        style = { 
          opacity: fadeAnim,
          transform: [
            { rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['10deg', '0deg']
              })
            }
          ] 
        };
        break;
    }
    
    return style;
  };

  // S'assurer qu'il y a au moins une image
  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, getAnimatedStyle()]}>
        <Image source={currentItem.image} style={styles.image} />
      </Animated.View>

      <View style={styles.stack}>
        <ReusableText 
          text={currentItem.title}
          family={'large'}
          size={SIZES.xxlarge}
          color={COLORS.white}
        />
        
        <ReusableText 
          text="Découvrez la beauté du Sénégal"
          family={'medium'}
          size={SIZES.medium}
          color={COLORS.white}
        />
        
        <HeightSpacer height={40} />
        
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>

      {/* Indicateurs de position 
      <View style={styles.paginationContainer}>
        {items.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Slides */


/*import { Text, View, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

// Types d'effet de transition
const TRANSITION_TYPES = [
  'fade',           // Fondu enchaîné
  'slideLeft',      // Glissement depuis la gauche
  'slideUp',        // Glissement depuis le bas
  'zoomIn',         // Zoom avant
  'fadeRotate'      // Fondu avec rotation
];

const Slides = ({ item, allSlides, currentIndex }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Référence pour stocker le type d'animation en cours
  const transitionTypeRef = useRef('fade');
  
  useEffect(() => {
    // Choisir un type de transition aléatoire à chaque changement d'image
    transitionTypeRef.current = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
    
    // Réinitialiser les animations selon le type
    resetAnimations();
    
    // Animer l'entrée de la nouvelle image
    startEntranceAnimation();
  }, [currentIndex]);
  
  const resetAnimations = () => {
    // Réinitialiser différemment selon le type d'animation
    switch (transitionTypeRef.current) {
      case 'fade':
        fadeAnim.setValue(0);
        break;
      case 'slideLeft':
        fadeAnim.setValue(1);
        slideAnim.setValue(SIZES.width);
        break;
      case 'slideUp':
        fadeAnim.setValue(1);
        slideUpAnim.setValue(SIZES.height / 2);
        break;
      case 'zoomIn':
        fadeAnim.setValue(0);
        scaleAnim.setValue(1.2);
        break;
      case 'fadeRotate':
        fadeAnim.setValue(0);
        rotateAnim.setValue(-0.1);
        break;
      default:
        fadeAnim.setValue(0);
    }
  };
  
  const startEntranceAnimation = () => {
    // Créer l'animation selon le type
    let animation;
    
    switch (transitionTypeRef.current) {
      case 'fade':
        animation = Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        });
        break;
      case 'slideLeft':
        animation = Animated.timing(slideAnim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        });
        break;
      case 'slideUp':
        animation = Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        });
        break;
      case 'zoomIn':
        animation = Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          })
        ]);
        break;
      case 'fadeRotate':
        animation = Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 3500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          })
        ]);
        break;
      default:
        animation = Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        });
    }
    
    animation.start();
  };
  
  // Obtenir le style animé selon le type de transition
  const getAnimatedStyle = () => {
    switch (transitionTypeRef.current) {
      case 'fade':
        return { opacity: fadeAnim };
      case 'slideLeft':
        return { 
          transform: [{ translateX: slideAnim }]
        };
      case 'slideUp':
        return { 
          transform: [{ translateY: slideUpAnim }]
        };
      case 'zoomIn':
        return { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        };
      case 'fadeRotate':
        return { 
          opacity: fadeAnim,
          transform: [
            { rotate: rotateAnim.interpolate({
                inputRange: [-0.1, 0],
                outputRange: ['-10deg', '0deg']
              })
            }
          ]
        };
      default:
        return { opacity: fadeAnim };
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={item.image} 
        style={[styles.image, getAnimatedStyle()]} 
      />

      <View style={styles.stack}>
        <ReusableText 
          text={item.title} 
          family={'large'}
          size={SIZES.xxlarge}
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicateurs de position 
      {allSlides && (
        <View style={styles.paginationContainer}>
          {allSlides.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Slides*/



/*import { Text, View, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

// Revised transition types - removed slide transitions
const TRANSITION_TYPES = [
  'crossFade',     // Smooth crossfade between images
  'gentleZoom',    // Subtle zoom animation
  'softRotate'     // Very subtle rotation with fade
];

const Slides = ({ item, allSlides, currentIndex, previousIndex }) => {
  const navigation = useNavigation();
  
  // Animation values
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const nextOpacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Reference for the current transition type
  const transitionTypeRef = useRef('crossFade');
  
  // Keep track of current image to animate
  const [currentItem, setCurrentItem] = React.useState(item);
  const [nextItem, setNextItem] = React.useState(null);
  
  useEffect(() => {
    // Choose a transition type randomly
    transitionTypeRef.current = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
    
    // Start transition animation when index changes
    if (currentIndex !== previousIndex && previousIndex !== undefined) {
      setNextItem(item);
      animateTransition();
    } else {
      setCurrentItem(item);
      opacityAnim.setValue(1);
      nextOpacityAnim.setValue(0);
    }
  }, [currentIndex, item]);
  
  const animateTransition = () => {
    // Reset animations
    nextOpacityAnim.setValue(0);
    
    // Different animation based on transition type
    let animation;
    
    switch (transitionTypeRef.current) {
      case 'crossFade':
        animation = Animated.parallel([
          // Fade out current image
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          // Fade in next image
          Animated.timing(nextOpacityAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          })
        ]);
        break;
        
      case 'gentleZoom':
        scaleAnim.setValue(1.05);
        animation = Animated.parallel([
          // Fade out current image
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          // Fade in next image
          Animated.timing(nextOpacityAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          // Subtle zoom effect
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          })
        ]);
        break;
        
      case 'softRotate':
        rotateAnim.setValue(0.02);
        animation = Animated.parallel([
          // Fade out current image
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          // Fade in next image
          Animated.timing(nextOpacityAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          // Very subtle rotation
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          })
        ]);
        break;
        
      default:
        // Default to crossfade if something goes wrong
        animation = Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(nextOpacityAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          })
        ]);
    }
    
    // Once animation completes, update current item
    animation.start(() => {
      setCurrentItem(nextItem);
      setNextItem(null);
      opacityAnim.setValue(1);
    });
  };
  
  // Get animated style for current image
  const getCurrentAnimatedStyle = () => {
    return { opacity: opacityAnim };
  };
  
  // Get animated style for next image
  const getNextAnimatedStyle = () => {
    switch (transitionTypeRef.current) {
      case 'gentleZoom':
        return {
          opacity: nextOpacityAnim,
          transform: [{ scale: scaleAnim }]
        };
      case 'softRotate':
        return {
          opacity: nextOpacityAnim,
          transform: [
            { rotate: rotateAnim.interpolate({
                inputRange: [0, 0.02],
                outputRange: ['0deg', '2deg']
              })
            }
          ]
        };
      default:
        return { opacity: nextOpacityAnim };
    }
  };

  return (
    <View style={styles.container}>
      {/* Current image - always rendered *
      <Animated.Image 
        source={currentItem?.image} 
        style={[styles.image, getCurrentAnimatedStyle()]} 
      />
      
      {/* Next image - rendered during transition 
      {nextItem && (
        <Animated.Image 
          source={nextItem?.image} 
          style={[styles.image, getNextAnimatedStyle(), { position: 'absolute' }]} 
        />
      )}

      <View style={styles.stack}>
        <ReusableText 
          text={item.title} 
          family={'large'}
          size={SIZES.xlarge} // Reduced from xxlarge to xlarge
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators 
      {allSlides && (
        <View style={styles.paginationContainer}>
          {allSlides.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Slides*/

/*import { Text, View, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

// Single transition type focused on perfect crossfade
const TRANSITION_TYPE = 'perfectCrossFade';

const Slides = ({ item, allSlides, currentIndex }) => {
  const navigation = useNavigation();
  
  // Keep references to current and next images
  const [currentItem, setCurrentItem] = useState(item);
  const [nextItem, setNextItem] = useState(null);
  
  // Animation values for opacity
  const currentImageOpacity = useRef(new Animated.Value(1)).current;
  const nextImageOpacity = useRef(new Animated.Value(0)).current;
  
  // Track when we're in a transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Previous index to detect changes
  const prevIndexRef = useRef(currentIndex);
  
  useEffect(() => {
    // Check if index actually changed
    if (currentIndex !== prevIndexRef.current) {
      // Begin transition to new image
      startTransition();
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);
  
  const startTransition = () => {
    // Set next image to the new current item
    setNextItem(item);
    setIsTransitioning(true);
    
    // Reset animation values
    nextImageOpacity.setValue(0);
    
    // Create smooth crossfade animation
    Animated.parallel([
      // Fade out current image slowly
      Animated.timing(currentImageOpacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      // Fade in next image slowly
      Animated.timing(nextImageOpacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      })
    ]).start(() => {
      // When animation completes, update current image
      setCurrentItem(nextItem);
      setNextItem(null);
      currentImageOpacity.setValue(1);
      nextImageOpacity.setValue(0);
      setIsTransitioning(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Base layer - Current image 
      <Animated.Image 
        source={currentItem?.image} 
        style={[
          styles.image, 
          { opacity: currentImageOpacity }
        ]} 
      />
      
      {/* Overlay layer - Next image during transition 
      {nextItem && (
        <Animated.Image 
          source={nextItem?.image} 
          style={[
            styles.image, 
            { 
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: nextImageOpacity 
            }
          ]} 
        />
      )}

      {/* Content layer - always on top 
      <View style={styles.stack}>
        <ReusableText 
          text={item.title} 
          family={'large'}
          size={SIZES.xlarge} 
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators 
      {allSlides && (
        <View style={styles.paginationContainer}>
          {allSlides.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Slides*/


/*import { Text, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

const Slides = ({ slides, currentIndex }) => {
  const navigation = useNavigation();
  
  // Create ref arrays for all possible images and their opacity values
  const imageOpacities = useRef(
    slides.map(() => new Animated.Value(0))
  ).current;
  
  // Initialize the first image to be fully visible
  useEffect(() => {
    imageOpacities[0].setValue(1);
  }, []);
  
  // Handle transitions when currentIndex changes
  useEffect(() => {
    // Make sure all images except current are reset to 0 opacity
    imageOpacities.forEach((opacity, i) => {
      if (i !== currentIndex) {
        // Don't animate this reset - just set it directly
        opacity.setValue(0);
      }
    });
    
    // Now fade in the current image (should already be at 1)
    Animated.timing(imageOpacities[currentIndex], {
      toValue: 1,
      duration: 2000, // 2 second fade in
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Render ALL images, always keeping the previous image visible until the new one is fully faded in *
      {slides.map((slide, index) => (
        <Animated.Image
          key={slide.id}
          source={slide.image}
          style={[
            styles.image,
            {
              opacity: imageOpacities[index],
              // Stack all images on top of each other
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Higher index = higher in z-order (on top)
              zIndex: index,
            }
          ]}
        />
      ))}

      {/* Content overlay - always on top with highest z-index 
      <View style={[styles.stack, { zIndex: slides.length + 1 }]}>
        <ReusableText 
          text={slides[currentIndex].title} 
          family={'large'}
          size={SIZES.large} // Further reduced title size
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators - highest z-index 
      <View style={[styles.paginationContainer, { zIndex: slides.length + 2 }]}>
        {slides.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Slides*/


/*import { View, Image, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

const Slides = ({ slides, currentIndex }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  
  // Animation refs
  const imageOpacities = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageScales = useRef(slides.map(() => new Animated.Value(1.2))).current;
  const imageTranslateX = useRef(slides.map(() => new Animated.Value(0))).current;
  
  // Track previous index
  const prevIndexRef = useRef(0);
  
  // Initialize first slide
  useEffect(() => {
    imageOpacities[0].setValue(1);
    imageScales[0].setValue(1);
  }, []);
  
  // Handle transitions when currentIndex changes
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    
    // Only run animation if index actually changed
    if (prevIndex !== currentIndex) {
      // Create parallel animations for smooth transitions
      
      // 1. Fade out previous image while scaling slightly
      const fadeOutPrev = Animated.parallel([
        Animated.timing(imageOpacities[prevIndex], {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(imageScales[prevIndex], {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        })
      ]);
      
      // 2. Fade in current image while scaling down to normal
      const fadeInCurrent = Animated.parallel([
        Animated.timing(imageOpacities[currentIndex], {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(imageScales[currentIndex], {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(imageTranslateX[currentIndex], {
          toValue: 0,  
          duration: 1500,
          useNativeDriver: true,
        })
      ]);
      
      // Reset current image to starting animation state
      imageOpacities[currentIndex].setValue(0.3);
      imageScales[currentIndex].setValue(1.2);
      
      // Decide direction for slide effect
      const direction = currentIndex > prevIndex ? 1 : -1;
      // Skip if wrapping around (last to first)
      if (!(prevIndex === slides.length - 1 && currentIndex === 0)) {
        imageTranslateX[currentIndex].setValue(direction * width * 0.2);
      }
      
      // Run animations
      Animated.sequence([
        // Small overlap ensures no black flicker
        Animated.delay(100),
        Animated.parallel([fadeOutPrev, fadeInCurrent])
      ]).start();
      
      // Update previous index reference
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Render all images with proper animation styling 
      {slides.map((slide, index) => (
        <Animated.View
          key={slide.id}
          style={[
            styles.imageContainer,
            {
              opacity: imageOpacities[index],
              zIndex: index === currentIndex ? slides.length : index,
              transform: [
                { scale: imageScales[index] },
                { translateX: imageTranslateX[index] }
              ]
            }
          ]}
        >
          <Image
            source={slide.image}
            style={styles.image}
          />
        </Animated.View>
      ))}

      {/* Content overlay 
      <View style={[styles.stack, { zIndex: slides.length + 1 }]}>
        <ReusableText 
          text={slides[currentIndex].title} 
          family={'large'}
          size={SIZES.large}
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators 
      <View style={[styles.paginationContainer, { zIndex: slides.length + 2 }]}>
        {slides.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Slides*/



/*import { View, Image, Animated, Dimensions, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './slides.styles'
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components"
import { SIZES, COLORS } from '../../components/constants/Theme'
import { useNavigation } from '@react-navigation/native'

const Slides = ({ slides, currentIndex }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  
  // Animation refs for each property we'll animate
  const imageOpacities = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageScales = useRef(slides.map(() => new Animated.Value(1))).current;
  const imageTranslateX = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageTranslateY = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageRotate = useRef(slides.map(() => new Animated.Value(0))).current;
  
  // Track previous index and transition type
  const prevIndexRef = useRef(0);
  const [transitionType, setTransitionType] = useState(0);
  
  // Initialize first slide
  useEffect(() => {
    imageOpacities[0].setValue(1);
  }, []);

  // Define our transition types
  const applyTransition = (prevIndex, newIndex, transitionType) => {
    // Reset any previous animations
    if (prevIndex !== newIndex) {
      // Common setup for all transitions
      const prevImageAnimations = [];
      const newImageAnimations = [];
      const setupValues = {};
      
      // Start with default fade setup
      setupValues.startOpacity = 0.2;
      setupValues.startScale = 1;
      setupValues.startTranslateX = 0;
      setupValues.startTranslateY = 0;
      setupValues.startRotate = 0;
      
      // Each transition type (0-6) has its own unique animation
      switch (transitionType) {
        case 0: // Zoom In
          setupValues.startOpacity = 0;
          setupValues.startScale = 1.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[prevIndex], {
              toValue: 0.85,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[newIndex], {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            })
          );
          break;
          
        case 1: // Slide Left to Right
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateX = -width;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[prevIndex], {
              toValue: width,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[newIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          break;
          
        case 2: // Slide Top to Bottom
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateY = -height;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[newIndex], {
              toValue: 0,
              duration: 1200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            })
          );
          break;
          
        case 3: // Cross Fade with Zoom Out
          setupValues.startOpacity = 0;
          setupValues.startScale = 0.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[prevIndex], {
              toValue: 1.2,
              duration: 1500,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1800,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[newIndex], {
              toValue: 1,
              duration: 1800,
              useNativeDriver: true,
            })
          );
          break;
          
        case 4: // Slide with Rotation
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateX = width * (prevIndex < newIndex ? -1 : 1);
          setupValues.startRotate = prevIndex < newIndex ? -15 : 15;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[prevIndex], {
              toValue: width * (prevIndex < newIndex ? 1 : -1),
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageRotate[prevIndex], {
              toValue: prevIndex < newIndex ? 15 : -15,
              duration: 1000,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[newIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageRotate[newIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            })
          );
          break;
          
        case 5: // Bottom Slide Up with Fade
          setupValues.startOpacity = 0;
          setupValues.startTranslateY = height * 0.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[prevIndex], {
              toValue: -height * 0.3,
              duration: 800,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1300,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[newIndex], {
              toValue: 0,
              duration: 1300,
              easing: Easing.out(Easing.back()),
              useNativeDriver: true,
            })
          );
          break;
          
        case 6: // Fade with Scale Pulse
          setupValues.startOpacity = 0;
          setupValues.startScale = 0.9;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          // Create a sequence with a pulse effect
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(imageScales[newIndex], {
                toValue: 1.05,
                duration: 600,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
              }),
              Animated.timing(imageScales[newIndex], {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
              })
            ])
          );
          break;
      }
      
      // Set initial values for the new image
      imageOpacities[newIndex].setValue(setupValues.startOpacity);
      imageScales[newIndex].setValue(setupValues.startScale);
      imageTranslateX[newIndex].setValue(setupValues.startTranslateX);
      imageTranslateY[newIndex].setValue(setupValues.startTranslateY);
      imageRotate[newIndex].setValue(setupValues.startRotate);
      
      // Create the main animation sequence
      Animated.parallel([
        ...prevImageAnimations,
        ...newImageAnimations
      ]).start();
    }
  };
  
  // Handle transitions when currentIndex changes
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    
    if (prevIndex !== currentIndex) {
      // Apply transition animation
      applyTransition(prevIndex, currentIndex, transitionType);
      
      // Update transition type for next time
      setTransitionType((transitionType + 1) % 7);
      
      // Update previous index reference
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Create rotate interpolations for each image
  const rotateInterpolations = imageRotate.map(rotate => 
    rotate.interpolate({
      inputRange: [-360, 360],
      outputRange: ['-360deg', '360deg'],
    })
  );

  return (
    <View style={styles.container}>
      {/* Render all images with proper animation styling 
      {slides.map((slide, index) => (
        <Animated.View
          key={slide.id}
          style={[
            styles.imageContainer,
            {
              opacity: imageOpacities[index],
              zIndex: index === currentIndex ? slides.length : index,
              transform: [
                { scale: imageScales[index] },
                { translateX: imageTranslateX[index] },
                { translateY: imageTranslateY[index] },
                { rotate: rotateInterpolations[index] }
              ]
            }
          ]}
        >
          <Image
            source={slide.image}
            style={styles.image}
          />
        </Animated.View>
      ))}

      {/* Content overlay 
      <View style={[styles.stack, { zIndex: slides.length + 1 }]}>
        <ReusableText 
          text={slides[currentIndex].title} 
          family={'large'}
          size={SIZES.large}
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('VideoScreen')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators 
      <View style={[styles.paginationContainer, { zIndex: slides.length + 2 }]}>
        {slides.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Slides*/



import { View, Image, Animated, Dimensions, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './slides.styles';
import { ReusableText, ReusableBtn, HeightSpacer } from "../../components";
import { COLORS, SIZES } from '../../components/constants/Theme';
import { useNavigation } from '@react-navigation/native';

const Slides = ({ slides, currentIndex }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  
  // Animation refs for each property we'll animate
  const imageOpacities = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageScales = useRef(slides.map(() => new Animated.Value(1))).current;
  const imageTranslateX = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageTranslateY = useRef(slides.map(() => new Animated.Value(0))).current;
  const imageRotate = useRef(slides.map(() => new Animated.Value(0))).current;
  
  // Track previous index and transition type
  const prevIndexRef = useRef(0);
  const [transitionType, setTransitionType] = useState(0);
  
  // Initialize first slide
  useEffect(() => {
    imageOpacities[0].setValue(1);
  }, []);

  // Define our transition types
  const applyTransition = (prevIndex, newIndex, transitionType) => {
    // Reset any previous animations
    if (prevIndex !== newIndex) {
      // Common setup for all transitions
      const prevImageAnimations = [];
      const newImageAnimations = [];
      const setupValues = {};
      
      // Start with default fade setup
      setupValues.startOpacity = 0.2;
      setupValues.startScale = 1;
      setupValues.startTranslateX = 0;
      setupValues.startTranslateY = 0;
      setupValues.startRotate = 0;
      
      // Each transition type (0-6) has its own unique animation
      switch (transitionType) {
        case 0: // Zoom In
          setupValues.startOpacity = 0;
          setupValues.startScale = 1.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[prevIndex], {
              toValue: 0.85,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[newIndex], {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            })
          );
          break;
          
        case 1: // Slide Left to Right
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateX = -width;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[prevIndex], {
              toValue: width,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[newIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          break;
          
        case 2: // Slide Top to Bottom
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateY = -height;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[newIndex], {
              toValue: 0,
              duration: 1200,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            })
          );
          break;
          
        case 3: // Cross Fade with Zoom Out
          setupValues.startOpacity = 0;
          setupValues.startScale = 0.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[prevIndex], {
              toValue: 1.2,
              duration: 1500,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1800,
              useNativeDriver: true,
            }),
            Animated.timing(imageScales[newIndex], {
              toValue: 1,
              duration: 1800,
              useNativeDriver: true,
            })
          );
          break;
          
        case 4: // Slide with Rotation
          setupValues.startOpacity = 0.3;
          setupValues.startTranslateX = width * (prevIndex < newIndex ? -1 : 1);
          setupValues.startRotate = prevIndex < newIndex ? -15 : 15;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[prevIndex], {
              toValue: width * (prevIndex < newIndex ? 1 : -1),
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageRotate[prevIndex], {
              toValue: prevIndex < newIndex ? 15 : -15,
              duration: 1000,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateX[newIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(imageRotate[newIndex], {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            })
          );
          break;
          
        case 5: // Bottom Slide Up with Fade
          setupValues.startOpacity = 0;
          setupValues.startTranslateY = height * 0.5;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[prevIndex], {
              toValue: -height * 0.3,
              duration: 800,
              useNativeDriver: true,
            })
          );
          
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1300,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY[newIndex], {
              toValue: 0,
              duration: 1300,
              easing: Easing.out(Easing.back()),
              useNativeDriver: true,
            })
          );
          break;
          
        case 6: // Fade with Scale Pulse
          setupValues.startOpacity = 0;
          setupValues.startScale = 0.9;
          
          prevImageAnimations.push(
            Animated.timing(imageOpacities[prevIndex], {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            })
          );
          
          // Create a sequence with a pulse effect
          newImageAnimations.push(
            Animated.timing(imageOpacities[newIndex], {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(imageScales[newIndex], {
                toValue: 1.05,
                duration: 600,
                easing: Easing.out(Easing.sin),
                useNativeDriver: true,
              }),
              Animated.timing(imageScales[newIndex], {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
              })
            ])
          );
          break;
      }
      
      // Set initial values for the new image
      imageOpacities[newIndex].setValue(setupValues.startOpacity);
      imageScales[newIndex].setValue(setupValues.startScale);
      imageTranslateX[newIndex].setValue(setupValues.startTranslateX);
      imageTranslateY[newIndex].setValue(setupValues.startTranslateY);
      imageRotate[newIndex].setValue(setupValues.startRotate);
      
      // Create the main animation sequence
      Animated.parallel([
        ...prevImageAnimations,
        ...newImageAnimations
      ]).start();
    }
  };
  
  // Handle transitions when currentIndex changes
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    
    if (prevIndex !== currentIndex) {
      // Apply transition animation
      applyTransition(prevIndex, currentIndex, transitionType);
      
      // Update transition type for next time
      setTransitionType((transitionType + 1) % 7);
      
      // Update previous index reference
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Create rotate interpolations for each image
  const rotateInterpolations = imageRotate.map(rotate => 
    rotate.interpolate({
      inputRange: [-360, 360],
      outputRange: ['-360deg', '360deg'],
    })
  );

  return (
    <View style={styles.container}>
      {/* Render all images with proper animation styling */}
      {slides.map((slide, index) => (
        <Animated.View
          key={slide.id}
          style={[
            styles.imageContainer,
            {
              opacity: imageOpacities[index],
              zIndex: index === currentIndex ? slides.length : index,
              transform: [
                { scale: imageScales[index] },
                { translateX: imageTranslateX[index] },
                { translateY: imageTranslateY[index] },
                { rotate: rotateInterpolations[index] }
              ]
            }
          ]}
        >
          <Image
            source={slide.image}
            style={styles.image}
          />
        </Animated.View>
      ))}

      {/* Content overlay */}
      <View style={[styles.stack, { zIndex: slides.length + 1 }]}>
        <ReusableText 
          text={slides[currentIndex].title} 
          family={'large'}
          size={SIZES.large}
          color={COLORS.white}
        />
        <HeightSpacer height={40} />
        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Démarrer"}
          width={(SIZES.width-50)/2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
      
      {/* Indicators */}
      <View style={[styles.paginationContainer, { zIndex: slides.length + 2 }]}>
        {slides.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? COLORS.white : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default Slides
