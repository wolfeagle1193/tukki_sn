
/*import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from "../../components/constants/Theme";
import styles from './signup.style';

// Composants réutilisables
import { ReusableBtn } from '../../components';
import { WidthSpacer, HeightSpacer } from "../../components";


const Registration = ({ navigation }) => {
  const [obscureText, setObscureText] = useState(true);
  const [obscureConfirmText, setObscureConfirmText] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formikRef = useRef(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères')
      .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
      .email('Format d\'email invalide')
      .required('L\'email est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise')
  });

  const registerUser = async (userData) => {
    setLoader(true);
    setError(null);

    const API_URL = 'http:// 192.168.1.6:5002/api'; 
    
    console.log(`Tentative de connexion à: ${API_URL}/register avec les données:`, userData);
    
    try {
      console.log('Démarrage de la requête fetch...');
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      console.log('Réponse reçue, statut:', response.status);
      
      const textResponse = await response.text();
      console.log('Texte de réponse brut:', textResponse);
      
      let data;
      try {
        data = JSON.parse(textResponse);
        console.log('Données JSON parsées:', data);
      } catch (e) {
        console.error('Erreur lors du parsing JSON:', e);
        throw new Error('Réponse non-JSON reçue du serveur');
      }
      
      if (!response.ok) {
        throw new Error(data.message || `Erreur serveur: ${response.status}`);
      }
      
      setSuccess(true);
      return data;
    } catch (err) {
      console.error('Erreur complète:', err);
      
      if (err.message.includes('Network request failed')) {
        setError(`Impossible de se connecter au serveur sur ${API_URL}. Vérifiez que le serveur est en cours d'exécution et accessible.`);
      } else {
        setError(err.message || 'Une erreur est survenue lors de la connexion au serveur');
      }
      return null;
    } finally {
      setLoader(false);
    }
  };

  const handleRedirectToLogin = () => {
    navigation.navigate("Login");
  };

  const handleSubmitWithDelay = async (values, formikActions) => {
    setLoader(true);
    
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password
    };
    
    setTimeout(async () => {
      const result = await registerUser(userData);
      
      if (result) {
        formikActions.resetForm();
        Alert.alert(
          "Inscription réussie",
          "Votre compte a été créé avec succès! Voulez-vous vous connecter maintenant?",
          [
            { text: "Plus tard", style: "cancel" },
            { text: "Se connecter", onPress: () => navigation?.navigate("Login") }
          ]
        );
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          {success && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Inscription réussie! Vous pouvez maintenant vous connecter.
              </Text>
              <TouchableOpacity 
                style={styles.loginRedirectBtn}
                onPress={handleRedirectToLogin}
              >
                <Text style={styles.loginRedirectText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          )}

          {!success && (
            <Formik
              innerRef={formikRef}
              initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => handleSubmitWithDelay(values, formikActions)}
            >
              {({
                handleChange,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                dirty
              }) => (
                <View>
                  {/* Champ nom d'utilisateur 
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
                          onChangeText={handleChange("username")}
                          placeholder="Entrer votre nom d'utilisateur"
                          onFocus={() => setFieldTouched("username")}
                          onBlur={() => setFieldTouched("username", "")}
                          value={values.username}
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

                  {/* Champ email 
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
                          keyboardType="email-address"
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text style={styles.errorMessage}>{errors.email}</Text>
                      )}
                    </View>
                  </View>

                  {/* Champ mot de passe 
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

                  {/* Champ confirmation mot de passe 
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <View>
                      <View
                        style={styles.inputWrapper(
                          touched.confirmPassword ? COLORS.green_accueil : COLORS.lightgray
                        )}
                      >
                        <MaterialCommunityIcons
                          name="lock-check-outline"
                          size={20}
                          color={COLORS.black}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          secureTextEntry={obscureConfirmText}
                          placeholder="Confirmer votre mot de passe"
                          onFocus={() => setFieldTouched("confirmPassword")}
                          onBlur={() => setFieldTouched("confirmPassword", "")}
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{ flex: 1 }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setObscureConfirmText(!obscureConfirmText);
                          }}
                        >
                          <MaterialCommunityIcons
                            name={!obscureConfirmText ? "eye-outline" : "eye-off-outline"}
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                  </View>

                  {/* Bouton d'inscription 
                  <HeightSpacer height={20} />
                  <ReusableBtn
                    onPress={handleSubmit}
                    btnText={"S'inscrire"}
                    width={SIZES.width - 40}
                    backgroundColor={COLORS.green_button_back} 
                    borderColor={COLORS.black}
                    borderWidth={0}
                    textColor={COLORS.white}
                    loader={loader}
                    disabled={!isValid || !dirty || loader}
                  />
                </View>
              )}
            </Formik>
          )}

          {/* Lien vers la page de connexion 
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Vous avez déjà un compte? </Text>
            <TouchableOpacity onPress={handleRedirectToLogin}>
              <Text style={styles.signupText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;*/



