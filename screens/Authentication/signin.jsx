import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import * as Yup from "yup";
import { Formik } from "formik";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { HeightSpacer, ReusableBtn, WidthSpacer } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Au moins 8 caractères svp") // Correction : "caractères"
    .required("Obligatoire"),
  email: Yup.string()
    .email("Veuillez insérer un email valide")
    .required("Obligatoire"),
});

const Signin = () => {
  const [loader, setLoader] = useState(false); // Correction : "setLoader" au lieu de "setloader"
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(false); // Correction : "setObscureText" au lieu de "setObscureText"

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }} // Correction : "initialValues" au lieu de "initialvalues"
        validationSchema={validationSchema}
        onSubmit={(value) => {console.log(value)}}
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
                  onChangeText={handleChange("email")}
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
            <View style={styles.wrapper}>
              <Text style={styles.label}>Mot de Passe</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.green_accueil : COLORS.lightgray
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
                    onFocus={() => setFieldTouched("password")}
                    onBlur={() => setFieldTouched("password", "")}
                    value={values.password}
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
                      name={!obscureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <HeightSpacer height={20}/>
            <ReusableBtn
            onPress={handleSubmit}
            btnText={" Se Connecter"}
            width={SIZES.width - 40}
            backgroundColor={COLORS.green_button_back}
            borderColor={COLORS.green_button_back}
            borderWidth={0}
            textColor={COLORS.white}
          />
           <TouchableOpacity style={{ marginTop: 15 }}>
              <Text style={{ color: COLORS.red, textAlign: "center" }}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Signin;
