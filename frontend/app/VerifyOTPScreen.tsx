import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/VerifyOTPScreen.styles'; 

const VerifyOTPScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams() as { email: string };
  const [otp, setOtp] = useState('');

  // 戻るボタン押下
  const handleGoBack = () => {
    router.back();
  };

  // テスト用：OTP確認ボタン（UIのみ）
  const handleVerify = () => {
    router.push({
      pathname: '/ResetPasswordScreen',
      params: { email, otp },
    });
  };

  // テスト用：> ボタンで直接次画面へ
  const handleTestNext = () => {
    router.push('/ResetPasswordScreen'); // 直接次画面へ
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* テスト用 > ボタン */}
      <TouchableOpacity style={[styles.button, { marginBottom: 20 }]} onPress={handleTestNext}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>

      {/* タイトル */}
      <Text style={styles.title}>確認コードを入力してください</Text>

      {/* OTP入力欄 */}
      <TextInput
        style={styles.input}
        placeholder="確認コード（6桁）"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={6}
        autoCapitalize="none"
        value={otp}
        onChangeText={setOtp}
      />

      {/* 再送信リンク */}
      <TouchableOpacity
        style={{ marginBottom: 20, alignSelf: 'flex-end' }}
        onPress={() => router.push('/ForgotPasswordScreen')}
      >
        <Text style={styles.text}>
          確認コードが届いていませんか？{' '}
          <Text style={styles.resendText}>再送信する</Text>
        </Text>
      </TouchableOpacity>

      {/* 確認ボタン */}
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>確認する</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
