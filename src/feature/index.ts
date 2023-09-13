import authSlice from './auth/authSlice';
import CounterSlice from './counter/CounterSlice';
import feedSlice from './feeds/feedSlice';
import i18nSlice from './i18n/i18nSlice';
import placesSlice from './places/placesSlice';
import userSlice from './users/userSlice';

export default {
  counter: CounterSlice,
  auth: authSlice,
  feeds: feedSlice,
  user: userSlice,
  places: placesSlice,
  i18n: i18nSlice,
};
