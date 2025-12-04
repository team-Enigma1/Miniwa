import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/LoginScreen.styles'; 
import { login } from '../api/supabaseAuth'

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    // TODO: バックエンド側でログインAPIを接続する
   const { data, error } = await login({ email, password })
   if (error) {
    alert(error.message);
    return;
   }
    // ログイン処理を実行
    console.log('Login with:', email, password);
    router.push('/HomeScreen');
  };

  const handleForgotPassword = () => {
    // パスワードリセット画面へ遷移
    router.push('/ForgotPasswordScreen');
  };

  const handleGoogleLogin = () => {
    // TODO: バックエンド（Googleログイン連携）
    // Googleログイン処理を実行
    console.log('Google login pressed');
  };

  const handleRegister = () => {
    // 登録画面へ遷移
    router.push('./RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* タイトル部分 */}
          <Text style={styles.title}>ログイン</Text>

          {/* 入力フィールド（メールアドレス） */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>メールアドレス</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* 入力フィールド（パスワード） */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>パスワード</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* ログインボタン */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>ログイン</Text>
          </TouchableOpacity>

          {/* パスワードを忘れた場合のリンク */}
          <TouchableOpacity 
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPassword}>パスワードをお忘れですか？</Text>
          </TouchableOpacity>

          {/* 区切り線（または） */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>または</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Googleログインボタン */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.googleIconContainer}>
              <Image
                source={require('../assets/images/google.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.googleButtonText}>Googleでログイン</Text>
          </TouchableOpacity>

          {/* 登録リンク */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>アカウントをお持ちでない方は</Text>
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <Text style={styles.registerLink}>こちら</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen; 