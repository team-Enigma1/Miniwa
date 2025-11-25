// app/(tabs)/community/social/profile/[userId].tsx
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../../shared/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - sau này sẽ thay bằng API
const mockUserProfile = {
  id: 'user1',
  name: 'Nguyễn Văn A',
  username: '@nguyenvana',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  coverPhoto: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
  bio: 'Yêu thích trồng cây cảnh, đặc biệt là Monstera và Sen Đá. Chia sẻ kinh nghiệm chăm sóc cây 🌿',
  location: 'Hà Nội, Việt Nam',
  joinDate: 'Tham gia từ tháng 1, 2024',
  stats: {
    posts: 24,
    followers: 128,
    following: 56,
  },
  isFollowing: false,
  isCurrentUser: false,
};

const mockUserPosts = [
  {
    id: '1',
    images: [
      'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop',
    ],
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    images: [
      'https://images.unsplash.com/photo-1593483316242-efb546c80c8c?w=400&h=300&fit=crop',
    ],
    likes: 15,
    comments: 5,
  },
  {
    id: '3',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    ],
    likes: 32,
    comments: 12,
  },
  {
    id: '4',
    images: [
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
    ],
    likes: 18,
    comments: 3,
  },
  {
    id: '5',
    images: [
      'https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400&h=300&fit=crop',
    ],
    likes: 27,
    comments: 7,
  },
  {
    id: '6',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    ],
    likes: 21,
    comments: 4,
  },
];

// Post Grid Item Component
const PostGridItem = React.memo(({ 
  post, 
  onPress 
}: { 
  post: any;
  onPress: (postId: string) => void;
}) => {
  return (
    <TouchableOpacity 
      style={styles.postGridItem}
      onPress={() => onPress(post.id)}
    >
      <Image 
        source={{ uri: post.images[0] }} 
        style={styles.postGridImage}
        resizeMode="cover"
      />
      <View style={styles.postOverlay}>
        <View style={styles.postStats}>
          <Ionicons name="heart" size={16} color={Colors.text.inverse} />
          <Text style={styles.postStatText}>{post.likes}</Text>
          <Ionicons name="chatbubble" size={14} color={Colors.text.inverse} style={styles.statIcon} />
          <Text style={styles.postStatText}>{post.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(mockUserProfile);
  const [posts, setPosts] = useState(mockUserPosts);
  const [activeTab, setActiveTab] = useState('posts');

  // Handle follow/unfollow
  const handleFollow = useCallback(() => {
    setUser(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1,
      },
    }));
    
    if (!user.isFollowing) {
      Alert.alert('フォロー', `フォローしています ${user.name}`);
    }
  }, [user.isFollowing, user.name]);

  // Handle message
  const handleMessage = useCallback(() => {
  router.push(`./community/social/chat/${user.id}`);
}, [router, user.id]);

  // Handle post press
  const handlePostPress = useCallback((postId: string) => {
    router.push(`./community/social/${postId}`);
  }, [router]);

  // Handle edit profile (if current user)
  const handleEditProfile = useCallback(() => {
    Alert.alert('プロフィールを編集', 'プロフィール編集画面を開く');
  }, []);

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostGridItem
                post={item}
                onPress={handlePostPress}
              />
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.postsGrid}
          />
        );
      case 'photos':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>開発中の機能</Text>
          </View>
        );
      case 'likes':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>開発中の機能</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* Header với safe area - ĐÃ CẬP NHẬT */}
      <View style={[styles.customHeader, { paddingTop: Math.max(insets.top, 8) }]}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.text.inverse} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>ファイル</Text>
        
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Photo and Avatar */}
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: user.coverPhoto }} 
            style={styles.coverPhoto}
            resizeMode="cover"
          />
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar}
            />
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          
          <Text style={styles.bio}>{user.bio}</Text>
          
          <View style={styles.details}>
            <Ionicons name="location-outline" size={16} color={Colors.text.tertiary} />
            <Text style={styles.detailText}>{user.location}</Text>
            <Ionicons name="calendar-outline" size={16} color={Colors.text.tertiary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{user.joinDate}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.stats.posts}</Text>
              <Text style={styles.statLabel}>記事</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.stats.followers}</Text>
              <Text style={styles.statLabel}>フォロワー</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.stats.following}</Text>
              <Text style={styles.statLabel}>続く</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {user.isCurrentUser ? (
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={handleEditProfile}
              >
                <Ionicons name="create-outline" size={18} color={Colors.primary.main} />
                <Text style={[styles.actionButtonText, styles.editButtonText]}>編集</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity 
                  style={[styles.actionButton, user.isFollowing ? styles.followingButton : styles.followButton]}
                  onPress={handleFollow}
                >
                  <Ionicons 
                    name={user.isFollowing ? "checkmark" : "add"} 
                    size={18} 
                    color={user.isFollowing ? Colors.text.primary : Colors.text.inverse} 
                  />
                  <Text style={[
                    styles.actionButtonText,
                    user.isFollowing ? styles.followingButtonText : styles.followButtonText
                  ]}>
                    {user.isFollowing ? '続く' : 'モニター'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.messageButton]}
                  onPress={handleMessage}
                >
                  <Ionicons name="chatbubble-outline" size={18} color={Colors.primary.main} />
                  <Text style={[styles.actionButtonText, styles.messageButtonText]}>テキストメッセージ</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Ionicons 
              name="grid" 
              size={20} 
              color={activeTab === 'posts' ? Colors.primary.main : Colors.text.tertiary} 
            />
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Bài viết
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
            onPress={() => setActiveTab('photos')}
          >
            <Ionicons 
              name="images" 
              size={20} 
              color={activeTab === 'photos' ? Colors.primary.main : Colors.text.tertiary} 
            />
            <Text style={[styles.tabText, activeTab === 'photos' && styles.activeTabText]}>
              Ảnh
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
            onPress={() => setActiveTab('likes')}
          >
            <Ionicons 
              name="heart" 
              size={20} 
              color={activeTab === 'likes' ? Colors.primary.main : Colors.text.tertiary} 
            />
            <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>
              お気に入り
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  // Header với safe area - ĐÃ CẬP NHẬT
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 2,
    backgroundColor: Colors.primary.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.dark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.inverse,
  },
  headerButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    height: 200,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 16,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.background.primary,
    backgroundColor: Colors.background.primary,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  userInfo: {
    padding: 16,
    paddingTop: 50,
  },
  nameContainer: {
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginRight: 16,
    marginLeft: 4,
  },
  detailIcon: {
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border.light,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  followButton: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  followButtonText: {
    color: Colors.text.inverse,
  },
  followingButton: {
    backgroundColor: Colors.background.primary,
    borderColor: Colors.border.light,
  },
  followingButtonText: {
    color: Colors.text.primary,
  },
  messageButton: {
    backgroundColor: Colors.background.primary,
    borderColor: Colors.border.light,
  },
  messageButtonText: {
    color: Colors.primary.main,
  },
  editButton: {
    backgroundColor: Colors.background.primary,
    borderColor: Colors.border.light,
  },
  editButtonText: {
    color: Colors.primary.main,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.main,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.tertiary,
  },
  activeTabText: {
    color: Colors.primary.main,
  },
  postsGrid: {
    padding: 1,
  },
  postGridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    position: 'relative',
  },
  postGridImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 4,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    fontSize: 12,
    color: Colors.text.inverse,
    marginRight: 8,
  },
  statIcon: {
    marginLeft: 8,
  },
  tabContent: {
    padding: 40,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});