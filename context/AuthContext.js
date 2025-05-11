/*import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // États pour gérer l'authentification
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour stocker les données d'authentification dans AsyncStorage
  const storeAuthData = async (token, refresh, user) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors du stockage des données:', error);
    }
  };

  // Fonction pour récupérer les données d'authentification depuis AsyncStorage
  const getAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const refresh = await AsyncStorage.getItem('refreshToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && refresh) {
        setUserToken(token);
        setRefreshToken(refresh);
        
        if (userInfoString) {
          setUserInfo(JSON.parse(userInfoString));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Fonction pour supprimer les données d'authentification d'AsyncStorage
  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  };

  // Fonction pour la connexion
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.login(email, password);
      
      if (response.data.status) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(user);
        
        // Stocker dans AsyncStorage
        await storeAuthData(accessToken, refreshToken, user);
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Échec de la connexion');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour l'inscription
  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.register(username, email, password);
      
      if (response.data.status) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Échec de l\'inscription');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (userToken) {
        // Appel à l'API pour la déconnexion
        await api.logout().catch(err => console.error("Erreur lors de la déconnexion API:", err));
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Même si l'appel à l'API échoue, on supprime les données locales
      setUserToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      await removeAuthData();
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir le token
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;
      
      const response = await api.refreshToken(refreshToken);
      
      if (response.data.status) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(newRefreshToken);
        
        // Stocker dans AsyncStorage
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  };

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      await getAuthData();
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login,
        register,
        logout,
        refreshAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};*/

/*import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // États pour gérer l'authentification
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour stocker les données d'authentification dans AsyncStorage
  const storeAuthData = async (token, refresh, user) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors du stockage des données:', error);
    }
  };

  // Fonction pour récupérer les données d'authentification depuis AsyncStorage
  const getAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const refresh = await AsyncStorage.getItem('refreshToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && refresh) {
        setUserToken(token);
        setRefreshToken(refresh);
        
        if (userInfoString) {
          setUserInfo(JSON.parse(userInfoString));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Fonction pour supprimer les données d'authentification d'AsyncStorage
  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  };

  // Fonction pour la connexion
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.login(email, password);
      
      if (response.data.status) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(user);
        
        // Stocker dans AsyncStorage
        await storeAuthData(accessToken, refreshToken, user);
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Échec de la connexion');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour l'inscription
  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.register(username, email, password);
      
      if (response.data.status) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Échec de l\'inscription');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (userToken) {
        // Appel à l'API pour la déconnexion
        await api.logout().catch(err => console.error("Erreur lors de la déconnexion API:", err));
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Même si l'appel à l'API échoue, on supprime les données locales
      setUserToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      await removeAuthData();
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir le token
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;
      
      const response = await api.refreshToken(refreshToken);
      
      if (response.data.status) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(newRefreshToken);
        
        // Stocker dans AsyncStorage
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  };

  // NOUVELLE FONCTION: Mise à jour du profil utilisateur
  const updateUserProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier si nous avons les informations utilisateur
      if (!userInfo || !userInfo._id) {
        throw new Error('Informations utilisateur non disponibles');
      }
      
      // Si profileData contient une image et que c'est un URI local (commence par 'file://' ou 'content://')
      if (profileData.profile && (
          profileData.profile.startsWith('file://') || 
          profileData.profile.startsWith('content://'))
      ) {
        console.log('Upload de l\'image de profil...');
        
        // Upload de l'image d'abord
        const uploadResponse = await api.uploadProfileImage(profileData.profile);
        
        if (uploadResponse.data.success || uploadResponse.data.status) {
          // Remplacer l'URI local par l'URL du serveur
          profileData.profile = uploadResponse.data.imageUrl || uploadResponse.data.url;
          console.log('Image uploadée avec succès:', profileData.profile);
        } else {
          throw new Error(uploadResponse.data.message || "Échec de l'upload de l'image");
        }
      }
      
      // Mettre à jour le profil sur le serveur
      console.log('Mise à jour du profil utilisateur:', profileData);
      const response = await api.updateUserProfile(userInfo._id, profileData);
      
      if (response.data.success || response.data.status) {
        // Récupérer les données mises à jour de l'utilisateur depuis la réponse
        const updatedUser = response.data.user || response.data.updatedUser || {
          ...userInfo,
          ...profileData,
        };
        
        // Mettre à jour les informations locales
        setUserInfo(updatedUser);
        
        // Mettre à jour dans AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        
        return { success: true, message: response.data.message || 'Profil mis à jour avec succès' };
      } else {
        throw new Error(response.data.message || "Échec de la mise à jour du profil");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      
      let errorMessage = "Une erreur est survenue lors de la mise à jour du profil";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // En mode développement, on peut gérer les mises à jour d'image localement
  const handleLocalProfileUpdate = async (imageUri) => {
    if (__DEV__ && userInfo) {
      try {
        // Mise à jour locale pour les tests
        const updatedUser = { ...userInfo, profile: imageUri };
        setUserInfo(updatedUser);
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        return { success: true, message: 'Profil mis à jour localement (mode DEV)' };
      } catch (error) {
        console.error('Erreur lors de la mise à jour locale:', error);
        return { success: false, message: error.message };
      }
    }
    return { success: false, message: 'Non disponible en mode production' };
  };

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      await getAuthData();
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login,
        register,
        logout,
        refreshAccessToken,
        updateUserProfile,
        handleLocalProfileUpdate, // Utile pour les tests locaux
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};*/




