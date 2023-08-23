import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Geolocation, {
  GeoError,
  GeoPosition,
} from 'react-native-geolocation-service';

type SuccessCallback = (position: GeoPosition) => void;

type ErrorCallback = (error: GeoError) => void;

class LocationHelper {
  private readonly locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  private readonly currentPositionConfig = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000,
  };

  private readonly watchPositionConfig = {
    enableHighAccuracy: true,
    forceRequestLocation: true,
    showLocationDialog: true,
    distanceFilter: 10,
    useSignificantChanges: true,
    showsBackgroundLocationIndicator: true,
    interval: 1000,
  };

  getCurrentPosition = (
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
  ) => {
    Geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      this.currentPositionConfig,
    );
  };

  trackUserLocation = (
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
  ) => {
    return Geolocation.watchPosition(
      successCallback,
      errorCallback,
      this.watchPositionConfig,
    );
  };

  clearTracking = (watchId: number | undefined) => {
    if (watchId !== undefined) {
      console.log('inside clear');
      Geolocation.clearWatch(watchId);
    }
  };

  checkLocationPermisstions = async () => {
    try {
      const result = await check(this.locationPermission);
      console.log('Permission Result', result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.DENIED:
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          let response = await this.requestPermission();
          return response;
        case RESULTS.GRANTED:
          return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  requestPermission = async () => {
    try {
      console.log('requesting permissions');
      return await request(this.locationPermission);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new LocationHelper();
