// app/(tabs)/community/social/chat/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../shared/constants/colors';

export default function ChatLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary.main,
        },
        headerTintColor: Colors.text.inverse,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors.background.primary,
        },
        // 🆕 THÊM NÚT TRỞ VỀ CHO TẤT CẢ MÀN HÌNH TRONG CHAT
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ marginLeft: 8, padding: 8 }}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.text.inverse} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'メッセージ',
        }}
      />
      <Stack.Screen
        name="[chatUserId]"
        options={{
          headerShown: false, // Màn hình chat chi tiết đã có custom header riêng
        }}
      />
    </Stack>
  );
}