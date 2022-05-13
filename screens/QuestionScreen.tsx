import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Constants from "../services/constants";
import {useContext} from "react";
import {ModalContextType} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import CircleButton from "../components/CircleButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const QuestionScreen = (props: NativeStackScreenProps<any>) => {

    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)

    const next = () => {
        props.navigation.navigate("Answer")
    }

    return (
        <ScreenContainer>
            <ScoreBoardModal visible={visible} onClose={() => setVisible(false)}/>
            <View style={styles.globalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image style={styles.icon} source={require("../assets/icons/trophee.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.questionGlobalContainer}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>Lorem ipsum dolor sit amet.
                            Sit sequi impedit eos saepe tempore non consectetur quod.
                            Est commodi qui autem galisum cum dolores exercitationem vel enim voluptatum quo debitis unde?
                            Qui saepe possimus ab aliquam quasi qui facere odio aut odit dolorum hic officiis repellat qui voluptatem ducimus quo explicabo commodi.
                            Sed quia tenetur sit quos sint ut exercitationem rerum et mollitia inventore.
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <CircleButton image={require("../assets/icons/fleche-petite-droite.png")} onPress={next} />
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        width: '100%',
        height: '100%',
        alignItems: "center"
    },

    header: {
        height: '10%',
        width: '100%',
        paddingHorizontal: 30   ,
        justifyContent: "center",
        alignItems: "flex-start",
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Constants.colors.primary
    },

    questionGlobalContainer: {
        height: '60%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    questionContainer: {
        backgroundColor: Constants.colors.primary,
        padding: 20,
        borderRadius: 15
    },

    questionText: {
        color: Constants.colors.background,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    buttonsContainer: {
        height: '30%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})

export default QuestionScreen
