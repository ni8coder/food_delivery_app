import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MyPlacesScreen from 'screens/drawer/MyPlaces/MyPlacesScreen';
import NewPlaceScreen from 'screens/drawer/MyPlaces/NewPlaceScreen';
import DrawerBtn from 'components/DrawerBtn';
import {LatLng} from 'react-native-maps';
import {DrawerActions} from '@react-navigation/native';
import {DrawerToggleButton} from '@react-navigation/drawer';

type MyPlacesStackParamList = {
  Places: undefined;
  'Add New Place': LatLng | undefined;
};

const MyPlacesStack = createNativeStackNavigator<MyPlacesStackParamList>();

const MyPlacesNavigator = () => {
  return (
    <MyPlacesStack.Navigator>
      <MyPlacesStack.Screen
        name="Places"
        component={MyPlacesScreen}
        options={{
          headerLeft: DrawerToggleButton,
          title: 'My Places',
        }}
      />
      <MyPlacesStack.Screen
        name="Add New Place"
        component={NewPlaceScreen}
        options={{headerShown: true}}
      />
    </MyPlacesStack.Navigator>
  );
};

export type MyPlacesScreenProps = NativeStackScreenProps<
  MyPlacesStackParamList,
  'Places'
>;

export type AddNewPlaceScreenProps = NativeStackScreenProps<
  MyPlacesStackParamList,
  'Add New Place'
>;

export default MyPlacesNavigator;
