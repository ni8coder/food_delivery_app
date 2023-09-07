import CalendarModule from 'native-module/CalendarModule';
import React from 'react';
import {Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = async () => {
    // console.log('We will invoke the native module here!');
    // CalendarModule.createCalendarEvent(
    //   'Party',
    //   '04-12-2020',
    //   error => {
    //     console.log('Error creating calendar event', error);
    //   },
    //   eventId => {
    //     console.log(`Created a new event with id ${eventId}`);
    //   },
    // );
    try {
      const eventId = await CalendarModule.createCalendarEvent(
        'Party',
        '04-12-2020',
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
