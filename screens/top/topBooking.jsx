import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import Reusabletile from "../../components/reusable/Reusabletile";
import { COLORS, SIZES } from "../../components/constants/Theme";
import Reusable from "../../components/reusable/Reusable.style";
import { ReusableBtn } from "../../components";

const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");

const TopBooking = ({ navigation }) => {
  const hotelsList = [
    {
      _id: "2b1a16756uv23aprf210m",
      title: "Terrou-Bi",
      placeImage: Terroubi,
      rating: 4.9,
      review: "712 Avis",
      adresse: "Lac Rose",
    },
    {
      _id: "450a1a1a56un904523aprf211m",
      title: "Archotel",
      placeImage: Archotel,
      rating: 4.9,
      review: "1204 Avis",
      adresse: "Boulevard Martin Luther King , Dakar",
    },
  ];

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <FlatList
        data={hotelsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 45 }}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
          >
            <Reusabletile item={item} />
            <View
              style={[Reusable.rowWithSpace("space-between"), styles.container]}
            >
              <ReusableBtn
                onPress={() => navigation.navigate("Bottom")}
                btnText={"Détails"}
                width={(SIZES.width - 50) / 2.8}
                backgroundColor={COLORS.green_button_back}
                borderColor={COLORS.green_button_back}
                borderWidth={0}
                textColor={COLORS.white}
              />
              <ReusableBtn
                onPress={() => navigation.navigate("Bottom")}
                btnText={"Supprimer"}
                width={(SIZES.width - 50) / 2.8}
                backgroundColor={COLORS.pink}
                borderColor={COLORS.green_button_back}
                borderWidth={0}
                textColor={COLORS.white}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TopBooking;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 25,
  },
});
