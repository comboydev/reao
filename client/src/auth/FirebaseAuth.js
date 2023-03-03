import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseConfig as firebaseConfig } from 'configs/AppConfig';

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth();
const currentUser = auth.currentUser
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const appleAuthProvider = new firebase.auth.OAuthProvider('apple.com');

export {
    db,
    auth,
    currentUser,
    googleAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider,
    appleAuthProvider,
};