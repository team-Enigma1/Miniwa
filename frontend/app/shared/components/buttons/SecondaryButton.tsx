// shared/components/buttons/SecondaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function SecondaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  size = 'medium',
  fullWidth = false,
}: SecondaryButtonProps) {
  const getButtonHeight = () => {
    switch (size) {
      case 'small': return 44;
      case 'large': return 60;
      default: return 56;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: getButtonHeight(),
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#10b981" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && (
            <Ionicons 
              name={icon} 
              size={getTextSize()} 
              color="#10b981" 
              style={styles.icon} 
            />
          )}
          <Text style={[styles.text, { fontSize: getTextSize() }]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#10b981',
    fontWeight: '600',
    fontFamily: 'System',
  },
});