/*import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from "../../components/constants/Theme";
import styles from './signup.style';
import { ReusableBtn } from '../../components';
import { WidthSpacer, HeightSpacer } from "../../components";
import { AuthContext } from "../../context"; // Importation du contexte d'authentification

const Registration = ({ navigation }) => {
  const [obscureText, setObscureText] = useState(true);
  const [obscureConfirmText, setObscureConfirmText] = useState(true);
  const [success, setSuccess] = useState(false);
  const formikRef = useRef(null);

  // Utilisation du contexte d'authentification
  const { register, isLoading, error: authError } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères')
      .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
      .email('Format d\'email invalide')
      .required('L\'email est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise')
  });

  const handleRedirectToLogin = () => {
    navigation.navigate("Login");
  };

  const handleSubmitWithDelay = async (values, formikActions) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password
    };
    
    // Utiliser la fonction register du contexte d'authentification
    const result = await register(userData.username, userData.email, userData.password);
    
    if (result.success) {
      setSuccess(true);
      formikActions.resetForm();
      Alert.alert(
        "Inscription réussie",
        "Votre compte a été créé avec succès! Voulez-vous vous connecter maintenant?",
        [
          { text: "Plus tard", style: "cancel" },
          { text: "Se connecter", onPress: () => navigation?.navigate("Login") }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {authError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          )}
          
          {success && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Inscription réussie! Vous pouvez maintenant vous connecter.
              </Text>
              <TouchableOpacity 
                style={styles.loginRedirectBtn}
                onPress={handleRedirectToLogin}
              >
                <Text style={styles.loginRedirectText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          )}

          {!success && (
            <Formik
              innerRef={formikRef}
              initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => handleSubmitWithDelay(values, formikActions)}
            >
              {({
                handleChange,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                dirty
              }) => (
                <View>
                  {/* Champ nom d'utilisateur 
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
                          onChangeText={handleChange("username")}
                          placeholder="Entrer votre nom d'utilisateur"
                          onFocus={() => setFieldTouched("username")}
                          onBlur={() => setFieldTouched("username", "")}
                          value={values.username}
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

                  {/* Champ email 
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
                          keyboardType="email-address"
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text style={styles.errorMessage}>{errors.email}</Text>
                      )}
                    </View>
                  </View>

                  {/* Champ mot de passe 
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

                  {/* Champ confirmation mot de passe 
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <View>
                      <View
                        style={styles.inputWrapper(
                          touched.confirmPassword ? COLORS.green_accueil : COLORS.lightgray
                        )}
                      >
                        <MaterialCommunityIcons
                          name="lock-check-outline"
                          size={20}
                          color={COLORS.black}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          secureTextEntry={obscureConfirmText}
                          placeholder="Confirmer votre mot de passe"
                          onFocus={() => setFieldTouched("confirmPassword")}
                          onBlur={() => setFieldTouched("confirmPassword", "")}
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{ flex: 1 }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setObscureConfirmText(!obscureConfirmText);
                          }}
                        >
                          <MaterialCommunityIcons
                            name={!obscureConfirmText ? "eye-outline" : "eye-off-outline"}
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                  </View>

                  {/* Bouton d'inscription 
                  <HeightSpacer height={20} />
                  <ReusableBtn
                    onPress={handleSubmit}
                    btnText={"S'inscrire"}
                    width={SIZES.width - 40}
                    backgroundColor={COLORS.green_button_back} 
                    borderColor={COLORS.black}
                    borderWidth={0}
                    textColor={COLORS.white}
                    loader={isLoading}
                    disabled={!isValid || !dirty || isLoading}
                  />
                </View>
              )}
            </Formik>
          )}

          {/* Lien vers la page de connexion 
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Vous avez déjà un compte? </Text>
            <TouchableOpacity onPress={handleRedirectToLogin}>
              <Text style={styles.signupText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;*/



