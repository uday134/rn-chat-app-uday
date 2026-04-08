import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDw9Qb0v1Dz-CkGhcXYRFtSWttRCU88pOY",
  authDomain: "chatapp-3105d.firebaseapp.com",
  projectId: "chatapp-3105d",
  storageBucket: "chatapp-3105d.firebasestorage.app",
  messagingSenderId: "615812245824",
  appId: "1:615812245824:web:2a6fbaab7bd1d2d7d772a5",
  measurementId: "G-97X8XE9YGP",
  databaseURL:"https://chatapp-3105d-default-rtdb.firebaseio.com", 
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getDatabase(app);