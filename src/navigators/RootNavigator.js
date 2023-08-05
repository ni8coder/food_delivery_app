import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '../screens/intro_screens/IntroScreen';
import TabNavigator from './TabNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthNavigator from './AuthNavigator';
import {AuthContext} from '../context/AuthContext';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const reducerFn = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        introScreenDisplayed: action.introScreenDisplayed,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        isSignout: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null,
        isSignout: true,
      };
    case 'NAVIGATE_HOME':
      return {
        ...prevState,
        introScreenDisplayed: true,
      };
    default:
      break;
  }
};

const RootNavigator = ({navigation}) => {
  const [state, dispatch] = React.useReducer(reducerFn, {
    isSignout: false,
    isLoading: true,
    userToken: null,
    introScreenDisplayed: null,
  });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let introScreenDisplayed;
      try {
        userToken = await EncryptedStorage.getItem('token');
        introScreenDisplayed = await EncryptedStorage.getItem(
          'introScreenDisplayed',
        );
        userToken = userToken === undefined ? null : userToken;
        introScreenDisplayed =
          introScreenDisplayed === undefined ? null : introScreenDisplayed;
      } catch (error) {
        userToken = null;
        introScreenDisplayed = null;
        console.log(error);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken, introScreenDisplayed});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      navigateHome: async () => {
        try {
          await EncryptedStorage.setItem('introScreenDisplayed', '1');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'NAVIGATE_HOME'});
      },
    }),
    [],
  );

  const RootStack = createNativeStackNavigator();

  const renderStackScreens = () => {
    if (state.isLoading) {
      return <RootStack.Screen name="Splash" component={SplashScreen} />;
    } else if (state.userToken === null) {
      return <RootStack.Screen name="AuthNav" component={AuthNavigator} />;
    } else if (state.introScreenDisplayed === null) {
      return <RootStack.Screen name="Intro" component={IntroScreen} />;
    } else {
      return (
        <RootStack.Screen name="Tabs">
          {() => <TabNavigator />}
        </RootStack.Screen>
      );
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {renderStackScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
