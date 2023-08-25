import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '@screens/intro/IntroScreen';
import AuthNavigator from './AuthNavigator';
import {useAppSelector} from '../app/hooks';
import TabNavigator from './TabNavigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isIntroShown, isLoggedIn} = useAppSelector(state => state.auth);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('User', user);
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
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
