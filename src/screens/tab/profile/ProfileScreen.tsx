import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/CustomSafeAreaView';
import ProfileImage from '@assets/images/profile/profile.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '@components/CustomButton';
import {ProfileScreenProps} from '@navigators/ProfileNavigator';
import {useAppDispatch} from '@app/hooks';
import {signOut} from '@feature/auth/authSlice';
import {fontFamily, fontSize} from '@theme/fonts';
import auth from '@react-native-firebase/auth';
import CText from 'components/CText';
import colors from 'theme/colors';

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        // dispatch(signOut());
      })
      .catch(error => console.log(error));
    // dispatch(signOut());
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{position: 'absolute', top: 50, right: 20}}>
        <FontAwesomeIcon name={'bars'} size={20} />
      </TouchableOpacity> */}
      <ScrollView>
        <View style={styles.imageContainer}>
          <View>
            <Image source={ProfileImage} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('Edit Profile')}>
              <FontAwesome name={'edit'} size={30} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <CText style={styles.nameCText}>Naznin</CText>
            <CText style={styles.phoneNumber}>+0800101111</CText>
          </View>
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => navigation.navigate('User')}>
            <CText>Users</CText>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => navigation.navigate('Camera')}>
            <CText>Camera</CText>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => navigation.navigate('Payment Method')}>
            <CText>Payment Settings</CText>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkView}
            onPress={() => navigation.navigate('QR Scanner')}>
            <CText>QR Code Reader</CText>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <CText>About Us</CText>
            <FontAwesome name={'angle-right'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkView}>
            <CText>Contact Us</CText>
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
  nameCText: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: fontSize.medium,
  },
  phoneNumber: {
    fontFamily: fontFamily.robotoRegular,
    fontSize: fontSize.normal,
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
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ProfileScreen;
