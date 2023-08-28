import messaging from '@react-native-firebase/messaging';

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
  };

  getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

  registerMessageHandlers = async () => {
    console.log('message handlers registered');
    //When the application is running, but in the foreground
    this.onMessageListener = messaging().onMessage(async remoteMessage => {
      console.log('Notification in the foreground', remoteMessage);
    });

    //When the application is running, but in the background.
    this.onNotificationOpenedAppListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
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
}

export default new NotificationHelper();
