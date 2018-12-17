import firebase from "react-native-firebase";

export default async () => {
  // handle your message

  firebase.notifications().onNotification(notification => {
    // Process your notification as required
    const { body, data, notificationId, sound, subtitle, title } = notification;
    console.log("LOG: ", title, body, JSON.stringify(data));

    const localNotification = new firebase.notifications.Notification({
      sound: "default",
      show_in_foreground: true
    })
      .setNotificationId(notification.notificationId)
      .setTitle('this come from local')
      .setSubtitle(notification.subtitle)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId("Hip-chanelId") // e.g. the id you chose above
      .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
      .android.setColor("#000000") // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase
      .notifications()
      .displayNotification(localNotification)
      .catch(err => console.error(err));
  });

  return Promise.resolve();
};
