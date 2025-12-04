// shared/components/buttons/PrimaryButton.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ---- Thêm Variant ----
type Variant = 'primary' | 'outline' | 'danger';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;

  // ---- Thêm Variant vào Props ----
  variant?: Variant;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  size = 'medium',
  fullWidth = false,
  style,
  textStyle,
  variant = 'primary',   // ---- Default variant ----
}: PrimaryButtonProps) {
  
  // ---- Button Height ----
  const getButtonHeight = () => {
    switch (size) {
      case 'small': return 44;
      case 'large': return 60;
      default: return 56;
    }
  };

  // ---- Text Size ----
  const getTextSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  // ---- Style theo variant ----
  const getButtonVariantStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextVariantStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        getButtonVariantStyle(),
        {
          height: getButtonHeight(),
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && (
            <Ionicons 
              name={icon} 
              size={getTextSize()} 
              style={[styles.icon, getTextVariantStyle()]}
            />
          )}
          <Text style={[
            styles.textBase, 
            getTextVariantStyle(), 
            { fontSize: getTextSize() },
            textStyle
          ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ---- Base ----
  buttonBase: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: 8,
  },

  textBase: {
    fontWeight: '600',
    fontFamily: 'System',
  },

  // ---- VARIANT: primary ----
  primaryButton: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  primaryText: {
    color: '#ffffff',
  },

  // ---- VARIANT: outline ----
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#10b981',
    shadowColor: 'transparent',
  },
  outlineText: {
    color: '#10b981',
  },

  // ---- VARIANT: danger ----
  dangerButton: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  dangerText: {
    color: '#ffffff',
  },
});
