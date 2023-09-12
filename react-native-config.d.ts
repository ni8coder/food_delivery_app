declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    ENVIRONMENT?: string;
    APP_NAME?: string;
    MAPS_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
