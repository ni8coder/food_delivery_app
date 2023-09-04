import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ProfileImage from '@assets/images/profile/avatar.jpeg';
import {fontFamily, fontSize} from 'theme/fonts';
import {UserDetailScreenProps} from 'navigators/ProfileNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import colors from 'theme/colors';

const usersRef = firestore().collection('users');

const UserDetailScreen = ({navigation, route}: UserDetailScreenProps) => {
  const [parent, setParent] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [child, setChild] = useState<FirebaseFirestoreTypes.DocumentData[]>();
  const {user} = route.params;

  const fetchParent = useCallback(
    async (parentRef: FirebaseFirestoreTypes.DocumentReference) => {
      const result = await parentRef.get();
      setParent(result.data());
    },
    [],
  );

  const fetchChild = useCallback(async (id: string) => {
    const userDoc = usersRef.doc(id);
    const querySnapshot = await usersRef.where('parent', '==', userDoc).get();
    let childData: FirebaseFirestoreTypes.DocumentData[] =
      querySnapshot.docs.map(doc => doc.data());
    setChild(childData);
    console.log('child', childData);
  }, []);

  useEffect(() => {
    const fetchRef = () => {
      if (user?.parent) {
        fetchParent(user?.parent);
      }
      fetchChild(user?.id);
    };

    fetchRef();
  }, [fetchChild, fetchParent, user?.id, user?.parent]);

  const renderUser = (
    item: FirebaseFirestoreTypes.DocumentData | undefined,
  ) => {
    console.log('inside renderUser', item);
    return (
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkView}
          onPress={() => navigation.navigate('User Detail', {user: item})}>
          <Text>{`${item?.first_name} ${item?.last_name}`}</Text>
          <FontAwesome name={'angle-right'} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderChildView = () => {
    if (child) {
      console.log('inside renderchildview', child);
      return child.map(item => {
        return renderUser(item);
      });
    }
  };

  const onEdit = () => {
    navigation.navigate('Add User', {user});
  };

  return (
    <ScrollView>
      <View style={styles.userInfoContainer}>
        <View>
          <Image source={ProfileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <FontAwesome name={'edit'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={
              styles.headingText
            }>{`${user?.first_name} ${user?.last_name}`}</Text>
          <View style={styles.regularTextContainer}>
            <Fontisto name={'email'} size={20} />
            <Text style={styles.regularText}>{user?.email}</Text>
          </View>

          <View style={styles.regularTextContainer}>
            <FontAwesome name={'phone'} size={20} />
            <Text selectable={true} style={styles.regularText}>
              {user?.phone}
            </Text>
          </View>
          <View style={styles.regularTextContainer}>
            <FontAwesome name={'address-book'} size={20} />
            <Text selectable={true} style={styles.regularText}>
              {user?.address}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.referredUserContainer}>
        <Text style={[styles.headingText, styles.center, styles.marginBottom]}>
          Parents
        </Text>

        {parent?.length ? (
          renderUser(parent)
        ) : (
          <Text style={[styles.regularText, styles.center]}>
            No Parent Found
          </Text>
        )}
      </View>

      <View style={styles.separator} />

      <View style={styles.referredUserContainer}>
        <Text style={[styles.headingText, styles.center, styles.marginBottom]}>
          Children
        </Text>

        {child?.length ? (
          renderChildView()
        ) : (
          <Text style={[styles.regularText, styles.center]}>
            No Children Found
          </Text>
        )}
      </View>
    </ScrollView>
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
  userInfoContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
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
    gap: 10,
  },
  headingText: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: fontSize.medium,
  },
  regularText: {
    fontFamily: fontFamily.robotoRegular,
    fontSize: fontSize.normal,
  },
  regularTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
  referredUserContainer: {
    paddingHorizontal: 10,
  },
  linkContainer: {
    gap: 20,
    marginBottom: 15,
  },
  center: {
    textAlign: 'center',
  },
  marginBottom: {
    marginBottom: 5,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
});

export default UserDetailScreen;
