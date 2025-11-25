// app/(tabs)/community/social/chat/[chatUserId].tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../../shared/constants/colors';

// Mock data cho tin nhắn
const mockMessages = [
  {
    id: '1',
    text: 'こんにちは！モンステラ、綺麗ですね！',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text',
  },
  {
    id: '2',
    text: 'ありがとうございます！まだ3ヶ月しかお世話になってないんです😊',
    senderId: 'currentUser',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text',
  },
  // ... thêm mock messages khác
];

// Mock user data
const mockUser = {
  id: 'user1',
  name: 'Nguyễn Văn A',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  isOnline: true,
};

const MessageBubble = React.memo(({ message, isCurrentUser, userAvatar }: { 
  message: any; 
  isCurrentUser: boolean;
  userAvatar: string;
}) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={[
      styles.messageContainer,
      isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
    ]}>
      {!isCurrentUser && (
        <Image 
          source={{ uri: userAvatar }} 
          style={styles.messageAvatar}
        />
      )}
      <View style={[
        styles.messageBubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.messageTime,
          isCurrentUser ? styles.currentUserTime : styles.otherUserTime
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
});

export default function ChatScreen() {
  const { chatUserId } = useLocalSearchParams(); // ĐỔI TÊN PARAM Ở ĐÂY
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(mockUser);
  const flatListRef = useRef<FlatList>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      senderId: 'currentUser',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate reply
    setTimeout(() => {
      const replies = [
        "共有していただきありがとうございます！",
        "分かりました。応募してみます。",
        "肥料についてさらにアドバイスをいただけますか?",
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        senderId: chatUserId as string,
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 2000);
  }, [newMessage, chatUserId]); // SỬ DỤNG chatUserId Ở ĐÂY

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleUserProfile = useCallback(() => {
    // Có thể điều hướng đến profile của user này
    router.push(`./community/social/profile/${chatUserId}`);
  }, [chatUserId, router]);

  const handleMoreOptions = useCallback(() => {
    Alert.alert('オプション', 'チャットのその他のオプション');
  }, []);

  const renderMessage = useCallback(({ item }: { item: any }) => {
    const isCurrentUser = item.senderId === 'currentUser';
    return (
      <MessageBubble 
        message={item} 
        isCurrentUser={isCurrentUser}
        userAvatar={user.avatar}
      />
    );
  }, [user.avatar]);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 8) }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleBack}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text.inverse} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.userInfo}
            onPress={handleUserProfile}
          >
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.userAvatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, user.isOnline && styles.onlineDot]} />
                <Text style={styles.statusText}>
                  {user.isOnline ? '稼働中' : 'ただアクティブ'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleMoreOptions}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="メッセージを入力してください..."
              placeholderTextColor={Colors.text.tertiary}
              multiline
              maxLength={500}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.attachmentButton}>
                <Ionicons name="image-outline" size={22} color={Colors.primary.main} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <Ionicons name="camera-outline" size={22} color={Colors.primary.main} />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? Colors.text.inverse : Colors.text.tertiary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles giữ nguyên như trước
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 2,
    backgroundColor: Colors.primary.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.dark,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.inverse,
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.tertiary,
    marginRight: 6,
  },
  onlineDot: {
    backgroundColor: Colors.primary.main,
  },
  statusText: {
    fontSize: 12,
    color: Colors.text.inverse,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: '100%',
  },
  currentUserBubble: {
    backgroundColor: Colors.primary.main,
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: Colors.background.secondary,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: Colors.text.inverse,
  },
  otherUserText: {
    color: Colors.text.primary,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  currentUserTime: {
    color: Colors.text.inverse,
    textAlign: 'right',
  },
  otherUserTime: {
    color: Colors.text.tertiary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    backgroundColor: Colors.background.primary,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.background.secondary,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    maxHeight: 84,
    padding: 5,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  attachmentButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.background.secondary,
  },
});