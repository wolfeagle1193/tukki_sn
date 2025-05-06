import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../components/constants/Theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
  },
  inputWrapper: (borderColor) => ({
    backgroundColor: '#F5F5F5',
    borderColor: borderColor,
    borderWidth: 0.5,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  errorMessage: {
    color: COLORS.red,
    fontSize: SIZES.small,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: COLORS.red,
    fontSize: SIZES.small,
    fontFamily: "medium",
    textAlign: "center",
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#2E7D32',
    fontSize: SIZES.small,
    fontFamily: "medium",
    textAlign: "center",
    marginBottom: 10,
  },
  loginRedirectBtn: {
    backgroundColor: COLORS.green_button_back,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  loginRedirectText: {
    color: COLORS.white,
    fontFamily: "medium",
    fontSize: SIZES.small,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  noAccountText: {
    color: COLORS.black,
    fontFamily: "regular",
    fontSize: SIZES.small,
  },
  signupText: {
    color: COLORS.green_accueil,
    fontFamily: "medium",
    fontSize: SIZES.small,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green_accueil,
    borderRadius: 12,
    padding: 12,
    flex: 0.48,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
    elevation: 1,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontFamily: 'medium',
    fontSize: SIZES.small,
    color: COLORS.white,
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightgray,
  },
  dividerText: {
    paddingHorizontal: 10,
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  }
});
export default styles;