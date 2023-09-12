import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {UserLocationScreenProps} from 'navigators/UserPlacesNavigator';

const UserLocationScreen = ({route}: UserLocationScreenProps) => {
  const params = route.params;
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<MapViewHandle>(null);

  //navigate to map using my places location
  useEffect(() => {
    console.log(isMapReady, params);
    if (isMapReady && params?.latitude && params?.longitude) {
      mapRef.current?.animateToRegion({
        latitude: params.latitude,
        longitude: params.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [isMapReady, params]);

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <Map ref={mapRef} onMapReady={onMapReady} />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
});

export default UserLocationScreen;
