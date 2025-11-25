import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface AuthContainerProps {
  children: React.ReactNode;
  /**
   * Style cho container chính
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style cho gradient background
   */
  gradientStyle?: StyleProp<ViewStyle>;
  /**
   * Style cho content container
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Màu gradient, mặc định là gradient primary của MiniWa
   */
  gradientColors?: readonly [string, string, string];
  /**
   * Cho phép scroll khi content dài
   */
  scrollable?: boolean;
  /**
   * Hiển thị status bar trong suốt
   */
  translucentStatusBar?: boolean;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  containerStyle,
  gradientStyle,
  contentStyle,
  gradientColors = Colors.background.gradient.primary,
  scrollable = true,
  translucentStatusBar = true,
}) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  const contentProps = scrollable
    ? {
        contentContainerStyle: [styles.scrollContent, contentStyle],
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: 'handled' as const,
      }
    : { style: [styles.content, contentStyle] };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar
        barStyle="dark-content"
        translucent={translucentStatusBar}
        backgroundColor="transparent"
      />
      
      <LinearGradient
        colors={gradientColors}
        style={[styles.gradient, gradientStyle]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ContentWrapper {...contentProps}>
            <View style={styles.innerContent}>{children}</View>
          </ContentWrapper>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
});