// app/(tabs)/community/social/chat/index.tsx
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../../shared/constants/colors';

// Mock data cho danh sách chat
const mockChats = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Ito',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'こんにちは！モンステラ、綺麗ですね！',
    timestamp: new Date(Date.now() - 300000), // 5 phút trước
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Gita',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'アドバイスありがとうございます！',
    timestamp: new Date(Date.now() - 3600000), // 1 giờ trước
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Canh',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: '言われた通りに試してみたらうまくいきました！',
    timestamp: new Date(Date.now() - 86400000), // 1 ngày trước
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'taro',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: '盆栽を育てた経験について教えていただけますか？',
    timestamp: new Date(Date.now() - 172800000), // 2 ngày trước
    unreadCount: 0,
    isOnline: false,
  },
];

const ChatListItem = React.memo(({ chat, onPress }: { 
  chat: any; 
  onPress: (chat: any) => void;
}) => {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '終わったばかり';
    if (minutes < 60) return `${minutes} 数分前`;
    if (hours < 24) return `${hours} 時間前`;
    if (days < 7) return `${days} 前日`;
    
    return timestamp.toLocaleDateString('vi-VN');
  };

  return (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => onPress(chat)}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: chat.userAvatar }} 
          style={styles.userAvatar}
        />
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{chat.userName}</Text>
          <Text style={styles.timestamp}>{formatTime(chat.timestamp)}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text 
            style={[
              styles.lastMessage,
              chat.unreadCount > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function ChatListScreen() {
  const [chats, setChats] = useState(mockChats);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // Có thể thêm logic refresh danh sách chat ở đây
    }, 1000);
  }, []);

  const handleChatPress = useCallback((chat: any) => {
    // Điều hướng đến màn hình chat chi tiết với userId
    // router.push(`./community/social/chat/${chat.userId}`);
    router.push(`/community/social/chat/${chat.userId}`);

  }, [router]);

  const renderChatItem = useCallback(({ item }: { item: any }) => (
    <ChatListItem 
      chat={item} 
      onPress={handleChatPress}
    />
  ), [handleChatPress]);

  // Lọc danh sách chat dựa trên search query
  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.text.tertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="メッセージを検索..."
          placeholderTextColor={Colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={Colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Chats List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary.main]}
            tintColor={Colors.primary.main}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={64} color={Colors.text.tertiary} />
            <Text style={styles.emptyStateTitle}>
              {searchQuery ? '結果が見つかりませんでした' : 'メッセージはありません'}
            </Text>
            <Text style={styles.emptyStateMessage}>
              {searchQuery 
                ? '別のキーワードで検索してみてください'
                : '新しいメッセージが届くと、ここに表示されます。'
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  chatsList: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background.primary,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  unreadMessage: {
    color: Colors.text.primary,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: Colors.text.inverse,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});