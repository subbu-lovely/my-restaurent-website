import React, { useState } from 'react';
import { getToken } from 'firebase/messaging';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, messaging, db } from './firebase';

function NotificationSetup() {
  const [message, setMessage] = useState('');

  const enableNotifications = async () => {
    try {
      if (!('Notification' in window)) {
        setMessage('❌ This browser does not support notifications.');
        return;
      }

      const permission = await Notification.requestPermission();

      console.log('Notification permission:', permission);

      if (permission !== 'granted') {
        setMessage('❌ Notification permission was not granted.');
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: 'BBlpmqagmKmfc4AxPsQtbC4CY5aM6dk7feqWealM1PeYGYoQf21y52XKTYidI-02sD8AVMPo5IjVlTEOLmx7Klo'
      });

      if (!token) {
        setMessage('❌ Could not get FCM token.');
        return;
      }

      console.log('FCM Token:', token);

      // Make sure admin is logged in
      if (!auth.currentUser) {
        setMessage('❌ Please login as admin first.');
        return;
      }

      // Save token in Firestore
      await setDoc(
        doc(db, 'adminTokens', auth.currentUser.uid),
        {
          token: token,
          email: auth.currentUser.email,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setMessage('🔔 Notifications enabled successfully!');

    } catch (error) {
        console.error('Notification error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);

        setMessage(`❌ ${error.code || 'Error'}: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={enableNotifications}>
        🔔 Enable Notifications
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default NotificationSetup;
       