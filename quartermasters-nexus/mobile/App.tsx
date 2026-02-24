/**
 * Quartermasters Mobile — Expo WebView Wrapper
 * =============================================
 * Wraps the Next.js PWA in a native shell for App Store + Play Store distribution.
 * WebView loads the live production URL. Native features (push, deep links, splash)
 * are handled by Expo modules outside the WebView.
 *
 * COST ITEMS (require founder approval before submission):
 * - Apple Developer Program: $99/year
 * - Google Play Developer: $25 one-time
 */

import React, { useRef, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    BackHandler,
    Platform,
    ActivityIndicator,
    View,
    Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

// Keep splash visible while loading
SplashScreen.preventAutoHideAsync();

// Push notification handler config
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const WEB_APP_URL = Constants.expoConfig?.extra?.webAppUrl || 'https://quartermasters.me';

export default function App() {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Android back button: navigate back in WebView before exiting app
    useEffect(() => {
        if (Platform.OS !== 'android') return;

        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (webViewRef.current) {
                webViewRef.current.goBack();
                return true; // Prevent default (exit app)
            }
            return false;
        });

        return () => handler.remove();
    }, []);

    // Register for push notifications
    useEffect(() => {
        async function registerPush() {
            const { status: existing } = await Notifications.getPermissionsAsync();
            let finalStatus = existing;

            if (existing !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') return;

            const token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            // Send token to backend for storage
            // In production, POST to /api/notifications/subscribe with this token
            console.log('Expo push token:', token.data);
        }

        registerPush();
    }, []);

    const onLoadEnd = () => {
        setIsLoading(false);
        SplashScreen.hideAsync();
    };

    const onError = () => {
        setHasError(true);
        setIsLoading(false);
        SplashScreen.hideAsync();
    };

    if (hasError) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#0a0f1a" />
                <Text style={styles.errorTitle}>Connection Lost</Text>
                <Text style={styles.errorBody}>
                    Unable to reach Quartermasters. Check your internet connection and try again.
                </Text>
                <Text
                    style={styles.retryButton}
                    onPress={() => {
                        setHasError(false);
                        setIsLoading(true);
                    }}
                >
                    Retry
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0a0f1a" />

            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#C15A2C" />
                </View>
            )}

            <WebView
                ref={webViewRef}
                source={{ uri: WEB_APP_URL }}
                style={styles.webview}
                onLoadEnd={onLoadEnd}
                onError={onError}
                onHttpError={onError}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState={false}
                allowsBackForwardNavigationGestures
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                sharedCookiesEnabled
                thirdPartyCookiesEnabled
                // Inject CSS to hide elements that are native-handled (e.g., cookie banner)
                injectedJavaScript={`
                    (function() {
                        // Signal to the web app that it's running inside native wrapper
                        window.__QM_NATIVE__ = true;

                        // Hide PWA install prompts and cookie banner (native handles these)
                        var style = document.createElement('style');
                        style.textContent = '[data-native-hide] { display: none !important; }';
                        document.head.appendChild(style);
                    })();
                    true;
                `}
                // Handle external links (open in system browser)
                onShouldStartLoadWithRequest={(request) => {
                    const url = request.url;
                    // Allow navigation within the app domain
                    if (url.startsWith(WEB_APP_URL) || url.startsWith('about:')) {
                        return true;
                    }
                    // External links: open in system browser
                    return false;
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0f1a',
    },
    webview: {
        flex: 1,
        backgroundColor: '#0a0f1a',
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0f1a',
        zIndex: 10,
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#0a0f1a',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorTitle: {
        color: '#C15A2C',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    errorBody: {
        color: '#94a3b8',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    retryButton: {
        color: '#ffffff',
        backgroundColor: '#C15A2C',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: '700',
        overflow: 'hidden',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
