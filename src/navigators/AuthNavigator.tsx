import React from 'react';
import AuthScreen from '@screens/auth/AuthScreen';
import LoginScreen from '@screens/auth/login/LoginScreen';
import SignupScreen from '@screens/auth/signup/SignupScreen';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

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

export type AuthScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Auth'
>;

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

export type SignupScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Signup'
>;

export default AuthNavigator;
