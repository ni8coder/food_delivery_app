import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/CustomSafeAreaView';
import CustomButton from '@components/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SignupScreenProps} from '@navigators/AuthNavigator';
import {useAppDispatch} from '@app/hooks';
import {signIn} from '@feature/auth/authSlice';
import SocialLogin from '../components/SocialLogin';

const SignupScreen = ({navigation}: SignupScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const dispatch = useAppDispatch();

  const handleSignup = async () => {
    if (!username.replace(/\s/g, '').length) {
      Alert.alert('Username is required');
    } else if (!password.replace(/\s/g, '').length || password !== password2) {
      Alert.alert('Password does not match');
      setPassword('');
      setPassword2('');
    } else {
      try {
        await EncryptedStorage.setItem('token', username);
      } catch (error) {
        console.log(error);
      }
      dispatch(signIn('dummy-auth-token'));
    }
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Sign Up</Text>
        <TextInput
          placeholder="Enter Username"
          value={username}
          onChangeText={value => setUsername(value)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <TextInput
          placeholder="Re-enter Password"
          secureTextEntry
          style={styles.textInput}
          value={password2}
          onChangeText={value => setPassword2(value)}
        />
        <CustomButton
          title="Sign Up"
          onPress={handleSignup}
          containerStyle={{width: '100%'}}
        />
      </View>
      <SocialLogin />
    </CustomSafeAreaView>
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
