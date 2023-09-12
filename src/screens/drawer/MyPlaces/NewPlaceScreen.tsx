import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Map, {MapViewHandle} from 'controls/Map';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from 'theme/colors';
import {fontSize} from 'theme/fonts';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import CustomButton from 'components/CustomButton';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {useAppSelector} from 'app/hooks';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';
import {AddNewPlaceScreenProps} from 'navigators/MyPlacesNavigator';
import {AUTHOR} from 'config/constants/app_constants';

const placesRef = firestore().collection('UserMyPlaces');

type Location = LatLng & {
  placeName?: string;
};

const NewPlaceScreen = ({navigation, route}: AddNewPlaceScreenProps) => {
  const params = route.params;
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<MapViewHandle>(null);
  const authUser = useAppSelector(state => state.auth.user);
  const [coords, setCoords] = useState<Location | null>(null);

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 100,
      text1: 'Place added successfully',
    });
  };

  //navigate to map using searched location
  useEffect(() => {
    if (coords) {
      mapRef.current?.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [coords]);

  //navigate to map using my places location
  useEffect(() => {
    console.log(isMapReady, params);
    if (isMapReady && params?.latitude && params?.longitude) {
      mapRef.current?.animateToRegion({
        latitude: params.latitude,
        longitude: params.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [isMapReady, params]);

  //adds new place in firestore
  const addNewPlace = () => {
    const placeObj = {
      latitude: coords?.latitude,
      longitude: coords?.longitude,
      placeName: coords?.placeName,
      userName: authUser?.email,
      userId: authUser?.uid,
      author: AUTHOR,
    };
    placesRef.add(placeObj).then(() => {
      console.log('Places added!');
      console.log(placeObj);
      showToast();
    });
  };

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            if (details?.geometry) {
              setCoords({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
                placeName: details.formatted_address,
              });
            }
          }}
          query={{
            key: Config.MAPS_API_KEY,
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
      <Map ref={mapRef} onMapReady={onMapReady} />
      <CustomButton
        title="Add To My Places"
        onPress={addNewPlace}
        containerStyle={{width: '90%', marginBottom: 20}}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  searchContainer: {
    position: 'absolute',
    // top: 15,
    height: 50,
    zIndex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  googlePlacesComponent: {
    container: {
      top: 15,
      flex: 0,
      width: '100%',
      flexGrow: 1,
      position: 'absolute',
      // backgroundColor: 'black',
    },
    textInputContainer: {
      width: '100%',
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
