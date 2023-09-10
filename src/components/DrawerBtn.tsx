import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

const DrawerBtn = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Feather name="menu" size={25} color="rgba(0,0,0,0.5)" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 10},
});

export default DrawerBtn;
