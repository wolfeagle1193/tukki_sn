// services/api.js
/*import axios from 'axios';
import { API_CONFIG } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Récupérer le refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Pas de refresh token, rediriger vers login
          return Promise.reject(error);
        }
        
        // Appeler l'API pour rafraîchir le token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.REFRESH_TOKEN}`,
          { refreshToken }
        );
        
        if (response.data.status) {
          // Stocker les nouveaux tokens
          await AsyncStorage.setItem('userToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Mettre à jour l'en-tête et réessayer la requête
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // À ce stade, on pourrait vouloir déconnecter l'utilisateur
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonctions d'API exportées
export const api = {
  // Auth
  login: (email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.LOGIN, { email, password });
  },
  
  register: (username, email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.REGISTER, { username, email, password });
  },
  
  logout: () => {
    return apiClient.post(API_CONFIG.ROUTES.LOGOUT);
  },
  
  // Données
  getTreasures: () => {
    return apiClient.get(API_CONFIG.ROUTES.TREASURES);
  },
  
  getBestHotels: () => {
    return apiClient.get(API_CONFIG.ROUTES.BEST_HOTELS);
  },
  getRegions: () => {
    return apiClient.get(API_CONFIG.ROUTES.REGIONS);
  },
  getHotelsByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.HOTELS_BY_REGION}/${regionId}`);
  },
  
  // Vous pouvez ajouter d'autres fonctions d'API selon vos besoins...
};*/


/*import axios from 'axios';
import { API_CONFIG } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Récupérer le refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Pas de refresh token, rediriger vers login
          return Promise.reject(error);
        }
        
        // Appeler l'API pour rafraîchir le token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.REFRESH_TOKEN}`,
          { refreshToken }
        );
        
        if (response.data.status) {
          // Stocker les nouveaux tokens
          await AsyncStorage.setItem('userToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Mettre à jour l'en-tête et réessayer la requête
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // À ce stade, on pourrait vouloir déconnecter l'utilisateur
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour créer un FormData à partir d'une image
const createImageFormData = (imageUri, fieldName = 'profileImage') => {
  const formData = new FormData();
  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append(fieldName, {
    uri: imageUri,
    name: filename || `image_${Date.now()}.jpg`,
    type,
  });

  return formData;
};

// Fonctions d'API exportées
export const api = {
  // Auth
  login: (email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.LOGIN, { email, password });
  },
  
  register: (username, email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.REGISTER, { username, email, password });
  },
  
  logout: () => {
    return apiClient.post(API_CONFIG.ROUTES.LOGOUT);
  },
  
  refreshToken: (refreshToken) => {
    return apiClient.post(API_CONFIG.ROUTES.REFRESH_TOKEN, { refreshToken });
  },
  
  // Gestion utilisateur et profil
  getUserProfile: (userId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.USER_PROFILE}/${userId}`);
  },
  
  updateUserProfile: (userId, userData) => {
    return apiClient.put(`${API_CONFIG.ROUTES.USER_PROFILE}/${userId}`, userData);
  },
  
  // Upload d'image - utilise la route UPLOAD existante
  uploadProfileImage: async (imageUri) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const formData = createImageFormData(imageUri);
      
      // Création d'une instance spéciale pour l'upload d'image avec le bon Content-Type
      return axios({
        method: 'post',
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPLOAD}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      throw error;
    }
  },
  
  // Données
  getTreasures: () => {
    return apiClient.get(API_CONFIG.ROUTES.TREASURES);
  },
  
  getTreasureDetails: (treasureId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURE_DETAILS}/${treasureId}`);
  },
  
  getTreasuresByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURES_BY_REGION}/${regionId}`);
  },
  
  addComment: (treasureId, comment) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_COMMENT, { treasureId, comment });
  },
  
  addReply: (commentId, reply) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_REPLY, { commentId, reply });
  },
  
  likeComment: (commentId) => {
    return apiClient.post(API_CONFIG.ROUTES.LIKE_COMMENT, { commentId });
  },
  
  getBestHotels: () => {
    return apiClient.get(API_CONFIG.ROUTES.BEST_HOTELS);
  },
  
  getHotelsByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.HOTELS_BY_REGION}/${regionId}`);
  },
  
  getRegions: () => {
    return apiClient.get(API_CONFIG.ROUTES.REGIONS);
  },
};

// Export d'une fonction utilitaire pour créer des en-têtes avec token
export const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};*/

