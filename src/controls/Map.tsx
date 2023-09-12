import {View, Text, StyleSheet} from 'react-native';
import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

export type MapViewHandle = {
  animateToRegion: (region: Region, duration?: number) => void;
};

const MARKERS = [
  {
    coordinates: {latitude: 0, longitude: 0},
    title: 'middle',
    description: 'middle of earth',
  },
  {
    coordinates: {latitude: 0.5, longitude: 0.5},
    title: 'middle',
    description: 'middle of earth',
  },
];

type MapProps = {
  onMapReady: () => void;
};

type CoordsType = {
  latitude: number;
  longitude: number;
};

const Map = forwardRef<MapViewHandle, MapProps>((props, ref) => {
  const mapViewRef = useRef<MapView>(null);
  const [coords, setCoords] = useState<CoordsType | null>(null);

  useImperativeHandle(ref, () => ({
    animateToRegion: (region: Region, duration?: number) => {
      mapViewRef.current?.animateToRegion(region, duration);
      setCoords({latitude: region.latitude, longitude: region.longitude});
    },
  }));

  const renderMarkers = () => {
    if (coords) {
      return (
        <Marker draggable coordinate={coords} title={''} description={''} />
      );
    }
    // return MARKERS.map((marker, idx) => {
    //   return (
    //     <Marker
    //       draggable
    //       key={idx}
    //       coordinate={marker.coordinates}
    //       title={marker.title}
    //       description={marker.description}
    //     />
    //   );
    // });
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapViewRef}
      style={styles.mapView}
      onMapReady={props.onMapReady}
      // onMapLoaded={}
      showsMyLocationButton
      showsUserLocation
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {renderMarkers()}
    </MapView>
  );
});

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

export default Map;
