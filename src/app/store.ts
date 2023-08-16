import {combineReducers, configureStore} from '@reduxjs/toolkit';
import reducers from '../feature';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';

//set dev mode constant
const isInDevMode = __DEV__;

//combining all reducers into root reducer
const rootReducer = combineReducers(reducers);

//redux-persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
