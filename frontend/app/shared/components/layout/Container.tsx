import React from 'react';
import {
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  /**
   * Safe area cho top (tránh notch)
   */
  safeTop?: boolean;
  /**
   * Safe area cho bottom (tránh home indicator)
   */
  safeBottom?: boolean;
  /**
   * Full màn hình với flex: 1
   */
  fullScreen?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  backgroundColor = Colors.background.primary,
  paddingHorizontal = 16,
  paddingVertical = 0,
  safeTop = false,
  safeBottom = false,
  fullScreen = false,
}) => {
  const containerStyles = [
    styles.base,
    { backgroundColor, paddingHorizontal, paddingVertical },
    fullScreen && styles.fullScreen,
    safeTop && styles.safeTop,
    safeBottom && styles.safeBottom,
    style as StyleProp<ViewStyle>,
  ];

  return <View style={containerStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flex: 0, // Mặc định không flex, override bằng fullScreen nếu cần
  },
  fullScreen: {
    flex: 1,
  },
  safeTop: {
    paddingTop: 44, // Safe area cho iPhone notch
  },
  safeBottom: {
    paddingBottom: 34, // Safe area cho home indicator
  },
});