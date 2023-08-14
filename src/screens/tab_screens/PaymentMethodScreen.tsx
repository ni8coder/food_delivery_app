import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import CreditCard from '../../../assets/images/profile/credit-card.png';
import Wallet from '../../../assets/images/profile/wallet.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {PaymentMethodScreenProps} from '../../navigators/ProfileNavigator';

// class ClassLifeCycle extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     console.log('constructor -- ran');
//     this.state = {inputVal: props.inputVal};
//   }

//   componentDidMount() {
//     console.log('componentDidMount -- ran');
//   }

//   // shouldComponentUpdate(nextProps, nextState) {
//   //   console.log('shouldComponentUpdate -- ran', nextProps);
//   //   if (
//   //     this.props.inputVal === nextProps.inputVal &&
//   //     this.state.inputVal === nextState.inputVal
//   //   ) {
//   //     return false;
//   //   }
//   //   return true;
//   // }

//   componentDidUpdate(prevProps) {
//     console.log(
//       'componentDidUpdate -- ran',
//       `prev props: ${prevProps.inputVal}`,
//       `current props: ${this.props.inputVal}`,
//     );
//     this.setState({inputVal: this.props.inputVal});
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount -- ran');
//   }

//   // static getDerivedStateFromProps(props, state) {
//   //   console.log(
//   //     'getDerivedStateFromProps -- ran',
//   //     `props: ${props.inputVal}`,
//   //     `state: ${state.inputVal}`,
//   //   );
//   //   return {inputVal: props.inputVal};
//   // }

//   render() {
//     console.log('render');
//     return (
//       <View style={{flex: 1, backgroundColor: 'blue'}}>
//         <Text>Props Value is below</Text>
//         <Text>{this.state.inputVal}</Text>
//         <Button
//           title="Update State"
//           onPress={() => this.setState({inputVal: this.state.inputVal + 'Z'})}
//         />
//       </View>
//     );
//   }
// }

// const FunctionComponentLifeCycle = props => {
//   const [inputVal, setInputVal] = useState(props.inputVal);

//   useEffect(() => {
//     console.log('useeffect ran');
//     setInputVal(props.inputVal);

//     return () => {
//       console.log('cleanup ran');
//     };
//   }, [props.inputVal]);

//   return (
//     <View style={{flex: 1, backgroundColor: 'blue'}}>
//       <Text>Props Value is below</Text>
//       <Text>{inputVal}</Text>
//       <Button
//         title="Update State"
//         onPress={() => setInputVal(inputVal + 'A')}
//       />
//     </View>
//   );
// };

const PaymentMethodScreen = ({navigation, route}: PaymentMethodScreenProps) => {
  const [creditCards, setCreditCards] = useState([
    {
      cardNumber: '2345003042',
      cvv: '303',
    },
    {
      cardNumber: '2345003042',
      cvv: '303',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const isFocused = useIsFocused();
  console.log('screen got focused, hook result', isFocused);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log();
      console.log('screen is focused', route.params?.post);
    });

    return () => {
      unsubscribe();
      console.log('cleanup useEffect');
    };
  }, [navigation, route.params]);

  useFocusEffect(
    useCallback(() => {
      console.log('screen is focused2', route.params?.post);

      return () => {
        console.log('cleanup useFocusEffect');
      };
    }, [route]),
  );

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

  type ItemProps = {cardNumber: string; cvv: string};

  type renderCardProps = {item: ItemProps};

  const renderCard = (props: renderCardProps) => {
    const {item} = props;
    return (
      <TouchableOpacity
        style={styles.cardRowContainer}
        onPress={() =>
          navigation.navigate('Card Detail', {
            cardNumber: item.cardNumber,
            cvv: item.cvv,
          })
        }>
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
      <TextInput
        value={cardNumber}
        onChangeText={value => setCardNumber(value)}
        placeholder="Enter Card Number"
        style={styles.textInput}
      />

      {/* <FunctionComponentLifeCycle inputVal={cardNumber} /> */}
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
