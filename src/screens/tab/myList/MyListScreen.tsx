import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from './Map';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import colors from 'theme/colors';
import CustomButton from 'components/CustomButton';

const MyListScreen = () => {
  const [searchVal, setSearchVal] = useState('');
  const mapRef = useRef<MapViewHandle>(null);
  const searchInputRef = useRef<TextInput>(null!);

  const trackUserLocationSuccess = useCallback((position: GeoPosition) => {
    console.log('success called');
    if (position.coords) {
      mapRef.current?.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, []);

  const trackUserLocationError = useCallback((error: GeoError) => {
    console.log(error);
  }, []);

  useEffect(() => {
    console.log('useeffect of location screen ran');
    let watchId: number | undefined;

    const trackUser = async () => {
      const permisstionStatus =
        await LocationHelper.checkLocationPermisstions();
      console.log('updated permission status', permisstionStatus);
      if (permisstionStatus === RESULTS.GRANTED) {
        console.log('track user location calledd');
        watchId = LocationHelper.trackUserLocation(
          trackUserLocationSuccess,
          trackUserLocationError,
        );
      }
    };

    trackUser();

    return () => {
      console.log('tracking cleared:', watchId);
      LocationHelper.clearTracking(watchId);
    };
  }, [trackUserLocationError, trackUserLocationSuccess]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={searchInputRef}
        placeholder="Search"
        value={searchVal}
        onChangeText={value => setSearchVal(value)}
        style={styles.textInput}
        autoCapitalize={'none'}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
      <Map ref={mapRef} />
      <CustomButton
        title="Focus Search Input"
        onPress={() => searchInputRef.current.focus()}
        containerStyle={{width: '90%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    width: '90%',
    backgroundColor: '#ECF0F1',
    color: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
    position: 'absolute',
    top: 50,
    zIndex: 10,
    borderColor: colors.black,
    borderWidth: 1,
  },
});

export default MyListScreen;
