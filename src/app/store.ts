import {combineReducers, configureStore} from '@reduxjs/toolkit';
import reducers from '../feature';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from 'sagas';

//set dev mode constant
const isInDevMode = __DEV__;

//combining all reducers into root reducer
const rootReducer = combineReducers(reducers);

//redux-persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [], //only persist these reducers
  // blacklist: ['user'], //do not persist these reducers
};

//create a persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//redux logger configuration
const logger = createLogger({
  predicate: () => isInDevMode,
  collapsed: true,
  duration: true,
  diff: true,
});

//create saga middleware
const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger, saga),
  devTools: true,
});

//run all sagas
saga.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
