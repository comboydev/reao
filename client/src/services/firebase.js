import {
    auth,
    googleAuthProvider,
    facebookAuthProvider,
    appleAuthProvider,
    twitterAuthProvider,
} from 'auth/FirebaseAuth';

const FirebaseService = {}

FirebaseService.signInEmailRequest = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password).then(user => user).catch(err => err);

FirebaseService.signInEmailRequest = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password).then(user => user).catch(err => err);

FirebaseService.signUpEmailRequest = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password).then(user => user).catch(err => err);

FirebaseService.signOutRequest = async () =>
    await auth.signOut().then(user => user).catch(err => err);

FirebaseService.signInGoogleRequest = async () =>
    await auth.signInWithPopup(googleAuthProvider).then(user => user).catch(err => err);

FirebaseService.signInFacebookRequest = async () =>
    await auth.signInWithPopup(facebookAuthProvider).then(user => user).catch(err => err);

FirebaseService.signInTwitterRequest = async () =>
    await auth.signInWithPopup(twitterAuthProvider).then(user => user).catch(err => err);

FirebaseService.signInAppleRequest = async () =>
    await auth.signInWithPopup(appleAuthProvider).then(user => user).catch(err => err);


export default FirebaseService