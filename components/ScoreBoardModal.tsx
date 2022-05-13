import {GestureResponderEvent, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import {TeamsContextType} from "../services/types";
import {TeamsContext} from "../contexts/teams";
import Constants from "../services/constants";
import * as events from "events";
import {Team} from "../models/Team";

interface ScoreBoardModalProps {
    visible: boolean,
    onClose: (event: GestureResponderEvent) => void
}

const ScoreBoardModal = ({visible, onClose}: ScoreBoardModalProps) => {

    const { teams } = useContext<TeamsContextType>(TeamsContext)

    const [sortedTeams, setSortedTeams] = useState<Team[]>(teams)

    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.globalContainer}>
                    <TouchableOpacity style={styles.close} onPress={onClose}>
                        <Image style={styles.icon} source={require("../assets/icons/delete.png")} />
                    </TouchableOpacity>
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

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
        height: '70%',
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
})

export default ScoreBoardModal
