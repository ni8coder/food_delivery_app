import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Button,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontFamily, fontSize} from 'theme/fonts';
import colors from 'theme/colors';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from 'components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useAppSelector} from 'app/hooks';
import {EditProfileScreenProps} from 'navigators/ProfileNavigator';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

type UserObj = {
  firstName: string;
  lastName: string;
  userColor: string;
};

const placesRef = firestore().collection('UsersPosition');

const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [color, setColor] = useState('');
  const [docId, setDocId] = useState('');
  const authUser = useAppSelector(state => state.auth.user);
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({hex}: {hex: string}) => {
    // do something with the selected color.
    setColor(hex);
    console.log(hex);
  };

  //get user data
  useEffect(() => {
    placesRef
      .where('userId', '==', authUser?.uid)
      .get()
      .then(querySnapshot => {
        setDocId(querySnapshot.docs[0].id);

        const data = querySnapshot.docs[0].data();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setColor(data.color);
      });
  }, [authUser?.uid]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 100,
      text1: 'User Updated',
    });
  };

  const updateUser = () => {
    const userObj: UserObj = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userColor: color.trim(),
    };

    placesRef
      .doc(docId)
      .update(userObj)
      .then(() => {
        console.log('User Updated!');
        showToast();
      });
    navigation.goBack();

    setFirstName('');
    setLastName('');
    setColor('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleStyle}>Edit Profile</Text>
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

        <Button title="Color Picker" onPress={() => setShowModal(true)} />

        <Modal visible={showModal} animationType="slide">
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              style={styles.colorPicker}
              value="red"
              onComplete={onSelectColor}>
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
            <Button title="Ok" onPress={() => setShowModal(false)} />
          </View>
        </Modal>

        <CustomButton
          title={'Update'}
          onPress={updateUser}
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
    color: colors.black,
    // opacity: 0.5,
    fontSize: fontSize.medium,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
  },
  searchInput: {
    color: '#000',
    paddingVertical: 12,
    fontSize: fontSize.medium,
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // height: 50,
  },
  regularText: {
    fontFamily: fontFamily.robotoRegular,
    fontSize: fontSize.medium,
    color: colors.black,
  },
  colorPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  colorPicker: {
    width: '70%',
  },
});

export default EditProfileScreen;
