import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Constants from "../services/constants";
import {useContext} from "react";
import {TeamsContextType} from "../services/types";
import {TeamsContext} from "../contexts/teams";
import PrimaryButton from "../components/PrimaryButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const ScoreboardScreen = (props: NativeStackScreenProps<any>) => {

    const { teams, setTeams } = useContext<TeamsContextType>(TeamsContext)

    const sortedTeams = [...teams]

    const quitGame = () => {
        setTeams([])
        props.navigation.reset({index: 0, routes: [{name: "Landing"}] })
    }

    return (
        <View style={styles.container}>
            <View style={styles.globalContainer}>
                <View style={styles.scoreboard}>
                    <Text style={styles.scoreboardText}>CLASSEMENT</Text>
                </View>
                <View style={styles.teamsContainer}>
                    {sortedTeams
                        .sort((a,b) => {
                            return b.points - a.points
                        })
                        .map((team, index) => {
                            return (
                                <View key={`scoreboard-${team.id}`} style={styles.singleTeamContainer}>
                                    <Text style={styles.team}>{index+1}</Text>
                                    <Text style={styles.team}>{team.name}</Text>
                                    <Text style={styles.team}>{team.points} points</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton text="Terminer la partie" onPress={quitGame} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    globalContainer: {
        backgroundColor: "#eef5ff",
        width: '100%',
        height: '100%',
        borderRadius: 15
    },

    close: {
        height: '10%',
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        paddingHorizontal: 30
    },

    scoreboard: {
        height: '20%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    scoreboardText: {
        color: Constants.colors.primary,
        fontSize: 20,
        fontWeight: "bold"
    },

    teamsContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: '100%',
        height: '60%',
    },

    singleTeamContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        marginVertical: 15
    },

    team: {
        color: Constants.colors.primary,
        fontSize: 18,
        fontWeight: "bold"
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Constants.colors.primary
    },

    buttonContainer: {
        height: '20%',
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ScoreboardScreen
