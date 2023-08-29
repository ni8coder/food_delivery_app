import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {fontFamily, fontSize} from 'theme/fonts';
import colors from 'theme/colors';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from 'components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const AddUserScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const createUser = () => {
    firestore()
      .collection('users')
      .add({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
      })
      .then(() => {
        console.log('User added!');
        Toast.show({
          type: 'success',
          position: 'bottom',
          visibilityTime: 2000,
          bottomOffset: 100,
          text1: 'User added!',
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Add New User</Text>
        <TextInput
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={value => setFirstName(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={value => setLastName(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Enter Phone"
          value={phone}
          onChangeText={value => setPhone(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TextInput
          placeholder="Enter Address"
          value={address}
          onChangeText={value => setAddress(value)}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <CustomButton
          title="Add"
          onPress={createUser}
          containerStyle={{width: '100%'}}
        />
      </View>
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

export default AddUserScreen;
