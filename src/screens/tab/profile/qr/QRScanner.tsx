import {View, Text} from 'react-native';
import React from 'react';

const QRScanner = () => {
  return (
    <View>
      <Text>QRScanner</Text>
    </View>
  );
};

export default QRScanner;

// import {View, Text, StyleSheet} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   BarcodeResult,
//   DCVBarcodeReader,
//   DCVCameraView,
// } from 'dynamsoft-capture-vision-react-native';

// let region = {
//   regionTop: 30,
//   regionLeft: 15,
//   regionBottom: 70,
//   regionRight: 85,
//   regionMeasuredByPercentage: true,
// };

// const QRScanner = () => {
//   const [results, setResults] = useState<BarcodeResult[]>([]);
//   const reader = useRef<DCVBarcodeReader>();
//   const scannerViewRef = useRef<DCVCameraView>(null!);

//   useEffect(() => {
//     const initQRScanner = async () => {
//       try {
//         await DCVBarcodeReader.initLicense(
//           'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9',
//         );
//       } catch (e) {
//         console.log(e);
//       }
//       // Create a barcode reader instance.
//       reader.current = await DCVBarcodeReader.createInstance();

//       // Add a result listener. The result listener will handle callback when barcode result is returned.
//       reader.current.addResultListener(results => {
//         // Update the newly detected barcode results to the state.
//         setResults(results);
//       });

//       // Enable video barcode scanning.
//       // If the camera is opened, the barcode reader will start the barcode decoding thread when you triggered the startScanning.
//       // The barcode reader will scan the barcodes continuously before you trigger stopScanning.
//       reader.current.startScanning();

//       return reader;
//     };

//     initQRScanner();

//     return () => {
//       reader?.current?.stopScanning();
//       // Remove the result listener when your component is unmount.
//       reader?.current?.removeAllResultListeners();
//     };
//   }, []);

//   const getResultsBoxText = () => {
//     console.log(results);
//     // Add code to fetch barcode text and format from the BarcodeResult
//     let resultBoxText = '';
//     if (results && results.length > 0) {
//       for (let i = 0; i < results.length; i++) {
//         resultBoxText +=
//           results[i].barcodeFormatString + '\n' + results[i].barcodeText + '\n';
//       }
//     }

//     return resultBoxText;
//   };

//   return (
//     <DCVCameraView
//       style={styles.container}
//       ref={scannerViewRef}
//       scanRegionVisible={true}
//       scanRegion={region}
//       overlayVisible={true}>
//       {/*Add a text box to display the barcode result.*/}
//       <Text style={styles.textStyle}>
//         {results && results.length > 0
//           ? getResultsBoxText()
//           : 'No Barcode Detected'}
//       </Text>
//     </DCVCameraView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textStyle: {
//     flex: 0.9,
//     marginTop: 100,
//     textAlign: 'center',
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default QRScanner;
