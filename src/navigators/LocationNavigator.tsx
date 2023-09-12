import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MyPlacesScreen from 'screens/drawer/MyPlaces/MyPlacesScreen';
import NewPlaceScreen from 'screens/drawer/MyPlaces/NewPlaceScreen';
import DrawerBtn from 'components/DrawerBtn';
import {LatLng} from 'react-native-maps';

type LocationStackParamList = {
  'My Places': undefined;
  'Add New Place': LatLng | undefined;
};

const LocationStack = createNativeStackNavigator<LocationStackParamList>();

const LocationNavigator = () => {
  return (
    <LocationStack.Navigator screenOptions={{title: ''}}>
      <LocationStack.Screen
        name="My Places"
        component={MyPlacesScreen}
        options={{
          headerLeft: DrawerBtn,
        }}
      />
      <LocationStack.Screen
        name="Add New Place"
        component={NewPlaceScreen}
        options={{headerShown: true}}
      />
    </LocationStack.Navigator>
  );
};

export type MyPlacesScreenProps = NativeStackScreenProps<
  LocationStackParamList,
  'My Places'
>;

export type AddNewPlaceScreenProps = NativeStackScreenProps<
  LocationStackParamList,
  'Add New Place'
>;

export default LocationNavigator;
