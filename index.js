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

const LogLocation = async (data) => {
    console.log('notification')
    firebase.notifications().onNotification(notification => {
        // Process your notification as required
        console.log("notification");
        const {
          body,
          data,
          notificationId,
          sound,
          subtitle,
          title
        } = notification;
        console.log("LOG: ", title, body, JSON.stringify(data));
        const localNotification = new firebase.notifications.Notification({
          sound: "default",
          show_in_foreground: true,
          priority: "high",
          local_notification: true
        })
          .setNotificationId(notification.notificationId)
          .setTitle('this coming from app')
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId("Hip-chanelId") // e.g. the id you chose above
          .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
          .android.setColor("#000000") // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High)
    
  
          console.log('notifoocion ')
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });
      return Promise.resolve();
}

AppRegistry.registerComponent(appName, () => RNRedux);
AppRegistry.registerHeadlessTask(
    "RNFirebaseBackgroundMessagingService",
    () => LogLocation
  
  );