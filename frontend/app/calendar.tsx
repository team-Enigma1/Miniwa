// app/calendar.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
  
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Calendar } from 'react-native-calendars';
import { Colors, Spacing } from './shared/constants/app';
import { usePlants } from './shared/contexts/PlantsContext';


export default function CareCalendarScreen() {
  const router = useRouter();
  const { 
    getTasksByDate, 
    toggleTaskCompletion,
    getPlantById 
  } = usePlants();

  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Refs cho animation
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // PanResponder cho swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe sang phải -> tháng trước
          handleMonthChange('prev');
        } else if (gestureState.dx < -50) {
          // Swipe sang trái -> tháng sau
          handleMonthChange('next');
        }
      },
    })
  ).current;

  const handleMonthChange = (direction: 'prev' | 'next') => {
    // Hiệu ứng tổng hợp: fade out + scale down + slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -50 : 50,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Cập nhật tháng
      const newMonth = new Date(currentMonth);
      if (direction === 'next') {
        newMonth.setMonth(newMonth.getMonth() + 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() - 1);
      }
      setCurrentMonth(newMonth);
      
      // Reset slide position
      slideAnim.setValue(direction === 'next' ? 50 : -50);
      
      // Hiệu ứng vào: fade in + scale up + slide
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
  };

  // Lấy tasks cho ngày được chọn từ PlantsContext
  const selectedDateTasks = getTasksByDate(selectedDate);

  // Tạo marked dates cho calendar từ dữ liệu thực
  const getMarkedDates = () => {
    const marked: any = {};
    
    // Lấy tất cả tasks từ context và nhóm theo ngày
    const today = new Date();
    const startDate = new Date(currentMonth);
    startDate.setDate(1);
    const endDate = new Date(currentMonth);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    // Tạo mảng các ngày trong tháng
    const datesInMonth: string[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      datesInMonth.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    // Đánh dấu các ngày có task
    datesInMonth.forEach(date => {
      const tasks = getTasksByDate(date);
      if (tasks.length > 0) {
        const completedCount = tasks.filter(task => task.completed).length;
        const totalCount = tasks.length;
        
        if (completedCount === totalCount && totalCount > 0) {
          marked[date] = { 
            selected: true, 
            selectedColor: Colors.success,
            dotColor: Colors.white 
          };
        } else if (totalCount > 0) {
          marked[date] = { 
            selected: true, 
            selectedColor: Colors.warning,
            dotColor: Colors.white 
          };
        }
      }
    });

    // Đánh dấu ngày được chọn
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: Colors.primary,
        selectedTextColor: Colors.white
      };
    }

    return marked;
  };

  const handleTaskPress = (taskId: string) => {
    router.push(`./care/${taskId}`);
  };

  const handleTaskToggle = (taskId: string, event: any) => {
    event?.stopPropagation(); // Ngăn chặn navigation khi nhấn vào checkbox
    toggleTaskCompletion(taskId);
  };

  const handleAddTask = () => {
    router.push('./care/schedule');
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

  const getPlantName = (plantId: string) => {
    const plant = getPlantById(plantId);
    return plant?.name || '不明な植物';
  };

  // Format tháng hiện tại để hiển thị
  const currentMonthFormatted = currentMonth.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>

      
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>ケアカレンダー</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Calendar Header với điều hướng tháng */}
          <View style={styles.calendarHeader}>
            <TouchableOpacity 
              style={styles.monthNavButton}
              onPress={() => handleMonthChange('prev')}
            >
              <Ionicons name="chevron-back" size={28} color={Colors.primary} />
            </TouchableOpacity>
            
            <Text style={styles.monthText}>{currentMonthFormatted}</Text>
            
            <TouchableOpacity 
              style={styles.monthNavButton}
              onPress={() => handleMonthChange('next')}
            >
              <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Calendar với swipe gesture và hiệu ứng mượt mà */}
          <Animated.View 
            style={[
              styles.calendarSection,
              { 
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateX: slideAnim }
                ]
              }
            ]}
            {...panResponder.panHandlers}
          >
            <Calendar
              current={currentMonth.toISOString().split('T')[0]}
              onDayPress={handleDateSelect}
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: Colors.white,
                calendarBackground: Colors.white,
                textSectionTitleColor: Colors.text,
                selectedDayBackgroundColor: Colors.primary,
                selectedDayTextColor: Colors.white,
                todayTextColor: Colors.primary,
                dayTextColor: Colors.text,
                textDisabledColor: Colors.gray,
                dotColor: Colors.primary,
                selectedDotColor: Colors.white,
                arrowColor: 'transparent',
                monthTextColor: 'transparent',
                textDayFontWeight: '400',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              style={styles.calendar}
              hideArrows={true}
              hideExtraDays={true}
              // Ẩn header của calendar vì chúng ta đã có custom header
              renderHeader={(date: any) => {
                // Trả về null để ẩn header mặc định
                return null;
              }}
            />
          </Animated.View>

          {/* Selected Date Tasks */}
          <View style={styles.tasksSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {new Date(selectedDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </Text>
              <Text style={styles.taskCount}>
                {selectedDateTasks.length} 個のタスク
              </Text>
            </View>

            {selectedDateTasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={64} color={Colors.gray} />
                <Text style={styles.emptyText}>この日にはタスクがありません</Text>
                <Text style={styles.emptySubtext}>
                  下のボタンから新しいタスクを追加しましょう
                </Text>
              </View>
            ) : (
              selectedDateTasks.map((task) => (
                <TouchableOpacity 
                  key={task.id}
                  style={styles.taskCard}
                  onPress={() => handleTaskPress(task.id)}
                >
                  <View style={styles.taskLeft}>
                    <View 
                      style={[
                        styles.taskIcon, 
                        { backgroundColor: getTaskColor(task.type) }
                      ]}
                    >
                      <Ionicons 
                        name={getTaskIcon(task.type) as any} 
                        size={20} 
                        color="white" 
                      />
                    </View>
                    <View style={styles.taskInfo}>
                      <Text style={styles.taskType}>{getTaskLabel(task.type)}</Text>
                      <Text style={styles.taskPlant}>{getPlantName(task.plantId)}</Text>
                      <View style={styles.taskMeta}>
                        <Text style={styles.taskTime}>{task.time}</Text>
                        <View 
                          style={[
                            styles.priorityIndicator,
                            { backgroundColor: getPriorityColor(task.priority) }
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={[
                      styles.checkbox,
                      task.completed && styles.checkboxCompleted
                    ]}
                    onPress={(e) => handleTaskToggle(task.id, e)}
                  >
                    {task.completed && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Add Task Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>新しいタスクを追加</Text>
          </TouchableOpacity>
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
    backgroundColor: Colors.white,
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  monthNavButton: {
    padding: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  calendarSection: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: 12,
  },
  tasksSection: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  taskCount: {
    fontSize: 14,
    color: Colors.textLight,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  taskPlant: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    fontSize: 12,
    color: Colors.textLight,
    marginRight: Spacing.sm,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
});
