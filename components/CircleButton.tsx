import {GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "../services/constants";

interface CircleButtonProps {
    image: ImageSourcePropType,
    onPress: (event: GestureResponderEvent) => void
}

const CircleButton = (props: CircleButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image style={styles.image} source={props.image} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.primary,
        padding: 20,
        borderRadius: 50
    },

    image: {
        width: 50,
        height: 50,
        tintColor: Constants.colors.background
    }
})

export default CircleButton
