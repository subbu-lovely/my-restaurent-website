import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC5x8uCp_N1h-efR4cXElhwEKLiRqesz60",
  authDomain: "restarent-orders.firebaseapp.com",
  projectId: "restarent-orders",
  storageBucket: "restarent-orders.appspot.com",
  messagingSenderId: "864732249157",
  appId: "1:864732249157:web:457501d375734ae194f72c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { db, auth, messaging };
export default db;