/*import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // États pour gérer l'authentification
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour stocker les données d'authentification dans AsyncStorage
  const storeAuthData = async (token, refresh, user) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors du stockage des données:', error);
    }
  };

  // Fonction pour récupérer les données d'authentification depuis AsyncStorage
  const getAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const refresh = await AsyncStorage.getItem('refreshToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && refresh) {
        setUserToken(token);
        setRefreshToken(refresh);
        
        if (userInfoString) {
          setUserInfo(JSON.parse(userInfoString));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Fonction pour supprimer les données d'authentification d'AsyncStorage
  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  };

  // Fonction pour la connexion
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.login(email, password);
      
      if (response.data.status) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(user);
        
        // Stocker dans AsyncStorage
        await storeAuthData(accessToken, refreshToken, user);
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Échec de la connexion');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour l'inscription
  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.register(username, email, password);
      
      if (response.data.status) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Échec de l\'inscription');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (userToken) {
        // Appel à l'API pour la déconnexion
        await api.logout().catch(err => console.error("Erreur lors de la déconnexion API:", err));
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Même si l'appel à l'API échoue, on supprime les données locales
      setUserToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      await removeAuthData();
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir le token
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;
      
      const response = await api.refreshToken(refreshToken);
      
      if (response.data.status) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(newRefreshToken);
        
        // Stocker dans AsyncStorage
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  };

  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier si nous avons les informations utilisateur
      if (!userInfo) {
        console.error("updateUserProfile: userInfo est null");
        throw new Error('Informations utilisateur non disponibles');
      }
      
      // Récupérer l'ID utilisateur (peut être id ou _id selon votre backend)
      const userId = userInfo.id || userInfo._id;
      
      if (!userId) {
        console.error("updateUserProfile: ID utilisateur manquant", userInfo);
        throw new Error('ID utilisateur non disponible');
      }
      
      console.log(`Mise à jour du profil pour l'utilisateur: ${userId}`);
      
      // Si profileData contient une image et que c'est un URI local
      if (profileData.profile && (
          profileData.profile.startsWith('file://') || 
          profileData.profile.startsWith('content://'))
      ) {
        console.log('Upload de l\'image de profil:', profileData.profile);
        
        // Upload de l'image d'abord
        const uploadResponse = await api.uploadProfileImage(profileData.profile);
        console.log('Réponse upload:', uploadResponse.data);
        
        if (uploadResponse.data.success || uploadResponse.data.status) {
          // Remplacer l'URI local par l'URL du serveur
          profileData.profile = uploadResponse.data.imageUrl || uploadResponse.data.url;
          console.log('Image uploadée avec succès:', profileData.profile);
        } else {
          throw new Error(uploadResponse.data.message || "Échec de l'upload de l'image");
        }
      }
      
      // Mettre à jour le profil sur le serveur
      console.log('Appel API pour mise à jour du profil:', profileData);
      const response = await api.updateUserProfile(userId, profileData);
      console.log('Réponse mise à jour profil:', response.data);
      
      if (response.data.success || response.data.status) {
        // Récupérer les données mises à jour de l'utilisateur depuis la réponse
        const updatedUser = response.data.user || response.data.updatedUser || {
          ...userInfo,
          ...profileData,
        };
        
        // Mettre à jour les informations locales
        setUserInfo(updatedUser);
        
        // Mettre à jour dans AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        
        return { success: true, message: response.data.message || 'Profil mis à jour avec succès' };
      } else {
        throw new Error(response.data.message || "Échec de la mise à jour du profil");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      
      let errorMessage = "Une erreur est survenue lors de la mise à jour du profil";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // En mode développement, on peut gérer les mises à jour d'image localement
  const handleLocalProfileUpdate = async (imageUri) => {
    if (__DEV__ && userInfo) {
      try {
        console.log('Mise à jour locale du profil (mode DEV)');
        // Mise à jour locale pour les tests
        const updatedUser = { ...userInfo, profile: imageUri };
        setUserInfo(updatedUser);
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        return { success: true, message: 'Profil mis à jour localement (mode DEV)' };
      } catch (error) {
        console.error('Erreur lors de la mise à jour locale:', error);
        return { success: false, message: error.message };
      }
    }
    return { success: false, message: 'Non disponible en mode production' };
  };

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      await getAuthData();
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login,
        register,
        logout,
        refreshAccessToken,
        updateUserProfile,
        handleLocalProfileUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};*/


