import LocationHelper from 'helpers/LocationHelper';
import {useCallback, useEffect, useState} from 'react';
import {GeoError, GeoPosition} from 'react-native-geolocation-service';
import {RESULTS} from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector} from 'app/hooks';
import {AUTHOR} from 'config/constants/app_constants';

const placesRef = firestore().collection('UsersPosition');

export const useUpdateLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState<string | undefined>(
    undefined,
  );
  const authUser = useAppSelector(state => state.auth.user);

  //get location persmissions
  useEffect(() => {
    (async () => {
      const result = await LocationHelper.checkLocationPermisstions();
      setPermissionStatus(result);
    })();
  }, []);

  //save users current position
  const saveUserPostion = useCallback(
    (position: GeoPosition) => {
      if (authUser) {
        const placeObj = {
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          locationTime: Math.floor(Date.now() / 1000),
          speed: position.coords.speed,
          userId: authUser.uid,
          userName: authUser.email,
          author: AUTHOR,
        };

        placesRef
          .where('userId', '==', authUser.uid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length) {
              placesRef
                .doc(querySnapshot.docs[0].id)
                .update(placeObj)
                .then(() => {
                  console.log('Places updated!');
                  // console.log(placeObj);
                });
            } else {
              placesRef.add(placeObj).then(() => {
                console.log('Places added!');
                // console.log(placeObj);
              });
            }
          });
      }
    },
    [authUser],
  );

  //success callback for getCurrentPostion
  const userLocationSuccess = useCallback(
    (position: GeoPosition) => {
      // console.log('success called', position);
      saveUserPostion(position);
    },
    [saveUserPostion],
  );

  //error callback for getCurrentPostion
  const userLocationError = useCallback((error: GeoError) => {
    console.log(error);
  }, []);

  //getCurrentPosition
  useEffect(() => {
    let trackingId: number;
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('getCurrentPosition called');
      trackingId = LocationHelper.trackUserLocation(
        userLocationSuccess,
        userLocationError,
      );
    }

    return () => {
      LocationHelper.clearTracking(trackingId);
    };
  }, [permissionStatus, userLocationError, userLocationSuccess]);
};
