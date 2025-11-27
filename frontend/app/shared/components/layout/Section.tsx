import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  /**
   * Style cho container chính
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style cho header section (chứa title + subtitle)
   */
  headerStyle?: StyleProp<ViewStyle>;
  /**
   * Style cho title
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Style cho subtitle
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Style cho content (phần chứa children)
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Hiển thị divider dưới section
   */
  withDivider?: boolean;
  /**
   * Căn giữa title
   */
  centerTitle?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  containerStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  withDivider = false,
  centerTitle = false,
}) => {
  return (
    <View
      style={[
        styles.sectionContainer,
        withDivider && styles.withDivider,
        containerStyle as StyleProp<ViewStyle>,
      ]}
    >
      {(title || subtitle) && (
        <View
          style={[
            styles.sectionHeader,
            centerTitle && styles.centerHeader,
            headerStyle as StyleProp<ViewStyle>,
          ]}
        >
          {title && (
            <Text style={[styles.sectionTitle, titleStyle as StyleProp<TextStyle>]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.sectionSubtitle, subtitleStyle as StyleProp<TextStyle>]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}

      <View style={contentStyle as StyleProp<ViewStyle>}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  withDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    paddingBottom: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  centerHeader: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});