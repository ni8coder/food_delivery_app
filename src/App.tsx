/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from './navigators/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <SafeAreaProvider>
            <RootNavigator />
            <Toast />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default App;
