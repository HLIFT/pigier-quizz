import {StyleSheet, Text, TextInput, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import SecondaryButton from "../components/SecondaryButton";
import {appStyles} from "../assets/styles/app.style";
import TeamCard from "../components/TeamCard";
import {useContext, useState} from "react";
import {TeamsContext} from "../contexts/teams";
import {TeamsContextType} from "../services/types";
import {Team} from "../models/Team";

const LobbyScreen = () => {

    const {teams, setTeams} = useContext<TeamsContextType>(TeamsContext)

    const [newTeamName, setNewTeamName] = useState<string>('')
    const [error, setError] = useState<string|undefined>(undefined)

    const addTeam = () => {
        if (newTeamName !== '') {

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
            setError("Vous devez entrer un nom d'équipe pour ajouter une nouvelle équipe")
        }
    }

    const removeTeam = (id: number) => {
        setTeams(teams.filter(team => team.id !== id))
    }

    const next = () => {
        if(teams.length >  1) {
            console.log('ok')
        } else {
            setError("Vous devez ajouter au moins 2 équipes pour continuer")
        }
    }

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <TextInput style={appStyles.input} placeholder="Nom de l'équipe" onChangeText={setNewTeamName} value={newTeamName}/>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <View style={styles.buttonsContainer}>
                    <SecondaryButton text="Ajouter" onPress={addTeam}/>
                    <SecondaryButton text="Terminer" onPress={next}/>
                </View>
                <View
                    style={{
                        borderBottomColor: "rgba(0,0,0,0.32)",
                        borderBottomWidth: 1,
                        width: "100%"
                    }}
                />
                <View style={styles.teamsContainer}>
                    {teams.map(team => {
                        return (
                            <TeamCard key={`team-${team.id}`} name={team.name} onDelete={() => removeTeam(team.id)} />
                        )
                    })}
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        width: '80%',
        justifyContent: "space-between",
        marginVertical: 30
    },
    teamsContainer: {
        padding: 20,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: "crimson",
        fontSize: 12,
        textAlign: "center",
        marginTop: 10
    }
})

export default LobbyScreen
