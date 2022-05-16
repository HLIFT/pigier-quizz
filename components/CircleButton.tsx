import {GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "../services/constants";

interface CircleButtonProps {
    image: ImageSourcePropType,
    onPress: (event: GestureResponderEvent) => void,
    disabled?: boolean
}

const CircleButton = (props: CircleButtonProps) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: props.disabled ? "#d9d9d9" : Constants.colors.primary,
            padding: 20,
            borderRadius: 50
        },

        image: {
            width: 50,
            height: 50,
            tintColor: Constants.colors.background
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
            <Image style={styles.image} source={props.image} />
        </TouchableOpacity>
    )
}

export default CircleButton
