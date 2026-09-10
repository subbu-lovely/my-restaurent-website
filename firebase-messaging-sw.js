importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: "AIzaSyC5x8uCp_N1h-efR4cXElhwEKLiRqesz60",
  authDomain: "restarent-orders.firebaseapp.com",
  projectId: "restarent-orders",
  storageBucket: "restarent-orders.appspot.com",
  messagingSenderId: "864732249157",
  appId: "1:864732249157:web:457501d375734ae194f72c"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle =
    payload.notification?.title || '🍽️ New Restaurant Order';

  const notificationOptions = {
    body:
      payload.notification?.body ||
      'You have received a new customer order.',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});