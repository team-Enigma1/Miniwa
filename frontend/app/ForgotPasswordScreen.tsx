import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ForgotPasswordScreen.styles'; 

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  // 戻るボタン
  const handleGoBack = () => {
    router.back();
  };

  // テスト用：> ボタンで直接次画面へ
  const handleTestNext = () => {
    router.push('/VerifyOTPScreen'); // 直接次画面へ
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={28} color="#2C3E50" />
      </TouchableOpacity>

      {/* テスト用 > ボタン */}
      <TouchableOpacity style={[styles.button, { marginBottom: 20 }]} onPress={handleTestNext}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>

      {/* タイトル */}
      <Text style={styles.title}>メールアドレスを入力してください</Text>

      {/* メールアドレス入力 */}
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* 送信ボタン（ダミー） */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/VerifyOTPScreen')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>送信</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
