// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import CText from 'components/CText';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import CameraHelper from 'helpers/CameraHelper';
// import {Worklets} from 'react-native-worklets-core';
// import {runOnJS} from 'react-native-reanimated';
// import {BarcodeFormat, scanBarcodes, Barcode} from 'vision-camera-code-scanner';

// const CameraScreen = ({navigation}) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     const requestCameraPermissions = async () => {
//       const permission = await CameraHelper.checkCameraPermission();
//       setHasPermission(permission === 'granted');
//     };

//     requestCameraPermissions();
//   }, []);

//   const onQRCodeDetected = Worklets.createRunInJsFn((qrCode: string) => {
//     // navigation.push('ProductPage', {productId: qrCode});
//     console.log(qrCode);
//   });

//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';
//       const qrCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
//       if (qrCodes.length > 0) {
//         // onQRCodeDetected(qrCodes[0]);
//         console.log(qrCodes);
//       }
//     },
//     [onQRCodeDetected],
//   );

//   if (device == null || !hasPermission) {
//     return <ActivityIndicator />;
//   }
//   return (
//     <>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor}
//       />
//       {/* {barcodeResults.map((barcode, idx) => (
//         <Text key={idx} style={styles.barcodeText}>
//           {barcode.barcodeFormat + ': ' + barcode.barcodeText}
//         </Text>
//       ))} */}
//       <TouchableOpacity style={styles.cameraBtn}></TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   cameraBtn: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 4,
//     borderColor: '#FFF',
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barcodeText: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default CameraScreen;

import {View, Text} from 'react-native';
import React from 'react';

const CameraScreen = () => {
  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  );
};

export default CameraScreen;
