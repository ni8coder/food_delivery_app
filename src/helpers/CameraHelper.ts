import {Camera} from 'react-native-vision-camera';

class CameraHelper {
  checkCameraPermission = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      switch (cameraPermission) {
        case 'denied':
        case 'not-determined':
        case 'restricted':
          const result = await this.requestCameraPermission();
          return result;
        case 'granted':
          return cameraPermission;
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestCameraPermission = async () => {
    try {
      return await Camera.requestCameraPermission();
    } catch (error) {
      console.log(error);
    }
  };

  checkMicrophonePermission = async () => {
    try {
      const cameraPermission = await Camera.getMicrophonePermissionStatus();

      switch (cameraPermission) {
        case 'denied':
        case 'not-determined':
        case 'restricted':
          const result = await this.requestMicrophonePermission();
          return result;
        case 'granted':
          return cameraPermission;
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestMicrophonePermission = async () => {
    try {
      return await Camera.requestMicrophonePermission();
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CameraHelper();
