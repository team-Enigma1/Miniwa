// lib/notifications.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// フォアグラウンドでも通知を出す（超重要）
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } =
      await Notifications.requestPermissionsAsync();

    if (newStatus !== 'granted') {
      alert('通知が許可されていません');
      return false;
    }
  }

  // Android用（必須）
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return true;
}

export async function scheduleDailyNoonNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync(); // 二重防止

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'お知らせ',
      body: '今日の植物のお世話時間だよ 🌱',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: 12,
      minute: 0,
      repeats: true,
    },
  });

}
