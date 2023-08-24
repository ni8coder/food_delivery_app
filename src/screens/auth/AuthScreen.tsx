import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/CustomSafeAreaView';
import Hamburger from '@assets/images/auth/hamburger.png';
import CustomButton from '@components/CustomButton';
import {AuthScreenProps} from '@navigators/AuthNavigator';
import SocialLogin from './components/SocialLogin';

const AuthScreen = ({navigation}: AuthScreenProps) => {
  return (
    <CustomSafeAreaView style={styles.container}>
      <Image source={Hamburger} style={styles.mainImage} />
      <View style={styles.btnContainer}>
        <CustomButton
          title="Sign In"
          onPress={() => navigation.navigate('Login')}
        />
        <CustomButton
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
          containerStyle={{backgroundColor: '#ECF0F1'}}
          titleStyle={{color: '#000'}}
        />
      </View>
      <SocialLogin />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  mainImage: {
    width: 300,
    height: 300,
    marginTop: 60,
  },
  btnContainer: {
    width: '100%',
    gap: 20,
    marginTop: 50,
  },
});

export default AuthScreen;
