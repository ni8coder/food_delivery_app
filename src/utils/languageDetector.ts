import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageDetectorAsyncModule} from 'i18next';

type DetectCallbackType = (
  lng: string | readonly string[] | undefined,
) => void | undefined;

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: function (callback: DetectCallbackType) {
    AsyncStorage.getItem('user-language')
      .then(language => {
        if (language) {
          console.log('language in detect', language);
          return callback(language);
        }
      })
      .catch(error => {
        console.log('error in language detection', error);
      });
  },
  cacheUserLanguage: async function (language: string) {
    console.log('cacheUserLanguage', language);
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error(error);
    }
  },
};

export default languageDetector;
