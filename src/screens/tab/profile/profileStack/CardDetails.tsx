import {View, Text, Button} from 'react-native';
import React from 'react';
import {CardDetailScreenProps} from '../../../../navigators/ProfileNavigator';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {decrement, increment} from '../../../../feature/counter/CounterSlice';

const CardDetails = ({navigation, route}: CardDetailScreenProps) => {
  const {cardNumber, cvv} = route.params;
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  console.log('h');
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
