import {GestureResponderEvent, Text, TouchableOpacity, View} from "react-native";
import {appStyles} from "../assets/styles/app.style";

interface SecondaryButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const SecondaryButton = (props: SecondaryButtonProps) => {
    return (
        <TouchableOpacity style={appStyles.secondaryButton} onPress={props.onPress}>
            <Text style={appStyles.secondaryButtonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default SecondaryButton
