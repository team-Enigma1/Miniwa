import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // 戻るボタン押下
  const handleGoBack = () => {
    router.back();
  };

  // パスワードリセット処理
  const handleReset = async () => {
    if (password !== confirm) {
      Alert.alert('パスワードが一致しません。');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/email/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('パスワードが変更されました！');
        // router.push('/VirtualPetLogin');
      }
    } catch (err) {
      console.log('パスワードのリセットに失敗しました:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* タイトル */}
      <Text style={styles.title}>新しいパスワードを入力してください</Text>

      {/* 新しいパスワード入力 */}
      <TextInput
        style={styles.input}
        placeholder="新しいパスワード"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={6}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {/* 確認用パスワード入力 */}
      <TextInput
        style={styles.input}
        placeholder="パスワードを再入力"
        secureTextEntry
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={6}
        autoCapitalize="none"
        onChangeText={setConfirm}
        value={confirm}
      />

      {/* パスワード変更ボタン */}
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>パスワードを変更する</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // コンテナ全体
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 背景をログイン画面に統一
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
    marginBottom: 30,
    color: '#2C3E50', // ログイン画面タイトル色に統一
    textAlign: 'center',
  },
  // 入力欄
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', // 白背景
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,

    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // ボタン
  button: {
    backgroundColor: '#2ECC71', // ログイン画面ボタン色に統一
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  // ボタン文字
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
