import {View, Text} from 'react-native';
import React from 'react';
import AuthScreen from '../screens/auth_screens/AuthScreen';
import LoginScreen from '../screens/auth_screens/LoginScreen';
import SignupScreen from '../screens/auth_screens/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{title: ''}}>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Auth"
        component={AuthScreen}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
