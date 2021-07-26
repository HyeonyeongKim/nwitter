import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm_7gKwfcky8xOu0yJbjbBbOUghjstJ48",
    authDomain: "nwitter-72c5e.firebaseapp.com",
    projectId: "nwitter-72c5e",
    storageBucket: "nwitter-72c5e.appspot.com",
    messagingSenderId: "213018949380",
    appId: "1:213018949380:web:df0a5e0352f0c90445c251"
  };
  
  firebase.initializeApp(firebaseConfig); 
  export const firebaseInstance = firebase;
  export const authService = firebase.auth(); // 위 firebaseConfig에 있는 전체 내용이 아니라 필요한 서비스만 export하는 방식!!
  export const dbService = firebase.firestore();