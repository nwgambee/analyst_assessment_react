import firebase from "firebase";
import config from './firestoreConfig';

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

export default firestore;