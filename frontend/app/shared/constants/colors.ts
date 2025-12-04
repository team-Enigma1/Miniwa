// shared/constants/colors.ts

/**
 * 🎨 Hệ thống màu sắc MiniWa - Thiết kế cho ứng dụng chăm sóc cây trồng
 * Màu chủ đạo: Xanh lá cây (#10b981) thể hiện sự tươi mới, phát triển
 */

export const Colors = {
  // ==================== MÀU CHỦ ĐẠO (PRIMARY) ====================
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    // Màu chính của MiniWa
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },

  // ==================== MÀU VĂN BẢN (TEXT) ====================
  text: {
    primary: '#1f2937',     // Văn bản chính - xám đen
    secondary: '#4b5563',   // Văn bản phụ - xám đậm
    tertiary: '#6b7280',    // Văn bản thứ cấp - xám trung bình
    placeholder: '#9ca3af', // Placeholder - xám nhạt
    inverse: '#ffffff',     // Văn bản trên nền tối
    disabled: '#d1d5db',    // Văn bản bị vô hiệu hóa
    
    // Màu văn bản đặc biệt
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
  },

  // ==================== MÀU NỀN (BACKGROUND) ====================
  background: {
    primary: '#ffffff',     // Nền chính - trắng
    secondary: '#f8fafc',   // Nền phụ - xám rất nhạt
    tertiary: '#f1f5f9',    // Nền thứ cấp
    card: '#ffffff',        // Nền card/components
    input: '#f9fafb',       // Nền cho input field
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay
    
    // Gradient backgrounds - ĐÃ SỬA: thêm as const
    gradient: {
      primary: ['#f0fdf4', '#ecfdf5', '#f0fdf4'] as const,
      success: ['#dcfce7', '#bbf7d0', '#dcfce7'] as const,
      warning: ['#fef3c7', '#fde68a', '#fef3c7'] as const,
      error: ['#fee2e2', '#fecaca', '#fee2e2'] as const,
    },
  },

  // ==================== MÀU ĐƯỜNG VIỀN (BORDER) ====================
  border: {
    light: '#e5e7eb',       // Viền nhạt
    medium: '#d1d5db',      // Viền trung bình
    dark: '#9ca3af',        // Viền đậm
    primary: '#d1d5db',     // Viền chính
    focus: '#10b981',       // Viền khi focus
    error: '#ef4444',       // Viền lỗi
  },

  // ==================== MÀU TRẠNG THÁI (STATUS) ====================
  status: {
    // Success - Màu xanh lá
    success: {
      light: '#dcfce7',
      main: '#16a34a',
      dark: '#15803d',
      text: '#052e16',
    },
    
    // Warning - Màu vàng/cam
    warning: {
      light: '#fef3c7',
      main: '#d97706',
      dark: '#92400e',
      text: '#451a03',
    },
    
    // Error - Màu đỏ
    error: {
      light: '#fee2e2',
      main: '#dc2626',
      dark: '#991b1b',
      text: '#450a0a',
    },
    
    // Info - Màu xanh dương
    info: {
      light: '#dbeafe',
      main: '#2563eb',
      dark: '#1e40af',
      text: '#172554',
    },
  },

  // ==================== MÀU CÂY TRỒNG (PLANT SPECIFIC) ====================
  plants: {
    healthy: '#10b981',     // Cây khỏe mạnh
    needsWater: '#f59e0b',  // Cần tưới nước
    needsCare: '#ef4444',   // Cần chăm sóc
    growing: '#8b5cf6',     // Đang phát triển
    dormant: '#6b7280',     // Ngủ đông/ngừng phát triển
  },

  // ==================== MÀU THỜI TIẾT (WEATHER) ====================
  weather: {
    sunny: '#fbbf24',       // Nắng
    cloudy: '#9ca3af',      // Mây
    rainy: '#60a5fa',       // Mưa
    snowy: '#dbeafe',       // Tuyết
    stormy: '#7c3aed',      // Bão
    // THÊM MÀU CHO GRADIENT
    sunnyGradient: ['#fbbf24', '#f59e0b'] as const,
    rainyGradient: ['#60a5fa', '#3b82f6'] as const,
    cloudyGradient: ['#9ca3af', '#6b7280'] as const,
    snowyGradient: ['#dbeafe', '#93c5fd'] as const,
    stormyGradient: ['#7c3aed', '#6d28d9'] as const,
    defaultGradient: ['#34d399', '#10b981'] as const,
  },

  // ==================== MÀU SEASONS (MÙA) ====================
  seasons: {
    spring: '#22c55e',      // Mùa xuân
    summer: '#f59e0b',      // Mùa hè
    autumn: '#ea580c',      // Mùa thu
    winter: '#60a5fa',      // Mùa đông
  },

  // ==================== MÀU ĐẶC BIỆT (SPECIAL) ====================
  special: {
    // AI Assistant
    ai: {
      primary: '#8b5cf6',
      gradient: ['#e9d5ff', '#d8b4fe', '#c084fc'] as const,
    },
    
    // Community
    community: {
      primary: '#f59e0b',
      gradient: ['#fef3c7', '#fde68a', '#fcd34d'] as const,
    },
    
    // Marketplace
    marketplace: {
      primary: '#ef4444',
      gradient: ['#fecaca', '#fca5a5', '#f87171'] as const,
    },
    
    // Growth Diary
    diary: {
      primary: '#06b6d4',
      gradient: ['#cffafe', '#a5f3fc', '#67e8f9'] as const,
    },
  },

  // ==================== MÀU SHADOW (ĐỔ BÓNG) ====================
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.2)',
  },

  // ==================== MÀU SOCIAL (MẠNG XÃ HỘI) ====================
  social: {
    like: '#ef4444',        // Màu like
    comment: '#3b82f6',     // Màu comment
    share: '#10b981',       // Màu share
    save: '#8b5cf6',        // Màu save/lưu
  },

  // ==================== MÀU ACHIEVEMENTS (THÀNH TỰU) ====================
  achievements: {
    bronze: '#b45309',      // Đồng
    silver: '#6b7280',      // Bạc
    gold: '#f59e0b',        // Vàng
    platinum: '#06b6d4',    // Bạch kim
    diamond: '#8b5cf6',     // Kim cương
  },

  // ==================== ALIAS CHO COMPATIBILITY VỚI PLANT CARD ====================
  // Thêm các alias để tương thích với PlantCard.tsx và các component khác
  
  // Status colors (cho PlantCard health indicators)
  success: '#16a34a',       // Alias cho status.success.main
  warning: '#d97706',       // Alias cho status.warning.main  
  error: '#dc2626',         // Alias cho status.error.main
  info: '#2563eb',          // Alias cho status.info.main

  // Basic colors (cho layout components)
  white: '#ffffff',
  black: '#000000',
  darkGray: '#374151',      // Alias cho text.primary
  gray: '#6b7280',          // Alias cho text.tertiary
  lightGray: '#e5e7eb',     // Alias cho border.light

  // Primary color shortcut
  primaryColor: '#10b981',       // Alias cho primary.main
};

