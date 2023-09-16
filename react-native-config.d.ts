declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    ENVIRONMENT?: string;
    APP_NAME?: string;
    MAPS_API_KEY?: string;
    PUBNUB_PUBLISH_KEY: string;
    PUBNUB_SUBSCRIBE_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
