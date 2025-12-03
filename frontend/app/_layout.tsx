// app/_layout.tsx
import { Stack } from 'expo-router';
import { PlantsProvider } from './shared/contexts/PlantsContext';


export const options = {
  headerShown: false, 
};

export default function Layout() {
  return (
    
      <PlantsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Quan trọng: khai báo các route cấp cao */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="calendar" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
        </Stack>
      </PlantsProvider>
    
  );
}


// // app/_layout.tsx
// import { Stack } from 'expo-router';
// import { PlantsProvider } from './shared/contexts/PlantsContext';

// export const options = {
//   headerShown: false, 
// };

// export default function Layout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }} />
//   );
// }
