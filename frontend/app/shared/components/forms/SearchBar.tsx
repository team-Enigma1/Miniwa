import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface SearchBarProps extends TextInputProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>; // style riêng cho View bên ngoài
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  autoFocus = false,
  value,
  placeholder = "検索...",
  style, // style dành cho TextInput
  containerStyle, // style dành cho View ngoài
  ...props
}) => {
  const [query, setQuery] = useState(value || '');

  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.searchContainer}>
        {/* Search Icon */}
        <Ionicons 
          name="search" 
          size={20} 
          color={Colors.text.placeholder} 
          style={styles.searchIcon}
        />

        {/* Input Field */}
        <TextInput
          value={query}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.placeholder}
          style={[styles.input, style as StyleProp<TextStyle>]}
          autoFocus={autoFocus}
          returnKeyType="search"
          {...props}
        />

        {/* Clear Button (only show when there's text) */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons 
              name="close-circle" 
              size={18} 
              color={Colors.text.placeholder} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.input,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    minHeight: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
});
