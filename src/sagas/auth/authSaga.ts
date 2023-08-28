import {CREATE_USER, LOGIN_USER} from 'config/constants/api_constants';
import {signIn, signOut, takeSignIn, takeSignUp} from 'feature/auth/authSlice';
import ApiHelper from 'helpers/ApiHelper';
import {call, cancel, fork, put, take} from 'redux-saga/effects';

type CreatedUser = {
  email: string;
  id: number;
};

type LoggedInUser = {
  id: string;
  ttl: number;
  created: string;
  userId: number;
};

function* createUser(email: string, password: string) {
  try {
    const user: CreatedUser = yield call(
      async () => (await ApiHelper.post(CREATE_USER, {email, password}))?.data,
    );
    console.log('user', user);
    yield put(takeSignIn({email, password}));
  } catch (error) {
    console.log(error);
    yield put(signOut());
  }
}

function* authorize(email: string, password: string) {
  try {
    const user: LoggedInUser = yield call(
      async () => (await ApiHelper.post(LOGIN_USER, {email, password}))?.data,
    );
    console.log('user', user);
    yield put(signIn(user));
  } catch (error) {
    console.log(error);
    yield put(signOut());
  }
}

function* loginFlow() {
  while (true) {
    console.log('before signin');
    const {payload} = yield take(takeSignIn);
    console.log(payload);
    const signInTask = yield fork(authorize, payload.email, payload.password);

    const action = yield take(signOut);
    console.log('signout saga called');
    if (action === signOut) {
      yield cancel(signInTask);
    }
    yield put(signOut());
  }
}

function* signUpFlow() {
  while (true) {
    console.log('before signup');
    let {payload} = yield take(takeSignUp);
    yield fork(createUser, payload.email, payload.password);
  }
}

export default function* authSaga() {
  yield fork(signUpFlow);
  yield fork(loginFlow);
}
