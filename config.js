// config.js
/*export const API_CONFIG = {
    // URL de base pour l'environnement de développement
    BASE_URL: 'http://192.168.1.4:5002/api',
    
    // Timeout en millisecondes
    TIMEOUT: 10000,
    
    // Routes principales
    ROUTES: {
      // Auth
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      REFRESH_TOKEN: '/refresh-token',
      
      // Treasures (lieux)
      TREASURES: '/treasures/getTreasure',
      TREASURE_DETAILS: '/treasures/getTreasureDetails',
      TREASURES_BY_REGION: '/treasures/getTreasuresByRegion',
      ADD_COMMENT: '/treasures/addComment',
      ADD_REPLY: '/treasures/addReply',
      LIKE_COMMENT: '/treasures/likeComment',
      
      // Hôtels
      BEST_HOTELS: '/besthotels/getBestHotels',
      HOTELS_BY_REGION: '/besthotels/getHotelsByRegion',
      
      // Régions
      REGIONS: '/regions/getRegion',
      
      // User
      USER_PROFILE: '/users',
      
      // Upload
      UPLOAD: '/upload',
    }
  };*/


  /*export const API_CONFIG = {
    // URL de base pour l'environnement de développement
    BASE_URL: 'http://192.168.1.4:5002/api',
    
    // Timeout en millisecondes
    TIMEOUT: 10000,
    
    // Routes principales
    ROUTES: {
      // Auth
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      REFRESH_TOKEN: '/refresh-token',
      
      // Treasures (lieux)
      TREASURES: '/treasures/getTreasure',
      TREASURE_DETAILS: '/treasures/getTreasureDetails',
      TREASURES_BY_REGION: '/treasures/getTreasuresByRegion',
      ADD_COMMENT: '/treasures/addComment',
      ADD_REPLY: '/treasures/addReply',
      LIKE_COMMENT: '/treasures/likeComment',
      
      // Hôtels
      BEST_HOTELS: '/besthotels/getBestHotels',
      HOTELS_BY_REGION: '/besthotels/getHotelsByRegion',
      
      // Régions
      REGIONS: '/regions/getRegion',
      
      // User
      USER_PROFILE: '/users/me', // Route pour l'utilisateur authentifié actuel
      UPDATE_USER_PROFILE: '/users/update', // Pour mettre à jour le profil de l'utilisateur actuel
      
      // Upload
      UPLOAD: '/upload',
      UPLOAD_PROFILE_IMAGE: '/upload/profile', // Spécifique aux avatars
    }
  };*/


  export const API_CONFIG = {
    // URL de base pour l'environnement de développement
    BASE_URL: 'http://192.168.1.4:5002/api',
    
    // Timeout en millisecondes
    TIMEOUT: 30000, // Augmenté pour gérer les uploads d'images
    
    // Routes principales
    ROUTES: {
      // Auth
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      REFRESH_TOKEN: '/refresh-token',
      
      // Treasures (lieux)
      TREASURES: '/treasures/getTreasure',
      TREASURE_DETAILS: '/treasures/getTreasureDetails',
      TREASURES_BY_REGION: '/treasures/getTreasuresByRegion',
      ADD_COMMENT: '/treasures/addComment',
      ADD_REPLY: '/treasures/addReply',
      LIKE_COMMENT: '/treasures/likeComment',
      
      // Hôtels
      BEST_HOTELS: '/besthotels/getBestHotels',
      HOTELS_BY_REGION: '/besthotels/getHotelsByRegion',
      
      // Régions
      REGIONS: '/regions/getRegion',
      
      // User
      USER_PROFILE: '/users',
      UPDATE_USER_PROFILE: '/users/updateProfile',
      
      // Upload
      UPLOAD: '/upload',
    }
  };