// ==================== EXPORT MÀU THƯỜNG DÙNG ====================
export default Colors;

// ==================== UTILITY FUNCTIONS ====================
/**
 * Tạo opacity cho màu (hỗ trợ rgba)
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Nếu là hex color, convert sang rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

/**
 * Lấy màu gradient theo type
 */
export const getGradient = (type: 'primary' | 'success' | 'warning' | 'error' | 'ai' | 'community' | 'marketplace' | 'diary'): readonly [string, string, string] => {
  const gradients = {
    primary: Colors.background.gradient.primary,
    success: Colors.background.gradient.success,
    warning: Colors.background.gradient.warning,
    error: Colors.background.gradient.error,
    ai: Colors.special.ai.gradient,
    community: Colors.special.community.gradient,
    marketplace: Colors.special.marketplace.gradient,
    diary: Colors.special.diary.gradient,
  };
  
  return gradients[type] || gradients.primary;
};

/**
 * Lấy màu cho trạng thái cây trồng
 */
export const getPlantStatusColor = (status: 'healthy' | 'needsWater' | 'needsCare' | 'growing' | 'dormant'): string => {
  return Colors.plants[status];
};

/**
 * Lấy màu cho mùa
 */
export const getSeasonColor = (season: 'spring' | 'summer' | 'autumn' | 'winter'): string => {
  return Colors.seasons[season];
};

/**
 * Lấy màu cho health indicator của cây
 */
export const getPlantHealthColor = (health: 'excellent' | 'good' | 'fair' | 'poor'): string => {
  const healthColors = {
    excellent: Colors.status.success.main,
    good: Colors.status.info.main,
    fair: Colors.status.warning.main,
    poor: Colors.status.error.main,
  };
  
  return healthColors[health] || Colors.status.info.main;
};

/**
 * Lấy màu cho watering status
 */
export const getWateringStatusColor = (daysUntilWatering: number): string => {
  if (daysUntilWatering <= 0) {
    return Colors.status.error.main;
  } else if (daysUntilWatering === 1) {
    return Colors.status.warning.main;
  } else {
    return Colors.status.success.main;
  }
};

// THÊM UTILITY FUNCTION MỚI
export const getWeatherGradient = (weatherType: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'stormy' | 'default'): readonly [string, string] => {
  const gradientMap = {
    sunny: Colors.weather.sunnyGradient,
    rainy: Colors.weather.rainyGradient,
    cloudy: Colors.weather.cloudyGradient,
    snowy: Colors.weather.snowyGradient,
    stormy: Colors.weather.stormyGradient,
    default: Colors.weather.defaultGradient,
  };
  
  return gradientMap[weatherType] || gradientMap.default;
};

