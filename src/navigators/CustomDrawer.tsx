import {View, StyleSheet} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CText from 'components/CText';
import {fontSize} from 'theme/fonts';
import {useTranslation} from 'react-i18next';
import colors from 'theme/colors';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {i18n} = useTranslation();
  //   console.log('custom drawer rendered');
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
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerItemContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.customContainer}>
        <TouchableOpacity
          style={[styles.btn]}
          disabled={i18n.resolvedLanguage === 'en'}
          onPress={() => i18n.changeLanguage('en')}>
          <MaterialIcons name="language" size={22} />
          <CText
            style={[
              styles.btnText,
              {opacity: i18n.resolvedLanguage === 'en' ? 0.4 : 1},
            ]}>
            English
          </CText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          disabled={i18n.resolvedLanguage === 'fr'}
          onPress={() => i18n.changeLanguage('fr')}>
          <MaterialIcons name="language" size={22} />
          <CText
            style={[
              styles.btnText,
              {opacity: i18n.resolvedLanguage === 'fr' ? 0.4 : 1},
            ]}>
            French
          </CText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <AntDesign name="logout" size={22} />
          <CText style={styles.btnText}>Log out</CText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  drawerItemContainer: {flex: 1, backgroundColor: '#fff', paddingTop: 10},
  customContainer: {
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  btn: {
    paddingVertical: 15,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  btnText: {
    fontSize: fontSize.medium,
  },
});

export default CustomDrawer;
