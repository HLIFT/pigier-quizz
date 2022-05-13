import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Constants from "../services/constants";
import {useContext, useEffect, useState} from "react";
import {ModalContextType, TeamsContextType} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import CircleButton from "../components/CircleButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Team} from "../models/Team";
import {Picker} from "@react-native-picker/picker";
import {TeamsContext} from "../contexts/teams";

const AnswerScreen = (props: NativeStackScreenProps<any>) => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)
    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)

    const [selectedTeam, setSelectedTeam] = useState<number|undefined>(undefined)
    const [points, setPoints] = useState<number>(0)
    const [error, setError] = useState<string|undefined>(undefined)

    const incrementPoints = () => {
        setPoints(points+1)
    }

    const decrementPoints = () => {
        if(points > 0) setPoints(points-1)
    }

    const goodResponse = () => {
        if (selectedTeam && points !== 0) {
            setTeams(teams.map(team => {
                if(team.id === selectedTeam) {
                    team.points += points
                }
                return team
            }))
            props.navigation.navigate("Game")
        } else {
            setError("Vous devez choisir une équipe et lui attribuer des points")
        }
    }

    const badResponse = () => {
        props.navigation.navigate("Game")
    }

    return (
        <ScreenContainer>
            <ScoreBoardModal visible={visible} onClose={() => setVisible(false)}/>
            <View style={styles.globalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image style={styles.icon} source={require("../assets/icons/trophee.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.answerGlobalContainer}>
                    <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>Lorem ipsum dolor sit amet.
                            Sit sequi impedit eos saepe tempore non consectetur quod.
                            Est commodi qui autem galisum cum dolores exercitationem vel enim voluptatum quo debitis unde?
                            Qui saepe possimus ab aliquam quasi qui facere odio aut odit dolorum hic officiis repellat qui voluptatem ducimus quo explicabo commodi.
                            Sed quia tenetur sit quos sint ut exercitationem rerum et mollitia inventore.
                        </Text>
                    </View>
                </View>
                <View style={styles.teamContainer}>
                    <Picker
                        mode="dialog"
                        style={styles.picker}
                        selectedValue={selectedTeam}
                        onValueChange={(itemValue, itemIndex) => setSelectedTeam(itemValue)}
                        itemStyle={{
                            color: Constants.colors.primary
                        }}
                    >
                        <Picker.Item label="" value={undefined} />
                        {teams.map(team => {
                            return (
                                <Picker.Item key={`team-${team.id}`} label={team.name} value={team.id} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.pointsGlobalContainer}>
                    <View style={styles.pointsContainer}>
                        <TouchableOpacity style={styles.pointsUpdater} onPress={decrementPoints}>
                            <Text style={styles.pointsUpdaterText}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.pointsBox}>
                            <Text style={styles.points}>{points}</Text>
                        </View>
                        <TouchableOpacity style={styles.pointsUpdater} onPress={incrementPoints}>
                            <Text style={styles.pointsUpdaterText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <CircleButton image={require("../assets/icons/verifier.png")} onPress={goodResponse} />
                    <CircleButton image={require("../assets/icons/delete.png")} onPress={badResponse} />
                </View>
            </View>
        </ScreenContainer>
    )
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

    answerGlobalContainer: {
        height: '40%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    answerContainer: {
        backgroundColor: Constants.colors.primary,
        padding: 20,
        borderRadius: 15
    },

    answerText: {
        color: Constants.colors.background,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    teamContainer: {
        height: '15%',
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
    },

    picker: {
        width: '100%',
    },

    pointsGlobalContainer: {
        width: '90%',
        height: '15%'
    },

    pointsContainer: {
        height: '100%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    buttonsContainer: {
        height: '20%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    pointsUpdater: {
        backgroundColor: Constants.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    },

    pointsUpdaterText: {
        color: Constants.colors.background,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },

    pointsBox: {
        width: '20%',
        borderRadius: 15,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Constants.colors.primary,
        padding: 10
    },

    points: {
        color: Constants.colors.primary,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },

    errorText: {
        textAlign: 'center',
        color: 'crimson',
        fontSize: 12
    }
})

export default AnswerScreen
