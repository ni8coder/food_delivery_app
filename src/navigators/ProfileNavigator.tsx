import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ProfileScreen from '@screens/tab/profile/ProfileScreen';
import PaymentMethodScreen from 'screens/tab/profile/payment/PaymentMethodScreen';
import CardDetails from 'screens/tab/profile/payment/CardDetails';
import UserScreen from 'screens/tab/profile/users/UserScreen';
import UserDetailScreen from 'screens/tab/profile/users/UserDetailScreen';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import AddUserScreen from 'screens/tab/profile/users/AddUserScreen';
import CameraScreen from 'screens/tab/profile/camera/CameraScreen';
import QRScanner from 'screens/tab/profile/qr/QRScanner';

type ProfileStackParamList = {
  Profile: undefined;
  'Payment Method': {post: string} | undefined;
  'Card Detail': {cardNumber: string; cvv: string};
  User: undefined;
  Camera: undefined;
  'QR Scanner': undefined;
  'User Detail': {user: FirebaseFirestoreTypes.DocumentData | undefined};
  'Add User': {user: FirebaseFirestoreTypes.DocumentData | undefined};
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
      <ProfileStack.Screen name="User" component={UserScreen} />
      <ProfileStack.Screen name="User Detail" component={UserDetailScreen} />
      <ProfileStack.Screen name="Add User" component={AddUserScreen} />
      <ProfileStack.Screen name="Camera" component={CameraScreen} />
      <ProfileStack.Screen name="QR Scanner" component={QRScanner} />
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

export type UserScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'User'
>;

export type UserDetailScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'User Detail'
>;

export type AddUserScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Add User'
>;

export default ProfileNavigator;
