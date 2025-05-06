import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import ReusableText from "../reusable/ReusableText";
  import Reusable from "../reusable/Reusable.style.js";
  import { TEXT, COLORS, SIZES } from "../../components/constants/Theme.js";
  import { useNavigation } from "@react-navigation/native";
  import { Feather } from "@expo/vector-icons";
import Reusabletile from "../reusable/Reusabletile.jsx";


  
  const Eventsdata = () => {
    const navigation = useNavigation();
  
    const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
    const Archotel = require("../../assets/images/hotels/dakar/archotel.jpg");
    const Azalai = require("../../assets/images/hotels/dakar/azalai.jpg");
    const FleurdeLyshotel = require("../../assets/images/hotels/dakar/fleurdeLyshotel.jpg");
    const Novotel = require("../../assets/images/hotels/dakar/novotel.jpg");
    const Kingfahdpalace = require("../../assets/images/hotels/dakar/mirammar.jpg");
    const hotel_nina = require("../../assets/images/hotels/dakar/hotel_nina.jpg");
    const radisson_blue_blue = require("../../assets/images/hotels/dakar/radisson_blue_blue.jpg");
    const cafe_de_rome = require("../../assets/images/hotels/dakar/cafe_de_rome.jpg");
    const Hotellesokhamon = require("../../assets/images/hotels/dakar/hotellesokhamon.jpg");
  
    const eventsList = [
      {
        _id: "2b1a16756uv23aprf210m",
        region_id: "23er6749345dfd98vger34",
        title: "Week-end glamour",
        placeImage: Terroubi,
        rating: 4.9,
        review: "712 Avis",
        adresse: "Lac Rose",
      },
      {
        _id: "450a1a1a56un904523aprf211m",
        region_id: "23er6749345dfd98vger34",
        title: "Archotel",
        placeImage: Archotel,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
      {
        _id: "79823q1a1a56uv23aprf212m",
        region_id: "23er6749345dfd98vger34",
        title: "Hotel Azalai",
        placeImage: Azalai,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
      {
        _id: "1a1a1a56uv6783ertaprf213m",
        region_id: "23er6749345dfd98vger34",
        title: "Hotel Fleur de Lys",
        placeImage: FleurdeLyshotel,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
      {
        _id: "1a1a1a56uv23aprf214uryur9084",
        region_id: "23er6749345dfd98vger34",
        title: "Hotel Nina",
        placeImage: hotel_nina,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
      {
        _id: "8993451a1a1a56uv23aprf215m90934",
        region_id: "23er6749345dfd98vger34",
        title: "Hotel King Fahd ",
        placeImage: Kingfahdpalace,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
      {
        _id: "1a1a1a56uv23aprf216m89393",
        region_id: "23er6749345dfd98vger34",
        title: "Hotel Radisson Blue",
        placeImage: radisson_blue_blue,
        rating: 4.9,
        review: "1204 Avis",
        adresse: "Boulevard Martin Luther King , Dakar",
      },
     
    ];

    return (
      <View >
        <View
          style={[Reusable.rowWithSpace("space-between"), { paddingBottom: 8 }]}
        >
          <ReusableText
            text={"Évasions "}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Eventslist")}>
            <Feather name="list" size={18} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={eventsList}
          horizontal
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={({ item }) => (
            <Reusabletile item={item} onPress={() => {}} />
          )}
        />
      </View>
    );
  };
  
  export default Eventsdata;
  
  const styles = StyleSheet.create({
    container :{
        padding : 30
    }
    
  });
  