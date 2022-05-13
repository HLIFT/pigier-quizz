import ScreenContainer from "../components/ScreenContainer";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {ActionType, ModalContextType, TeamsContextType, TimerContextType} from "../services/types";
import {TeamsContext} from "../contexts/teams";
import ActionCard from "../components/ActionCard";
import Constants from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import ScoreBoardModal from "../components/ScoreBoardModal";
import {TimerContext} from "../contexts/timer";
import {convertSecondsToMinutes} from "../services/utils";
import {ModalContext} from "../contexts/modal";

const GameScreen = (props: NativeStackScreenProps<any>) => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)
    const {timer, setTimer, startTimer, stopTimer} = useContext<TimerContextType>(TimerContext)
    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)

    const [lastGameDisabled, setLastGameDisabled] = useState<boolean>(true)

    useEffect(() => {
        setTimer(3000)
        startTimer()
        return () => stopTimer()
    }, [])

    const goToQuestion = (type: ActionType) => {
        switch (type) {
            case ActionType.BELL:
                props.navigation.navigate("Question")
                break
            case ActionType.CHECK:
                props.navigation.navigate("Question")
                break
            case ActionType.GEM:
                props.navigation.navigate("Question")
                break
            case ActionType.DICE:
                props.navigation.navigate("Question")
                break
            default:
                break
        }
    }

    const handleClickOnClose = () => {
        Alert.alert(
            "Quitter la partie",
            "Êtes-vous sûr de vouloir quitter la partie ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Annuler"),
                    style: "cancel"
                },
                { text: "Quitter", onPress: quitGame }
            ]
        );
    }

    const quitGame = () => {
        setTeams([])
        props.navigation.reset({index: 0, routes: [{name: "Landing"}] })
    }

    return (
        <ScreenContainer>
            <ScoreBoardModal visible={visible} onClose={() => setVisible(false)}/>
            <View style={styles.globalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image style={styles.icon} source={require("../assets/icons/trophee.png")}/>
                    </TouchableOpacity>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timer}>{convertSecondsToMinutes(timer).minutes}:{convertSecondsToMinutes(timer).seconds}</Text>
                    </View>
                    <TouchableOpacity onPress={handleClickOnClose}>
                        <Image style={styles.icon} source={require("../assets/icons/delete.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.teams}>
                    {teams.map(team => {
                        return (
                            <View key={`team-${team.id}`} style={styles.team}>
                                <Text style={[styles.teamText, styles.teamName]}>{team.name}</Text>
                                <Text style={styles.teamText}>{team.points} points</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.actions}>
                    <ActionCard image={require("../assets/icons/service-de-chambre.png")} onPress={() => goToQuestion(ActionType.BELL)}/>
                    <ActionCard image={require("../assets/icons/case-a-cocher.png")} onPress={() => goToQuestion(ActionType.CHECK)}/>
                    <ActionCard image={require("../assets/icons/gemme.png")} onPress={() => goToQuestion(ActionType.GEM)}/>
                    <ActionCard image={require("../assets/icons/de.png")} onPress={() => goToQuestion(ActionType.DICE)}/>
                    <ActionCard image={require("../assets/icons/star.png")} disabled={lastGameDisabled} onPress={() => goToQuestion(ActionType.BELL)}/>
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        height: '100%',
        width: '100%',
        flexDirection: "column",
        justifyContent: "space-between"
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Constants.colors.primary
    },

    timerContainer: {
        backgroundColor: Constants.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    },

    timer: {
        color: Constants.colors.background,
        fontSize: 18
    },

    header: {
        height: '10%',
        paddingHorizontal: 30   ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    teams: {
        height: '40%',
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        flexWrap: "wrap",
    },

    actions: {
        height: '50%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },

    team: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        width: '40%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: Constants.colors.primary,
        margin: 15
    },

    teamText: {
        color: Constants.colors.background,
        fontSize: 16,
    },

    teamName: {
        fontWeight: "bold"
    }
})

export default GameScreen
