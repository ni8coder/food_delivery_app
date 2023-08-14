import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyListScreen = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <MaterialCommunityIcons name={'rocket-launch'} size={80} />
    </View>
  );
};

export default MyListScreen;
