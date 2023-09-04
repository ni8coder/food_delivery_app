import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {UserScreenProps} from 'navigators/ProfileNavigator';
import {User, setUsers} from 'feature/users/userSlice';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {fontFamily, fontSize} from 'theme/fonts';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const usersRef = firestore().collection('users');

const UserScreen = ({navigation}: UserScreenProps) => {
  const users = useAppSelector(state => state.user.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = usersRef.onSnapshot(querySnapshot => {
      // console.log('Realtime User data: ', querySnapshot.docs);
      let jsonData: User[] = querySnapshot.docs.map(doc => {
        let user = doc.data();
        return {
          id: doc.id,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          phone: user.phone,
          email: user.email,
          parent: user?.parent,
        };
      });
      // console.log('jsonData', jsonData);
      dispatch(setUsers(jsonData));
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.linkContainer}
        data={users}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.linkView}
              onPress={() => {
                navigation.navigate('User Detail', {user: item});
              }}>
              <Text
                style={
                  styles.title
                }>{`${item.first_name} ${item.last_name}`}</Text>
              <FontAwesome name={'angle-right'} size={20} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addUser}
        onPress={() => {
          navigation.navigate('Add User');
        }}>
        <AntDesign name={'adduser'} size={35} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  addUser: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.halfGray,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.halfGray,
    marginVertical: 10,
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
  title: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: fontSize.normal,
  },
});

export default UserScreen;