import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from "../../components/constants/Theme";
import styles from './signup.style';
import { ReusableBtn } from '../../components';
import { WidthSpacer, HeightSpacer } from "../../components";
import { AuthContext } from "../../context"; // Importation du contexte d'authentification

const Registration = ({ navigation }) => {
  const [obscureText, setObscureText] = useState(true);
  const [obscureConfirmText, setObscureConfirmText] = useState(true);
  const [success, setSuccess] = useState(false);
  const formikRef = useRef(null);

  // Utilisation du contexte d'authentification
  const { register, isLoading, error: authError } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères')
      .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
      .email('Format d\'email invalide')
      .required('L\'email est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise')
  });

  const handleRedirectToLogin = () => {
    navigation.navigate("Login");
  };

  const handleSubmitWithDelay = async (values, formikActions) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password
    };
    
    // Utilisation de la fonction register du contexte d'authentification
    const result = await register(userData.username, userData.email, userData.password);
    
    if (result && result.success) {
      setSuccess(true);
      formikActions.resetForm();
      Alert.alert(
        "Inscription réussie",
        "Votre compte a été créé avec succès! Voulez-vous vous connecter maintenant?",
        [
          { text: "Plus tard", style: "cancel" },
          { text: "Se connecter", onPress: () => navigation?.navigate("Login") }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Affichage des erreurs d'authentification */}
          {authError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          )}
          
          {success && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Inscription réussie! Vous pouvez maintenant vous connecter.
              </Text>
              <TouchableOpacity 
                style={styles.loginRedirectBtn}
                onPress={handleRedirectToLogin}
              >
                <Text style={styles.loginRedirectText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          )}

          {!success && (
            <Formik
              innerRef={formikRef}
              initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => handleSubmitWithDelay(values, formikActions)}
            >
              {({
                handleChange,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                dirty
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
                          onChangeText={handleChange("username")}
                          placeholder="Entrer votre nom d'utilisateur"
                          onFocus={() => setFieldTouched("username")}
                          onBlur={() => setFieldTouched("username", "")}
                          value={values.username}
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
                          onChangeText={handleChange("email")}
                          placeholder="Entrer votre email"
                          onFocus={() => setFieldTouched("email")}
                          onBlur={() => setFieldTouched("email", "")}
                          value={values.email}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{ flex: 1 }}
                          keyboardType="email-address"
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

                  {/* Champ confirmation mot de passe */}
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <View>
                      <View
                        style={styles.inputWrapper(
                          touched.confirmPassword ? COLORS.green_accueil : COLORS.lightgray
                        )}
                      >
                        <MaterialCommunityIcons
                          name="lock-check-outline"
                          size={20}
                          color={COLORS.black}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          secureTextEntry={obscureConfirmText}
                          placeholder="Confirmer votre mot de passe"
                          onFocus={() => setFieldTouched("confirmPassword")}
                          onBlur={() => setFieldTouched("confirmPassword", "")}
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{ flex: 1 }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setObscureConfirmText(!obscureConfirmText);
                          }}
                        >
                          <MaterialCommunityIcons
                            name={!obscureConfirmText ? "eye-outline" : "eye-off-outline"}
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
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
                    loader={isLoading}
                    disabled={!isValid || !dirty || isLoading}
                  />
                </View>
              )}
            </Formik>
          )}

          {/* Lien vers la page de connexion */}
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Vous avez déjà un compte? </Text>
            <TouchableOpacity onPress={handleRedirectToLogin}>
              <Text style={styles.signupText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;