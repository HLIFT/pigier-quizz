import {TouchableOpacity, Image, ImageSourcePropType, StyleSheet} from "react-native";
import Constants from "../services/constants";

interface ActionCardProps {
    image: ImageSourcePropType
}

const ActionCard = ({image}: ActionCardProps) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={image} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: 130,
        height: 130,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.colors.primary,
        margin: 20,
        borderRadius: 15
    },
    image: {
        width: 50,
        height: 50,
        tintColor: Constants.colors.background
    }
})

export default ActionCard
