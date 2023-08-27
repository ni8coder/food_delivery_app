import {all} from 'redux-saga/effects';
import feedSaga from './feeds/feedSaga';
import authSaga from './auth/authSaga';

export default function* rootSaga() {
  yield all([feedSaga(), authSaga()]);
}
