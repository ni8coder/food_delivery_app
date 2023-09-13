import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import DrawerBtn from 'components/DrawerBtn';
import {LatLng} from 'react-native-maps';
import UserListScreen from 'screens/drawer/UserPlaces/UserListScreen';
import UserLocationScreen from 'screens/drawer/UserPlaces/UserLocationScreen';
import UserProfileScreen from 'screens/drawer/UserPlaces/UserProfileScreen';
import {DrawerToggleButton} from '@react-navigation/drawer';

type UserPlacesStackParamList = {
  'User List': undefined;
  'User Profile': {userId: string; userName: string} | undefined;
  'User Location': LatLng | undefined;
};

const UserPlacesStack = createNativeStackNavigator<UserPlacesStackParamList>();

const UserPlacesNavigator = () => {
  return (
    <UserPlacesStack.Navigator>
      <UserPlacesStack.Screen
        name="User List"
        component={UserListScreen}
        options={{
          headerLeft: DrawerToggleButton,
        }}
      />
      <UserPlacesStack.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{headerShown: true, title: 'User Profile'}}
      />
      <UserPlacesStack.Screen
        name="User Location"
        component={UserLocationScreen}
        options={{headerShown: true, title: 'Location'}}
      />
    </UserPlacesStack.Navigator>
  );
};

export type UserListScreenProps = NativeStackScreenProps<
  UserPlacesStackParamList,
  'User List'
>;

export type UserPlacesScreenProps = NativeStackScreenProps<
  UserPlacesStackParamList,
  'User Profile'
>;

export type UserLocationScreenProps = NativeStackScreenProps<
  UserPlacesStackParamList,
  'User Location'
>;

export default UserPlacesNavigator;
