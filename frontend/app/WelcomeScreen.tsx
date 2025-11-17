import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/WelcomeScreen.styles'; 


const WelcomeScreen = () => {
  const router = useRouter(); // Expo Routerで画面遷移

  const handleStart = () => {
    router.replace('/LoginWelcomeScreen'); // 「はじめる」ボタンに遷移
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

        <View style={styles.textContainer}>
          <Text style={styles.title}>MINIWA</Text>
          <Text style={styles.subtitle}>へようこそ！</Text>
          <Text style={styles.description}>
            さあ、植物を育てる準備は出来ましたか？
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleStart} 
        >
          <Text style={styles.buttonText}>はじめる</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default WelcomeScreen; 