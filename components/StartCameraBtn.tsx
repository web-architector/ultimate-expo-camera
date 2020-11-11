import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../assets/styles/styles";
import React from "react";

type StartCameraBtnProps = {
    handleStartCamera: () => void
}

export const StartCameraBtn: React.FC<StartCameraBtnProps> = ({handleStartCamera}) => {
    return (
        <View style={styles.startCameraArea}>
            <TouchableOpacity
                onPress={handleStartCamera}
                style={styles.startCameraBlock}
            >
                <Text style={styles.startCameraText}>
                    Take picture
                </Text>
            </TouchableOpacity>
        </View>
    )
}