// Export de l'instance apiClient pour d'autres usages personnalisés si nécessaire
//export default apiClient;


/*import axios from 'axios';
import { API_CONFIG } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Récupérer le refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Pas de refresh token, rediriger vers login
          return Promise.reject(error);
        }
        
        // Appeler l'API pour rafraîchir le token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.REFRESH_TOKEN}`,
          { refreshToken }
        );
        
        if (response.data.status) {
          // Stocker les nouveaux tokens
          await AsyncStorage.setItem('userToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Mettre à jour l'en-tête et réessayer la requête
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // À ce stade, on pourrait vouloir déconnecter l'utilisateur
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour créer un FormData à partir d'une image
const createImageFormData = (imageUri, fieldName = 'profileImage') => {
  const formData = new FormData();
  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append(fieldName, {
    uri: imageUri,
    name: filename || `image_${Date.now()}.jpg`,
    type,
  });

  return formData;
};

// Fonctions d'API exportées
export const api = {
  // Auth
  login: (email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.LOGIN, { email, password });
  },
  
  register: (username, email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.REGISTER, { username, email, password });
  },
  
  logout: () => {
    return apiClient.post(API_CONFIG.ROUTES.LOGOUT);
  },
  
  refreshToken: (refreshToken) => {
    return apiClient.post(API_CONFIG.ROUTES.REFRESH_TOKEN, { refreshToken });
  },
  
  // Gestion utilisateur et profil
  getUserProfile: (userId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.USER_PROFILE}/${userId}`);
  },
  
  updateUserProfile: (userId, userData) => {
    console.log(`API call: updateUserProfile pour l'utilisateur ${userId}`, userData);
    return apiClient.put(`${API_CONFIG.ROUTES.USER_PROFILE}/${userId}`, userData);
  },
  
  // Upload d'image
  uploadProfileImage: async (imageUri) => {
    try {
      console.log(`API call: uploadProfileImage: ${imageUri}`);
      const token = await AsyncStorage.getItem('userToken');
      const formData = createImageFormData(imageUri);
      
      // Log du FormData (pour débogage)
      console.log('FormData créé pour upload:', 
        Object.fromEntries(formData._parts.map(part => [part[0], 
          typeof part[1] === 'object' ? `[Object: ${JSON.stringify(part[1])}]` : part[1]
        ]))
      );
      
      // Création d'une instance spéciale pour l'upload d'image avec le bon Content-Type
      return axios({
        method: 'post',
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPLOAD}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      throw error;
    }
  },
  
  // Données
  getTreasures: () => {
    return apiClient.get(API_CONFIG.ROUTES.TREASURES);
  },
  
  getTreasureDetails: (treasureId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURE_DETAILS}/${treasureId}`);
  },
  
  getTreasuresByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURES_BY_REGION}/${regionId}`);
  },
  
  addComment: (treasureId, comment) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_COMMENT, { treasureId, comment });
  },
  
  addReply: (commentId, reply) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_REPLY, { commentId, reply });
  },
  
  likeComment: (commentId) => {
    return apiClient.post(API_CONFIG.ROUTES.LIKE_COMMENT, { commentId });
  },
  
  getBestHotels: () => {
    return apiClient.get(API_CONFIG.ROUTES.BEST_HOTELS);
  },
  
  getHotelsByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.HOTELS_BY_REGION}/${regionId}`);
  },
  
  getRegions: () => {
    return apiClient.get(API_CONFIG.ROUTES.REGIONS);
  },
};

// Export d'une fonction utilitaire pour créer des en-têtes avec token
export const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};

// Export de l'instance apiClient pour d'autres usages personnalisés si nécessaire
export default apiClient;*/


