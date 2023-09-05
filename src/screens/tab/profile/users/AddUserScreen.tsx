import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontFamily, fontSize} from 'theme/fonts';
import colors from 'theme/colors';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from 'components/CustomButton';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppSelector} from 'app/hooks';
import {AddUserScreenProps} from 'navigators/ProfileNavigator';

type DropdownItem = {
  label: string;
  value: string;
};
const usersRef = firestore().collection('users');

const AddUserScreen = ({navigation, route}: AddUserScreenProps) => {
  const user = route.params?.user;
  const isEditMode = user ? true : false;
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const users = useAppSelector(state => state.user.users);

  useEffect(() => {
    if (users.length) {
      let dropDownItems = users.map(user => {
        return {
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        };
      });
      setItems(dropDownItems);
    }
  }, [users]);

  useEffect(() => {
    if (user?.parent) {
      user.parent.get().then((doc: FirebaseFirestoreTypes.DocumentData) => {
        setValue(doc.id);
        console.log('parent value', doc.id);
      });
    }
  }, [user]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 100,
      text1: isEditMode ? 'User Updated' : 'User added!',
    });
  };

  const createUser = () => {
    const userObj = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      parent: firestore().doc('users/' + value),
    };

    if (isEditMode && user?.id) {
      usersRef
        .doc(user.id)
        .update(userObj)
        .then(() => {
          console.log('User added!');
          showToast();
        });
    } else {
      usersRef.add(userObj).then(() => {
        console.log('User added!');
        showToast();
      });
    }
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
        <DropDownPicker
          searchable={true}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="SCROLLVIEW"
          placeholder="Select Parent"
          // containerStyle={{borderColor: 'red'}}
          style={{borderColor: 'rgba(0,0,0,0.5)'}}
          searchPlaceholder={'Enter Parent Name'}
          searchTextInputStyle={styles.searchInput}
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
          numberOfLines={2}
          multiline={true}
          value={address}
          onChangeText={value => setAddress(value)}
          style={[styles.textInput, {height: 70}]}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />

        <CustomButton
          title={isEditMode ? 'Update' : 'Add'}
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
  searchInput: {
    color: '#000',
    paddingVertical: 12,
  },
});

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={'height'}
//       keyboardVerticalOffset={50}>
//       <ScrollView>
//         <View style={styles.innerContainer}>
//           <Text style={styles.titleStyle}>Add New User</Text>
//           <TextInput
//             placeholder="Enter First Name"
//             value={firstName}
//             onChangeText={value => setFirstName(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Last Name"
//             value={lastName}
//             onChangeText={value => setLastName(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter email"
//             value={email}
//             onChangeText={value => setEmail(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Phone"
//             value={phone}
//             onChangeText={value => setPhone(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Address"
//             value={address}
//             onChangeText={value => setAddress(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Address 2"
//             value={address}
//             onChangeText={value => setAddress(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Address 3"
//             value={address}
//             onChangeText={value => setAddress(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <TextInput
//             placeholder="Enter Address"
//             value={address}
//             onChangeText={value => setAddress(value)}
//             style={styles.textInput}
//             autoCapitalize={'none'}
//             placeholderTextColor={'rgba(0,0,0,0.5)'}
//           />
//           <DropDownPicker
//             searchable={true}
//             open={open}
//             value={value}
//             items={items}
//             setOpen={setOpen}
//             setValue={setValue}
//             setItems={setItems}
//             listMode="SCROLLVIEW"
//             // containerStyle={{borderColor: 'red'}}
//             style={{borderColor: colors.halfGray}}
//             searchPlaceholder={'Enter Parent Name'}
//             searchTextInputStyle={styles.searchInput}
//           />
//           <CustomButton
//             title="Add"
//             onPress={createUser}
//             containerStyle={{width: '100%'}}
//           />
//           <CustomButton
//             title="Add"
//             onPress={createUser}
//             containerStyle={{width: '100%'}}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     width: '90%',
//     // borderWidth: 2,
//     // borderColor: 'red',
//     alignSelf: 'center',
//     gap: 20,
//     marginBottom: 15,
//   },
//   titleStyle: {
//     fontFamily: fontFamily.poppinsBold,
//     fontSize: fontSize.large,
//     alignSelf: 'flex-start',
//     color: colors.black,
//   },
//   textInput: {
//     height: 50,
//     borderRadius: 25,
//     width: '100%',
//     backgroundColor: '#ECF0F1',
//     color: 'rgba(0,0,0,0.5)',
//     // opacity: 0.5,
//     fontSize: 14,
//     paddingHorizontal: 15,
//     fontFamily: 'Roboto-Regular',
//   },
//   searchInput: {
//     color: '#000',
//     paddingVertical: 12,
//   },
// });

export default AddUserScreen;
