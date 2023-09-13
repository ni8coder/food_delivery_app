import React, {useCallback, useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import IntroScreen from '@screens/intro/IntroScreen';
import AuthNavigator from './AuthNavigator';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import TabNavigator from './TabNavigator';
import auth from '@react-native-firebase/auth';
import {signIn, signOut} from 'feature/auth/authSlice';
import NotificationHelper from 'helpers/NotificationHelper';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import AppNavigator from './AppNavigator';
import {useTranslation} from 'react-i18next';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {i18n} = useTranslation();
  const {isIntroShown, isLoggedIn, isLoading} = useAppSelector(
    state => state.auth,
  );
  const languageCode = useAppSelector(state => state.i18n.languageCode);
  console.log('persisted languageCode', languageCode);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const languageRef = useRef(false);

  if (!languageRef.current) {
    i18n.changeLanguage(languageCode);
    languageRef.current = true;
  }

  useEffect(() => {
    i18n.on('languageChanged', function (lng) {
      // moment.locale(lng);
      console.log('language changed', lng);
    });

    return () => {
      i18n.off('languageChanged');
    };
  }, [i18n]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      // console.log('User', user);
      if (user !== null) {
        dispatch(signIn(user?.toJSON()));
      } else {
        dispatch(signOut());
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [dispatch]);

  const onNotificationTap = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(remoteMessage);
      navigation.navigate('ProfileNav');
    },
    [navigation],
  );

  useEffect(() => {
    NotificationHelper.requestUserPermission();
    NotificationHelper.getToken();
    NotificationHelper.registerMessageHandlers(onNotificationTap);

    return () => {
      NotificationHelper.clearListeners();
    };
  }, [onNotificationTap]);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const renderStackScreens = () => {
    if (!isLoggedIn) {
      return <RootStack.Screen name="AuthNav" component={AuthNavigator} />;
    }
    // else if (!isIntroShown) {
    //   return <RootStack.Screen name="Intro" component={IntroScreen} />;
    // }
    else {
      return <RootStack.Screen name="App" component={AppNavigator} />;
    }
  };

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {renderStackScreens()}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
