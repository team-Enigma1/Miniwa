// app/(tabs)/community/social/notifications/index.tsx
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../../shared/constants/colors';

// Mock data cho thông báo - ĐÃ LOẠI BỎ THÔNG BÁO TIN NHẮN
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    title: '誰かがあなたの投稿に「いいね！」しました',
    message: 'Nguyen Van Bさんが「My Monstera」という投稿に「いいね！」しました',
    userId: 'user2',
    userName: 'Nguyễn Văn B',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    postId: 'post1',
    postImage: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop',
    timestamp: new Date(Date.now() - 300000), // 5 phút trước
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    title: '新しいコメント',
    message: 'Tran Thi Cさんは「なんて美しい木なのでしょう！どうやって手入れしているのですか？」とコメントしました。',
    userId: 'user3',
    userName: 'Trần Thị C',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    postId: 'post1',
    timestamp: new Date(Date.now() - 600000), // 10 phút trước
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    title: '新しいフォロワー',
    message: 'Le Van Dがあなたをフォローし始めました',
    userId: 'user4',
    userName: 'Lê Văn D',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 1800000), // 30 phút trước
    isRead: true,
  },
  {
    id: '5',
    type: 'like',
    title: '誰かがあなたのコメントを「いいね！」しました',
    message: 'Pham Thi E さんが「自宅のきれいな野菜畑」へのコメントを「いいね！」しました',
    userId: 'user5',
    userName: 'Phạm Thị E',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    postId: 'post2',
    timestamp: new Date(Date.now() - 7200000), // 2 giờ trước
    isRead: true,
  },
];

// Component hiển thị từng thông báo
const NotificationItem = React.memo(({ notification, onPress }: { 
  notification: any; 
  onPress: (notification: any) => void;
}) => {
  const router = useRouter();

  const handleItemPress = useCallback(() => {
    onPress(notification);
    
    // Điều hướng dựa trên loại thông báo - ĐÃ LOẠI BỎ PHẦN 'message'
    switch (notification.type) {
      case 'like':
      case 'comment':
        if (notification.postId) {
          router.push(`./community/social/${notification.postId}`);
        }
        break;
      case 'follow':
        router.push(`./community/social/profile/${notification.userId}`);
        break;
      default:
        break;
    }
  }, [notification, onPress, router]);

  const getIconName = (type: string) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble-ellipses';
      case 'follow':
        return 'person-add';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return Colors.error;
      case 'comment':
        return Colors.info;
      case 'follow':
        return Colors.success;
      default:
        return Colors.text.tertiary;
    }
  };

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
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification
      ]}
      onPress={handleItemPress}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(notification.type)}20` }]}>
          <Ionicons 
            name={getIconName(notification.type)} 
            size={20} 
            color={getIconColor(notification.type)} 
          />
        </View>
        
        <Image 
          source={{ uri: notification.userAvatar }} 
          style={styles.userAvatar}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Text style={styles.timestamp}>{formatTime(notification.timestamp)}</Text>
        </View>

        {notification.postImage && (
          <Image 
            source={{ uri: notification.postImage }} 
            style={styles.postImage}
          />
        )}
      </View>

      {!notification.isRead && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );
});

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // Có thể thêm logic refresh thông báo mới ở đây
    }, 1000);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    Alert.alert('成功', 'すべて既読にしました');
  }, [notifications]);

  const handleClearAll = useCallback(() => {
    Alert.alert(
      '削除通知',
      'すべての通知をクリアしてもよろしいですか?',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '削除', 
          style: 'destructive',
          onPress: () => {
            setNotifications([]);
            Alert.alert('成功', 'すべての通知をクリアしました');
          }
        },
      ]
    );
  }, []);

  const handleNotificationPress = useCallback((notification: any) => {
    // Đánh dấu là đã đọc
    if (!notification.isRead) {
      const updatedNotifications = notifications.map(item =>
        item.id === notification.id ? { ...item, isRead: true } : item
      );
      setNotifications(updatedNotifications);
    }
  }, [notifications]);

  const renderNotification = useCallback(({ item }: { item: any }) => (
    <NotificationItem 
      notification={item} 
      onPress={handleNotificationPress}
    />
  ), [handleNotificationPress]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* Header Actions */}
      {notifications.length > 0 && (
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <Ionicons 
              name="checkmark-done" 
              size={20} 
              color={unreadCount === 0 ? Colors.text.tertiary : Colors.primary.main} 
            />
            <Text style={[
              styles.headerButtonText,
              unreadCount === 0 && styles.headerButtonTextDisabled
            ]}>
              既読にする
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={20} color={Colors.error} />
            <Text style={[styles.headerButtonText, { color: Colors.error }]}>
              すべてクリア
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
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
            <Ionicons name="notifications-off-outline" size={64} color={Colors.text.tertiary} />
            <Text style={styles.emptyStateTitle}>Không có thông báo</Text>
            <Text style={styles.emptyStateMessage}>
              誰かがあなたの投稿に反応すると、ここに通知が表示されます。
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
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    backgroundColor: Colors.background.secondary,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  headerButtonTextDisabled: {
    color: Colors.text.tertiary,
  },
  notificationsList: {
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    backgroundColor: Colors.background.primary,
  },
  unreadNotification: {
    backgroundColor: '#f0fdf4', // Màu nền nhạt cho thông báo chưa đọc
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.main,
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