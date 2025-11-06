// app/_layout.tsx
import { Stack } from 'expo-router';

export const options = {
  headerShown: false, 
};

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
