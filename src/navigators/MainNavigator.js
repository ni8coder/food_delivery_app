import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import IntroScreen from '../screens/intro_screens/IntroScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigator from './TabNavigator';

const AuthContext = React.createContext();

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
    default:
      break;
  }
};

const MainNavigator = ({navigation}) => {
  const [state, dispatch] = React.useReducer(reducerFn, {
    isSignout: false,
    isLoading: true,
    userToken: null,
  });
  console.log('state', state);

  React.useEffect(() => {
    const bootstrapAsync = () => {
      let userToken;
      try {
        userToken = 'null';
      } catch (error) {
        //
      }
      console.log(userToken);
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
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
    }),
    [],
  );

  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken === null ? (
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={IntroScreen}
            />
          ) : (
            <Stack.Screen name="Tabs" component={TabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default MainNavigator;
