import {View, Text, Button} from 'react-native';
import React from 'react';
import {CardDetailScreenProps} from '../../navigators/ProfileNavigator';

const CardDetails = ({navigation, route}: CardDetailScreenProps) => {
  const {cardNumber, cvv} = route.params;

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
    </View>
  );
};

export default CardDetails;
