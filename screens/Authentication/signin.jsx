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

/*import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import * as Yup from "yup";
import { Formik } from "formik";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { HeightSpacer, ReusableBtn, WidthSpacer } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Au moins 8 caractères svp")
    .required("Obligatoire"),
  email: Yup.string()
    .email("Veuillez insérer un email valide")
    .required("Obligatoire"),
});

const Signin = () => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(true);
  const navigation = useNavigation();

  const handleSocialLogin = (provider) => {
    setLoader(true);
    // Intégrer ici l'authentification OAuth avec le provider choisi
    console.log(`Connexion avec ${provider}`);
    setTimeout(() => {
      setLoader(false);
      // Simuler une connexion réussie et rediriger
      // navigation.navigate('Home');
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Naviguer vers l'écran de récupération de mot de passe
    // navigation.navigate('ForgotPassword');
  };

  const handleSignIn = (values) => {
    setLoader(true);
    console.log(values);
    // Intégrer ici votre logique d'authentification
    setTimeout(() => {
      setLoader(false);
      // En cas de succès, rediriger vers l'accueil
      // navigation.navigate('Home');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          {/* Ajouter votre logo ici 
          <Text style={styles.welcomeText}>Bienvenue</Text>
          <Text style={styles.loginText}>Connectez-vous à votre compte</Text>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSignIn(values)}
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
                        name={obscureText ? "eye-off-outline" : "eye-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
              </View>

              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>

              <HeightSpacer height={20} />
              
              <ReusableBtn
                onPress={handleSubmit}
                btnText={"Se Connecter"}
                width={SIZES.width - 40}
                backgroundColor={COLORS.green_button_back}
                borderColor={COLORS.green_button_back}
                borderWidth={0}
                textColor={COLORS.white}
                loader={loader}
              />
              
              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OU</Text>
                <View style={styles.orLine} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                >
                  <MaterialCommunityIcons name="google" size={24} color={COLORS.black} />
                  <WidthSpacer width={10} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                
                <HeightSpacer height={10} />
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}
                >
                  <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
                  <WidthSpacer width={10} />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
                
                <HeightSpacer height={10} />
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}
                >
                  <MaterialCommunityIcons name="apple" size={24} color={COLORS.black} />
                  <WidthSpacer width={10} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.noAccountText}>
                  Vous n'avez pas de compte ?
                </Text>
                <WidthSpacer width={5} />
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupText}>S'inscrire</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;*/
