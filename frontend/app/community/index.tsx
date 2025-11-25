// app/(tabs)/community/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import SocialPostCard from '../shared/components/social/SocialPostCard';
import Colors from '../shared/constants/colors';

// Mock data cho user hiện tại - ĐẶT NGOÀI COMPONENT
const currentUser = {
  id: 'currentUser',
  name: 'Rany',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
};

// Mock data cho social feed - ĐẶT NGOÀI COMPONENT
const mockPosts = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Hashimoto',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    content: 'Cây Monstera của mình đang ra lá mới đẹp quá! 🌿 Ai có kinh nghiệm chăm sóc Monstera không?',
    images: ['https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop'],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    tags: ['monstera', 'chamsoc'],
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Gita',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    content: 'Vườn rau sạch tại nhà sau 1 tháng. Mọi người thấy thế nào? 😊',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
    ],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 giờ trước
    likes: 42,
    comments: 15,
    shares: 7,
    isLiked: true,
    tags: ['rausach', 'vuontainha'],
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Canh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    content: '金のなる木の葉が黄色くなってきました。原因をご存知の方はいらっしゃいますか？とても心配です。 😔',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 ngày trước
    likes: 18,
    comments: 12,
    shares: 2,
    isLiked: false,
    tags: ['kimtien', 'benhcay', 'tuvan'],
  },
];

// Type definitions
interface CreatePostBoxProps {
  onNavigateToCreatePost: () => void;
  onPickImage: () => void;
  onTakePhoto: () => void;
}

// Component Create Post Box (giống Facebook) - TÁCH RA VÀ DÙNG React.memo
const CreatePostBox: React.FC<CreatePostBoxProps> = React.memo(({ 
  onNavigateToCreatePost, 
  onPickImage, 
  onTakePhoto 
}) => {
  return (
    <View style={styles.createPostBox}>
      <View style={styles.createPostHeader}>
        <Image source={{ uri: currentUser.avatar }} style={styles.userAvatar} />
        <TouchableOpacity 
          style={styles.textInputContainer}
          onPress={onNavigateToCreatePost}
        >
          <Text style={styles.textInputPlaceholder}>何を考えてるんですか？?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createPostActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onPickImage}>
          <Ionicons name="image-outline" size={24} color={Colors.status.success.main} />
          <Text style={styles.actionText}>画像</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onTakePhoto}>
          <Ionicons name="camera-outline" size={24} color={Colors.status.info.main} />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

// Component chính với React.memo và useCallback
const CommunityScreen = React.memo(() => {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // 🎯 SỬ DỤNG useCallback CHO TẤT CẢ HÀM
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  }, []);

  // 🎯 TỐI ƯU NAVIGATION - SỬ DỤNG navigate THAY VÌ push
  const handleNavigateToCreatePost = useCallback((images: string[] = []) => {
    if (images.length > 0) {
      router.navigate({
        pathname: './community/social/create-post',
        params: { preSelectedImages: JSON.stringify(images) }
      });
    } else {
      router.navigate('./community/social/create-post');
    }
  }, [router]);

  const handlePickImage = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('アクセスが必要です', 'アプリは写真ライブラリにアクセスする必要があります。');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 4,
      });

      if (!result.canceled && result.assets) {
        const selectedImages = result.assets.map(asset => asset.uri);
        handleNavigateToCreatePost(selectedImages);
      }
    } catch (error) {
      console.error('写真の選択中にエラーが発生しました:', error);
      Alert.alert('エラー', '写真を選択できません。もう一度お試しください。');
    }
  }, [handleNavigateToCreatePost]);

  const handleTakePhoto = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('アクセスが必要です', 'アプリにはカメラへのアクセスが必要です。');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const selectedImages = result.assets.map(asset => asset.uri);
        handleNavigateToCreatePost(selectedImages);
      }
    } catch (error) {
      console.error('写真撮影時のエラー:', error);
      Alert.alert('エラー:', '写真を撮ることができません。もう一度お試しください。');
    }
  }, [handleNavigateToCreatePost]);

  // 🎯 TỐI ƯU RENDER ITEM VỚI useCallback
  const renderPostItem = useCallback(({ item }: { item: typeof mockPosts[0] }) => (
    <SocialPostCard post={item} onLike={handleLike} />
  ), [handleLike]);

  // 🎯 TỐI ƯU KEY EXTRACTOR
  const keyExtractor = useCallback((item: typeof mockPosts[0]) => item.id, []);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary.main]}
          />
        }
        contentContainerStyle={styles.feedContent}
        ListHeaderComponent={
          <CreatePostBox 
            onNavigateToCreatePost={() => handleNavigateToCreatePost()}
            onPickImage={handlePickImage}
            onTakePhoto={handleTakePhoto}
          />
        }
        // 🎯 THÊM CÀI ĐẶT TỐI ƯU PERFORMANCE CHO FLATLIST
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
});

// Display name để dễ debug
CommunityScreen.displayName = 'CommunityScreen';

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  feedContent: {
    padding: 16,
  },
  // Create Post Box Styles
  createPostBox: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  createPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  textInputPlaceholder: {
    color: Colors.text.tertiary,
    fontSize: 16,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
});