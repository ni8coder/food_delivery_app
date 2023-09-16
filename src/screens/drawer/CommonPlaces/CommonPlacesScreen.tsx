import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import firestore from '@react-native-firebase/firestore';
import {AUTHOR} from 'config/constants/app_constants';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';
import {LatLng, MapMarkerProps} from 'react-native-maps';
import {ActionSheetRef} from 'react-native-actions-sheet';
import PubNubHelper from 'helpers/PubNubHelper';
import {MessageEvent} from 'pubnub';
import MapTopOverlay from './ChildComponent/MapTopOverlay';
import UserAvatars from './ChildComponent/UserAvatars';
import {Message, addMessage} from 'feature/message/messageSlice';
import MessageList from './ChildComponent/MessageList';

export type Place = {
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
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string | undefined>(
    undefined,
  );
  const mapRef = useRef<MapViewHandle>(null);
  const authUser = useAppSelector(state => state.auth.user);
  const [channels] = useState(['ITC', authUser.uid]);
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.messages.messages);
  console.log('messages', messages);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = event.message;
      console.log('message', event);
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        const data: Message = {
          message: text,
          channel: event.channel,
          publisher: event.publisher,
        };
        const isITC = event.channel === 'ITC';
        dispatch(addMessage({channel: isITC ? 'ITC' : event.publisher, data}));
      }
    },
    [dispatch],
  );

  const showMessageList = () => {
    actionSheetRef.current?.show();
  };

  //subscribe to channels
  useEffect(() => {
    PubNubHelper.subscribe({channels});
    const removeHandler = PubNubHelper.addListener(handleMessage);
    console.log('all listeners addedd');

    return () => {
      console.log('all listeners removed');
      PubNubHelper.removeListener(removeHandler);
      PubNubHelper.unsubscribeAll();
    };
  }, [channels, handleMessage]);

  //get location persmissions
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
      let markersData: MapMarkerProps[] = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data() as Place;

        markersData.push({
          coordinate: {
            latitude: data.currentLatitude,
            longitude: data.currentLongitude,
          },
          title: data.author,
          description: `User Speed is ${data.speed}`,
          pinColor: data.userColor,
        });
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
    let trackingId: number;
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('getCurrentPosition called');
      trackingId = LocationHelper.trackUserLocation(
        userLocationSuccess,
        userLocationError,
      );
    }

    return () => {
      LocationHelper.clearTracking(trackingId);
    };
  }, [permissionStatus, userLocationError, userLocationSuccess]);

  const animateToRegion = useCallback((coords: LatLng) => {
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  }, []);

  //sets map ready value
  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <MapTopOverlay />
      <Map ref={mapRef} onMapReady={onMapReady} markers={markers} />
      <UserAvatars
        animateToRegion={animateToRegion}
        markers={markers}
        showMessageList={showMessageList}
      />
      <MessageList messages={messages} ref={actionSheetRef} />
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
