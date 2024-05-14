import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AppNavigation from './navigation/appNavigation'; 
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const notificationTimeout = useRef(null);

  useEffect(() => {
    // Set a timeout to clear the notification after 7 seconds
    if (notification) {
      notificationTimeout.current = setTimeout(() => {
        setNotification(null);
      }, 7000);
    }

    // Clear the timeout when the component unmounts or when a new notification arrives
    return () => {
      clearTimeout(notificationTimeout.current);
    };
  }, [notification]);

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    
    <View style={{ flex: 1 }}>
      <AppNavigation/>
      {notification && (
        <View style={{ position: 'absolute', top: 50, left: 0, right: 0, backgroundColor:'white', borderRadius: 20, marginLeft:40, marginRight:40 , borderBlockColor:'black'}}>
          <Text style={{ color: 'black', fontSize: 12, left:10, textAlign: 'left' , fontWeight:'bold'}}>
            {notification.request.content.title}
          </Text>
          <Text style={{ color: 'black', fontSize: 12, textAlign: 'left', padding: 0, left:10 }}>
            {notification.request.content.body}
          </Text>
        </View>
      )}
    </View>

  );
}
