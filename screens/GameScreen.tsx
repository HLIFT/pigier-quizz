import ScreenContainer from "../components/ScreenContainer";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {TeamsContextType, TimerContextType} from "../services/types";
import {TeamsContext} from "../contexts/teams";
import TeamCard from "../components/TeamCard";
import ActionCard from "../components/ActionCard";
import Constants from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import ScoreBoardModal from "../components/ScoreBoardModal";
import {TimerContext} from "../contexts/timer";
import {convertSecondsToMinutes} from "../services/utils";

const GameScreen = (props: NativeStackScreenProps<any>) => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)
    const {timer, setTimer, startTimer, stopTimer} = useContext<TimerContextType>(TimerContext)

    const [scoreboardVisible, setScoreboardVisible] = useState<boolean>(false)

    useEffect(() => {
        setTimer(3000)
        startTimer()
        return () => stopTimer()
    }, [])

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
                { text: "Quitter", onPress: () => props.navigation.reset({index: 0, routes: [{name: "Landing"}] }) }
            ]
        );
    }

    return (
        <ScreenContainer>
            <ScoreBoardModal visible={scoreboardVisible} onClose={() => setScoreboardVisible(false)}/>
            <View style={styles.globalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setScoreboardVisible(true)}>
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
                                <Text style={styles.teamText}>{team.name}</Text>
                                <Text style={styles.teamText}>{team.points} points</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.actions}>
                    <ActionCard image={require("../assets/icons/service-de-chambre.png")}/>
                    <ActionCard image={require("../assets/icons/case-a-cocher.png")}/>
                    <ActionCard image={require("../assets/icons/gemme.png")}/>
                    <ActionCard image={require("../assets/icons/star.png")}/>
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
        fontSize: 16
    }
})

export default GameScreen
