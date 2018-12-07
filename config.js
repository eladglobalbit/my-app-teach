import * as firebase from "firebase";


const config = {
    apiKey: "AIzaSyAtmNYtFqn7JuxhnqOzdXssM3mU1PGuwHU",
    authDomain: "appteach-7a364.firebaseapp.com",
    databaseURL: "https://appteach-7a364.firebaseio.com",
    projectId: "appteach-7a364",
    storageBucket: "appteach-7a364.appspot.com",
    messagingSenderId: "431730829101"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();