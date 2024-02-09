import firebase from "firebase";
import { getFirestore, collection, getDocs } from "firebase";

//import { getAnalytics } from "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyDGlHkDuWnfkiFfCJcvTotIsZ_qikTeAZs",
  authDomain: "ungame-b299b.firebaseapp.com",
  databaseURL:
    "https://ungame-b299b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ungame-b299b",
  storageBucket: "ungame-b299b.appspot.com",
  messagingSenderId: "213014914750",
  appId: "1:213014914750:web:c30238d055135ff281e0ef",
  measurementId: "G-F4YHPQZJH2",
};

var fire = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default fire;
