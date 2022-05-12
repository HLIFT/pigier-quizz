import {Platform, StatusBar, StyleSheet} from "react-native";
import Constants from "../../services/constants";

export const appStyles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Constants.colors.background
    },

    safeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    primaryButton: {
        backgroundColor: Constants.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    },

    primaryButtonText: {
        color: Constants.colors.background,
        fontSize: 20
    }
})
