import ScreenContainer from "../components/ScreenContainer";
import {listOfQuestions} from "../services/questions";
import {useContext, useEffect, useState} from "react";
import {ModalContextType, Question} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CircleButton from "../components/CircleButton";
import Constants from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const FinalTestQuestionsScreen = (props: NativeStackScreenProps<any>) => {

    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)

    const [questions, setQuestions] = useState<Question[]>([])
    const [questionIndex, setQuestionIndex] = useState<number>(0)
    const [allShow, setAllShow] = useState<boolean>(false)

    useEffect(() => {
        shuffleAndPickQuestions()
    }, [])

    useEffect(() => {
        if(questionIndex >= 3) setAllShow(true)
    }, [questionIndex])

    const shuffleAndPickQuestions = () => {
        const array = listOfQuestions
        let currentIndex = array.length
        let randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }

        setQuestions(array.slice(0, 3))
    }

    const handleClickOnNext = () => {
        if(questionIndex < 3) setQuestionIndex(questionIndex+1)
    }

    const handleClickOnPrevious = () => {
        if(questionIndex > 0) setQuestionIndex(questionIndex-1)
    }

    const goToAnswers = () => {
        props.navigation.navigate("FinalAnswers", {questions})
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
            height: '70%',
            width: '100%',
            justifyContent: "space-evenly",
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

        numberQuestionText: {
            textAlign: "center",
            color: Constants.colors.background,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10
        },

        buttonsContainer: {
            height: '20%',
            width: '100%',
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
        },

        sliderButtonsContainer: {
            width: '100%',
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
        },

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
                        <Text style={styles.numberQuestionText}>Question {questionIndex+1}</Text>
                        <Text style={styles.questionText}>{questions[questionIndex]?.question}</Text>
                    </View>
                    <View style={styles.sliderButtonsContainer}>
                        <CircleButton
                            image={require("../assets/icons/fleche-petite-gauche.png")}
                            onPress={handleClickOnPrevious}
                            disabled={questionIndex <= 0}
                        />
                        <CircleButton
                            image={require("../assets/icons/fleche-petite-droite.png")}
                            onPress={handleClickOnNext}
                            disabled={questionIndex >= 3}
                        />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <CircleButton
                        image={require("../assets/icons/verifier.png")}
                        onPress={goToAnswers}
                        disabled={!allShow}
                    />
                </View>
            </View>
        </ScreenContainer>
    )
}

export default FinalTestQuestionsScreen
