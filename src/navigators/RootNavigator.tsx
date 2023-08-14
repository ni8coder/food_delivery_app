import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '../screens/intro_screens/IntroScreen';
import TabNavigator from './TabNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthNavigator from './AuthNavigator';
import {
  AuthContext,
  AuthContextType,
} from '../context/auth_context/AuthContext';
import AuthReducer from '../reducers/auth/AuthReducer';
import {AuthState} from '../models/AuthModel';
import {SIGN_IN, SIGN_OUT} from '../constants/auth_actions';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const INITIAL_STATE: AuthState = {
  isSignOut: false,
  isLoading: true,
  userToken: '',
};

const RootNavigator = () => {
  const [state, dispatch] = React.useReducer(AuthReducer, INITIAL_STATE);
  // const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await EncryptedStorage.getItem('token');
        userToken = userToken ? userToken : null;
      } catch (error) {
        console.log(error);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo<AuthContextType>(
    () => ({
      signIn: async () => {
        dispatch({type: SIGN_IN, token: 'dummy-auth-token'});
      },
      signUp: async () => {
        dispatch({type: SIGN_IN, token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: SIGN_OUT}),
    }),
    [],
  );

  const RootStack = createNativeStackNavigator();

  const renderStackScreens = () => {
    if (state.isLoading) {
      return <RootStack.Screen name="Splash" component={SplashScreen} />;
    } else if (state.userToken === null) {
      return <RootStack.Screen name="AuthNav" component={AuthNavigator} />;
    } else if (false) {
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
