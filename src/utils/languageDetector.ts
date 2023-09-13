import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from 'app/store';
import {updateLocale} from 'feature/i18n/i18nSlice';
import {LanguageDetectorAsyncModule} from 'i18next';

type DetectCallbackType = (
  lng: string | readonly string[] | undefined,
) => void | undefined;

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: function (callback: DetectCallbackType) {
    console.log(
      'detected language from store',
      store.getState().i18n.languageCode,
    );
    return callback(store.getState().i18n.languageCode);
  },
  cacheUserLanguage: async function (language: string) {
    console.log('cacheUserLanguage', language);
    store.dispatch(updateLocale(language));
  },
};

export default languageDetector;
