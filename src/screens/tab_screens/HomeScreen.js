import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const myIcon = <Icon name="rocket" size={30} color="#900" />;
  return (
    <View>
      <Text>HomeScreen {myIcon}</Text>
    </View>
  );
};

export default HomeScreen;
