// app/(tabs)/community/social/[postId].tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../shared/constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data - sau này sẽ thay bằng API
const mockPostDetail = {
  id: '1',
  user: {
    id: 'user1',
    name: 'Hashimoto',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 124,
    following: 56,
  },
  content: 'うちのモンステラが綺麗な新葉を出してきました！🌿 モンステラの世話をした経験のある方はいらっしゃいますか？2ヶ月前に買ったばかりですが、間接光の当たる部屋でとても元気に育っています。',
  images: [
    'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1593483316242-efb546c80c8c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  ],
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  likes: 24,
  comments: 8,
  shares: 3,
  isLiked: false,
  tags: ['monstera', 'chamsoc', 'caycanhphong'],
};

const mockComments = [
  {
    id: 'comment1',
    user: {
      id: 'user2',
      name: 'Rany',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    content: 'なんて美しい植物なのでしょう！どうやって手入れしているのですか？',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 'reply1',
        user: {
          id: 'user1',
          name: 'Hashimoto',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        content: '週に2回水をあげて、月に1回肥料を与えています。',
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        likes: 2,
        isLiked: false,
      }
    ],
  },
  {
    id: 'comment2',
    user: {
      id: 'user3',
      name: 'Gita',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    content: 'モンステラの手入れはとても簡単です。明るい場所に置いておくことを忘れないようにしてください。',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    likes: 3,
    isLiked: true,
    replies: [],
  },
];

// Image Carousel Component
const ImageCarousel = React.memo(({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      {/* Indicators */}
      {images.length > 1 && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
});

// Comment Component
const CommentItem = React.memo(({ 
  comment, 
  onLikeComment,
  onReply 
}: { 
  comment: any;
  onLikeComment: (commentId: string) => void;
  onReply: (commentId: string, userName: string) => void;
}) => {
  return (
    <View style={styles.commentItem}>
      <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentTime}>
            {formatTimeAgo(comment.timestamp)}
          </Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
        
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => onLikeComment(comment.id)}
          >
            <Ionicons 
              name={comment.isLiked ? "heart" : "heart-outline"} 
              size={16} 
              color={comment.isLiked ? Colors.status.error.main : Colors.text.tertiary} 
            />
            <Text style={[
              styles.commentActionText,
              comment.isLiked && styles.commentActionTextActive
            ]}>
              {comment.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => onReply(comment.id, comment.user.name)}
          >
            <Ionicons name="arrow-undo-outline" size={16} color={Colors.text.tertiary} />
            <Text style={styles.commentActionText}>フィードバック</Text>
          </TouchableOpacity>
        </View>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {comment.replies.map((reply: any) => (
              <View key={reply.id} style={styles.replyItem}>
                <Image source={{ uri: reply.user.avatar }} style={styles.replyAvatar} />
                <View style={styles.replyContent}>
                  <View style={styles.replyHeader}>
                    <Text style={styles.replyUserName}>{reply.user.name}</Text>
                    <Text style={styles.replyTime}>
                      {formatTimeAgo(reply.timestamp)}
                    </Text>
                  </View>
                  <Text style={styles.replyText}>{reply.content}</Text>
                  
                  <View style={styles.commentActions}>
                    <TouchableOpacity 
                      style={styles.commentAction}
                      onPress={() => onLikeComment(reply.id)}
                    >
                      <Ionicons 
                        name={reply.isLiked ? "heart" : "heart-outline"} 
                        size={14} 
                        color={reply.isLiked ? Colors.status.error.main : Colors.text.tertiary} 
                      />
                      <Text style={[
                        styles.commentActionText,
                        styles.commentActionTextSmall,
                        reply.isLiked && styles.commentActionTextActive
                      ]}>
                        {reply.likes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
});

// Utility function
const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return '終わったばかり';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 数分前`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 時間前`;
  return `${Math.floor(diffInSeconds / 86400)} 前日`;
};

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [post, setPost] = useState(mockPostDetail);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; userName: string } | null>(null);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const commentInputRef = useRef<TextInput>(null);

  // Handle post like
  const handleLikePost = useCallback(() => {
    setPost(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  }, []);

  // Handle comment like
  const handleLikeComment = useCallback((commentId: string) => {
    setComments(prev => 
      prev.map(comment => {
        // Check main comment
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        
        // Check replies
        const updatedReplies = comment.replies.map((reply: any) => 
          reply.id === commentId 
            ? {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked,
              }
            : reply
        );
        
        return { ...comment, replies: updatedReplies };
      })
    );
  }, []);

  // Handle reply
  const handleReply = useCallback((commentId: string, userName: string) => {
    setReplyingTo({ commentId, userName });
    setNewComment(`@${userName} `);
    // Focus vào input và scroll lên
    setTimeout(() => {
      commentInputRef.current?.focus();
      handleCommentInputFocus();
    }, 100);
  }, []);

  // Handle add comment
  const handleAddComment = useCallback(() => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `comment${Date.now()}`,
      user: {
        id: 'currentUser',
        name: 'Nguyễn Văn Hiện',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments(prev => [newCommentObj, ...prev]);
    setNewComment('');
    setReplyingTo(null);
    
    // Update comment count
    setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
  }, [newComment]);

  // Navigate to user profile
  const navigateToProfile = useCallback((userId: string) => {
    router.push(`./community/social/profile/${userId}`);
  }, [router]);

  // Xử lý khi focus vào input bình luận - ĐÃ GIẢM ĐỘ TRƯỢT
  const handleCommentInputFocus = useCallback(() => {
    setTimeout(() => {
      // Scroll lên một khoảng rất nhỏ, chỉ đủ để thấy ô input
      const scrollPosition = screenHeight * 0.0; // Chỉ 8% màn hình
      scrollViewRef.current?.scrollTo({
        y: scrollPosition,
        animated: true
      });
    }, 300);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header với safe area */}
        <View style={[styles.customHeader, { paddingTop: Math.max(insets.top, 8) }]}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text.inverse} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Bài viết</Text>
          
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Post Content */}
          <View style={styles.postContainer}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <TouchableOpacity 
                style={styles.userAvatarContainer}
                onPress={() => navigateToProfile(post.user.id)}
              >
                <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
              </TouchableOpacity>
              <View style={styles.userDetails}>
                <TouchableOpacity onPress={() => navigateToProfile(post.user.id)}>
                  <Text style={styles.userName}>{post.user.name}</Text>
                </TouchableOpacity>
                <Text style={styles.postTime}>
                  {formatTimeAgo(post.timestamp)}
                </Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Tags */}
            {post.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {post.tags.map(tag => (
                  <TouchableOpacity key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Images */}
            {post.images.length > 0 && (
              <ImageCarousel images={post.images} />
            )}

            {/* Post Stats */}
            <View style={styles.postStats}>
              <Text style={styles.postStatText}>
                {post.likes} lượt thích • {post.comments} bình luận • {post.shares} lượt chia sẻ
              </Text>
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.postAction}
                onPress={handleLikePost}
              >
                <Ionicons 
                  name={post.isLiked ? "heart" : "heart-outline"} 
                  size={24} 
                  color={post.isLiked ? Colors.status.error.main : Colors.text.tertiary} 
                />
                <Text style={[
                  styles.postActionText,
                  post.isLiked && styles.postActionTextActive
                ]}>
                  Thích
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.postAction}
                onPress={() => {
                  commentInputRef.current?.focus();
                  handleCommentInputFocus();
                }}
              >
                <Ionicons name="chatbubble-outline" size={22} color={Colors.text.tertiary} />
                <Text style={styles.postActionText}>コメント</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="arrow-redo-outline" size={22} color={Colors.text.tertiary} />
                <Text style={styles.postActionText}>共有</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Bình luận ({comments.length})
            </Text>

            {/* Comments List */}
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <CommentItem 
                  comment={item}
                  onLikeComment={handleLikeComment}
                  onReply={handleReply}
                />
              )}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.commentSeparator} />}
            />
          </View>
        </ScrollView>

        {/* Comment Input - ĐÃ ĐƯA XUỐNG GẦN TASKBAR HƠN */}
        <View style={styles.commentInputContainer}>
          {replyingTo && (
            <View style={styles.replyingToContainer}>
              <Text style={styles.replyingToText}>
                応答 @{replyingTo.userName}
              </Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Ionicons name="close" size={16} color={Colors.text.tertiary} />
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.inputWrapper}>
            <TextInput
              ref={commentInputRef}
              style={styles.commentInput}
              placeholder="コメントを書く..."
              placeholderTextColor={Colors.text.placeholder}
              value={newComment}
              onChangeText={setNewComment}
              multiline
              onFocus={handleCommentInputFocus}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !newComment.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleAddComment}
              disabled={!newComment.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={newComment.trim() ? Colors.primary.main : Colors.text.disabled} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  // Header với safe area
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
  postContainer: {
    backgroundColor: Colors.background.primary,
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: Colors.background.secondary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatarContainer: {
    marginRight: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  postTime: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: Colors.primary.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: Colors.primary.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  carouselContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  carouselImage: {
    width: screenWidth - 32,
    height: 300,
    borderRadius: 12,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: Colors.background.primary,
  },
  postStats: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginBottom: 12,
  },
  postStatText: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  postActionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.tertiary,
    fontWeight: '500',
  },
  postActionTextActive: {
    color: Colors.status.error.main,
  },
  commentsSection: {
    backgroundColor: Colors.background.primary,
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: 12,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUserName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
    marginRight: 8,
  },
  commentTime: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  commentActionTextSmall: {
    fontSize: 12,
  },
  commentActionTextActive: {
    color: Colors.status.error.main,
  },
  repliesContainer: {
    marginTop: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: Colors.border.light,
  },
  replyItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  replyUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginRight: 8,
  },
  replyTime: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  replyText: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.text.primary,
  },
  commentInputContainer: {
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    padding: 10,
    paddingBottom: 10,
  },
  replyingToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.secondary,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  replyingToText: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text.primary,
    backgroundColor: Colors.background.input,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginBottom: 1,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});