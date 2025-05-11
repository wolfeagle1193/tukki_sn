/*import { COLORS } from "../../components/constants/Theme";
import { StyleSheet } from "react-native";
const styles =StyleSheet.create({
    box:{
        backgroundColor : COLORS.white,
        width:32,
        height:32,
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center",
        

    }
})
export default styles*/

/*import { COLORS } from "../../components/constants/Theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    box: {
        backgroundColor: COLORS.white,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    // Nouveaux styles pour l'image de profil
    profileImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 16, // La moitié de la largeur/hauteur pour le rendre parfaitement rond
        backgroundColor: COLORS.lightWhite,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGrey
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default styles;*/


/*import { COLORS } from "../../components/constants/Theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    box: {
        backgroundColor: COLORS.white,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    // Nouveaux styles pour l'image de profil
    profileImageContainer: {
        width: 34,
        height: 34,
        borderRadius: 17, // La moitié de la largeur/hauteur pour le rendre parfaitement rond
       // backgroundColor: COLORS.green_accueil,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.green_accueil
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default styles;*/

/*import { StyleSheet } from "react-native";
import { COLORS } from "../../components/constants/Theme";

const styles = StyleSheet.create({
    box: {
        backgroundColor: COLORS.white,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    // Styles améliorés pour le conteneur d'image de profil
    profileImageContainer: {
        width: 34,
        height: 34,
        borderRadius: 17,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.green_accueil,
        backgroundColor: COLORS.white, // Fond blanc comme base
    },
    // Style pour l'image elle-même
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    // Nouveau style pour le conteneur de fallback
    fallbackContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: COLORS.green_accueil,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Style pour l'initiale de l'utilisateur (fallback)
    initialContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;*/


import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../components/constants/Theme";

const styles = StyleSheet.create({
    box: {
        backgroundColor: COLORS.white,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImageContainer: {
        width: 34,
        height: 34,
        borderRadius: 17,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.green_accueil,
        backgroundColor: COLORS.white,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    initialCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 17,
        backgroundColor: COLORS.green_accueil,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;
