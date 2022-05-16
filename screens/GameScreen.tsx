import ScreenContainer from "../components/ScreenContainer";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext, useEffect} from "react";
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

    const endOfGame: boolean = teams.find(team => team.points >= 200) !== undefined || timer <= 0

    useEffect(() => {
        setTimer(3000)
        startTimer()
        return () => stopTimer()
    }, [])

    const goToQuestion = (type: ActionType) => {
        if(type === ActionType.FINAL) {
            props.navigation.navigate("FinalQuestions")
        } else {
            props.navigation.navigate("Question", {type})
        }
    }

    const handleClickOnClose = () => {
        Alert.alert(
            "Quitter la partie",
            "Êtes-vous sûr de vouloir quitter la partie ?",
            [
                {
                    text: "Annuler",
                    onPress: () => {},
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
            backgroundColor: endOfGame ? 'crimson' : Constants.colors.primary,
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
                    <ActionCard image={require("../assets/icons/service-de-chambre.png")} disabled={endOfGame} onPress={() => goToQuestion(ActionType.BELL)}/>
                    <ActionCard image={require("../assets/icons/case-a-cocher.png")} disabled={endOfGame} onPress={() => goToQuestion(ActionType.CHECK)}/>
                    <ActionCard image={require("../assets/icons/gemme.png")} disabled={endOfGame} onPress={() => goToQuestion(ActionType.GEM)}/>
                    <ActionCard image={require("../assets/icons/de.png")} disabled={endOfGame} onPress={() => goToQuestion(ActionType.DICE)}/>
                    <ActionCard image={require("../assets/icons/star.png")} disabled={!endOfGame} onPress={() => goToQuestion(ActionType.FINAL)}/>
                </View>
            </View>
        </ScreenContainer>
    )
}

export default GameScreen
