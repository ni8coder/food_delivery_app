import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import Filter, {FilterHandle} from './Filter';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomSafeAreaView from 'components/CustomSafeAreaView';

const MyListScreen = () => {
  const filterRef = useRef<FilterHandle>(null);
  return (
    <CustomSafeAreaView style={{flex: 1}}>
      <Filter ref={filterRef} />
      <TouchableOpacity onPress={() => filterRef.current?.focusUsername()}>
        <Text>Focus Username</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => filterRef.current?.focusEmail()}>
        <Text>Focus Email</Text>
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
};

export default MyListScreen;
