import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    startCameraArea: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    startCameraBlock: {
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    startCameraText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    camera:{
        flex: 1,
        width: '100%'
    },
    cameraViewport:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        paddingTop: '50%',
        borderColor: '#0d0',
        borderRadius: 30,
        borderWidth: 5,
        flex: 1
    },
    shutterBtnArea: {
        alignSelf: 'center',
        flexShrink: 0,
    },
    takePictureBtn: {
        alignSelf: 'center',
        // flex: 1,
        alignItems: 'center',

        width: 70,
        height: 70,
        // bottom: 0,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    controlBtn: {
        height: 45,
        width: 45,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"},

    cameraSwitcher: {
        marginTop: 20,
        // borderRadius: '50%',
        borderRadius: 12,
    },
    controlBtnText: {
        fontSize: 12,
        marginLeft:5,
        fontWeight: "700",
        color: 'white',
    },

    controlPreviewArea:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexGrow: 1,
        alignItems: 'flex-end',
        alignSelf: 'auto',
    },

    controlPreviewBlock:{ // Touchable with icon
        // display: "flex",
        // justifyContent: "center",
        // alignItems: 'center',
        marginBottom: 75,
    },
    controlPreviewIcons: { // save photo and Undo icons
        color: '#fff',
        fontSize: 55,
        borderWidth:1, // for test purpose
        borderColor: '#000', // for test purpose

    },
    text: {
        color: "#f00",
    },
})
