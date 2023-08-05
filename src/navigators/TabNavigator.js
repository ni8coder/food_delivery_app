import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tab_screens/HomeScreen';
import OrderScreen from '../screens/tab_screens/OrderScreen';
import MyListScreen from '../screens/tab_screens/MyListScreen';
import ProfileScreen from '../screens/tab_screens/ProfileScreen';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Fontisto';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Order') {
            iconName = 'clipboard-list-outline';
          } else if (route.name === 'MyList') {
            iconName = 'favorite';
            return <FIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }
          return <MCIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D35400',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="MyList" component={MyListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
