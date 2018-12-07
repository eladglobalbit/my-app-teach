import firebase from './config'
import { YellowBox } from 'react-native';
class Fire {
  token;
  constructor(token,uid) {
    // this.init();
    this.token= token;
    console.log(this.token);
    fetch(
      "https://us-central1-appteach-7a364.cloudfunctions.net/getCustomToken",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
    .catch(err => console.log(err))
    .then( res => res.json())
    .then(parsedRes => { 
      this.token = parsedRes.customToken;
      this.observeAuth();
    });
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  // init = () =>
  //   firebase.initializeApp({
  //       apiKey: "AIzaSyBubcXPACVmnWoyjmgQ7xIRQuAwhMX2ZPM",
  //   authDomain: "chatapp-8077a.firebaseapp.com",
  //   databaseURL: "https://chatapp-8077a.firebaseio.com",
  //   projectId: "chatapp-8077a",
  //   storageBucket: "chatapp-8077a.appspot.com",
  //   messagingSenderId: "514247876354"
  //   });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInWithCustomToken(this.token);
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    console.log(snapshot)
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: Date.now(),
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}
export default Fire;
