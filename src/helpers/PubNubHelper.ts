import Pubnub, {MessageEvent} from 'pubnub';
import PubNub from 'pubnub';
import Config from 'react-native-config';

class PubNubHelper {
  private readonly pubnub: Pubnub;

  constructor() {
    this.pubnub = new PubNub({
      publishKey: Config.PUBNUB_PUBLISH_KEY,
      subscribeKey: Config.PUBNUB_SUBSCRIBE_KEY,
      uuid: 'awais_iqbal',
    });
  }

  get pubnubInstance() {
    return this.pubnub;
  }

  sendMessage = async (message: string, channelName: string) => {
    try {
      this.pubnub.publish({channel: channelName, message});
    } catch (error) {
      console.log(error);
    }
  };

  addListener = (handleMessage: (event: MessageEvent) => void) => {
    this.pubnub.addListener({message: handleMessage});
    return handleMessage;
  };

  subscribe = (config: Pubnub.SubscribeParameters) => {
    this.pubnub.subscribe(config);
  };

  unsubscribeAll = () => {
    this.pubnub.unsubscribeAll();
  };

  removeListener = (handleMessage: (event: MessageEvent) => void) => {
    this.pubnub.removeListener({message: handleMessage});
  };
}

export default new PubNubHelper();
