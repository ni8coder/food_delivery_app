import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/tab_screens/ProfileScreen';
import PaymentMethodScreen from '../screens/tab_screens/PaymentMethodScreen';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="Payment Method"
        component={PaymentMethodScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
