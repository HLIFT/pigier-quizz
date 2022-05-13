import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Constants from "../services/constants";

interface TeamCardProps {
    name: string,
    onDelete?: (event: GestureResponderEvent) => void
}

const TeamCard = (props: TeamCardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
            {props.onDelete ?
                <TouchableOpacity onPress={props.onDelete}>
                    <Image
                        source={require("../assets/icons/delete.png")}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: Constants.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 15,
        borderRadius: 15
    },

    text: {
        color: Constants.colors.background,
        fontSize: 16,
        textAlign: "center"
    },

    deleteIcon: {
        tintColor: Constants.colors.background,
        width: 15,
        height: 15
    }
})

export default TeamCard
