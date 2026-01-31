// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        setIsLoggedIn(!!token);
      } catch (e) {
        console.error('トークン取得エラー', e);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  // ローディング中（白画面防止）
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ログイン状態で振り分け
  return isLoggedIn
    ? <Redirect href="/HomeScreen" />
    : <Redirect href="/WelcomeScreen" />;
}
