import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

const DotCarousel = props => {
  const {
    length = 10,
    currentIndictorIndex,
    maxIndicators,
    activeIndicatorConfig = {},
    inactiveIndicatorConfig = {},
  } = props;

  return (
    <View style={styles.container}>
      <AnimatedDotsCarousel
        length={length}
        currentIndex={currentIndictorIndex}
        maxIndicators={maxIndicators}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          ...styles.activeIndicatorConfig,
          ...activeIndicatorConfig,
        }}
        inactiveIndicatorConfig={{
          ...styles.inactiveIndicatorConfig,
          ...inactiveIndicatorConfig,
        }}
        decreasingDots={[
          {
            config: {color: 'black', margin: 3, opacity: 0.5, size: 8},
            quantity: 1,
          },
          {
            config: {color: 'black', margin: 3, opacity: 0.5, size: 8},
            quantity: 1,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    // borderWidth: 2,
    // borderColor: 'red',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  activeIndicatorConfig: {
    color: '#FFF',
    margin: 5,
    opacity: 1,
    size: 10,
  },
  inactiveIndicatorConfig: {
    color: '#FFF',
    margin: 5,
    opacity: 0.35,
    size: 10,
  },
});

export default DotCarousel;
