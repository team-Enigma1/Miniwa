import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/LoginWelcomeScreen.styles'; 

const LoginWelcomeScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/LoginScreen');
  };

  const handleRegister = () => {
    router.push('/RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.potsContainer}>
          <View style={styles.pot}>
            <Image source={require('../assets/images/1.png')} />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>菜園と、もっと近くに</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>リアルタイムで植物</Text>
            <Text style={styles.description}>の成長を守ります</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>ログイン</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>新規登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginWelcomeScreen; 