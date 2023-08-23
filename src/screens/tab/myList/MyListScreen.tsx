import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import Map, {MapViewHandle} from './Map';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';

const MyListScreen = () => {
  const mapRef = useRef<MapViewHandle>(null);

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
      <Map ref={mapRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyListScreen;
