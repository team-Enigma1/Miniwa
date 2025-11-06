import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestPasswordReset } from '../services/passwordResetService';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  // 送信ボタンの処理（通常）
  const handleSubmit = async () => {
    const result = await requestPasswordReset(email);

    if (result.success) {
      Alert.alert('送信完了', result.message);
      router.push({
        pathname: '/VerifyOTPScreen',
        params: { email }
      });
    } else {
      Alert.alert('エラー', result.message);
    }
  };

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
        placeholder=""
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* 送信ボタン */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
        <Text style={styles.buttonText}>送信</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 全体コンテナ
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  // 戻るボタン
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  // タイトル
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 40,
  },
  // 入力フィールド
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // 送信ボタン
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
