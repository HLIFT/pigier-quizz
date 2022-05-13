import {TouchableOpacity, Image, ImageSourcePropType, StyleSheet, GestureResponderEvent} from "react-native";
import Constants from "../services/constants";

interface ActionCardProps {
    image: ImageSourcePropType,
    onPress: (event: GestureResponderEvent) => void,
    disabled?: boolean
}

const ActionCard = ({image, disabled, onPress}: ActionCardProps) => {
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: disabled ? "#d9d9d9" : Constants.colors.primary,
            margin: 10,
            borderRadius: 15
        },
        image: {
            width: 50,
            height: 50,
            tintColor: Constants.colors.background
        }
    })

    return (
        <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
            <Image style={styles.image} source={image} />
        </TouchableOpacity>
    )
}

export default ActionCard
