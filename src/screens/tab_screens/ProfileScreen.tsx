import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import ProfileImage from '../../../assets/images/profile/profile.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAuth} from '../../context/auth_context/useAuth';
import {ProfileScreenProps} from '../../navigators/ProfileNavigator';

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const {signOut} = useAuth();

  const handleLogout = async () => {
    await EncryptedStorage.removeItem('token');
    // await EncryptedStorage.removeItem('introScreenDisplayed');
    signOut();
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={ProfileImage} style={styles.profileImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Naznin</Text>
            <Text style={styles.phoneNumber}>+0800101111</Text>
          </View>
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.linkView}>
            <Text>My Profile</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <Text>Change Password</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => navigation.navigate('Payment Method')}>
            <Text>Payment Settings</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <Text>My Voucher</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <Text>About Us</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <Text>Contact Us</Text>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Log Out"
          onPress={handleLogout}
          containerStyle={{backgroundColor: '#ECF0F1', width: '100%'}}
          titleStyle={{color: '#000'}}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  phoneNumber: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  linkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkContainer: {
    gap: 20,
    marginBottom: 80,
  },
});

export default ProfileScreen;
