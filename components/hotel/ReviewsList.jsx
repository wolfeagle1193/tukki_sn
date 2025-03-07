import { FlatList, StyleSheet,  View } from 'react-native'
import React from 'react'
import ReviewTile from '../reusable/Reviews/ReviewTile'

const ReviewsList = ({reviews}) => {
  return (
    <FlatList 
    data={reviews}
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item)=> item.id}
    renderItem={({item})=>(
      <View style={{marginBottom:10}}>
         <ReviewTile review={item}/>
      </View>
       
    )}
    />
  )
}

export default ReviewsList

const styles = StyleSheet.create({})