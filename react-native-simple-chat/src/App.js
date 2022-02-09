import React, { useState, useRef, useEffect } from 'react';
import { LogBox, StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import { images } from './utils/images';
import { ProgressProvider, UserProvider } from './contexts';

import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true
    })
});

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const cacheImages = images => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
};
  
const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
    const [isReady, setIsReady] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [notification, setNotification] = useState();
    const notificationListener = useRef();
    const responseListener = useRef();

    _registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
      
        // Get the token that uniquely identifies this device
        setExpoPushToken((await Notifications.getExpoPushTokenAsync()).data);
        console.log("Notification Token: ", expoPushToken);
        }

    const lastNotificationResponse = Notifications.useLastNotificationResponse();
    
    useEffect(() => {
        _registerForPushNotificationsAsync();
        if (
        lastNotificationResponse &&
        lastNotificationResponse.notification.request.content.data.url &&
        lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
        Linking.openURL(lastNotificationResponse.notification.request.content.data.url);
        }
    }, [lastNotificationResponse]);

    const _loadAssets = async () => {
        const imageAssets = cacheImages([
            require('../assets/splash.png'),
            ...Object.values(images)]);
        const fontAssets = cacheFonts([]);

        await Promise.all([...imageAssets, ...fontAssets]);
    };

    return isReady ? (
        <ThemeProvider theme={theme}>
          <UserProvider>
            <ProgressProvider>
              <StatusBar barStyle="dark-content" />
              <Navigation />
            </ProgressProvider>
          </UserProvider>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync={_loadAssets}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
        />
      );
    };
    
    export default App;
