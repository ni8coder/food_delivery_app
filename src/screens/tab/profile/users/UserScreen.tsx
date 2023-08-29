import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {UserScreenProps} from 'navigators/ProfileNavigator';

type FirebaseDocCollection =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[];

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const UserScreen = ({navigation}: UserScreenProps) => {
  const [users, setUsers] = useState<FirebaseDocCollection>([]);

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const allUsers = (await firestore().collection('users').get()).docs;
  //     setUsers(allUsers);
  //     console.log('all users', allUsers);
  //   };

  //   getAllUsers();
  // }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        console.log('Realtime User data: ', querySnapshot.docs);
        setUsers(querySnapshot.docs);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

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
                navigation.navigate('User Detail', {user: item.data()});
              }}>
              <Text>{`${item.data().first_name} ${
                item.data().last_name
              }`}</Text>
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
});

export default UserScreen;
