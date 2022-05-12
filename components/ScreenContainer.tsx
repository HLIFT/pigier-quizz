import {SafeAreaView, View} from "react-native";
import {appStyles} from "../assets/styles/app.style";
import React from "react";

const ScreenContainer = ({children}: React.ComponentProps<any>) => {
    return (
        <View style={appStyles.container}>
            <SafeAreaView style={appStyles.safeContainer}>
                {children}
            </SafeAreaView>
        </View>
    )
}

export default ScreenContainer
