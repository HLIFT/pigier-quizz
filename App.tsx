import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "./navigators/RootStackNavigator";
import {useState} from "react";
import {Team} from "./models/Team";
import {TeamsContext} from "./contexts/teams";


export default function App() {
    const [teams, setTeams] = useState<Team[]>([])

    const updateTeams = (updatedTeams: Team[]) => {
        setTeams(updatedTeams)
    }

    return (
        <NavigationContainer>
            <TeamsContext.Provider value={{
                teams,
                setTeams: (tms: Team[]) => updateTeams(tms)
            }}>
                <RootStackNavigator/>
            </TeamsContext.Provider>

        </NavigationContainer>
    );
}
