import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {UserLocationScreenProps} from 'navigators/UserPlacesNavigator';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {AUTHOR} from 'config/constants/app_constants';
import {useAppSelector} from 'app/hooks';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';
import {LatLng, MapMarkerProps} from 'react-native-maps';
import CText from 'components/CText';
import colors from 'theme/colors';

type Place = {
  currentLatitude: number;
  currentLongitude: number;
  locationTime: number;
  speed: number;
  userId: string;
  userName: string;
  author: string;
  userColor: string;
};

const placesRef = firestore().collection('UsersPosition');

const CommonPlacesScreen = () => {
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string | undefined>(
    undefined,
  );
  const mapRef = useRef<MapViewHandle>(null);
  const authUser = useAppSelector(state => state.auth.user);

  //get location persmission
  useEffect(() => {
    (async () => {
      const result = await LocationHelper.checkLocationPermisstions();
      setPermissionStatus(result);
    })();
  }, []);

  //get all users current location
  useEffect(() => {
    const subscriber = placesRef.onSnapshot(querySnapshot => {
      // console.log('Realtime Places data: ', querySnapshot.docs);
      let markersData = querySnapshot.docs.map(doc => {
        const data = doc.data() as Place;
        return {
          coordinate: {
            latitude: data.currentLatitude,
            longitude: data.currentLongitude,
          },
          title: data.author,
          description: `User Speed is ${data.speed}`,
          pinColor: data.userColor,
        };
      });
      // console.log('jsonData', jsonData);
      setMarkers(markersData);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  //save users current position
  const saveUserPostion = useCallback(
    (position: GeoPosition) => {
      if (authUser) {
        const placeObj = {
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          locationTime: Math.floor(Date.now() / 1000),
          speed: position.coords.speed,
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
    },
    [authUser],
  );

  //success callback for getCurrentPostion
  const userLocationSuccess = useCallback(
    (position: GeoPosition) => {
      // console.log('success called', position);
      saveUserPostion(position);
    },
    [saveUserPostion],
  );

  //error callback for getCurrentPostion
  const userLocationError = useCallback((error: GeoError) => {
    console.log(error);
  }, []);

  //getCurrentPosition
  useEffect(() => {
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('getCurrentPosition called');
      LocationHelper.trackUserLocation(userLocationSuccess, userLocationError);
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

  const animateToRegion = (coords: LatLng) => {
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  //sets map ready value
  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <Map ref={mapRef} onMapReady={onMapReady} markers={markers} />
      <View style={styles.userAvatarContainer}>
        {markers.map(marker => {
          return (
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => animateToRegion(marker.coordinate)}>
              <CText style={styles.markerTitle}>{marker.title}</CText>
            </TouchableOpacity>
          );
        })}
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  userAvatarContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flex: 1,
    gap: 10,
  },
  markerTitle: {alignSelf: 'center'},
  avatarBtn: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderColor: colors.primary,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonPlacesScreen;
