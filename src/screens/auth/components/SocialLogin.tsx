import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Food from '@assets/images/auth/food.png';
import Facebook from '@assets/images/auth/facebook.png';
import Google from '@assets/images/auth/google.png';
import {fontFamily, fontSize} from 'theme/fonts';
import colors from 'theme/colors';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const SocialLogin = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log('data', data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.barView} />
        <Text style={styles.text}>Or connect with</Text>
      </View>

      <View style={styles.imageAndLoginContainer}>
        <Image source={Food} resizeMode="contain" style={styles.foodImg} />
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtnImg}
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              )
            }>
            <Image
              source={Facebook}
              resizeMode="contain"
              style={styles.loginBtnImg}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtnImg}>
            <Image
              source={Google}
              resizeMode="contain"
              style={styles.loginBtnImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 150,
    justifyContent: 'space-between',
  },
  barContainer: {flexDirection: 'row', alignItems: 'center'},
  barView: {
    height: 2,
    backgroundColor: 'rgba(52, 73, 94, 0.3)',
    width: '65%',
    marginRight: 10,
  },
  text: {
    fontSize: fontSize.normal,
    color: colors.halfGray,
    fontFamily: fontFamily.robotoRegular,
  },
  imageAndLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  foodImg: {width: '50%', height: 120},
  loginBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  loginBtnImg: {width: 40, height: 40},
});

export default SocialLogin;
