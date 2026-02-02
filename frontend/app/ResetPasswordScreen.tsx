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
import styles from '../styles/ResetPasswordScreen.styles'; 

const ResetPasswordScreen = () => {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // 戻るボタン押下
  const handleGoBack = () => {
    router.back();
  };

  const handleReset = () => {
    if (password !== confirm) {
      alert('パスワードが一致しません');
      return;
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
};

export default ResetPasswordScreen;
