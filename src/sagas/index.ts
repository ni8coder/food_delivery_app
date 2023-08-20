import {all, fork} from 'redux-saga/effects';
import feedSaga from './feeds/feedSaga';

export default function* rootSaga() {
  yield all([feedSaga()]);
}
