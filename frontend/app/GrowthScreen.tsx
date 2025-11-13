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
import styles from '../styles/GrowthScreen.styles'; 

const GrowthScreen = () => {
  const router = useRouter(); 

  const handleLogin = () => {
    router.push('/LoginWelcomeScreen'); 
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
          <Text style={styles.title}>毎日の水やりで、</Text>
          <Text style={styles.subtitle}>植物を元気に育てましょう！</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              水やりは植物成長の第一歩。
            </Text>
            <Text style={styles.description}>
              毎日少しずつ愛情を注ぎ、緑の喜びを感じましょう。
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>ログイン画面へ進む</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default GrowthScreen; 