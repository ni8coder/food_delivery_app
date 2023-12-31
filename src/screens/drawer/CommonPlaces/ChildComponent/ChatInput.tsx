import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PubNubHelper from 'helpers/PubNubHelper';
import colors from 'theme/colors';
import {fontFamily} from 'theme/fonts';
import {Message, addMessage} from 'feature/message/messageSlice';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {ITC} from 'config/constants/app_constants';

type ChannelType = {
  label: string;
  value: string;
};

const ChatInput = () => {
  const [userChannels, setUserChannels] = useState<ChannelType[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [messageText, setMessageText] = useState('');
  const authUserUid = useAppSelector(state => state.auth.user?.uid);
  const userPositionData = useAppSelector(state => state.places.userPosition);
  const dispatch = useAppDispatch();
  // console.log('chat input rendered');

  useEffect(() => {
    if (userPositionData) {
      let channelData = userPositionData.map(data => ({
        label: data.author,
        value: data.userId,
      }));

      setUserChannels(channelData);
    }
  }, [userPositionData]);

  const sendMessage = async () => {
    if (!value) {
      Alert.alert('Please select a channel');
      return;
    }
    if (!messageText) {
      Alert.alert('Please type something');
      return;
    }

    if (!authUserUid) {
      Alert.alert('No User Found');
      return;
    }

    try {
      await PubNubHelper.sendMessage(messageText, value);
      const data: Message = {
        message: messageText,
        channel: authUserUid,
        publisher: authUserUid,
      };
      if (value !== ITC) {
        dispatch(addMessage({channel: value, data}));
      }
    } catch (error) {
      console.log(error);
    }
    setMessageText('');
  };

  return (
    <View style={styles.topOverlayContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a Message"
          value={messageText}
          onChangeText={setMessageText}
          style={styles.textInput}
          autoCapitalize={'none'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialCommunityIcons name={'send'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownContainerView}>
        <DropDownPicker
          searchable={false}
          open={open}
          value={value}
          items={userChannels}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setUserChannels}
          listMode="SCROLLVIEW"
          placeholder="Select Channel"
          style={styles.dropdown}
          searchPlaceholder={'Enter Parent Name'}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    height: 50,
    width: '80%',
    color: colors.black,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: fontFamily.robotoRegular,
    borderColor: colors.black,
  },
  topOverlayContainer: {
    alignSelf: 'center',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 10,
    flexDirection: 'column',
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    height: 50,
    width: '90%',
    // position: 'absolute',
    // top: 10,
    flexDirection: 'row',
    zIndex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ECF0F1',
  },
  dropdownContainerView: {width: '90%', alignSelf: 'center'},
  dropdown: {
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    alignSelf: 'flex-start',
    width: 150,
  },
  dropdownContainer: {width: 150},
});

export default memo(ChatInput);
