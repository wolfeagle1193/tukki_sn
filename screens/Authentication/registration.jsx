import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import * as Yup from "yup";
import { Formik } from "formik";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { HeightSpacer, ReusableBtn, WidthSpacer } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(30, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
    .required("Le nom d'utilisateur est obligatoire"),
  email: Yup.string()
    .email("Veuillez insérer un email valide")
    .required("Obligatoire"),
  password: Yup.string()
    .min(8, "Au moins 8 caractères svp")
    .required("Obligatoire"),
});

const Registration = () => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", email: "", password: "" }} 
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View>
            {/* Champ nom d'utilisateur */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.green_accueil : COLORS.lightgray
                  )}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={20}
                    color={COLORS.black}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    onChangeText={handleChange("username")} // Correction : "username"
                    placeholder="Entrer votre nom d'utilisateur"
                    onFocus={() => setFieldTouched("username")} // Correction : "username"
                    onBlur={() => setFieldTouched("username", "")} // Correction : "username"
                    value={values.username} // Correction : "username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>
            </View>

            {/* Champ email */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.green_accueil : COLORS.lightgray
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.black}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    onChangeText={handleChange("email")} // Correction : "email"
                    placeholder="Entrer votre email"
                    onFocus={() => setFieldTouched("email")}
                    onBlur={() => setFieldTouched("email", "")}
                    value={values.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>
            </View>

            {/* Champ mot de passe */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Mot de Passe</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.green_accueil : COLORS.lightgray
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.black}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    secureTextEntry={obscureText}
                    placeholder="Entrer votre mot de passe"
                    onFocus={() => setFieldTouched("password")} // Correction : "password"
                    onBlur={() => setFieldTouched("password", "")} // Correction : "password"
                    value={values.password} // Correction : "password"
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setObscureText(!obscureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={ !obscureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>

            {/* Bouton d'inscription */}
            <HeightSpacer height={20} />
            <ReusableBtn
              onPress={handleSubmit}
              btnText={"S'inscrire"}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green_button_back}
              borderColor={COLORS.black}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Registration;