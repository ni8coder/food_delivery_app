import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {fontFamily, fontSize} from 'theme/fonts';
import {MyPlacesScreenProps} from 'navigators/MyPlacesNavigator';
import {UserMyPlace, setPlaces} from 'feature/places/placesSlice';
import {useAppState} from 'hooks/useAppState';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const placesRef = firestore().collection('UserMyPlaces');

const MyPlacesScreen = ({navigation}: MyPlacesScreenProps) => {
  const authUser = useAppSelector(state => state.auth.user);
  const uid = authUser?.uid;
  const places = useAppSelector(state => state.places.places);
  const dispatch = useAppDispatch();
  // const appState = useAppState();
  // console.log('MyPlacesScreen appstate', appState);

  useEffect(() => {
    const subscriber = placesRef
      .where('userId', '==', uid)
      .onSnapshot(querySnapshot => {
        // console.log('Realtime Places data: ', querySnapshot.docs);
        let jsonData: UserMyPlace[] = querySnapshot.docs.map(doc => {
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
        dispatch(setPlaces(jsonData));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch, uid]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.linkContainer}
        data={places}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.linkView}
              onPress={() =>
                navigation.navigate('Add New Place', {
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                })
              }>
              <Text style={styles.title}>{`${item.placeName}`}</Text>
              <FontAwesome name={'angle-right'} size={20} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('Add New Place');
        }}>
        <MaterialIcons name={'add-location'} size={35} color={colors.primary} />
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
  addBtn: {
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
    color: colors.black,
  },
});

export default MyPlacesScreen;
