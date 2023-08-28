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
import {SignupScreenProps} from '@navigators/AuthNavigator';
import {useAppDispatch} from '@app/hooks';
import {signIn, takeSignUp} from '@feature/auth/authSlice';
import SocialLogin from '../components/SocialLogin';
import auth from '@react-native-firebase/auth';
import colors from 'theme/colors';
import {fontFamily, fontSize} from 'theme/fonts';

const SignupScreen = ({navigation}: SignupScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const dispatch = useAppDispatch();

  const handleSignup = async () => {
    if (!email.replace(/\s/g, '').length) {
      Alert.alert('email is required');
    } else if (!password.replace(/\s/g, '').length || password !== password2) {
      Alert.alert('Password does not match');
      setPassword('');
      setPassword2('');
    } else {
      // auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(() => {
      //     console.log('User account created & signed in!');
      //   })
      //   .catch(error => {
      //     if (error.code === 'auth/email-already-in-use') {
      //       console.log('That email address is already in use!');
      //       Alert.alert('That email address is already in use!');
      //     }
      //     if (error.code === 'auth/invalid-email') {
      //       console.log('That email address is invalid!');
      //       Alert.alert('That email address is invalid!');
      //     }
      //     if (error.code === 'auth/weak-password') {
      //       console.log(error);
      //       Alert.alert('Please choose a strong password');
      //     }
      //     console.error(error);
      //   });
      dispatch(takeSignUp({email, password}));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Sign Up</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={value => setPassword(value)}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Re-enter Password"
          secureTextEntry
          style={styles.textInput}
          value={password2}
          onChangeText={value => setPassword2(value)}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <CustomButton
          title="Sign Up"
          onPress={handleSignup}
          containerStyle={{width: '100%'}}
        />
      </View>
      <SocialLogin />
    </KeyboardAvoidingView>
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
    fontFamily: fontFamily.poppinsBold,
    fontSize: fontSize.large,
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

export default SignupScreen;
