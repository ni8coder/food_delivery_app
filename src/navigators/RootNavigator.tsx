import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '../screens/intro_screens/IntroScreen';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import {useAppSelector} from '../app/hooks';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isIntroShown, isLoggedIn} = useAppSelector(state => state.auth);

  const renderStackScreens = () => {
    if (!isLoggedIn) {
      return <RootStack.Screen name="AuthNav" component={AuthNavigator} />;
    } else if (!isIntroShown) {
      return <RootStack.Screen name="Intro" component={IntroScreen} />;
    } else {
      return (
        <RootStack.Screen name="Tabs">
          {() => <TabNavigator />}
        </RootStack.Screen>
      );
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
