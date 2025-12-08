// app/(tabs)/community/social/notifications/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../shared/constants/colors';

export default function NotificationsLayout() {
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
        // 🆕 THÊM NÚT TRỞ VỀ TRONG HEADER
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
          title: '通知',
        }}
      />
    </Stack>
  );
}