// src/firebase.js
import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';
import firebaseConfig from './firebaseConfigFile.json';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export {messaging};
