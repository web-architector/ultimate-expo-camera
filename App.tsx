import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import {Alert, Text, View} from 'react-native'
import {Camera} from 'expo-camera'
import {Preview} from "./components/Preview";
import {SwitchCameraBtn} from "./components/SwitchCameraBtn";
import {CameraFlashMode, FlashModeBtn} from "./components/FlashModeBtn";
import {styles} from "./assets/styles/styles";
import {ShutterBtn} from "./components/ShutterBtn";
import {StartCameraBtn} from "./components/StartCameraBtn";
import {CameraType} from "expo-camera/src/Camera.types";
import * as Permissions from 'expo-permissions';
import {
    CameraCapturedPicture,
    CameraCapturedVideo,
    CameraPictureOptions,
    CameraRecordingOptions
} from "./components/types";

export default function App() {
    const [startCamera, setStartCamera] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraPreview, setCameraPreview] = useState<boolean>(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null);
    const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState<CameraFlashMode>(CameraFlashMode.on);
    const [cameraRef, setCameraRef] = useState<Camera | null>(null);
    const [videoPreview, setVideoPreview] = useState<boolean>(false);
    const [capturedVideo, setCapturedVideo] = useState<CameraCapturedVideo | null>(null);
    const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);


    // if video recording terminates due to expiration maxDuration or maxFileSize
    let abnormalRecordCompletion: boolean = true;

    // requesting or verifying permissions for audio and camera
    useLayoutEffect(() => {
        (async () => {
            const audioPermissions = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(audioPermissions.status === 'granted'
                && cameraPermissions.status === 'granted');
        })();
    }, []);

    const onCameraReady = (): void => {
        console.log('###: Camera ready...');
    }

    const __handleStartCamera = (): void => {
        setStartCamera(true)
    }
    // press on shutter button
    // todo replace cameraPreview to built cameraRef.pausePreview() method
    const __handleTakePicture = async () => {
        if (!cameraRef) {
            Alert.alert("Camera not found")
            return;
        }
        if (isVideoRecording) {
            __handleStopVideo();
            return;
        }

        const options: CameraPictureOptions = {
            quality: 0.5,
            // base64: true, // to base64 format
            exif: true,
            skipProcessing: true
        };
        console.log('###: Flash mode= ', flashMode);
        const photo: CameraCapturedPicture = await cameraRef.takePictureAsync(options)
        console.log(photo)
        if (photo) {
            setCameraPreview(true);
            // cameraRef.pausePreview() // todo: add this method instead setCameraPreview and Preview Render
            setCapturedImage(photo)
        } else {
            console.error('NO photo found')
        }
    }
    const __savePhoto = (): void => {
        Alert.alert(`Photo saved\n ${JSON.stringify(capturedImage)}`)
        setCameraPreview(false)
    }
    const __saveVideo = (): void => {
        Alert.alert(`Video saved\n ${JSON.stringify(capturedVideo)}`)
        setVideoPreview(false)
    }
    const __retakePicture = (): void => {
        setCapturedImage(null)
        setCameraPreview(false)
        __handleStartCamera()
    }
    const __retakeVideo = (): void => {
        setCapturedVideo(null);
        setVideoPreview(false);
        __handleStartCamera();
    }
    // on off flash mode
    const __handleFlashMode = (): void => {
        switch (flashMode) {
            case CameraFlashMode.on:
                setFlashMode(CameraFlashMode.off);
                break;
            case CameraFlashMode.off:
                setFlashMode(CameraFlashMode.auto);
                break;
            default:
                setFlashMode(CameraFlashMode.on);
        }
    }
    // Back or front camera
    const __switchCamera = (): void => {
        const newCameraType =
            cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        setCameraType(newCameraType);
    }
    // on long press shutter button
    useEffect(() => {
        console.log('###: useEffect: isVideoRecording= ', isVideoRecording)
        if (!isVideoRecording) __handleStopVideo();
        if (isVideoRecording) __handleStartVideo();

    }, [isVideoRecording])

    const __handleStartVideo = async (): Promise<void> => {
        const options: CameraRecordingOptions = {
            maxDuration: 10,  //  Maximum video duration in seconds
            maxFileSize: 5000000, // Maximum video file size in bytes.
            /* Specify the quality of recorded video.
            * Usage: Camera.Constants.VideoQuality['<value>'], possible values:
            * for 16:9 resolution 2160p, 1080p, 720p, 480p : Android only and for 4:3 4:3 (the size is 640x480).
            * If the chosen quality is not available for a device, the highest available is chosen.
            */
            quality: '480p',
            mute: false,  // If present, video will be recorded with no sound.
            /*(iOS only; on Android, this is handled in the user's device settings)
            * If true, the recorded video will be flipped along the vertical axis.
            * iOS flips videos recorded with the front camera by default, but you can reverse
            * that back by setting this to true
            * */
            mirror: true,
        }
        try {
            console.log('###: Video recording begins...')
            if (!cameraRef) return; // guard for type
            const data: CameraCapturedVideo = await cameraRef.recordAsync(options);
            // In this point video record finished, Promise resolved
            console.log('###: Video data: \n', data);
            const source = data.uri;
            if (data) {
                // setVideoSource(source);
                // setPreviewVisible(true);
                console.log("video source", source);
                setVideoPreview(true)
                setCapturedVideo(data);
            } else {
                console.error('No video data found')
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setIsVideoRecording(false);
        }
    };
    const __handleRecordVideo = async (): Promise<void> => {
        if (isVideoRecording) { // video already recording -Another recording might be in progress.
            console.log('###: Video already recording... return from __handleRecordVideo=')
            return;
        }
        if (!cameraRef) return;
        setIsVideoRecording(true);  // start video record
    };

    const __handleStopVideo = (): void => {
        console.log('###: Try to Stop Video recording...');
        cameraRef && cameraRef.stopRecording();
        console.log('###: __handleStopVideoRecord: stopRecording executed=');
    }
    // callback for React ref
    const __adjustCameraRef = (ref: Camera): void => {
        setCameraRef(ref);
    };

    if (!hasPermission) {
        return <Text style={styles.text}>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            {!startCamera && <StartCameraBtn handleStartCamera={__handleStartCamera}/>}
            {cameraPreview && capturedImage &&
            <Preview data={capturedImage} saveData={__savePhoto} retakePicture={__retakePicture}/>}
            {videoPreview && capturedVideo &&
            <Preview data={capturedVideo} saveData={__saveVideo} retakePicture={__retakeVideo}/>}
            {startCamera && !cameraPreview && !videoPreview && (

                <Camera
                    type={cameraType}
                    flashMode={flashMode}
                    style={styles.camera}
                    ref={__adjustCameraRef}
                    onCameraReady={onCameraReady}
                >

                    <View style={styles.cameraViewport}>
                        <FlashModeBtn handleFlashMode={__handleFlashMode} flashMode={flashMode}/>
                        <SwitchCameraBtn cameraType={cameraType} switchCamera={__switchCamera}/>
                        <ShutterBtn
                            handleTakePicture={__handleTakePicture}
                            handleRecordVideo={__handleRecordVideo}
                            isVideoRecording={isVideoRecording}
                        />
                    </View>
                </Camera>
            )}
            <StatusBar style="auto"/>
        </View>
    )
}

