import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/CustomSafeAreaView';
import CustomButton from '@components/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LoginScreenProps} from '@navigators/AuthNavigator';
import {useAppDispatch} from '@app/hooks';
import {signIn, takeSignIn} from '@feature/auth/authSlice';
import SocialLogin from '../components/SocialLogin';
import auth from '@react-native-firebase/auth';
import colors from 'theme/colors';

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    if (!email.replace(/\s/g, '').length) {
      Alert.alert('email is required');
    } else if (password === '') {
      Alert.alert('Password is required');
    } else {
      try {
        // auth().signInWithEmailAndPassword(email, password);
        dispatch(takeSignIn({email, password}));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    // <CustomSafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Sign In</Text>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder="Enter email"
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <CustomButton
          title="Sign In"
          onPress={handleSignIn}
          containerStyle={{width: '100%'}}
        />
      </View>
      <SocialLogin />
    </KeyboardAvoidingView>
    // </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
  innerContainer: {
    width: '90%',
    // borderWidth: 2,
    // borderColor: 'red',
    alignSelf: 'center',
    gap: 20,
  },
  titleStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    alignSelf: 'flex-start',
    color: colors.black,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    width: '100%',
    backgroundColor: '#ECF0F1',
    color: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
  },
});

export default LoginScreen;
