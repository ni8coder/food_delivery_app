import CalendarModule from 'native-module/CalendarModule';
import React from 'react';
import {Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = async () => {
    console.log('We will invoke the native module here!');
    try {
      const eventId = await CalendarModule.createCalendarEvent(
        'testName',
        'testLocation',
      );
      console.log('event id', eventId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
