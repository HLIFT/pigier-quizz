import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "./navigators/RootStackNavigator";
import {useEffect, useState} from "react";
import {Team} from "./models/Team";
import {TeamsContext} from "./contexts/teams";
import {TimerContext} from "./contexts/timer";
import {ModalContext} from "./contexts/modal";
import {QuestionsContext} from "./contexts/questions";
import {Question} from "./services/types";
import {listOfCultureQuestions, listOfQuestions} from "./services/questions";


export default function App() {
    const [teams, setTeams] = useState<Team[]>([])
    const [timer, setTimer] = useState<number>(3000)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer>()
    const [questions, setQuestions] = useState<Question[]>(listOfQuestions)
    const [cultureQuestions, setCultureQuestions] = useState<Question[]>(listOfCultureQuestions)

    const incrementTimer = () => {
        setIntervalTimer(setInterval(() => {
            setTimer(previousTimer => previousTimer-1)
        }, 1000))
    }

    const clearTimer = () => {
        clearInterval(intervalTimer)
    }

    useEffect(() => {
        if(timer <= 0 || teams.find(team => team.points >= 200) !== undefined) {
            clearTimer()
        }
    }, [timer, teams])

    useEffect(() => {
        if(questions.length <= 0) setQuestions(listOfQuestions)
        if(cultureQuestions.length <= 0) setCultureQuestions(listOfCultureQuestions)
    }, [questions, cultureQuestions])

    return (
        <NavigationContainer>
            <TeamsContext.Provider value={{
                teams,
                setTeams: (teams: Team[]) => setTeams(teams)
            }}>
                <TimerContext.Provider value={{
                    timer,
                    setTimer: (timer: number) => setTimer(timer),
                    startTimer: incrementTimer,
                    stopTimer: clearTimer
                }}>
                    <ModalContext.Provider value={{
                        visible: modalVisible,
                        setVisible: (visible: boolean) => setModalVisible(visible)
                    }}>
                        <QuestionsContext.Provider value={{
                            questions,
                            cultureQuestions,
                            setQuestions,
                            setCultureQuestions
                        }}>
                            <RootStackNavigator/>
                        </QuestionsContext.Provider>
                    </ModalContext.Provider>
                </TimerContext.Provider>
            </TeamsContext.Provider>

        </NavigationContainer>
    );
}
