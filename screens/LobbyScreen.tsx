import {StyleSheet, Text, TextInput, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import SecondaryButton from "../components/SecondaryButton";
import {appStyles} from "../assets/styles/app.style";
import TeamCard from "../components/TeamCard";
import {useContext, useState} from "react";
import {TeamsContext} from "../contexts/teams";
import {TeamsContextType} from "../services/types";
import {Team} from "../models/Team";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Constants from "../services/constants";

const LobbyScreen = (props: NativeStackScreenProps<any>) => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)

    const [newTeamName, setNewTeamName] = useState<string>('')
    const [error, setError] = useState<string|undefined>(undefined)

    const addTeam = () => {
        if(teams.length < 8) {
            if (newTeamName !== '') {

                if(teams.find(team => team.name === newTeamName) === undefined) {
                    const id = teams.length > 0 ? teams[teams.length-1].id+1 : 1

                    const newTeam: Team = {
                        id,
                        name: newTeamName,
                        points: 0
                    }

                    setTeams([...teams, newTeam])
                    setNewTeamName('')
                    setError(undefined)
                } else {
                    setError("Ce nom d'équipe est déjà utilisé")
                }
            } else {
                setError("Vous devez entrer un nom d'équipe pour ajouter une nouvelle équipe")
            }
        } else {
            setError("Vous pouvez ajouter un maximum de 8 équipes")
        }

    }

    const removeTeam = (id: number) => {
        setTeams(teams.filter(team => team.id !== id))
    }

    const next = () => {
        if(teams.length >  1) {
            props.navigation.navigate("Game")
        } else {
            setError("Vous devez ajouter au moins 2 équipes pour continuer")
        }
    }

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Nom de l'équipe" onChangeText={setNewTeamName} value={newTeamName} maxLength={12}/>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <View style={styles.buttonsContainer}>
                    <SecondaryButton text="Ajouter" onPress={addTeam}/>
                    <SecondaryButton text="Terminer" onPress={next}/>
                </View>
                <View
                    style={{
                        borderBottomColor: "#0063F766",
                        borderBottomWidth: 1,
                        width: "80%"
                    }}
                />
                <View style={styles.teamsContainer}>
                    {teams.map(team => {
                        return (
                            <View style={styles.team}>
                                <TeamCard
                                    key={`team-${team.id}`}
                                    name={team.name}
                                    onDelete={() => removeTeam(team.id)}
                                />
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        width: '50%',
        justifyContent: "space-evenly",
        marginVertical: 30
    },
    teamsContainer: {
        width: '100%',
        height: '60%',
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
    },

    team: {
        width: '40%',
        marginHorizontal: 20
    },

    error: {
        color: "crimson",
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
        width: '80%'
    },

    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: Constants.colors.primary,
        borderRadius: 15,
        width: '80%'
    },
})

export default LobbyScreen
