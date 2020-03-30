import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './settings';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();