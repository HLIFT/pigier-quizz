import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {appStyles} from "../assets/styles/app.style";
import Constants from "../services/constants";

interface SecondaryButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const SecondaryButton = (props: SecondaryButtonProps) => {
    return (
        <TouchableOpacity style={styles.secondaryButton} onPress={props.onPress}>
            <Text style={styles.secondaryButtonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    secondaryButton: {
        backgroundColor: Constants.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: '60%',
        marginHorizontal: 50
    },

    secondaryButtonText: {
        color: Constants.colors.background,
        fontSize: 18,
        textAlign: "center"
    },
})

export default SecondaryButton
