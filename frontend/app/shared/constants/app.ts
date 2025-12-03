// shared/constants/app.ts

/**
 * 🎨 App Colors - GardenMate Design System
 */
export const Colors = {
  // Primary Greens (Brand Colors)
  primary: '#2d5a3d',
  primaryLight: '#4a7c59',
  primaryDark: '#1e3d2a',
  
  // Secondary Colors
  secondary: '#4caf50',
  secondaryLight: '#80e27e',
  secondaryDark: '#087f23',
  
  // Accent Colors
  accent: '#8bc34a',
  accentLight: '#bef67a',
  accentDark: '#5a9216',
  
  // Neutral Colors
  background: '#f8f9fa',
  surface: '#ffffff',
  text: '#333333',
  textLight: '#666666',
  textLighter: '#888888',
  gray: '#cccccc',
  lightGray: '#f0f0f0',
  white: '#ffffff',
  black: '#000000',
  
  // Status Colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#ff6b6b',
  info: '#2196f3',
  purple: '#9C27B0',

  // 🔥 THÊM CÁC MÀU LIGHT MỚI
  lightPrimary: '#e8f5e8',
  lightSecondary: '#fff3e0',
  lightAccent: '#f3e5f5',
  lightSuccess: '#e8f5e9',
  
  // Plant Health Colors
  health: {
    healthy: '#4caf50',
    needsCare: '#ff9800',
    critical: '#ff6b6b',
    unknown: '#cccccc'
  },
  
  // Care Level Colors
  careLevel: {
    easy: '#4caf50',
    medium: '#ff9800',
    difficult: '#ff6b6b'
  }
};

/**
 * 📏 App Spacing & Sizes
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * 📐 Border Radius
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

/**
 * 📱 Layout Constants
 */
export const Layout = {
  headerHeight: 56,
  tabBarHeight: 60,
  containerPadding: 16,
  screenPadding: 20,
  cardPadding: 16,
};

/**
 * 🎯 App Configuration
 */
export const AppConfig = {
  appName: 'GardenMate',
  appNameJP: 'ガーデンメイト',
  version: '1.0.0',
  supportEmail: 'support@gardenmate.app',
};

/**
 * 🔄 Animation Constants
 */
export const Animation = {
  defaultDuration: 300,
  fastDuration: 150,
  slowDuration: 500,
};

/**
 * 🌱 Plant Care Defaults
 */
export const PlantDefaults = {
  wateringInterval: 7,
  defaultCareLevel: 'easy' as const,
  defaultHealth: 'healthy' as const,
};

/**
 * 📊 Progress & Goals
 */
export const Progress = {
  dailyCareGoal: 5,
  weeklyCareGoal: 15,
  monthlyCareGoal: 50,
};

/**
 * 🗂️ Navigation Constants
 */
export const Navigation = {
  tabIcons: {
    home: 'home',
    plants: 'leaf',
    care: 'water',
    discover: 'compass',
    profile: 'person',
  } as const,
};

/**
 * 🌤️ Weather Constants
 */
export const Weather = {
  defaultCity: '大阪',
  defaultTemperature: 28,
  defaultCondition: '穏やかな日差し',
};

/**
 * 📝 Text Styles
 */
export const Typography = {
  heading1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

/**
 * 🎭 Shadow Styles
 */
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

/**
 * 🔤 Japanese Text Constants
 */
export const JapaneseText = {
  common: {
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    success: '成功',
    cancel: 'キャンセル',
    save: '保存',
    delete: '削除',
    edit: '編集',
    add: '追加',
    confirm: '確認',
  },
  auth: {
    welcome: 'おかえりなさい',
    login: 'ログイン',
    register: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    name: 'お名前',
  },
  plants: {
    myPlants: 'マイ植物',
    addPlant: '植物を追加',
    plantName: '植物の名前',
    plantType: '種類',
    careLevel: 'ケアレベル',
    wateringInterval: '水やりの間隔',
    lastWatered: '最後の水やり',
    nextWatering: '次の水やり',
    notes: '備考',
  },
  care: {
    careSchedule: 'お世話スケジュール',
    watering: '水やり',
    fertilizing: '施肥',
    pruning: '剪定',
    today: '今日の予定',
  },
};

export default {
  Colors,
  Spacing,
  BorderRadius,
  Layout,
  AppConfig,
  Animation,
  PlantDefaults,
  Progress,
  Navigation,
  Weather,
  Typography,
  Shadows,
  JapaneseText,
};