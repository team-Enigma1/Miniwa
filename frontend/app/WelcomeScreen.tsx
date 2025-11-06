import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const WelcomeScreen = () => {
  const router = useRouter(); //Expo Routerで画面遷移

  const handleStart = () => {
    router.replace('/GrowthScreen'); // 「はじめる」ボタンに遷移
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.potsContainer}>
          <View style={styles.pot}>
            <Image
              source={require('../assets/images/1.png')}
            />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  potsContainer: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
  },
  pot: {
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    letterSpacing: 2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default WelcomeScreen;
