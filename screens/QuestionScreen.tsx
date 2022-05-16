import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Constants from "../services/constants";
import {useContext, useEffect, useState} from "react";
import {ActionType, ModalContextType, Question, QuestionsContextType} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import CircleButton from "../components/CircleButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {convertSecondsToMinutes} from "../services/utils";
import {QuestionsContext} from "../contexts/questions";

const QuestionScreen = (props: NativeStackScreenProps<any>) => {

    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)
    const {questions, cultureQuestions} = useContext<QuestionsContextType>(QuestionsContext)
    const [timer, setTimer] = useState<number>(20)
    const [timerVisible, setTimerVisible] = useState<boolean>(false)
    const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer>()

    const [actualQuestion, setActualQuestion] = useState<Question>()
    const type: ActionType = props.route.params?.type

    useEffect(() => {
        switch (type) {
            case ActionType.CHECK:
                setTimerVisible(true)
                setActualQuestion(questions[Math.floor(Math.random()*questions.length)])
                break
            case ActionType.DICE:
                setActualQuestion(cultureQuestions[Math.floor(Math.random()*cultureQuestions.length)])
                break
            case ActionType.BELL:
            case ActionType.GEM:
            default:
                setActualQuestion(questions[Math.floor(Math.random()*questions.length)])
                break
        }
    }, [])

    useEffect(() => {
        if(timer <= 0) clearTimer()
    }, [timer])

    const startTimer = () => {
        setIntervalTimer(setInterval(() => {
            setTimer(previousTimer => previousTimer - 1)
        }, 1000))
    }

    const clearTimer = () => {
        clearInterval(intervalTimer)
    }

    const next = () => {
        clearTimer()
        props.navigation.navigate("Answer", {question: actualQuestion, type})
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
            height: '50%',
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
        },

        timerContainer: {
            justifyContent: "space-evenly",
            alignItems: "center",
            height: '15%',
            width: '50%',
        },

        timer: {
            backgroundColor: timer <= 0 ? 'crimson' : Constants.colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15
        },

        timerText: {
            color: Constants.colors.background,
            fontSize: 18,
            fontWeight: "bold"
        },

        timerButton: {
            backgroundColor: Constants.colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15
        },

        timerButtonText: {
            color: Constants.colors.background,
            fontSize: 18
        }
    })

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
                        <Text style={styles.questionText}>{actualQuestion?.question}</Text>
                    </View>
                </View>
                {timerVisible ?
                    <View style={styles.timerContainer}>
                        <TouchableOpacity style={styles.timerButton} onPress={startTimer}>
                            <Text style={styles.timerButtonText}>Start Chrono</Text>
                        </TouchableOpacity>
                        <View style={styles.timer}>
                            <Text style={styles.timerText}>{convertSecondsToMinutes(timer).minutes}:{convertSecondsToMinutes(timer).seconds}</Text>
                        </View>
                    </View>

                    : null
                }
                <View style={styles.buttonsContainer}>
                    <CircleButton image={require("../assets/icons/fleche-petite-droite.png")} onPress={next} />
                </View>
            </View>
        </ScreenContainer>
    )
}

export default QuestionScreen
