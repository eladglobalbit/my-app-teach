
import React, {Component} from 'react';
import { AsyncStorage ,View , Text } from 'react-native';
import firebase from 'react-native-firebase';
import {  Root , Drawer} from './src/config/router';

export default class App extends Component {

  async componentWillMount() {
    console.log(JSON.parse(await AsyncStorage.getItem("user")));
    const channel = new firebase.notifications.Android.Channel(
      "Hip-chanelId",
      "Channel Name",
      firebase.notifications.Android.Importance.Max
    ).setDescription("A natural description of the channel");
    firebase.notifications().android.createChannel(channel);

    this.notificationListener;

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase
            .messaging()
            .getToken()
            .then(token => {
              console.log(token);
              this.notificationListener = this.initNotificationsListener();
              this.notificationOpenListener = this.initNotificationOpenedListener();
            });
          // user has permissions
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              this.notificationListener = this.initNotificationsListener();
              this.notificationOpenListener = this.initNotificationOpenedListener();
            })
            .catch(error => {
              console.log(error);
              alert("Error", error);
              // User has rejected permissions
            });
        }
      });

    this.initNotificationOpenedListener = () =>
      firebase.notifications().onNotificationOpened(msg => {
        // Get the action triggered by the notification being opened
        const action = msg.action;

        // Get information about the notification that was opened
        const notificationOpened = msg.notification;
        console.log("notificationOpened");
      });

    this.initNotificationsListener = () => console.log("init notifications");
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
        .setTitle(notification.title)
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
  }

  componentWillUnmount() {
    //this.messageListener();
    this.notificationListener();
    this.initNotificationOpenedListener();
  }


constructor(props){
  super(props);
}




  render() {
    return (
       <Root />
    );
  }
  componentWillUnmount() {
    //this.messageListener();
    this.notificationListener();
    this.initNotificationOpenedListener();
  }

}



// class App extends Component {
//   constructor(props){
//     super(props);
//   }
//   render() {
//     return <Root />;
//   }
// }

// export default App;