import {View, Text, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from 'theme/colors';
import {fontSize} from 'theme/fonts';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const placesRef = firestore().collection('UserMyPlaces');

const NewPlaceScreen = () => {
  const mapRef = useRef<MapViewHandle>(null);

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 100,
      text1: 'Place added successfully',
    });
  };

  const addNewPlace = () => {
    const placeObj = {
      latitue: '',
    };
    placesRef.add(placeObj).then(() => {
      console.log('Places added!');
      showToast();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyB4uOPrlEUJjx-tCcPm7BY5fn1gLwtB4BA',
            language: 'en',
          }}
          // listEmptyComponent={() => (
          //   <View style={{flex: 0, backgroundColor: colors.white}}>
          //     <Text>No results were found</Text>
          //   </View>
          // )}
          styles={styles.googlePlacesComponent}
        />
      </View>
      <Map ref={mapRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 15,
    height: 50,
    zIndex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlePlacesComponent: {
    container: {
      flex: 0,
      width: '100%',
    },
    textInputContainer: {
      width: '85%',
    },
    textInput: {
      height: 50,
      borderRadius: 25,
      backgroundColor: '#ECF0F1',
      color: colors.black,
      fontSize: fontSize.medium,
      paddingHorizontal: 15,
      fontFamily: 'Roboto-Regular',
      borderColor: colors.black,
      borderWidth: 1,
    },
  },
});

export default NewPlaceScreen;
