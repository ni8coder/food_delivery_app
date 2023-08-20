import authSlice from './auth/authSlice';
import CounterSlice from './counter/CounterSlice';
import feedSlice from './feeds/feedSlice';

export default {
  counter: CounterSlice,
  auth: authSlice,
  feeds: feedSlice,
};
