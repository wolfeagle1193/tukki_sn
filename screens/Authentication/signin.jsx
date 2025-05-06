
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styles from "./signin.style";
import * as Yup from "yup";
import { Formik } from "formik";
import { COLORS, SIZES } from "../../components/constants/Theme";
import { HeightSpacer, ReusableBtn, WidthSpacer } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Au moins 8 caractères svp")
    .required("Obligatoire"),
  email: Yup.string()
    .email("Veuillez insérer un email valide")
    .required("Obligatoire"),
});

const Signin = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(true);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState("Connexion en cours");
  
  // Animation des points pour le texte de chargement
  useEffect(() => {
    let dotsInterval;
    if (loader) {
      const dots = [' ','.', '..', '...'];
      let i = 0;
      
      dotsInterval = setInterval(() => {
        setLoadingText(`Connexion en cours ${dots[i]}`);
        i = (i + 1) % dots.length;
      }, 500);
    }
    
    return () => {
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, [loader]);

  const loginUser = async (values) => {
    setLoader(true);
    setError(null);
    
    try {
      // Simulation d'un délai pour mieux voir l'animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await axios.post('http://192.168.1.2:5002/api/login', {
        email: values.email,
        password: values.password
      });
      
      setResponseData(response.data);
      setLoader(false);
      
      console.log("Réponse de l'API:", response.data);
      
      // Redirection vers l'écran d'onboarding après connexion réussie
      navigation.navigate("Bottom");
      
    } catch (error) {
      setLoader(false);
      
      if (error.response) {
        setError(error.response.data.message || "Identifiants incorrects");
        console.log("Erreur de l'API:", error.response.data);
      } else if (error.request) {
        setError("Impossible de joindre le serveur");
        console.log("Erreur de requête:", error.request);
      } else {
        setError("Une erreur est survenue");
        console.log("Erreur:", error.message);
      }
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert("OAuth", "Connexion avec Google initiée");
    // Après authentification Google réussie, rediriger vers Onboarding
    // Pour simuler, décommentez la ligne suivante:
    // navigation.navigate("Onboarding");
  };

  const handleFacebookSignIn = () => {
    Alert.alert("OAuth", "Connexion avec Facebook initiée");
    // Après authentification Facebook réussie, rediriger vers Onboarding
    // Pour simuler, décommentez la ligne suivante:
    // navigation.navigate("Onboarding");
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {/* Formulaire d'identification classique */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => loginUser(values)}
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
          <View style={styles.formContainer}>
            <View style={styles.wrapper}>
            <Text style={styles.oauthTitle}>Se connecter via </Text>
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
                    keyboardType="email-address"
                    placeholderTextColor={COLORS.lightgray}
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
                    placeholderTextColor={COLORS.lightgray}
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
              btnText={loader ? loadingText : "Se Connecter"}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green_button_back}
              borderColor={COLORS.green_button_back}
              borderWidth={0}
              textColor={COLORS.white}
              disabled={loader}
            />
            
            <View style={styles.navigationLinksContainer}>
              <TouchableOpacity onPress={navigateToForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.registerText}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      
      {/* Séparateur "ou" avec les deux barres horizontales */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.divider} />
      </View>
      
      {/* Boutons OAuth */}
      <View style={styles.oauthContainer}>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={handleGoogleSignIn}
          >
            <Image 
              source={require("../../assets/images/google.png")} 
              style={styles.socialIcon} 
              resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={handleFacebookSignIn}
          >
            <Image 
              source={require("../../assets/images/facebook.png")} 
              style={styles.socialIcon} 
              resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signin;

