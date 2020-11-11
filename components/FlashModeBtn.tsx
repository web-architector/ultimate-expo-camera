import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {styles} from "../assets/styles/styles";
import {FlashModeProps} from "./types";

export enum CameraFlashMode {
    off = 'off',
    on = 'on',
    auto = 'auto'
}
/*
* Кнопка выбора режима вспышки - в зависимости от режима меняется прозрачность значка вспышки и надпись on, off, auto
*/export const FlashModeBtn: React.FC<FlashModeProps> = ({handleFlashMode, flashMode}) => {
    let opacity = 1;
    let mode;
    switch (flashMode){
        case CameraFlashMode.on:
            opacity = 1;
            mode='on';
            break;
        case CameraFlashMode.auto:
            opacity = 0.5;
            mode='auto';
            break;
        case CameraFlashMode.off:
            opacity = 0.3
            mode='off';
            break;
        default:
            console.log('###: Something wrong in Camera flash mode select. Got ', flashMode );
            opacity = 1;
            mode='on';
    }
    return (
        <TouchableOpacity
            onPress={handleFlashMode}
            style={{...styles.controlBtn}}
        >
            <Text
                style={{
                    fontSize: 45,
                    opacity: opacity,
                }}
            >
                &#128248;
            </Text>
            <Text style={styles.controlBtnText}>{mode}</Text>
        </TouchableOpacity>
    )
}