import axios from 'axios';
import { API_CONFIG } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Récupérer le refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Pas de refresh token, rediriger vers login
          return Promise.reject(error);
        }
        
        // Appeler l'API pour rafraîchir le token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.REFRESH_TOKEN}`,
          { refreshToken }
        );
        
        if (response.data.status) {
          // Stocker les nouveaux tokens
          await AsyncStorage.setItem('userToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Mettre à jour l'en-tête et réessayer la requête
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // À ce stade, on pourrait vouloir déconnecter l'utilisateur
      }
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour créer un FormData à partir d'une image
const createImageFormData = (imageUri, fieldName = 'profileImage') => {
  const formData = new FormData();
  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append(fieldName, {
    uri: imageUri,
    name: filename || `image_${Date.now()}.jpg`,
    type,
  });

  return formData;
};

// Fonctions d'API exportées
export const api = {
  // Auth
  login: (email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.LOGIN, { email, password });
  },
  
  register: (username, email, password) => {
    return apiClient.post(API_CONFIG.ROUTES.REGISTER, { username, email, password });
  },
  
  logout: () => {
    return apiClient.post(API_CONFIG.ROUTES.LOGOUT);
  },
  
  refreshToken: (refreshToken) => {
    return apiClient.post(API_CONFIG.ROUTES.REFRESH_TOKEN, { refreshToken });
  },
  
  // Gestion utilisateur et profil
  getUserProfile: (userId) => {
    if (userId) {
      return apiClient.get(`${API_CONFIG.ROUTES.USER_PROFILE}/getUser?userId=${userId}`);
    }
    return apiClient.get(`${API_CONFIG.ROUTES.USER_PROFILE}/getUser`);
  },
  
  updateUserProfile: async (userId, userData) => {
    console.log(`API call: updateUserProfile pour l'utilisateur ${userId}`, userData);
    try {
      // Si userData contient une propriété profile qui est un URI local
      if (userData.profile && (userData.profile.startsWith('file://') || userData.profile.startsWith('content://'))) {
        // On doit d'abord uploader l'image
        console.log("Uploading profile image first...");
        const uploadResponse = await api.uploadProfileImage(userData.profile);
        console.log("Upload response:", uploadResponse.data);
        
        if (uploadResponse.data.success) {
          // Remplacer l'URI local par l'URL du serveur
          userData.profile = uploadResponse.data.imageUrl;
          console.log("Image URL replaced with server URL:", userData.profile);
        } else {
          throw new Error(uploadResponse.data.message || "Échec de l'upload de l'image");
        }
      }
      
      // Ensuite, mettre à jour le profil utilisateur
      return apiClient.put(`${API_CONFIG.ROUTES.USER_PROFILE}/updateProfile`, {
        ...userData,
        userId: userId
      });
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
      throw error;
    }
  },
  
  // Upload d'image
  uploadProfileImage: async (imageUri) => {
    try {
      console.log(`API call: uploadProfileImage: ${imageUri}`);
      const token = await AsyncStorage.getItem('userToken');
      
      // Créer un FormData pour l'image
      const formData = new FormData();
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('profileImage', {
        uri: imageUri,
        name: filename || `profile_${Date.now()}.jpg`,
        type,
      });
      
      // Log du FormData pour débogage
      console.log('FormData details:', {
        filename,
        type,
        formDataEntries: [...formData._parts].map(part => ({
          name: part[0],
          value: typeof part[1] === 'object' ? 'Object' : part[1]
        }))
      });
      
      // Options avancées pour la requête
      const config = {
        method: 'post',
        url: `${API_CONFIG.BASE_URL}/api/upload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        timeout: 30000, // 30 secondes
        maxContentLength: 10 * 1024 * 1024, // 10MB
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      };
      
      // Envoyer la requête
      return axios(config);
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },
  
  // Données
  getTreasures: () => {
    return apiClient.get(API_CONFIG.ROUTES.TREASURES);
  },
  
  getTreasureDetails: (treasureId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURE_DETAILS}/${treasureId}`);
  },
  
  getTreasuresByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.TREASURES_BY_REGION}/${regionId}`);
  },
  
  addComment: (treasureId, comment) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_COMMENT, { treasureId, comment });
  },
  
  addReply: (commentId, reply) => {
    return apiClient.post(API_CONFIG.ROUTES.ADD_REPLY, { commentId, reply });
  },
  
  likeComment: (commentId) => {
    return apiClient.post(API_CONFIG.ROUTES.LIKE_COMMENT, { commentId });
  },
  
  getBestHotels: () => {
    return apiClient.get(API_CONFIG.ROUTES.BEST_HOTELS);
  },
  
  getHotelsByRegion: (regionId) => {
    return apiClient.get(`${API_CONFIG.ROUTES.HOTELS_BY_REGION}/${regionId}`);
  },
  
  getRegions: () => {
    return apiClient.get(API_CONFIG.ROUTES.REGIONS);
  },
};

// Export d'une fonction utilitaire pour créer des en-têtes avec token
export const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};

// Export de l'instance apiClient pour d'autres usages personnalisés si nécessaire
export default apiClient;