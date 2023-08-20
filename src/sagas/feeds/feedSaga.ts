import {PayloadAction} from '@reduxjs/toolkit';
import {NEWS_API} from 'config/constants/api_constants';
import {
  FeedPost,
  getFeedsFailure,
  getFeedsFetch,
  getFeedsSuccess,
} from 'feature/feeds/feedSlice';
import {takeEvery, put, call, delay} from 'redux-saga/effects';
import {customDelay} from 'utils/lodash';

type ResponseType = {
  articles: Array<FeedPost>;
  status: string;
  totalResults: number;
};

function* workGetsFeedFetch(action: PayloadAction<number>) {
  console.log('saga function start executing');

  const payload = action.payload;
  try {
    console.log('before api call', payload);
    yield customDelay(1000);

    const feeds: ResponseType = yield call(() =>
      fetch(NEWS_API).then(res => res.json()),
    );

    console.log('after api call', payload);

    const limitedFeeds = feeds.articles.slice(0, 30);

    yield put(getFeedsSuccess(limitedFeeds));
  } catch (error) {
    console.log(error);
    yield put(getFeedsFailure());
  }
}

function* feedSaga() {
  console.log('before takeEvery');
  yield takeEvery(getFeedsFetch, workGetsFeedFetch);
}

export default feedSaga;
