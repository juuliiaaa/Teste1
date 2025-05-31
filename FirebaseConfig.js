// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { Platform } from 'react-native';
import { getAuth } from 'firebase/app';
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//Database
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD05uxOQ-SKhj-kKynvlbs0-TKg4Au0w0",
  authDomain: "teste1-cfd2b.firebaseapp.com",
  projectId: "teste1-cfd2b",
  storageBucket: "teste1-cfd2b.firebasestorage.app",
  messagingSenderId: "596435003351",
  appId: "1:596435003351:web:2aad42331129cfcc260d92",
  measurementId: "G-5K8QH1KSKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth;
    if (Platform.OS === 'web') {
        auth = getAuth(app);
    }else{
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    }
  );
}

const db = getFirestore(app);
export {app, db, auth}

//import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);