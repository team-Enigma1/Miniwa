import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from './supabase';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session'
WebBrowser.maybeCompleteAuthSession();
const IOS_CLIENT_ID = "77210701181-99ndh02f3jfi2ek6ditcln74idofjpc2.apps.googleusercontent.com";
const WEB_CLIENT_ID = "77210701181-chjbmsh9uivtlglr2dd04m8ikhk9lji1.apps.googleusercontent.com";
export function useGoogleAuth() {
    const REDIRECT_URI = makeRedirectUri({
        scheme: "frontend",
        preferLocalhost: false,
    });

    console.log("REDIRECT USED => ", REDIRECT_URI);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Platform.OS === "ios" ? IOS_CLIENT_ID : WEB_CLIENT_ID,
        redirectUri: REDIRECT_URI,
    });
    useEffect(() => {
        if (response?.type === 'success') {
            const id_token = response.authentication?.idToken;
            supabase.auth
                .signInWithIdToken({
                    provider: "google",
                    token: id_token!,
                })
                .then(({ data, error }) => {
                    if (error) {
                        Alert.alert("Googleログインに失敗しました", error.message);
                    } else {
                        console.log("Googleログインに成功しました", data);
                    }
                });
        }
    }, [response]);
}