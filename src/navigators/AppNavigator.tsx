import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontFamily, fontSize} from 'theme/fonts';
import CustomDrawer from './CustomDrawer';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'theme/colors';
import LocationNavigator from './LocationNavigator';
import LocaleScreen from 'screens/drawer/Locales/LocaleScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  // console.log('app nav rendered');
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({route}) => ({
        drawerType: 'slide',
        drawerPosition: 'left',
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveTintColor: colors.black,
        drawerActiveTintColor: colors.white,
        drawerLabelStyle: {
          fontFamily: fontFamily.robotoRegular,
          fontSize: fontSize.medium,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        drawerIcon: ({size, color}) => {
          if (route.name === 'Tabs') {
            return <FontAwesome name="home" size={size} color={color} />;
          } else if (route.name === 'Places') {
            return <Entypo name="location-pin" size={size} color={color} />;
          } else if (route.name === 'Locale') {
            return <MaterialIcons name="language" size={size} color={color} />;
          }
        },
      })}>
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen name="Places" component={LocationNavigator} />
      <Drawer.Screen
        name="Locale"
        component={LocaleScreen}
        options={{headerShown: true}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
