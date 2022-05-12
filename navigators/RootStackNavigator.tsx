import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LobbyScreen from "../screens/LobbyScreen";
import Constants from "../services/constants";
import GameScreen from "../screens/GameScreen";

const RootStack = createNativeStackNavigator()

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator initialRouteName="Landing">
            <RootStack.Screen
                name="Landing"
                component={LandingScreen}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name="Lobby"
                component={LobbyScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: Constants.colors.primary
                }}
            />
            <RootStack.Screen
                name="Game"
                component={GameScreen}
                options={{
                    headerShown: false
                }}
            />
        </RootStack.Navigator>
    )
}

export default RootStackNavigator
