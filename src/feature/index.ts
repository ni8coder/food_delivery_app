import authSlice from './auth/authSlice';
import CounterSlice from './counter/CounterSlice';
import feedSlice from './feeds/feedSlice';
import userSlice from './users/userSlice';

export default {
  counter: CounterSlice,
  auth: authSlice,
  feeds: feedSlice,
  user: userSlice,
};
