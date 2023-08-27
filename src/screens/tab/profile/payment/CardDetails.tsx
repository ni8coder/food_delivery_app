import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {CardDetailScreenProps} from '../../../../navigators/ProfileNavigator';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {decrement, increment} from '../../../../feature/counter/CounterSlice';
import PersistanceClass from 'utils/PersistanceClass';
import PersistedFn from 'utils/PersistedFn';

const CardDetails = ({navigation, route}: CardDetailScreenProps) => {
  const {cardNumber, cvv} = route.params;
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  console.log('h');

  useEffect(() => {
    PersistanceClass.set(30);
    PersistedFn.set(25);
    PersistanceClass.instaceValue = 40;
  }, []);

  return (
    <View>
      <Text>Card Number: {cardNumber}</Text>
      <Text>Card CVV: {cvv}</Text>
      <Button
        title="Send Params back to Home"
        onPress={() => {
          navigation.navigate({
            name: 'Payment Method',
            params: {post: 'Awais'},
            merge: true,
          });
        }}
      />

      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default CardDetails;
