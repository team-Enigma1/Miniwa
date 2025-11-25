// app/(tabs)/community/social/create-post.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../shared/constants/colors';

// Mock tags data - ĐẶT NGOÀI COMPONENT ĐỂ TRÁNH RE-RENDER
const SUGGESTED_TAGS = [
  'caycanh', 'chamsoc', 'vuonnha', 'rausach', 'huongdan',
  'monstera', 'senđa', 'xươngrồng', 'cayphongthuy', 'thuocnam',
  'benhcay', 'tuoiNuoc', 'bonsai', 'caynoithat', 'thucvat'
];

// Tách component ImageGrid để tối ưu re-render
const ImageGrid = React.memo(({ 
  selectedImages, 
  onRemoveImage, 
  onAddImage 
}: { 
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
  onAddImage: () => void;
}) => (
  <View style={styles.imagesContainer}>
    {selectedImages.map((uri, index) => (
      <View key={`image-${index}`} style={styles.imageWrapper}>
        <Image source={{ uri }} style={styles.image} />
        <TouchableOpacity 
          style={styles.removeImageButton}
          onPress={() => onRemoveImage(index)}
        >
          <Ionicons name="close-circle" size={24} color={Colors.status.error.main} />
        </TouchableOpacity>
      </View>
    ))}
    
    {selectedImages.length < 4 && (
      <TouchableOpacity 
        style={styles.addImageButton} 
        onPress={onAddImage}
      >
        <Ionicons name="add" size={32} color={Colors.text.tertiary} />
        <Text style={styles.addImageText}>写真を追加</Text>
      </TouchableOpacity>
    )}
  </View>
));

