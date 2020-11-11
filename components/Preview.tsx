/*Render Preview photo or video
* TODO:  add cameraRef.pausePreview() method instead setCameraPreview and Preview Render
*  */
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "../assets/styles/styles";
import {PreviewProps} from "./types";


export const Preview:React.FC<PreviewProps> = ({data, retakePicture, saveData}: any) => {
    console.log('###: Got photo image:', data )
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
            }}
        >
            <ImageBackground
                source={{uri: data && data.uri}}
                style={{
                    flex: 1
                }}
            >
                    <View
                        style={styles.controlPreviewArea}
                    >
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={styles.controlPreviewBlock}
                        >
                            <Text style={{...styles.controlPreviewIcons, fontSize: 80}}>
                                &#x261d; {/*'Undo' &#x238c; &#x238b; Unicode symbol*/}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={saveData}
                            style={styles.controlPreviewBlock}
                        >
                            <Text style={styles.controlPreviewIcons}>
                                &#128190;  {/*'floppy disk' Unicode symbol*/}
                            </Text>
                        </TouchableOpacity>
                    </View>

            </ImageBackground>
        </View>
    )
}
