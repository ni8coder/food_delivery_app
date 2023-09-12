import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import colors from 'theme/colors';
import {fontFamily, fontSize} from 'theme/fonts';
import {UserListScreenProps} from 'navigators/UserPlacesNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const placesRef = firestore().collection('UserMyPlaces');

type User = {
  userName: string;
  userId: string;
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const UserListScreen = ({navigation}: UserListScreenProps) => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const subscriber = placesRef.onSnapshot(querySnapshot => {
      console.log('Realtime Places data: ', querySnapshot.docs);
      let jsonData: User[] = [];
      let map: {[key: string]: boolean} = {};

      querySnapshot.docs.forEach(doc => {
        let obj: User = {
          userName: doc.data().userName,
          userId: doc.data().userId,
        };
        if (!map[obj.userId] && obj.userId) {
          jsonData.push(obj);
          map[obj.userId] = true;
        }
      });

      setUserList(jsonData);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.linkContainer}
        data={userList}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.linkView}
              onPress={() => {
                navigation.navigate('User Profile', {
                  userId: item.userId,
                  userName: item.userName,
                });
              }}>
              <Text style={styles.title}>{`${item.userName}`}</Text>
              <FontAwesome name={'angle-right'} size={20} />
            </TouchableOpacity>
          );
        }}
      />
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
    color: colors.black,
  },
});

export default UserListScreen;
