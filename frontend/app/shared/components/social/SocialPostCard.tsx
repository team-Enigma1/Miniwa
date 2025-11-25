// shared/components/social/SocialPostCard.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 🎯 THÊM IMPORT NÀY
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../../shared/constants/colors';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  images: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

interface SocialPostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
}) => {
  const router = useRouter(); // 🎯 THÊM HOOK NÀY

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Vài phút trước';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${Math.floor(diffInHours / 24)} ngày trước`;
    }
  };

  // 🎯 THÊM HÀM NAVIGATE ĐẾN POST DETAIL
  const handlePressPost = () => {
    console.log('Navigating to post detail:', post.id);
    router.push(`./community/social/${post.id}`);
  };

  // 🎯 THÊM HÀM XỬ LÝ COMMENT VỚI NAVIGATION
  const handleCommentPress = () => {
    if (onComment) {
      onComment(post.id);
    } else {
      // Mặc định navigate đến post detail với focus comment
      router.push(`./community/social/${post.id}?focusComment=true`);
    }
  };

  // 🎯 THÊM HÀM XỬ LÝ SHARE
  const handleSharePress = () => {
    if (onShare) {
      onShare(post.id);
    } else {
      // Mặc định hiển thị alert
      console.log('Share post:', post.id);
      // Có thể thêm Alert.alert ở đây nếu muốn
    }
  };

  // 🎯 THÊM HÀM XỬ LÝ LIKE VỚI EVENT STOP PROPAGATION
  const handleLikePress = (e: any) => {
    // Ngăn sự kiện nổi bọt lên card
    e?.stopPropagation?.();
    onLike(post.id);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePressPost} // 🎯 THÊM NAVIGATION CHO TOÀN BỘ CARD
      activeOpacity={0.95}
    >
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timestamp}>{formatTime(post.timestamp)}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Tags */}
      {post.tags.length > 0 && (
        <View style={styles.tags}>
          {post.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      )}

      {/* Images */}
      {post.images.length > 0 && (
        <View style={styles.images}>
          {post.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[
                styles.image,
                post.images.length === 1 ? styles.singleImage : styles.multiImage,
              ]}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statText}>{post.likes} いいね</Text>
        <Text style={styles.statText}>{post.comments} コメント</Text>
        <Text style={styles.statText}>{post.shares} 共有</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLikePress} // 🎯 SỬ DỤNG HÀM MỚI
        >
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={post.isLiked ? Colors.social.like : Colors.text.tertiary}
          />
          <Text
            style={[
              styles.actionText,
              { color: post.isLiked ? Colors.social.like : Colors.text.tertiary },
            ]}
          >
            いいね
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCommentPress} // 🎯 SỬ DỤNG HÀM MỚI
        >
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={Colors.text.tertiary}
          />
          <Text style={styles.actionText}>コメント</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSharePress} // 🎯 SỬ DỤNG HÀM MỚI
        >
          <Ionicons
            name="share-social-outline"
            size={22}
            color={Colors.text.tertiary}
          />
          <Text style={styles.actionText}>共有</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    fontSize: 13,
    color: Colors.primary.main,
    marginRight: 8,
    marginBottom: 4,
  },
  images: {
    marginBottom: 12,
  },
  image: {
    borderRadius: 8,
  },
  singleImage: {
    width: '100%',
    height: 200,
  },
  multiImage: {
    width: '48%',
    height: 120,
    margin: '1%',
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    paddingVertical: 12,
    marginBottom: 12,
  },
  statText: {
    fontSize: 13,
    color: Colors.text.tertiary,
    marginRight: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginLeft: 6,
  },
});

export default SocialPostCard;
