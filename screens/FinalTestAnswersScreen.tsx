import ScreenContainer from "../components/ScreenContainer";
import {listOfQuestions} from "../services/questions";
import {useContext, useEffect, useState} from "react";
import {ModalContextType, Question, TeamsContextType} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import {Alert, GestureResponderEvent, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {convertSecondsToMinutes} from "../services/utils";
import CircleButton from "../components/CircleButton";
import Constants from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Team} from "../models/Team";
import {TeamsContext} from "../contexts/teams";
import PrimaryButton from "../components/PrimaryButton";
import LottieView from 'lottie-react-native';

const FinalTestAnswersScreen = (props: NativeStackScreenProps<any>) => {

    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)
    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)

    const questions: Question[] = props.route.params?.questions
    const [winModalVisible, setWinModalVisible] = useState<boolean>(false)

    const rightAnswer = () => {
        setWinModalVisible(true)
    }

    const wrongAnswer = () => {
        const t: Team = getWinnerTeam()
        setTeams(teams.map(team => {
            if(team.id === t.id) {
                team.points -= 50
            }
            return team
        }))
        setWinModalVisible(true)
    }

    const getWinnerTeam = (): Team => {
        const finalTeams = [...teams]
        return finalTeams.sort((a,b) => {
            return  b.points - a.points
        })[0]
    }

    const styles = StyleSheet.create({
        globalContainer: {
            width: '100%',
            height: '100%',
            alignItems: "center",
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
            height: '40%',
            width: '100%',
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            padding: 20,
        },

        questionContainer: {
            backgroundColor: Constants.colors.primary,
            padding: 20,
            borderRadius: 15,
            margin: 10
        },

        questionText: {
            color: Constants.colors.background,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
        },

        numberQuestionText: {
            textAlign: "center",
            color: Constants.colors.background,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10
        },

        buttonsContainer: {
            height: '50%',
            width: '100%',
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
        },

    })

    return (
        <ScreenContainer>
            <ScoreBoardModal visible={visible} onClose={() => setVisible(false)}/>
            <WinModal
                visible={winModalVisible}
                onClose={() => {
                    setWinModalVisible(false)
                    props.navigation.navigate("Scoreboard")
                }}
                team={getWinnerTeam()}
            />
            <View style={styles.globalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image style={styles.icon} source={require("../assets/icons/trophee.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.questionGlobalContainer}>
                    {questions.map((question, index) => {
                        return (
                            <View key={`question-${question.id}`} style={styles.questionContainer}>
                                <Text style={styles.numberQuestionText}>Question {index+1}</Text>
                                <Text style={styles.questionText}>{question.answer}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.buttonsContainer}>
                    <CircleButton
                        image={require("../assets/icons/verifier.png")}
                        onPress={rightAnswer}
                    />
                    <CircleButton
                        image={require("../assets/icons/delete.png")}
                        onPress={wrongAnswer}
                    />
                </View>
            </View>
        </ScreenContainer>
    )
}

export default FinalTestAnswersScreen

interface WinModalProps {
    visible: boolean,
    onClose: (event: GestureResponderEvent) => void,
    team: Team
}

const WinModal = ({visible, onClose, team}: WinModalProps) => {
    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent={true}
        >
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.globalContainer}>
                    <Text style={modalStyles.title}>L'équipe {team.name} remporte la partie ! </Text>
                    <LottieView style={modalStyles.lottie} source={require("../assets/animations/trophy.json")} autoPlay={true} loop={false} />
                    <PrimaryButton text="Classement" onPress={onClose} />
                </View>
            </View>
        </Modal>
    )
}

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    globalContainer: {
        backgroundColor: "#eef5ff",
        width: '90%',
        height: '90%',
        borderRadius: 15,
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Constants.colors.primary,
        textAlign: "center"
    },

    lottie: {
        width: 300,
        height: 300
    }
})