// Tách component TagsSection để tối ưu re-render
const TagsSection = React.memo(({ 
  selectedTags, 
  customTag,
  onToggleTag,
  onRemoveTag,
  onAddCustomTag,
  onCustomTagChange
}: { 
  selectedTags: string[];
  customTag: string;
  onToggleTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddCustomTag: () => void;
  onCustomTagChange: (text: string) => void;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Tags ({selectedTags.length}/5)</Text>
    
    {/* Selected Tags */}
    {selectedTags.length > 0 && (
      <View style={styles.selectedTags}>
        {selectedTags.map(tag => (
          <TouchableOpacity 
            key={`selected-${tag}`} 
            style={styles.selectedTag}
            onPress={() => onRemoveTag(tag)}
          >
            <Text style={styles.selectedTagText}>#{tag}</Text>
            <Ionicons name="close" size={16} color={Colors.text.inverse} />
          </TouchableOpacity>
        ))}
      </View>
    )}

    {/* Custom Tag Input */}
    <View style={styles.customTagContainer}>
      <TextInput
        style={styles.customTagInput}
        placeholder="カスタムタグを追加..."
        placeholderTextColor={Colors.text.placeholder}
        value={customTag}
        onChangeText={onCustomTagChange}
        onSubmitEditing={onAddCustomTag}
        maxLength={20}
      />
      <TouchableOpacity 
        style={[
          styles.addTagButton,
          !customTag.trim() && styles.addTagButtonDisabled
        ]}
        onPress={onAddCustomTag}
        disabled={!customTag.trim()}
      >
        <Text style={styles.addTagButtonText}>もっと</Text>
      </TouchableOpacity>
    </View>

    {/* Suggested Tags */}
    <Text style={styles.suggestedTagsTitle}>推奨タグ:</Text>
    <View style={styles.suggestedTags}>
      {SUGGESTED_TAGS.map(tag => (
        <TouchableOpacity
          key={`suggested-${tag}`}
          style={[
            styles.suggestedTag,
            selectedTags.includes(tag) && styles.suggestedTagSelected
          ]}
          onPress={() => onToggleTag(tag)}
        >
          <Text style={[
            styles.suggestedTagText,
            selectedTags.includes(tag) && styles.suggestedTagTextSelected
          ]}>
            #{tag}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

const CreatePostScreen = () => {
  const router = useRouter();
  const { preSelectedImages } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

  // Xử lý pre-selected images từ màn hình community
  useEffect(() => {
    if (preSelectedImages) {
      try {
        const images = JSON.parse(preSelectedImages as string);
        if (Array.isArray(images) && images.length > 0) {
          setSelectedImages(images.slice(0, 4));
        }
      } catch (error) {
        console.error('Error parsing pre-selected images:', error);
      }
    }
  }, [preSelectedImages]);

  // Sử dụng useCallback để tránh re-create function không cần thiết
  const pickImageFromLibrary = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Cần quyền truy cập', 'Ứng dụng cần quyền truy cập thư viện ảnh.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 4 - selectedImages.length,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages(prev => [...prev, ...newImages].slice(0, 4));
      }
      setImagePickerModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi chọn ảnh:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
      setImagePickerModalVisible(false);
    }
  }, [selectedImages.length]);

  const takePhoto = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Cần quyền truy cập', 'Ứng dụng cần quyền truy cập camera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages(prev => [...prev, ...newImages].slice(0, 4));
      }
      setImagePickerModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi chụp ảnh:', error);
      Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.');
      setImagePickerModalVisible(false);
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag].slice(0, 5)
    );
  }, []);

  const addCustomTag = useCallback(() => {
    const tag = customTag.trim().toLowerCase().replace(/\s+/g, '');
    if (tag && tag.length > 1 && !selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag].slice(0, 5));
      setCustomTag('');
    }
  }, [customTag, selectedTags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handlePost = useCallback(async () => {
    if (!content.trim()) {
      Alert.alert('Thiếu nội dung', 'Vui lòng nhập nội dung bài viết.');
      return;
    }

    if (content.trim().length < 10) {
      Alert.alert('Nội dung quá ngắn', 'Nội dung bài viết cần ít nhất 10 ký tự.');
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPost = {
        id: Date.now().toString(),
        content: content.trim(),
        images: selectedImages,
        tags: selectedTags,
        timestamp: new Date(),
      };

      console.log('Đăng bài thành công:', newPost);
      
      Alert.alert(
        'Thành công',
        'Bài viết đã được đăng thành công!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Lỗi khi đăng bài:', error);
      Alert.alert('Lỗi', 'Không thể đăng bài. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [content, selectedImages, selectedTags, router]);

  const handleCancel = useCallback(() => {
    if (content.trim() || selectedImages.length > 0 || selectedTags.length > 0) {
      Alert.alert(
        'Hủy bài viết',
        'Bài viết của bạn chưa được lưu. Bạn có chắc chắn muốn hủy?',
        [
          { text: 'Ở lại', style: 'cancel' },
          { 
            text: 'Hủy', 
            style: 'destructive',
            onPress: () => router.back()
          },
        ]
      );
    } else {
      router.back();
    }
  }, [content, selectedImages.length, selectedTags.length, router]);

  const openImagePicker = useCallback(() => {
    setImagePickerModalVisible(true);
  }, []);

  const closeImagePicker = useCallback(() => {
    setImagePickerModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* ✅ HEADER CUSTOM TỐI ƯU */}
        <View style={[
          styles.customHeader,
          { paddingTop: Math.max(insets.top, 8) }
        ]}>
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.text.inverse} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>投稿を作成する</Text>
          
          <TouchableOpacity 
            onPress={handlePost} 
            style={[
              styles.postButton,
              (!content.trim() || isLoading) && styles.postButtonDisabled
            ]}
            disabled={!content.trim() || isLoading}
          >
            <Text style={styles.postButtonText}>
              {isLoading ? '投稿中...' : '役職'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Picker Modal */}
        <Modal
          visible={imagePickerModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeImagePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>写真を選択</Text>
                <TouchableOpacity onPress={closeImagePicker} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.optionButton} onPress={pickImageFromLibrary}>
                  <View style={[styles.optionIcon, { backgroundColor: Colors.status.success.light }]}>
                    <Ionicons name="images-outline" size={32} color={Colors.status.success.main} />
                  </View>
                  <Text style={styles.optionText}>フォトギャラリー</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                  <View style={[styles.optionIcon, { backgroundColor: Colors.status.info.light }]}>
                    <Ionicons name="camera" size={32} color={Colors.status.info.main} />
                  </View>
                  <Text style={styles.optionText}>新しい写真を撮る</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nội dung bài viết */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>コンテンツ</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="あなたの経験、質問、成果をコミュニティと共有してください..."
              placeholderTextColor={Colors.text.placeholder}
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
              maxLength={2000}
              autoFocus={!preSelectedImages}
            />
            <Text style={styles.charCount}>
              {content.length}/2000文字
            </Text>
          </View>

          {/* Hình ảnh */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>画像({selectedImages.length}/4)</Text>
            <ImageGrid 
              selectedImages={selectedImages}
              onRemoveImage={removeImage}
              onAddImage={openImagePicker}
            />
          </View>

          {/* Tags */}
          <TagsSection 
            selectedTags={selectedTags}
            customTag={customTag}
            onToggleTag={toggleTag}
            onRemoveTag={removeTag}
            onAddCustomTag={addCustomTag}
            onCustomTagChange={setCustomTag}
          />

          {/* Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 良い投稿のヒント:</Text>
            <Text style={styles.tip}>• 植物の世話に関する実践的な経験を共有する</Text>
            <Text style={styles.tip}>• 問題について明確な質問をする</Text>
            <Text style={styles.tip}>• より良いサポートを得るためにイラストを追加してください</Text>
            <Text style={styles.tip}>• 適切なタグを使用して、より多くの人にあなたの投稿を見てもらう</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  
  // ✅ HEADER CUSTOM STYLES - TỐI ƯU
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 2,
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
  postButton: {
    backgroundColor: Colors.primary.dark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: Colors.text.disabled,
  },
  postButtonText: {
    color: Colors.text.inverse,
    fontWeight: '600',
    fontSize: 16,
  },
  
  // CÁC STYLES CŨ GIỮ NGUYÊN
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    lineHeight: 20,
    minHeight: 120,
    color: Colors.text.primary,
    backgroundColor: Colors.background.input,
  },
  charCount: {
    fontSize: 12,
    color: Colors.text.tertiary,
    textAlign: 'right',
    marginTop: 8,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
  },
  addImageText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  selectedTagText: {
    color: Colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  customTagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  customTagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: Colors.text.primary,
    backgroundColor: Colors.background.input,
  },
  addTagButton: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addTagButtonDisabled: {
    backgroundColor: Colors.text.disabled,
  },
  addTagButtonText: {
    color: Colors.text.inverse,
    fontWeight: '500',
    fontSize: 14,
  },
  suggestedTagsTitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestedTag: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  suggestedTagSelected: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.main,
  },
  suggestedTagText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  suggestedTagTextSelected: {
    color: Colors.primary.dark,
    fontWeight: '500',
  },
  tipsSection: {
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  tip: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    padding: 16,
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500',
  },
});

export default React.memo(CreatePostScreen);
