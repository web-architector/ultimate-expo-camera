import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {Camera} from "expo-camera";
import {CameraType} from "expo-camera/src/Camera.types";
import {styles} from "../assets/styles/styles";


type SwitchCameraProps = {
    cameraType: CameraType,
    switchCamera: ()=>void
}

// Camera front / back switcher
export const SwitchCameraBtn: React.FC<SwitchCameraProps> = ({cameraType, switchCamera}) => {
    let typeSwitcherColor: string, mode: string;

    if (cameraType===Camera.Constants.Type.back){
        typeSwitcherColor='#fff'
        mode = 'back';
    } else {
        typeSwitcherColor = "#000";
        mode = 'front';
    }
    return (<TouchableOpacity
        onPress={switchCamera}
        style={{...styles.controlBtn, ...styles.cameraSwitcher}}
    >
        <Text
            style={{
                fontSize: 45,
                color: typeSwitcherColor
            }}
        >
            &#10227;
        </Text>
        <Text style={styles.controlBtnText}>{mode}</Text>

    </TouchableOpacity>)
}
