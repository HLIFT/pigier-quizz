import {StyleSheet, TextInput, View} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import SecondaryButton from "../components/SecondaryButton";
import {appStyles} from "../assets/styles/app.style";
import TeamCard from "../components/TeamCard";

const LobbyScreen = () => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <TextInput style={appStyles.input} placeholder="Nom de l'équipe"/>
                <View style={styles.buttonsContainer}>
                    <SecondaryButton text="Ajouter" onPress={() => {
                    }}/>
                    <SecondaryButton text="Terminer" onPress={() => {
                    }}/>
                </View>
                <View
                    style={{
                        borderBottomColor: "rgba(0,0,0,0.32)",
                        borderBottomWidth: 1,
                        width: "100%"
                    }}
                />
                <View style={styles.teamsContainer}>
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
                    <TeamCard name="Equipe 1" onDelete={() => {}} />
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
    }
})

export default LobbyScreen
