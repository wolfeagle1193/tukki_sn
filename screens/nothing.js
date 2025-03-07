import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DatePicker from "react-native-date-ranges";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import logo from "../images/logo.png";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setselectedDates] = useState();
  const route = useRoute();
  const [rooms, setrooms] = useState(1);
  const [adults, setadults] = useState(2);
  const [children, setchildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 150,
            }}
          >
            Tukki.sn
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "green",

        height: 110,
      },
      headerTitleStyle: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ marginRight: 12 }}>
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </View>
      ),
    });
  }, []);

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: {
            width: "80%",
            marginHorizontal: "3%",
            backgroundColor: "green",
          },
          text: { fontSize: 20 },
        }}
        primary
        title="Soumettre"
      />
    );
  };
  const searchPlaces = (place) => {
    if (!route.params || !selectedDates) {
      Alert.alert(
        "Informations Invalides",
        "veuillez compléter tous les champs",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    if(route.params && selectedDates){
      navigation.navigate("Places",{rooms:rooms,adults:adults,children:children,place:place})
    }
  };
  console.log(route.params);
  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#FFC72C",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            {/*destination*/}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                  route?.params
                    ? route.params.input
                    : "Entrer votre destination"
                }
              />
            </Pressable>

            {/*dates selectonnees*/}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <FontAwesome6 name="calendar-days" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                    borderColor: "transparent",
                  }, // placeHolder style
                  headerStyle: { backgroundColor: "green" },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                customButton={(onConfirm) => customButton(onConfirm)}
                selectedBgColor="#FFC72C"
                onConfirm={(startDate, endDate) =>
                  setselectedDates(startDate, endDate)
                }
                allowFontScaling={false} // optional
                placeholder={"Choisissez  la date"}
                mode={"range"}
              />
            </Pressable>

            {/*chambres et clients*/}
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                placeholder={`${rooms} chambre(s) . ${adults} adulte(s) . ${children} enfant(s)`}
              />
            </Pressable>

            {/*bouton de recherche*/}
            <Pressable
              onPress={() => searchPlaces(route?.params.input)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "green",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 15,
                  paddingLeft: 150,
                }}
              >
                Trouver
              </Text>
            </Pressable>
          </View>
          <Text
            style={{ marginHorizontal: 20, fontSize: 15, fontWeight: "500" }}
          >
            Avec Tukki.sn ,Soyez chez vous partout au Sénégal
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 210,
                height: 150,
                marginTop: 10,
                backgroundColor: "green",
                borderRadius: 10,
                padding: 12,
                marginHorizontal: 10,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Vous ne pouvez rever mieux
              </Text>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "500" }}>
                Tarifs promotionnels: -15%
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 210,
                height: 150,
                marginTop: 10,
                borderRadius: 10,
                padding: 12,
                marginHorizontal: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Avec Tukki,
              </Text>
              <Text style={{ color: "black", fontSize: 12, fontWeight: "500" }}>
                Voyagez au Sénégal n'a jamais été aussi simple
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 210,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderRadius: 10,
                padding: 12,
                marginHorizontal: 10,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Vous avez exprimé le besoin
              </Text>
              <Text style={{ color: "black", fontSize: 12, fontWeight: "500" }}>
                Nous avons répondu :Tukki
              </Text>
            </Pressable>
          </ScrollView>
          <Pressable
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 200, height: 150, resizeMode: "cover" }}
              source={logo}
              onPress={() => console.log("Bouton cliqué")}
            />
          </Pressable>
        </ScrollView>
      </View>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="soumettre"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "green",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ModalFooter>
        }
        modalTitle={
          <ModalTitle
            style={{
              fontSize: "200px", // Ajoutez cette ligne pour définir la taille de police
            }}
            title="Nombre de chambre(s) et de personne(s)"
          />
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Chambre(s)</Text>
            <Pressable
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setrooms(Math.max(1, rooms - 1))}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {" "}
                  {rooms}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setrooms((c) => c + 1)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Adulte(s)</Text>
            <Pressable
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setadults(Math.max(1, adults - 1))}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {" "}
                  {adults}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setadults((adulte) => adulte + 1)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Enfant(s)</Text>
            <Pressable
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setchildren(Math.max(0, children - 1))}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {" "}
                  {children}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => setchildren((child) => child + 1)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
