/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import bgMessaging from "./src/bgMessaging";
const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
AppRegistry.registerHeadlessTask(
    "RNFirebaseBackgroundMessage",
    () => bgMessaging
  
  );