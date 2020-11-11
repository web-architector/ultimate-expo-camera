import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {styles} from "../assets/styles/styles";

type ShutterBtnProps = {
    handleTakePicture: ()=>void
    handleRecordVideo: ()=>void
    isVideoRecording: boolean
}
export const ShutterBtn: React.FC<ShutterBtnProps> = ({handleTakePicture, handleRecordVideo, isVideoRecording}) => {
    const backgroundColor = isVideoRecording ? '#f00' : '#fff'
    return (
        <View style={styles.shutterBtnArea}>
            {/*<View style={styles.takePictureView}>*/}
            <TouchableOpacity
                onPress={handleTakePicture}
                onLongPress={handleRecordVideo}
                activeOpacity={0.7}
                style={{...styles.takePictureBtn, backgroundColor: backgroundColor}}
            />
            {/*</View>*/}

        </View>
    );
};

