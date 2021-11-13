import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAB2ZvCZQtwXcbwrPMkQ5XpplYRtxf8Yb8",
  authDomain: "project101-26b3b.firebaseapp.com",
  projectId: "project101-26b3b",
  storageBucket: "project101-26b3b.appspot.com",
  messagingSenderId: "1049771490513",
  appId: "1:1049771490513:web:c39f40150b7bea51da99f0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
