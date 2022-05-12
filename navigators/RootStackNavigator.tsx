import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";

const RootStack = createNativeStackNavigator()

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator initialRouteName="Landing">
            <RootStack.Screen name="Landing" component={LandingScreen} options={{
                headerShown: false
            }} />
        </RootStack.Navigator>
    )
}

export default RootStackNavigator
