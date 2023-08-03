/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import IntroScreen from './screens/intro_screen/IntroScreen';
// import Login from './screens/auth_screen/Login';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <IntroScreen />
    </NavigationContainer>
  );
}

export default App;
