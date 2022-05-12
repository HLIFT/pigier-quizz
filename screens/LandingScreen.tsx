import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const LandingScreen = (props: NativeStackScreenProps<any>) => {

    const goToLobby = () => {
        props.navigation.navigate("Lobby")
    }

    return (
        <ScreenContainer>
            <PrimaryButton text="Nouvelle partie" onPress={goToLobby} />
        </ScreenContainer>
    )
}

export default LandingScreen
