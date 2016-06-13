import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAl48h5hcFMPl-cve2MRb7z6SSO6mtMeVs",
  authDomain: "redux-immutable-8ac75.firebaseapp.com",
  databaseURL: "https://redux-immutable-8ac75.firebaseio.com",
  storageBucket: "redux-immutable-8ac75.appspot.com",
};
const app = firebase.initializeApp(config);

export const ref = firebase.database().ref()
