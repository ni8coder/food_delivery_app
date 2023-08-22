import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Filter, {FilterHandle} from './Filter';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import PersistanceClass from 'utils/PersistanceClass';
import PersistedFn from 'utils/PersistedFn';

const MyListScreen = () => {
  const filterRef = useRef<FilterHandle>(null);
  useEffect(() => {
    let val = PersistanceClass.get();
    console.log('persisted class value', val);
    let val1 = PersistedFn.get();
    console.log('persisted fn value', val1);
  }, []);
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
