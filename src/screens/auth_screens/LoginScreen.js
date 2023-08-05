import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CustomButton from '../../components/CustomButton';
import {AuthContext} from '../../context/AuthContext';
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {signIn} = React.useContext(AuthContext);

  const handleSignIn = async () => {
    if (!username.replace(/\s/g, '').length) {
      Alert.alert('Username is required');
    } else if (password === '') {
      Alert.alert('Password is required');
    } else {
      try {
        await EncryptedStorage.setItem('token', username);
      } catch (error) {
        console.log(error);
      }
      signIn({username, password});
    }
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Sign In</Text>
        <TextInput
          value={username}
          onChangeText={value => setUsername(value)}
          placeholder="Enter Username"
          style={styles.textInput}
        />
        <TextInput
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
        />
        <CustomButton
          title="Sign In"
          onPress={handleSignIn}
          containerStyle={{width: '100%'}}
        />
      </View>
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

export default LoginScreen;
