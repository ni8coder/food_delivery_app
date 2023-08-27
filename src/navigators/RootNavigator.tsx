import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '@screens/intro/IntroScreen';
import AuthNavigator from './AuthNavigator';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import TabNavigator from './TabNavigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {signIn, signOut} from 'feature/auth/authSlice';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isIntroShown, isLoggedIn, isLoading} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();

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
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {renderStackScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
