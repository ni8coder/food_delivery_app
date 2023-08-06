import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import CreditCard from '../../../assets/images/profile/credit-card.png';
import Wallet from '../../../assets/images/profile/wallet.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';

const PaymentMethodScreen = () => {
  const [creditCards, setCreditCards] = React.useState([
    {
      cardNumber: '2345003042',
      cvv: '303',
    },
    {
      cardNumber: '2345003042',
      cvv: '303',
    },
  ]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const addCard = () => {
    if (!cardNumber.replace(/\s/g, '').length) {
      Alert.alert('Card number is required');
      return;
    }
    if (!cvv.replace(/\s/g, '').length) {
      Alert.alert('CVV is required');
      return;
    }

    setCreditCards([
      ...creditCards,
      {
        cardNumber,
        cvv,
      },
    ]);
    setCardNumber('');
    setCvv('');
    setModalVisible(false);
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity style={styles.cardRowContainer}>
        <View style={styles.cardTextContainer}>
          <Image source={CreditCard} style={styles.image} />
          <Text style={styles.normalTextStyle}>Credit Card</Text>
        </View>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.normalTextStyle}>{item.cardNumber}</Text>
          <FontAwesome name={'angle-right'} size={20} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cardRowContainer]}>
        <View style={styles.cardTextContainer}>
          <Image source={Wallet} style={styles.image} />
          <Text style={styles.normalTextStyle}>Add new payment method</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name={'add'} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList data={creditCards} renderItem={renderCard} />

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TextInput
            value={cardNumber}
            onChangeText={value => setCardNumber(value)}
            placeholder="Enter Card Number"
            style={styles.textInput}
          />
          <TextInput
            value={cvv}
            onChangeText={value => setCvv(value)}
            placeholder="Enter CVV"
            style={styles.textInput}
          />
          <CustomButton
            title="Add Card"
            onPress={addCard}
            containerStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  normalTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#34495E',
    alignSelf: 'center',
  },
  image: {width: 20, height: 12},
  modalContainer: {
    backgroundColor: '#E5E5E5',
    padding: 20,
    borderRadius: 15,
    gap: 20,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    width: '100%',
    backgroundColor: '#ECF0F1',
    color: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
  },
});

export default PaymentMethodScreen;
