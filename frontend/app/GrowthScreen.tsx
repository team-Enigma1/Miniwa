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
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 13,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
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

export default GrowthScreen;