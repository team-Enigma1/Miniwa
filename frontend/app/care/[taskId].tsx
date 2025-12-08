// app/(tabs)/care/[taskId].tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../shared/components/buttons/PrimaryButton';
import { Colors, Spacing } from '../shared/constants/app';
import { usePlants } from '../shared/contexts/PlantsContext';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams();
  const { 
    getTaskById, 
    toggleTaskCompletion, 
    deleteTask,
    getPlantById 
  } = usePlants();
  
  const [task, setTask] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [plantName, setPlantName] = useState('');

  // Load task data from PlantsContext
  useEffect(() => {
    if (taskId) {
      const taskIdStr = Array.isArray(taskId) ? taskId[0] : taskId;
      const foundTask = getTaskById(taskIdStr);
      
      if (foundTask) {
        setTask(foundTask);
        setIsCompleted(foundTask.completed);
        
        // Get plant name
        const plant = getPlantById(foundTask.plantId);
        setPlantName(plant?.name || '不明な植物');
      } else {
        console.log('Task not found:', taskIdStr);
        Alert.alert('エラー', 'タスクが見つかりませんでした');
        router.back();
      }
    }
  }, [taskId, getTaskById, getPlantById]);

  const handleToggleComplete = () => {
    if (task) {
      toggleTaskCompletion(task.id);
      setIsCompleted(!isCompleted);
    }
  };

  const handleEditTask = () => {
    // TODO: Navigate to edit screen when implemented
    console.log('Edit task:', taskId);
    router.push(`/care/schedule?taskId=${taskId}`);
    //Alert.alert('情報', '編集機能は近日実装予定です');
  };

  const handleDeleteTask = () => {
    Alert.alert(
      '確認',
      'このタスクを削除しますか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel'
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => {
            if (task) {
              deleteTask(task.id);
              router.back();
            }
          }
        }
      ]
    );
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'watering': return Colors.primary;
      case 'fertilizing': return Colors.secondary;
      case 'pruning': return Colors.accent;
      case 'checkup': return Colors.info;
      case 'repotting': return Colors.info;
      default: return Colors.gray;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'watering': return 'water-outline';
      case 'fertilizing': return 'nutrition-outline';
      case 'pruning': return 'cut-outline';
      case 'checkup': return 'medkit-outline';
      case 'repotting': return 'leaf-outline';
      default: return 'help-outline';
    }
  };

  const getTaskLabel = (type: string) => {
    switch (type) {
      case 'watering': return '水やり';
      case 'fertilizing': return '施肥';
      case 'pruning': return '剪定';
      case 'checkup': return '点検';
      case 'repotting': return '植え替え';
      default: return 'お世話';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return Colors.error;
      case 'medium': return Colors.warning;
      case 'low': return Colors.success;
      default: return Colors.gray;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '不明';
    }
  };

  const getRecurrenceLabel = (recurrence: string) => {
    switch (recurrence) {
      case 'none': return '繰り返さない';
      case 'daily': return '毎日';
      case 'weekly': return '毎週';
      case 'monthly': return '毎月';
      default: return '不明';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (!task) {
    return (
      <View style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>タスク詳細</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.loadingContainer}>
            <Text>読み込み中...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
          <Text style={styles.title}>タスク詳細</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Task Header */}
          <View style={styles.taskHeader}>
            <View style={styles.taskIconLarge}>
              <View 
                style={[
                  styles.taskIconCircle,
                  { backgroundColor: getTaskColor(task.type) }
                ]}
              >
                <Ionicons 
                  name={getTaskIcon(task.type) as any} 
                  size={32} 
                  color="white" 
                />
              </View>
            </View>
            <View style={styles.taskHeaderInfo}>
              <Text style={styles.taskTypeLarge}>{getTaskLabel(task.type)}</Text>
              <Text style={styles.taskPlantLarge}>{plantName}</Text>
              <View style={styles.taskMeta}>
                <Text style={styles.taskDateTime}>
                  {formatDate(task.date)} • {task.time}
                </Text>
              </View>
            </View>
          </View>

          {/* Completion Toggle */}
          <TouchableOpacity 
            style={styles.completionSection}
            onPress={handleToggleComplete}
          >
            <View style={styles.completionLeft}>
              <View 
                style={[
                  styles.completionCheckbox,
                  isCompleted && styles.completionCheckboxCompleted
                ]}
              >
                {isCompleted && (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </View>
              <View>
                <Text style={styles.completionTitle}>
                  {isCompleted ? '完了' : '未完了'}
                </Text>
                <Text style={styles.completionSubtitle}>
                  {isCompleted ? 'タスクは完了しました' : 'タスクを完了としてマーク'}
                </Text>
              </View>
            </View>
            <Ionicons 
              name={isCompleted ? "checkmark-circle" : "ellipse-outline"} 
              size={24} 
              color={isCompleted ? Colors.success : Colors.gray} 
            />
          </TouchableOpacity>

          {/* Task Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>詳細情報</Text>
            
            {/* Priority */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="flag-outline" size={20} color={Colors.textLight} />
                <Text style={styles.detailLabelText}>優先度</Text>
              </View>
              <View style={styles.detailValue}>
                <View 
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(task.priority) }
                  ]}
                />
                <Text style={styles.detailValueText}>
                  {getPriorityLabel(task.priority)}
                </Text>
              </View>
            </View>

            {/* Recurrence */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="repeat-outline" size={20} color={Colors.textLight} />
                <Text style={styles.detailLabelText}>繰り返し</Text>
              </View>
              <Text style={styles.detailValueText}>
                {getRecurrenceLabel(task.recurrence)}
              </Text>
            </View>

            {/* Created Date */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="calendar-outline" size={20} color={Colors.textLight} />
                <Text style={styles.detailLabelText}>作成日</Text>
              </View>
              <Text style={styles.detailValueText}>
                {formatDate(task.createdAt)}
              </Text>
            </View>
          </View>

          {/* Notes */}
          {task.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.sectionTitle}>メモ</Text>
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{task.notes}</Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <PrimaryButton 
              title="タスクを編集"
              onPress={handleEditTask}
              variant="outline"
              style={styles.editButton}
            />
            <PrimaryButton 
              title="タスクを削除"
              onPress={handleDeleteTask}
              variant="danger"
              style={styles.deleteButton}
            />
          </View>

          {/* Spacer */}
          {/* <View style={styles.spacer} /> */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskIconLarge: {
    marginRight: Spacing.lg,
  },
  taskIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskHeaderInfo: {
    flex: 1,
  },
  taskTypeLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  taskPlantLarge: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDateTime: {
    fontSize: 14,
    color: Colors.textLight,
  },
  completionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  completionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completionCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  completionCheckboxCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  completionSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  detailsSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabelText: {
    fontSize: 16,
    color: Colors.textLight,
    marginLeft: Spacing.sm,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValueText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  priorityBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },
  notesSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  notesContainer: {
    backgroundColor: Colors.lightGray,
    padding: Spacing.md,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  actionSection: {
    marginBottom: Spacing.xl,
  },
  editButton: {
    marginBottom: Spacing.md,
  },
  deleteButton: {
    marginTop: Spacing.sm,
  },
  spacer: {
    height: Spacing.xxl,
  },
});