import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // États pour gérer l'authentification
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour stocker les données d'authentification dans AsyncStorage
  const storeAuthData = async (token, refresh, user) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors du stockage des données:', error);
    }
  };

  // Fonction pour récupérer les données d'authentification depuis AsyncStorage
  const getAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const refresh = await AsyncStorage.getItem('refreshToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      
      if (token && refresh) {
        setUserToken(token);
        setRefreshToken(refresh);
        
        if (userInfoString) {
          setUserInfo(JSON.parse(userInfoString));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Fonction pour supprimer les données d'authentification d'AsyncStorage
  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
    }
  };

  // Fonction pour la connexion
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.login(email, password);
      
      if (response.data.status) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(refreshToken);
        setUserInfo(user);
        
        // Stocker dans AsyncStorage
        await storeAuthData(accessToken, refreshToken, user);
        
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Échec de la connexion');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour l'inscription
  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.register(username, email, password);
      
      if (response.data.status) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Échec de l\'inscription');
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour la déconnexion
  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (userToken) {
        // Appel à l'API pour la déconnexion
        await api.logout().catch(err => console.error("Erreur lors de la déconnexion API:", err));
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Même si l'appel à l'API échoue, on supprime les données locales
      setUserToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      await removeAuthData();
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir le token
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;
      
      const response = await api.refreshToken(refreshToken);
      
      if (response.data.status) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Mettre à jour l'état
        setUserToken(accessToken);
        setRefreshToken(newRefreshToken);
        
        // Stocker dans AsyncStorage
        await AsyncStorage.setItem('userToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  };

  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier si nous avons les informations utilisateur
      if (!userInfo) {
        console.error("updateUserProfile: userInfo est null");
        throw new Error('Informations utilisateur non disponibles');
      }
      
      // Récupérer l'ID utilisateur (peut être id ou _id selon votre backend)
      const userId = userInfo.id || userInfo._id;
      
      if (!userId) {
        console.error("updateUserProfile: ID utilisateur manquant", userInfo);
        throw new Error('ID utilisateur non disponible');
      }
      
      console.log(`Mise à jour du profil pour l'utilisateur: ${userId}`);
      
      // Si profileData contient une image et que c'est un URI local
      if (profileData.profile && (
          profileData.profile.startsWith('file://') || 
          profileData.profile.startsWith('content://'))
      ) {
        console.log('Upload de l\'image de profil:', profileData.profile);
        
        try {
          // Upload de l'image d'abord
          const uploadResponse = await api.uploadProfileImage(profileData.profile);
          console.log('Réponse upload:', uploadResponse.data);
          
          if (uploadResponse.data.success || uploadResponse.data.status) {
            // Remplacer l'URI local par l'URL du serveur
            profileData.profile = uploadResponse.data.imageUrl || uploadResponse.data.url || uploadResponse.data.image;
            console.log('Image uploadée avec succès:', profileData.profile);
          } else {
            throw new Error(uploadResponse.data.message || "Échec de l'upload de l'image");
          }
        } catch (uploadError) {
          console.error('Erreur lors de l\'upload de l\'image:', uploadError);
          // Continuer malgré l'échec de l'upload, mais loguer l'erreur
          // En mode DEV, on peut utiliser l'URI local pour tester
          if (__DEV__) {
            console.log('Mode DEV: utilisation de l\'URI local pour le test');
          } else {
            throw uploadError;
          }
        }
      }
      
      // Mettre à jour le profil sur le serveur
      console.log('Appel API pour mise à jour du profil:', profileData);
      const response = await api.updateUserProfile(userId, profileData);
      console.log('Réponse mise à jour profil:', response.data);
      
      if (response.data.success || response.data.status) {
        // Récupérer les données mises à jour de l'utilisateur depuis la réponse
        const updatedUser = response.data.user || response.data.updatedUser || {
          ...userInfo,
          ...profileData,
        };
        
        // Mettre à jour les informations locales
        setUserInfo(updatedUser);
        
        // Mettre à jour dans AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        
        return { success: true, message: response.data.message || 'Profil mis à jour avec succès' };
      } else {
        throw new Error(response.data.message || "Échec de la mise à jour du profil");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      
      let errorMessage = "Une erreur est survenue lors de la mise à jour du profil";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // En mode développement, on peut gérer les mises à jour d'image localement
  const handleLocalProfileUpdate = async (imageUri) => {
    if (__DEV__ && userInfo) {
      try {
        console.log('Mise à jour locale du profil (mode DEV)');
        // Mise à jour locale pour les tests
        const updatedUser = { ...userInfo, profile: imageUri };
        setUserInfo(updatedUser);
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
        return { success: true, message: 'Profil mis à jour localement (mode DEV)' };
      } catch (error) {
        console.error('Erreur lors de la mise à jour locale:', error);
        return { success: false, message: error.message };
      }
    }
    return { success: false, message: 'Non disponible en mode production' };
  };

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      await getAuthData();
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        error,
        login,
        register,
        logout,
        refreshAccessToken,
        updateUserProfile,
        handleLocalProfileUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};