import {GestureResponderEvent, Text, TouchableOpacity, View} from "react-native";
import {appStyles} from "../assets/styles/app.style";

interface PrimaryButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <TouchableOpacity style={appStyles.primaryButton} onPress={props.onPress}>
            <Text style={appStyles.primaryButtonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton
