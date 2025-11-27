// shared/components/social/LikeButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../../shared/constants/colors';

interface LikeButtonProps {
  isLiked: boolean;
  onPress: () => void;
  size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onPress,
  size = 24,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name={isLiked ? 'heart' : 'heart-outline'}
        size={size}
        color={isLiked ? Colors.social.like : Colors.text.tertiary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});

export default LikeButton;