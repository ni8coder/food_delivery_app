import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import firestore from '@react-native-firebase/firestore';
import {AUTHOR, ITC, ITC_DATA} from 'config/constants/app_constants';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import LocationHelper from 'helpers/LocationHelper';
import {RESULTS} from 'react-native-permissions';
import {LatLng, MapMarkerProps} from 'react-native-maps';
import {ActionSheetRef} from 'react-native-actions-sheet';
import PubNubHelper from 'helpers/PubNubHelper';
import {MessageEvent} from 'pubnub';
import ChatInput from './ChildComponent/ChatInput';
import UserList from './ChildComponent/UserList';
import {
  Message,
  addMessage,
  resetUnreadCount,
} from 'feature/message/messageSlice';
import MessageList from './ChildComponent/MessageList';
import {UserPosition, setUserPosition} from 'feature/places/placesSlice';
import {useUpdateLocation} from 'hooks/useUpdateLocation';

const placesRef = firestore().collection('UsersPosition');

const CommonPlacesScreen = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  // const [userData, setUserData] =
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const mapRef = useRef<MapViewHandle>(null);
  const authUser = useAppSelector(state => state.auth.user);
  const [channels] = useState(['ITC', authUser?.uid]);
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.messages.messages);
  // console.log('All Messages', messages);

  useUpdateLocation();

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = event.message;
      // console.log('Received Message', event);
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        const data: Message = {
          message: text,
          channel: event.channel,
          publisher: event.publisher,
        };
        const isITC = event.channel === ITC;
        dispatch(addMessage({channel: isITC ? ITC : event.publisher, data}));
      }
    },
    [dispatch],
  );

  const showMessageList = useCallback(
    (userId: string) => {
      if (messages[userId]) {
        dispatch(resetUnreadCount({channel: userId}));
      }
      const messageListTemp = messages[userId]?.list;
      setMessageList(messageListTemp ? messageListTemp : []);
      actionSheetRef.current?.show();
    },
    [dispatch, messages],
  );

  //subscribe to channels
  useEffect(() => {
    PubNubHelper.subscribe({channels});
    PubNubHelper.addListener(handleMessage);
    console.log('all listeners added');

    return () => {
      console.log('all listeners removed');
      PubNubHelper.removeListener(handleMessage);
      PubNubHelper.unsubscribeAll();
    };
  }, [channels, handleMessage]);

  //get initial user position data
  useEffect(() => {
    placesRef.get().then(querySnapshot => {
      // console.log('Realtime Places data: ', querySnapshot.docs);
      let userPositionData: UserPosition[] = [];
      querySnapshot.docs.forEach(doc => {
        const data = doc.data() as UserPosition;
        userPositionData.push(data);
      });
      userPositionData.push(ITC_DATA);
      // console.log('jsonData', jsonData);
      dispatch(setUserPosition(userPositionData));
    });
  }, [dispatch]);

  //get all users current location
  useEffect(() => {
    const subscriber = placesRef.onSnapshot(querySnapshot => {
      // console.log('Realtime Places data: ', querySnapshot.docs);
      let markersData: MapMarkerProps[] = [];
      querySnapshot.docs.forEach(doc => {
        const data = doc.data() as UserPosition;
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
      <ChatInput />
      <Map ref={mapRef} onMapReady={onMapReady} markers={markers} />
      <UserList
        animateToRegion={animateToRegion}
        showMessageList={showMessageList}
      />
      <MessageList messages={messageList} ref={actionSheetRef} />
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
