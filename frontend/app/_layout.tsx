// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { PlantsProvider } from './shared/contexts/PlantsContext';
import {
  requestNotificationPermission,
  scheduleDailyNoonNotification,
} from '@/lib/notifications';

export const options = {
  headerShown: false,
};

export default function Layout() {
  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermission();
      if (granted) {
        await scheduleDailyNoonNotification();
      }
    })();
  }, []);

  return (
    <PlantsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
      </Stack>
    </PlantsProvider>
  );
}
