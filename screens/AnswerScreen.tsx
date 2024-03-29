import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Constants from "../services/constants";
import {useContext, useEffect, useState} from "react";
import {ActionType, ModalContextType, Question, QuestionsContextType, TeamsContextType} from "../services/types";
import {ModalContext} from "../contexts/modal";
import ScoreBoardModal from "../components/ScoreBoardModal";
import CircleButton from "../components/CircleButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Team} from "../models/Team";
import {Picker} from "@react-native-picker/picker";
import {TeamsContext} from "../contexts/teams";
import {QuestionsContext} from "../contexts/questions";
import RNPickerSelect from 'react-native-picker-select';

const AnswerScreen = (props: NativeStackScreenProps<any>) => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)
    const {visible, setVisible} = useContext<ModalContextType>(ModalContext)
    const {questions, cultureQuestions, setQuestions, setCultureQuestions} = useContext<QuestionsContextType>(QuestionsContext)

    const [selectedTeam, setSelectedTeam] = useState<number|undefined>(undefined)
    const [points, setPoints] = useState<number>(0)
    const [error, setError] = useState<string|undefined>(undefined)

    const actualQuestion = props.route.params?.question
    const type = props.route.params?.type

    const incrementPoints = () => {
        setPoints(points+1)
    }

    const decrementPoints = () => {
        if(points > 0) setPoints(points-1)
    }

    const removeQuestionFromList = () => {
        switch (type) {
            case ActionType.BELL:
            case ActionType.CHECK:
            case ActionType.GEM:
                setQuestions(questions.filter(question => question.id !== actualQuestion.id))
                break
            case ActionType.DICE:
                setCultureQuestions(cultureQuestions.filter(question => question.id !== actualQuestion.id))
                break
            default:
                break
        }
    }

    const goodResponse = () => {
        if (selectedTeam && points !== 0) {
            setTeams(teams.map(team => {
                if(team.id === selectedTeam) {
                    team.points += type === ActionType.GEM ? points*2 : points
                }
                return team
            }))
            removeQuestionFromList()
            props.navigation.navigate("Game")
        } else {
            setError("Vous devez choisir une équipe et lui attribuer des points")
        }
    }

    const badResponse = () => {
        removeQuestionFromList()
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
                        <Text style={styles.answerText}>{actualQuestion?.answer}</Text>
                    </View>
                </View>
                <View style={styles.teamContainer}>
                    {/*<Picker
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
                    </Picker>*/}
                    <View style={{
                        width: '50%'
                    }}>
                        <RNPickerSelect
                            value={selectedTeam}
                            placeholder={
                                {
                                    label: "Sélectionnez une équipe...",
                                    color: Constants.colors.primary,
                                }
                            }
                            onValueChange={(itemValue, itemIndex) => setSelectedTeam(itemValue)}
                            items={[...teams].map(team => {
                                return {
                                    label: team.name,
                                    value: team.id,
                                    color: Constants.colors.primary
                                }
                            })}
                        />
                    </View>
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
                        {type === ActionType.GEM ? <Text style={styles.infoText}>Les points sont doublés !</Text> : null}
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
        height: '30%',
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
        height: '20%',
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
        height: '40%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: 40
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
    },

    infoText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: Constants.colors.primary,
        marginVertical: 5
    }
})

export default AnswerScreen
