
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
            });
          // user has permissions
        } else {
          try {
            firebase.messaging().requestPermission();
            // firebase
            // .messaging()
            // .getToken()
            // .then(token => {
            //   console.log(token);
            // });
        } catch (error) {
            // User has rejected permissions
        }
        }
      });



      // firebase
      // .notifications()
      // .getInitialNotification()
      // .then(notification => {
      //   if (notification) {
      //     console.log("notification opened", notification);
      //   }
      // });

      firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;  
          console.log("notification opened", notification);
        }
      });



      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;

        console.log("notification opened", notification);
    });


      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {

     });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // Process your notification as required
           // Process your notification as required
      console.log("notification",notification);
      const { _data } = notification
      const {
        body,
        data,
        notificationId,
        sound,
        subtitle,
        title
      } = _data;
      console.log("LOG: ", title, body, JSON.stringify(data));
      const localNotification = new firebase.notifications.Notification({
        sound: "default",
        show_in_foreground: true,
        priority: "high",
        local_notification: true
      })
        .setNotificationId(notification.notificationId)
        .setTitle('this coming from app')
        .setSubtitle(subtitle)
        .setBody(body)
        .setData(data)
        .android.setChannelId("Hip-chanelId") // e.g. the id you chose above
        .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .setSound('default')
  

        console.log('notifoocion ')
      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(message);
      const { _data } = message
      const {
        body,
        data,
        notificationId,
        sound,
        subtitle,
        title
      } = _data;
      console.log("LOG: ", title, body, JSON.stringify(data));
      const localNotification = new firebase.notifications.Notification({
        sound: "default",
        show_in_foreground: true,
        priority: "high",
        local_notification: true
      })
        .setTitle('this coming from app')
        .setSubtitle(subtitle)
        .setBody(body)
        .setData(data)
        .android.setChannelId("Hip-chanelId") // e.g. the id you chose above
        .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .setSound('default')
  

        console.log('notifoocion ')
      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
  });


  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.messageListener();
  }


constructor(props){
  super(props);
}




  render() {
    return (
       <Root />
    );
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