import {GestureResponderEvent, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {TeamsContextType} from "../services/types";
import {TeamsContext} from "../contexts/teams";
import Constants from "../services/constants";
import * as events from "events";

interface ScoreBoardModalProps {
    visible: boolean,
    onClose: (event: GestureResponderEvent) => void
}

const ScoreBoardModal = ({visible, onClose}: ScoreBoardModalProps) => {

    const { teams } = useContext<TeamsContextType>(TeamsContext)

    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.close} onPress={onClose}>
                    <Image style={styles.icon} source={require("../assets/icons/delete.png")} />
                </TouchableOpacity>
                <View style={styles.teamsContainer}>
                    {teams
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
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.75)',
        width: '100%',
        height: '100%',
    },

    teamsContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '80%',
    },

    singleTeamContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        marginVertical: 20
    },

    team: {
        color: Constants.colors.background,
        fontSize: 18,
        fontWeight: "bold"
    },

    close: {
        height: '20%',
        justifyContent: "flex-end",
        alignItems: "center",
        width: '100%'
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Constants.colors.background
    },
})

export default ScoreBoardModal
