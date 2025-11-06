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
import { verifyOTP } from '../services/passwordResetService';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams() as { email: string };
  const [otp, setOtp] = useState('');

  // OTP認証処理
  const handleVerify = async () => {
    const result = await verifyOTP(email, otp);

    if (result.success) {
      Alert.alert('認証成功', 'パスワードを再設定してください');
      router.push({
        pathname: '/ResetPasswordScreen',
        params: { email, otp },
      });
    } else {
      Alert.alert('認証エラー', result.error);
    }
  };

  // 戻るボタン押下
  const handleGoBack = () => {
    router.back();
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
    color: '#2C3E50', 
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#A9A9A9',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
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
    fontWeight: '700',
    fontSize: 18,
  },
  text: {
    color: '#7F8C8D',
    fontSize: 14,
    textAlign: 'right',
  },
  resendText: {
    color: '#2ECC71',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
