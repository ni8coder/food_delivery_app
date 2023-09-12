import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/tab/home/HomeScreen';
import OrderScreen from '@screens/tab/order/OrderScreen';
import MyListScreen from '@screens/tab/myList/MyListScreen';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Fontisto';
import ProfileNavigator from './ProfileNavigator';
import {DrawerToggleButton} from '@react-navigation/drawer';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Order') {
            iconName = 'clipboard-list-outline';
          } else if (route.name === 'MyList') {
            iconName = 'favorite';
            return <FIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'ProfileNav') {
            iconName = 'account';
          }
          return <MCIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D35400',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerLeft: DrawerToggleButton, headerShown: true}}
      />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="MyList" component={MyListScreen} />
      <Tab.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{title: 'Profile', tabBarHideOnKeyboard: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
