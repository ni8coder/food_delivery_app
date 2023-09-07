const {NativeModules} = require('react-native');

const {CalendarModule} = NativeModules;

type errorCallback = (error: number) => void;
type successCallback = (eventId: number) => void;
type callback = (error: null, eventId: number) => void;

interface CalendarInterface {
  createCalendarEvent: (
    name: string,
    location: string,
    // errorCallback: errorCallback,
    // successCallback: successCallback,
  ) => void;
}

const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);

export default CalendarModule as CalendarInterface;
