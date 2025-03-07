import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Appbar from "../../components/reusable/Appbar";
import { SIZES, COLORS, TEXT } from "../../components/constants/Theme";
import hoteldetailstyles from "./hotelsdetails.style";
import {
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkingImage,
  ReusableBtn,
  ReusableText,
  ReviewsList,
} from "../../components";
import Reusable from "../../components/reusable/Reusable.style";
import { Rating } from "react-native-stock-star-rating";
import { Feather } from "@expo/vector-icons";

const Terroubi = require("../../assets/images/hotels/dakar/terroubi.jpg");
const user1 = require("../../assets/images/users/user1.jpg");
const user2 = require("../../assets/images/users/user2.jpg");

const Hotelsdetails = ({ navigation }) => {
  const hotel = {
    availability: {
      start: "2025-01-24T00:00:00.000Z",
      end: "2025-01-31T00:00:00.000Z",
    },
    coordinates: {
      latitude: 14.6869,
      longitude: -17.4441,
    },
    _id: "450a1a1a56un904523aprf211m",
    title: "Terroubi",
    description:
      "L'Hôtel Terrou Bi est une oasis de confort et de luxe située sur la magnifique côte atlantique de Dakar, au Sénégal. Offrant une vue imprenable sur l'océan, cet établissement combine le charme traditionnel africain avec des commodités modernes, créant une atmosphère accueillante pour les voyageurs d'affaires et de loisirs.\n\nLes chambres de l'hôtel sont spacieuses et élégamment décorées, équipées de toutes les installations nécessaires pour garantir un séjour agréable. Les clients peuvent profiter de la piscine extérieure, du centre de remise en forme, et d'un accès direct à la plage, parfait pour se détendre après une journée d'exploration.\n\nLe restaurant de l'Hôtel Terrou Bi propose une cuisine locale et internationale, mettant en avant des ingrédients frais et de saison. Les clients peuvent savourer leurs repas tout en admirant la vue panoramique sur l'océan.\n\nL'hôtel est également idéalement situé à proximité des attractions majeures de Dakar, telles que l'île de Gorée et le Monument de la Renaissance Africaine, ce qui en fait un point de départ idéal pour découvrir la richesse culturelle et historique de la région.\n\nQue ce soit pour un voyage d'affaires ou des vacances en famille, l'Hôtel Terrou Bi offre une expérience inoubliable, alliant confort, service de qualité et beauté naturelle.",
    contact: "77-493-33-39",
    placeImage: Terroubi,
    rating: 4.8,
    review: "2312 avis",
    location: "Route de la Corniche Ouest-Dakar",
  
    price: 100000,
    facilities: [
      {
        wifi: true,
        _id: "123456789",
      },
    ],
    _v: 0,
    reviews: [
      {
        id: "123456789abcd",
        review:
          "Un séjour exceptionnel à l'Hôtel Terrou Bi ! Le service était impeccable et les chambres d'une propreté irréprochable. La vue sur l'océan est à couper le souffle. Je recommande vivement cet hôtel à tous !",
        rating: 5.0,
        user: {
          id: "123456789abc43343d",
          username: "Harris Potteman",
          profile: user2,
        },
        updatedAt: "23-08-2024",
      },
      {
        id: "123456789abcde",
        review:
          "Une expérience inoubliable ! L'accueil était chaleureux et le personnel très attentif. La piscine était magnifique et le restaurant propose des plats délicieux. Je reviendrai sans hésiter !",
        rating: 5.0,
        user: {
          id: "123456789abc43343de",
          username: "Iliza Grace",
          profile: user1,
        },
        updatedAt: "03-01-2025",
      },
    ],
  };
  let coordinates = {
    id: hotel._id,
    title: hotel.title,
    latitude: hotel.coordinates.latitude,
    longitude: hotel.coordinates.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <ScrollView style={{backgroundColor:COLORS.white}}>
      <View style={{ height: 80,marginTop:5 }}>
        <Appbar
          top={50}
          left={20}
          right={20}
          title={hotel.title}
          color={COLORS.green_accueil}
          icon={"search1"}
          color1={COLORS.green_accueil}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={hoteldetailstyles.container}>
        <NetworkingImage
          source={hotel.placeImage}
          width={"100%"}
          height={220}
          radius={25}
        />
        <View style={hoteldetailstyles.titleContainer}>
          <View style={hoteldetailstyles.titleColumn}>
            <ReusableText
              text={hotel.title}
              family={"medium"}
              size={SIZES.xlarge}
              color={COLORS.white}
            />
            <HeightSpacer height={10} />
            <ReusableText
              text={hotel.location}
              family={"medium"}
              size={SIZES.medium}
              color={COLORS.black}
            />
            <HeightSpacer height={10} />
            <View style={Reusable.rowWithSpace("space-between")}>
              <Rating
                maxStars={5}
                stars={hotel.rating}
                bordered={false}
                color={"#FD9942"}
              />
              <ReusableText
                text={`(${hotel.review})`}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.white}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={[hoteldetailstyles.container, { paddingTop: 90 }]}>
        <ReusableText
          text={"Description"}
          family={"medium"}
          size={SIZES.large}
          color={COLORS.green_accueil}
        />
        <HeightSpacer height={10} />
        <DescriptionText lines={7} text={hotel.description} />
        <HeightSpacer height={10} />
        <ReusableText
          text={"Adresse"}
          family={"medium"}
          size={SIZES.large}
          color={COLORS.green_accueil}
        />
        <HeightSpacer height={15} />
        <ReusableText
          text={hotel.location}
          family={"regular"}
          size={SIZES.small + 2}
          color={COLORS.black}
        />
        <HotelMap coordinates={coordinates} />
        <View style={Reusable.rowWithSpace("space-between")}>
          <ReusableText
            text={"avis"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.green_button_back}
          />
          <TouchableOpacity>
            <Feather name="list" size={20} />
          </TouchableOpacity>
        </View>
        <HeightSpacer height={10} />
        <ReviewsList reviews={hotel.reviews} />
      </View>
      <View
        style={[
          Reusable.rowWithSpace("space-between"),
          hoteldetailstyles.bottom,{borderWidth:1},{borderColor:COLORS.lightgray},{borderRadius:0}
        ]}
      >
        <View>
          <ReusableText
            text={`${hotel.price} \FCFA`}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />

          <HeightSpacer height={5} />
          <ReusableText
            text={"01 jan - 15 Jan"}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.lightgray}
          />
        </View>
        <ReusableBtn
          onPress={() => navigation.navigate("SelectRoom")}
          btnText={"Choisir une chambre"}
          width={(SIZES.width - 50) / 2.2}
          backgroundColor={COLORS.green_button_back}
          borderColor={COLORS.green_button_back}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </ScrollView>
  );
};

export default Hotelsdetails;

const styles = StyleSheet.create({});
