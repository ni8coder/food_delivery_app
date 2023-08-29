import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import IntroScreen from '@screens/intro/IntroScreen';
import AuthNavigator from './AuthNavigator';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import TabNavigator from './TabNavigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {signIn, signOut} from 'feature/auth/authSlice';
import NotificationHelper from 'helpers/NotificationHelper';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isIntroShown, isLoggedIn, isLoading} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('User', user);
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
    NotificationHelper.getToken();
    NotificationHelper.registerMessageHandlers(onNotificationTap);

    return () => {
      NotificationHelper.clearListeners();
    };
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
      return <RootStack.Screen name="Tabs" component={TabNavigator} />;
    }
  };

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {renderStackScreens()}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
