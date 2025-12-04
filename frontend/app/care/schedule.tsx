// app/care/schedule.tsx
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Keyboard,
    KeyboardEvent,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  PrimaryButton  from '../shared/components/buttons/PrimaryButton';
import { Colors, Spacing } from '../shared/constants/app';
import { usePlants } from '../shared/contexts/PlantsContext';
import type { CareTask } from '../shared/types/plant';

type ScheduleFormData = {
  plantId: string;
  taskType: CareTask['type'];
  date: Date;
  time: Date;
  notes: string;
  priority: CareTask['priority'];
  recurrence: CareTask['recurrence'];
};

const { height: screenHeight } = Dimensions.get('window');

export default function ScheduleScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams();
  const { addTask, updateTask, getTaskById, state } = usePlants();
  
  const scrollViewRef = useRef<ScrollView>(null);
  const notesInputRef = useRef<TextInput>(null);
  
  // State cho form
  const [formData, setFormData] = useState<ScheduleFormData>({
    plantId: '',
    taskType: 'watering',
    date: new Date(),
    time: new Date(),
    notes: '',
    priority: 'medium',
    recurrence: 'none'
  });

  // State cho datetime picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingTask, setExistingTask] = useState<CareTask | null>(null);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Xác định mode (create/edit) và load data nếu là edit mode
  useEffect(() => {
    if (taskId) {
      const taskIdStr = Array.isArray(taskId) ? taskId[0] : taskId;
      const task = getTaskById(taskIdStr);
      
      if (task) {
        setIsEditMode(true);
        setExistingTask(task);
        
        // Parse date từ string (YYYY-MM-DD) thành Date object
        const [year, month, day] = task.date.split('-').map(Number);
        const taskDate = new Date(year, month - 1, day);
        
        // Parse time từ string (HH:mm) thành Date object
        const [hours, minutes] = task.time.split(':').map(Number);
        const taskTime = new Date();
        taskTime.setHours(hours, minutes, 0, 0);
        
        setFormData({
          plantId: task.plantId,
          taskType: task.type,
          date: taskDate,
          time: taskTime,
          notes: task.notes || '',
          priority: task.priority,
          recurrence: task.recurrence,
        });
      } else {
        Alert.alert('エラー', 'タスクが見つかりませんでした');
        router.back();
      }
    }
  }, [taskId, getTaskById]);

  // Sử dụng plants thực tế từ PlantsContext
  const plants = state.plants;

  const taskTypes = [
    { value: 'watering', label: '水やり', icon: 'water-outline', color: Colors.primary },
    { value: 'fertilizing', label: '施肥', icon: 'nutrition-outline', color: Colors.secondary },
    { value: 'pruning', label: '剪定', icon: 'cut-outline', color: Colors.accent },
    { value: 'checkup', label: '点検', icon: 'medkit-outline', color: Colors.info },
    { value: 'repotting', label: '植え替え', icon: 'leaf-outline', color: Colors.info },
  ];

  const priorityOptions = [
    { value: 'low', label: '低', color: Colors.success },
    { value: 'medium', label: '中', color: Colors.warning },
    { value: 'high', label: '高', color: Colors.error },
  ];

  const recurrenceOptions = [
    { value: 'none', label: '繰り返さない' },
    { value: 'daily', label: '毎日' },
    { value: 'weekly', label: '毎週' },
    { value: 'monthly', label: '毎月' },
  ];

  const handleSave = async () => {
    // Validate form
    if (!formData.plantId) {
      Alert.alert('エラー', '植物を選択してください');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Chuẩn bị dữ liệu task
      const taskData: Omit<CareTask, 'id'> = {
        plantId: formData.plantId,
        type: formData.taskType,
        date: formData.date.toISOString().split('T')[0], // Chuyển date thành string YYYY-MM-DD
        time: formData.time.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completed: existingTask?.completed || false, // Giữ nguyên trạng thái completed khi edit
        priority: formData.priority,
        recurrence: formData.recurrence,
        notes: formData.notes,
      };

      if (isEditMode && existingTask) {
        // Edit mode: update task
        await updateTask(existingTask.id, taskData);
        
        // Hiển thị thông báo thành công
        Alert.alert(
          '成功',
          'タスクを更新しました',
          [
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      } else {
        // Create mode: add new task
        await addTask(taskData);
        
        // Hiển thị thông báo thành công
        Alert.alert(
          '成功',
          'スケジュールを追加しました',
          [
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error saving task:', error);
      const errorMessage = isEditMode ? 'タスクの更新に失敗しました' : 'スケジュールの追加に失敗しました';
      Alert.alert('エラー', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData(prev => ({ ...prev, time: selectedTime }));
    }
  };

  const handleNotesFocus = () => {
    const scrollPosition = 900;
    
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollPosition,
        animated: true
      });
    }, 100);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScreenTitle = () => {
    return isEditMode ? 'タスクを編集' : 'スケジュール追加';
  };

  const getButtonTitle = () => {
    if (isSubmitting) {
      return isEditMode ? "更新中..." : "保存中...";
    }
    return isEditMode ? "タスクを更新" : "スケジュールを保存";
  };

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{getScreenTitle()}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          contentInset={{ bottom: keyboardHeight }}
        >
          {/* Plant Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>植物を選択</Text>
            {plants.length === 0 ? (
              <View style={styles.emptyPlants}>
                <Ionicons name="leaf-outline" size={48} color={Colors.gray} />
                <Text style={styles.emptyPlantsText}>植物がありません</Text>
                <Text style={styles.emptyPlantsSubtext}>
                  まずは植物を追加してください
                </Text>
              </View>
            ) : (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.plantsScroll}
              >
                {plants.map((plant) => (
                  <TouchableOpacity
                    key={plant.id}
                    style={[
                      styles.plantButton,
                      formData.plantId === plant.id && styles.plantButtonSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, plantId: plant.id }))}
                  >
                    <Text style={[
                      styles.plantButtonText,
                      formData.plantId === plant.id && styles.plantButtonTextSelected
                    ]}>
                      {plant.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Task Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>お世話の種類</Text>
            <View style={styles.taskTypeGrid}>
              {taskTypes.map((task) => (
                <TouchableOpacity
                  key={task.value}
                  style={[
                    styles.taskTypeButton,
                    formData.taskType === task.value && styles.taskTypeButtonSelected
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, taskType: task.value as CareTask['type'] }))}
                >
                  <View 
                    style={[
                      styles.taskTypeIcon,
                      { backgroundColor: task.color }
                    ]}
                  >
                    <Ionicons name={task.icon as any} size={20} color="white" />
                  </View>
                  <Text style={styles.taskTypeText}>{task.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date & Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>日時</Text>
            
            {/* Date Picker */}
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
              <Text style={styles.dateTimeText}>{formatDate(formData.date)}</Text>
            </TouchableOpacity>

            {/* Time Picker */}
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.dateTimeText}>{formatTime(formData.time)}</Text>
            </TouchableOpacity>

            {/* DateTime Pickers */}
            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={formData.time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          {/* Priority */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>優先度</Text>
            <View style={styles.priorityContainer}>
              {priorityOptions.map((priority) => (
                <TouchableOpacity
                  key={priority.value}
                  style={[
                    styles.priorityButton,
                    formData.priority === priority.value && styles.priorityButtonSelected
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, priority: priority.value as CareTask['priority'] }))}
                >
                  <View 
                    style={[
                      styles.priorityIndicator,
                      { backgroundColor: priority.color }
                    ]} 
                  />
                  <Text style={styles.priorityText}>{priority.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recurrence */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>繰り返し</Text>
            <View style={styles.recurrenceContainer}>
              {recurrenceOptions.map((recurrence) => (
                <TouchableOpacity
                  key={recurrence.value}
                  style={[
                    styles.recurrenceButton,
                    formData.recurrence === recurrence.value && styles.recurrenceButtonSelected
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, recurrence: recurrence.value as CareTask['recurrence'] }))}
                >
                  <Text style={[
                    styles.recurrenceText,
                    formData.recurrence === recurrence.value && styles.recurrenceTextSelected
                  ]}>
                    {recurrence.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>メモ</Text>
            <TextInput
              ref={notesInputRef}
              style={styles.notesInput}
              placeholder="メモを入力（任意）"
              value={formData.notes}
              onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
              onFocus={handleNotesFocus}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <PrimaryButton 
              title={getButtonTitle()}
              onPress={handleSave}
              disabled={isSubmitting || plants.length === 0}
            />
          </View>

          {/* Giảm khoảng trống xuống mức bình thường */}
          {/* <View style={styles.bottomSpacer} /> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: Spacing.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  plantsScroll: {
    flexDirection: 'row',
  },
  plantButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.lightGray,
    borderRadius: 25,
    marginRight: Spacing.sm,
  },
  plantButtonSelected: {
    backgroundColor: Colors.primary,
  },
  plantButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  plantButtonTextSelected: {
    color: Colors.white,
  },
  emptyPlants: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
  },
  emptyPlantsText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyPlantsSubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  taskTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  taskTypeButton: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  taskTypeButtonSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  taskTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  taskTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dateTimeText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  priorityButtonSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  recurrenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recurrenceButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  recurrenceButtonSelected: {
    backgroundColor: Colors.primary,
  },
  recurrenceText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  recurrenceTextSelected: {
    color: Colors.white,
  },
  notesInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    padding: Spacing.md,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    marginBottom: Spacing.xl,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
