import {View, Text, Button} from 'react-native';
import React from 'react';
import {MyPlacesScreenProps} from 'navigators/LocationNavigator';

const MyPlacesScreen = ({navigation}: MyPlacesScreenProps) => {
  return (
    <View>
      <Text>TermsScreen</Text>
      <Button
        title="Add new place"
        onPress={() => navigation.navigate('Add New Place')}
      />
    </View>
  );
};

export default MyPlacesScreen;
