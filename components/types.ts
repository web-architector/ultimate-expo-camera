import {ImageType} from "expo-camera/src/Camera.types";
import {CameraFlashMode} from "./FlashModeBtn";

export type CameraCapturedPicture = {
    width: number;
    height: number;
    uri: string;
    base64?: string;
    exif?: any;
};
export type CameraCapturedVideo = {
    uri: string;
};
export type CameraPictureOptions = {
    quality?: number;
    base64?: boolean;
    exif?: boolean;
    onPictureSaved?: (picture: CameraCapturedPicture) => void;
    skipProcessing?: boolean;
    // Web-only
    scale?: number;
    imageType?: ImageType;
    isImageMirror?: boolean;
    // internal
    id?: number;
    fastMode?: boolean;
};
export type CameraRecordingOptions = {
    maxDuration?: number;
    maxFileSize?: number;
    quality?: number | string;
    mute?: boolean;
    mirror?: boolean;
};

export type FlashModeProps = {
    handleFlashMode: () => void,
    flashMode: CameraFlashMode
}
export type PreviewProps = {
    retakePicture: () => void,
    data: CameraCapturedVideo | CameraCapturedPicture | null,
    saveData: () => void
}
