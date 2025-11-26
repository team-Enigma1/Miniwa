import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


const NewRecordScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleBack = () => router.back();
  const handleSave = () => {
    console.log('Save record:', { date, title, content });
    router.back();
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

            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                onChange={(e, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                }}
                style={styles.dateTimePicker}
                maximumDate={new Date()}
              />
            ) : (
              <View style={{ zIndex: 10 }}>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowPicker(true)}
                >
                  <Text>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>

                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                    style={styles.dateTimePicker}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            )}
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingBottom: 20, paddingHorizontal: 20 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 32, color: '#1A1A1A', fontWeight: '300' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  headerSpacer: { width: 40 },

  // Input Group
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: '#999999', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  textArea: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 120,
  },

  // Date Picker
  dateInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  dateTimePicker: { width: '100%' },

  // Save Button
  saveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});

export default NewRecordScreen;
