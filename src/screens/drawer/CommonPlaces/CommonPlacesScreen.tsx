import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {UserLocationScreenProps} from 'navigators/UserPlacesNavigator';
import firestore from '@react-native-firebase/firestore';
import {AUTHOR} from 'config/constants/app_constants';
import {useAppSelector} from 'app/hooks';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';

const placesRef = firestore().collection('UsersPosition');

const CommonPlacesScreen = ({route}: UserLocationScreenProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string | undefined>(
    undefined,
  );
  const [currentPosition, setCurrentPosition] = useState<GeoPosition>();
  const mapRef = useRef<MapViewHandle>(null);
  const authUser = useAppSelector(state => state.auth.user);

  //get location persmission
  useEffect(() => {
    (async () => {
      const result = await LocationHelper.checkLocationPermisstions();
      setPermissionStatus(result);
    })();
  }, []);

  //success callback for getCurrentPostion
  const userLocationSuccess = useCallback((position: GeoPosition) => {
    console.log('success called', position);
    setCurrentPosition(position);
    if (position.coords) {
      mapRef.current?.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, []);

  //error callback for getCurrentPostion
  const userLocationError = useCallback((error: GeoError) => {
    console.log(error);
  }, []);

  //getCurrentPosition
  useEffect(() => {
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('getCurrentPosition called');
      LocationHelper.getCurrentPosition(userLocationSuccess, userLocationError);
    }
  }, [permissionStatus, userLocationError, userLocationSuccess]);

  //navigate to map using my places location
  // useEffect(() => {
  //   console.log(isMapReady, params);
  //   if (isMapReady && params?.latitude && params?.longitude) {
  //     mapRef.current?.animateToRegion({
  //       latitude: params.latitude,
  //       longitude: params.longitude,
  //       latitudeDelta: 0.015,
  //       longitudeDelta: 0.0121,
  //     });
  //   }
  // }, [isMapReady, params]);

  //saves current position
  useEffect(() => {
    if (currentPosition && authUser) {
      const placeObj = {
        currentLatitude: currentPosition.coords.latitude,
        currentLongitude: currentPosition.coords.longitude,
        locationTime: Math.floor(Date.now() / 1000),
        speed: currentPosition.coords.speed,
        userId: authUser.uid,
        userName: authUser.email,
        author: AUTHOR,
      };

      placesRef
        .where('userId', '==', authUser.uid)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length) {
            placesRef
              .doc(querySnapshot.docs[0].id)
              .update(placeObj)
              .then(() => {
                console.log('Places updated!');
                // console.log(placeObj);
              });
          } else {
            placesRef.add(placeObj).then(() => {
              console.log('Places added!');
              // console.log(placeObj);
            });
          }
        });
    }
  }, [authUser, currentPosition]);

  //sets map ready value
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

export default CommonPlacesScreen;
