import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ProfileScreen from '@screens/tab/profile/ProfileScreen';
import PaymentMethodScreen from '@screens/tab/profile/profileStack/PaymentMethodScreen';
import CardDetails from '@screens/tab/profile/profileStack/CardDetails';

type ProfileStackParamList = {
  Profile: undefined;
  'Payment Method': {post: string} | undefined;
  'Card Detail': {cardNumber: string; cvv: string};
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

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
      <ProfileStack.Screen name="Card Detail" component={CardDetails} />
    </ProfileStack.Navigator>
  );
};

export type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;

export type PaymentMethodScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Payment Method'
>;

export type CardDetailScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Card Detail'
>;

export default ProfileNavigator;
