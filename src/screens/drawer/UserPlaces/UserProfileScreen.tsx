import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {UserPlacesScreenProps} from 'navigators/UserPlacesNavigator';
import {Place} from 'feature/places/placesSlice';
import firestore from '@react-native-firebase/firestore';
import colors from 'theme/colors';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const placesRef = firestore().collection('UserMyPlaces');

const UserProfileScreen = ({navigation, route}: UserPlacesScreenProps) => {
  const params = route.params;
  const [userPlaces, setUserPlaces] = useState<Place[]>();

  useEffect(() => {
    let subscriber = () => {};
    try {
      subscriber = placesRef
        .where('userId', '==', params?.userId)
        .onSnapshot(querySnapshot => {
          console.log(
            'Realtime Places data of single user: ',
            querySnapshot.docs,
          );
          let jsonData: Place[] = querySnapshot.docs.map(doc => {
            let place = doc.data();
            return {
              latitude: place.latitude,
              longitude: place.longitude,
              placeName: place.placeName,
              userName: place.userName,
              userId: place.userId,
            };
          });
          // console.log('jsonData', jsonData);
          setUserPlaces(jsonData);
        });
    } catch (error) {
      console.log(error);
    }

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [params?.userId]);

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={ProfileImage} style={styles.profileImage} />
        <View style={styles.nameContainer}>
          <CText style={styles.nameCText}>{params?.userName}</CText>
          <CText style={styles.uid}>{params?.userId}</CText>
        </View>
      </View>
      <FlatList
        style={styles.linkContainer}
        data={userPlaces}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.linkView}
              onPress={() => {
                if (item.latitude && item.longitude) {
                  navigation.navigate('User Location', {
                    latitude: Number(item.latitude),
                    longitude: Number(item.longitude),
                  });
                } else {
                  Alert.alert(
                    'This location does not have either latitude or longitude',
                  );
                }
              }}>
              <Text style={styles.title}>{`${item.placeName}`}</Text>
              <FontAwesome name={'angle-right'} size={20} />
            </TouchableOpacity>
          );
        }}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 40,
    // borderWidth: 1,
    // borderColor: 'red',
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
  uid: {
    fontFamily: fontFamily.robotoRegular,
    fontSize: fontSize.normal,
  },
});

export default UserProfileScreen;
