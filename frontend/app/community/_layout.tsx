// app/(tabs)/community/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../shared/constants/colors';

// Mock data tạm thời - sau này sẽ thay bằng NotificationContext
const mockUnreadCount = 3;
const mockMessageUnreadCount = 2;

export default function CommunityLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'コミュニティ',
          headerStyle: {
            backgroundColor: Colors.primary.main,
          },
          headerTintColor: Colors.text.inverse,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',

          // 🆕 HEADER LEFT: NÚT QUAY VỀ
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 8 }}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.text.inverse}
              />
            </TouchableOpacity>
          ),

          // HEADER RIGHT: Chat + Notification
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              {/* Chat icon */}
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={() => router.push('/community/social/chat')}
              >
                <Ionicons name="chatbubble-outline" size={24} color={Colors.text.inverse} />
                {mockMessageUnreadCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      backgroundColor: Colors.error,
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text style={{ color: Colors.text.inverse, fontSize: 10, fontWeight: 'bold' }}>
                      {mockMessageUnreadCount > 9 ? '9+' : mockMessageUnreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Notification icon */}
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={() => router.push('/community/social/notifications')}
              >
                <Ionicons name="notifications-outline" size={24} color={Colors.text.inverse} />
                {mockUnreadCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      backgroundColor: Colors.error,
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text style={{ color: Colors.text.inverse, fontSize: 10, fontWeight: 'bold' }}>
                      {mockUnreadCount > 9 ? '9+' : mockUnreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="social"
        options={{
          headerShown: false,
          animation: 'simple_push',
        }}
      />
      {/* Các màn hình khác trong community */}
      <Stack.Screen
        name="discover/index"
        options={{
          headerShown: true,
          title: '発見する',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="qa/index"
        options={{
          headerShown: true,
          title: '質疑応答',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="marketplace/index"
        options={{
          headerShown: true,
          title: 'Marketplace',
          animation: 'slide_from_right',
        }}
      />
      {/* 🆕 THÊM ROUTE CHO NOTIFICATIONS */}
      <Stack.Screen
        name="social/notifications/index"
        options={{
          headerShown: true,
          title: '通知',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
