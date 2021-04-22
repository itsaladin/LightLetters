import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-paper-toast';
import {RootStoreProvider} from './src/stores/root-store';
import Application from './src/Application';

const App = () => {
  return (
    <RootStoreProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <ToastProvider>
            <Application />
          </ToastProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
};

export default App;
