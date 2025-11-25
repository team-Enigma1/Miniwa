// app/(tabs)/community/social/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function SocialLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // 🎯 FIX: SỬ DỤNG ANIMATION ĐƠN GIẢN
        animation: 'simple_push',
        animationDuration: 200, // Giảm thời gian
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="create-post"
        options={{
          // 🎯 FIX: ĐẢM BẢO LÀ 'card' VÀ CÓ ANIMATION PHÙ HỢP
          presentation: 'card',
          animation: 'slide_from_bottom', // 🎯 THAY ĐỔI: Dùng slide_from_bottom thay vì từ right
          gestureEnabled: true,
          gestureDirection: 'vertical', // Phù hợp với slide_from_bottom
        }}
      />
      <Stack.Screen
        name="[postId]"
        options={{
          headerShown: false,
          title: '記事',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="profile/[userId]"
        options={{
          headerShown: false,
          title: 'Hồ sơ',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}