import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'default' | 'outlined';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  /**
   * Nếu muốn truyền style cho container ngoài (View), dùng prop này.
   * Lưu ý: prop `style` của TextInputProps sẽ được coi là style cho TextInput.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  variant = 'default',
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...props
}) => {
  // Tách style của TextInput ra khỏi `props` (nếu người dùng truyền `style` trong TextInputProps)
  const { style: textInputStyle, ...textInputProps } = props as TextInputProps;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          variant === 'outlined' ? styles.outlinedContainer : undefined,
          error ? styles.errorContainer : undefined,
          containerStyle as StyleProp<ViewStyle>,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          // Các phần tử trong mảng style phải có kiểu StyleProp<TextStyle> | undefined
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            (textInputProps.multiline ? styles.multilineInput : undefined) as StyleProp<TextStyle>,
            textInputStyle as StyleProp<TextStyle> | undefined,
          ]}
          placeholderTextColor={Colors.text.placeholder}
          {...(textInputProps as TextInputProps)}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  outlinedContainer: {
    backgroundColor: Colors.background.primary,
    borderColor: Colors.border.primary,
  },
  errorContainer: {
    borderColor: Colors.status.error.main,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text.primary,
    minHeight: 48,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  leftIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  rightIcon: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  errorText: {
    color: Colors.status.error.main,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
