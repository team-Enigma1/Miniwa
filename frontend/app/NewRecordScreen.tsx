import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/NewRecord.styles'; 
import { createPlantRecord } from '@/api/record';
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams } from 'expo-router';

const NewRecordScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { userPlantId } = useLocalSearchParams<{ userPlantId: string }>();

  const handleBack = () => router.back();
  
  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert("タイトルと記録内容を入力してください！");
      return;
    }

    try {
      setLoading(true);

      await createPlantRecord({
        plant_id: Number(userPlantId),
        title,
        content,
        image_url: imageUrl || undefined,
        created_at: date.toISOString(),
      });

      Alert.alert("記録を登録しました！", "", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err) {
      Alert.alert("保存に失敗しました", "もう一度お試しください");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('許可必要です！');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUrl(uri);
    }
  };

  const handleDateConfirm = () => {
    setDate(tempDate);
    setShowDateModal(false);
  };

  const handleDateCancel = () => {
    setTempDate(date);
    setShowDateModal(false);
  };

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>新しい記録</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Date Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>日付</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                setTempDate(date);
                setShowDateModal(true);
              }}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Photo Upload */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>写真</Text>
            <TouchableOpacity
              style={styles.photoUpload}
              onPress={handleAddPhoto}
              activeOpacity={0.7}
            >
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: '100%', height: 180, borderRadius: 12 }}
                />
              ) : (
                <>
                  <View style={styles.photoIconContainer}>
                    <Text style={styles.photoIcon}>📷</Text>
                  </View>
                  <Text style={styles.photoText}>写真を追加</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>コメントのタイトル</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="例：初めての開花！"
              placeholderTextColor="#CCCCCC"
            />
          </View>

          {/* Content Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>コメントの内容</Text>
            <TextInput
              style={styles.textArea}
              value={content}
              onChangeText={setContent}
              placeholder="今日の様子を記録しましょう"
              placeholderTextColor="#CCCCCC"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? "保存中..." : "保存"}
              </Text>
            </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleDateCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>日付を選択</Text>
            </View>

            {/* DatePicker Container with Background */}
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempDate(selectedDate);
                  }
                }}
                maximumDate={new Date()}
                style={styles.dateTimePicker}
                textColor="#000000"
                themeVariant="light"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleDateCancel}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDateConfirm}
              >
                <Text style={styles.confirmButtonText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default NewRecordScreen;
