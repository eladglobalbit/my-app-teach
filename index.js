/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import bgMessaging from "./src/bgMessaging";
import firebase from "react-native-firebase";
const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

const LogLocation = async (message) => {
      console.log('On log ',message);
    //   const { data } = message;
    //   const {
    //     body,
    //     data,
    //     notificationId,
    //     sound,
    //     subtitle,
    //     title
    //   } = data;
      console.log("LOG: ",message.data);
      const localNotification = new firebase.notifications.Notification({
        sound: "default",
        show_in_foreground: true,
        priority: "high",
        local_notification: true
      })
        .setTitle('this coming from app')
        .setBody(message.data.body)
        .setData(message.data)
        .android.setChannelId("Hip-chanelId") // e.g. the id you chose above
        .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .setSound('default')
  

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
      return Promise.resolve();
}

AppRegistry.registerComponent(appName, () => RNRedux);
AppRegistry.registerHeadlessTask(
    "RNFirebaseBackgroundMessage",
    () => LogLocation
  
  );