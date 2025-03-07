import { Text, View,Image } from 'react-native'
import React from 'react'
import styles from './slides.styles'
import {ReusableText,ReusableBtn,HeightSpacer} from   "../../components"
import { SIZES,COLORS } from '../../components/constants/Theme'
/*import { COLORS } from '../../components/constants/Theme'*/
import { useNavigation } from '@react-navigation/native'


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
          <ReusableBtn onPress={()=>navigation.navigate('Bottom')}
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
