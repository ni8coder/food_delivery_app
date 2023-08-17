import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PolicyScreen from 'screens/drawer/PolicyScreen';
import TermsScreen from 'screens/drawer/TermsScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'left',
        headerShown: false,
      }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="Policy" component={PolicyScreen} />
      <Drawer.Screen name="Terms" component={TermsScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
