import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {v4 as uuidv4} from 'uuid';

type notificationCallback = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => void;

class NotificationHelper {
  private onMessageListener: () => void = () => {};
  private onNotificationOpenedAppListener: () => void = () => {};

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    // Request permissions (required for iOS)
    // await notifee.requestPermission();
  };

  getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

  registerMessageHandlers = async (onNotificationTap: notificationCallback) => {
    console.log('message handlers registered');
    //When the application is running, but in the foreground
    this.onMessageListener = messaging().onMessage(async remoteMessage => {
      console.log('Notification in the foreground', remoteMessage);
      this.displayLocalNotification(remoteMessage);
    });

    //When the application is running, but in the background.
    this.onNotificationOpenedAppListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        onNotificationTap(remoteMessage);
      },
    );

    // Check whether an initial notification is available
    //When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          onNotificationTap(remoteMessage);
        }
      });
  };

  registerBackgroundHandler = () => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };

  clearListeners = () => {
    this.onMessageListener();
    this.onNotificationOpenedAppListener();
  };

  displayLocalNotification = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: uuidv4(),
      name: 'Default Channel',
    });

    const notificationId = await notifee.displayNotification({
      id: uuidv4(),
      title: message.notification?.title,
      body: message.notification?.body,
      android: {
        channelId,
      },
    });

    console.log('Notification ID:', notificationId);
  };
}

export default new NotificationHelper();
