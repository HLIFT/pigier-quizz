import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "./navigators/RootStackNavigator";
import {useEffect, useState} from "react";
import {Team} from "./models/Team";
import {TeamsContext} from "./contexts/teams";
import {TimerContext} from "./contexts/timer";
import {ModalContext} from "./contexts/modal";


export default function App() {
    const [teams, setTeams] = useState<Team[]>([])
    const [timer, setTimer] = useState<number>(3000)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    let interval: NodeJS.Timer

    const incrementTimer = () => {
        interval = setInterval(() => {
            setTimer(previousTimer => previousTimer-1)
        }, 1000)
    }

    const clearTimer = () => {
        clearInterval(interval)
    }

    useEffect(() => {
        console.log('timer', timer)
    }, [timer])

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
                        <RootStackNavigator/>
                    </ModalContext.Provider>
                </TimerContext.Provider>
            </TeamsContext.Provider>

        </NavigationContainer>
    );
}
