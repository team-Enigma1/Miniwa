// shared/contexts/PlantsContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CareTask, Plant } from '../types/plant';

interface PlantsState {
  plants: Plant[];
  tasks: CareTask[];
  loading: boolean;
  error: string | null;
}

interface PlantsContextType {
  state: PlantsState;
  // Plant management
  addPlant: (plant: Omit<Plant, 'id' | 'createdAt'>) => Promise<void>;
  updatePlant: (id: string, updates: Partial<Plant>) => Promise<void>;
  deletePlant: (id: string) => Promise<void>;
  markAsWatered: (plantId: string) => Promise<void>;
  refreshPlants: () => Promise<void>;
  // Task management
  addTask: (task: Omit<CareTask, 'id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<CareTask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  // Task queries
  getTasksForDate: (date: string) => CareTask[];
  getTasksByDate: (date: string) => CareTask[]; // Thêm hàm này
  getTodayTasks: () => CareTask[];
  getUpcomingTasks: () => CareTask[];
  getTaskById: (id: string) => CareTask | undefined;
  getPlantById: (id: string) => Plant | undefined;
}

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

// Storage keys
const PLANTS_STORAGE_KEY = 'gardenmate_plants';
const TASKS_STORAGE_KEY = 'gardenmate_tasks';

// Mock initial plants data
const INITIAL_PLANTS: Plant[] = [
  {
    id: '1',
    name: 'トラの舌',
    type: '多肉植物',
    species: 'サンセベリア',
    description: '非常に丈夫で空気清浄効果が高い植物',
    careInstructions: '明るい日陰で管理し、水やりは土が完全に乾いてから',
    waterFrequency: 14,
    lastWatered: '2024-01-15T10:00:00Z',
    nextWatering: '2024-01-29T10:00:00Z',
    health: 'good',
    image: '🌱',
    location: 'リビングルーム',
    sunlight: 'medium',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'ポトス',
    type: '観葉植物',
    species: 'エピプレムヌム',
    description: '育てやすく、つる性の観葉植物',
    careInstructions: '直射日光を避け、土の表面が乾いたら水やり',
    waterFrequency: 7,
    lastWatered: '2024-01-18T08:00:00Z',
    nextWatering: '2024-01-25T08:00:00Z',
    health: 'warning',
    image: '🍃',
    location: 'キッチン',
    sunlight: 'low',
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '3',
    name: 'バラ',
    type: '花木',
    species: 'ロサ',
    description: '美しい花を咲かせる人気の植物',
    careInstructions: '日当たりの良い場所で育て、水やりはたっぷりと',
    waterFrequency: 3,
    lastWatered: '2024-01-19T09:00:00Z',
    nextWatering: '2024-01-22T09:00:00Z',
    health: 'good',
    image: '🌹',
    location: 'バルコニー',
    sunlight: 'high',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'モンステラ',
    type: '観葉植物',
    species: 'モンステラ',
    description: '大きな葉が特徴的な人気の観葉植物',
    careInstructions: '明るい日陰で管理し、葉水を定期的に',
    waterFrequency: 7,
    lastWatered: '2024-01-17T11:00:00Z',
    nextWatering: '2024-01-24T11:00:00Z',
    health: 'good',
    image: '🌿',
    location: 'リビングルーム',
    sunlight: 'medium',
    createdAt: '2024-01-08T00:00:00Z',
  },
  {
    id: '5',
    name: 'サボテン',
    type: '多肉植物',
    species: 'サボテン科',
    description: '乾燥に強く、手間がかからない植物',
    careInstructions: '日当たりの良い場所で、水やりは控えめに',
    waterFrequency: 21,
    lastWatered: '2024-01-10T14:00:00Z',
    nextWatering: '2024-01-31T14:00:00Z',
    health: 'good',
    image: '🌵',
    location: '書斎',
    sunlight: 'high',
    createdAt: '2024-01-03T00:00:00Z',
  }
];

// Mock initial tasks data
const INITIAL_TASKS: CareTask[] = [
  {
    id: '1',
    plantId: '1',
    type: 'watering',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:00 AM',
    completed: false,
    priority: 'high',
    recurrence: 'none',
    notes: '土が乾いたらたっぷりと水をあげてください',
  },
  {
    id: '2',
    plantId: '2',
    type: 'fertilizing',
    date: new Date().toISOString().split('T')[0], // Today
    time: '11:00 AM',
    completed: true,
    priority: 'medium',
    recurrence: 'none',
    notes: '液体肥料を規定量で',
  },
  {
    id: '3',
    plantId: '3',
    type: 'pruning',
    date: new Date().toISOString().split('T')[0], // Today
    time: '02:00 PM',
    completed: false,
    priority: 'low',
    recurrence: 'none',
    notes: '枯れた花を摘み取ってください',
  },
  {
    id: '4',
    plantId: '4',
    type: 'watering',
    date: '2024-01-20', // Tomorrow
    time: '09:00 AM',
    completed: false,
    priority: 'high',
    recurrence: 'weekly',
    notes: '',
  },
  {
    id: '5',
    plantId: '5',
    type: 'checkup',
    date: '2024-01-21', // Day after tomorrow
    time: '03:00 PM',
    completed: false,
    priority: 'medium',
    recurrence: 'none',
    notes: '害虫がいないか確認してください',
  },
  {
    id: '6',
    plantId: '1',
    type: 'repotting',
    date: '2024-01-25',
    time: '10:00 AM',
    completed: false,
    priority: 'medium',
    recurrence: 'none',
    notes: '一回り大きな鉢に植え替え',
  }
];

export const PlantsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlantsState>({
    plants: [],
    tasks: [],
    loading: true,
    error: null,
  });

  // Load plants and tasks from storage on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Load plants
      const storedPlants = await AsyncStorage.getItem(PLANTS_STORAGE_KEY);
      let plants: Plant[] = [];
      
      if (storedPlants) {
        plants = JSON.parse(storedPlants);
      } else {
        // First time - use initial data
        plants = INITIAL_PLANTS;
        await AsyncStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
      }

      // Load tasks
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      let tasks: CareTask[] = [];
      
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
      } else {
        // First time - use initial data
        tasks = INITIAL_TASKS;
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      }

      setState(prev => ({ ...prev, plants, tasks, loading: false }));
    } catch (error) {
      console.error('Error loading data:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'データの読み込みに失敗しました', 
        loading: false 
      }));
    }
  };

  const savePlants = async (plants: Plant[]) => {
    try {
      await AsyncStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
    } catch (error) {
      console.error('Error saving plants:', error);
      throw new Error('植物データの保存に失敗しました');
    }
  };

  const saveTasks = async (tasks: CareTask[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw new Error('タスクデータの保存に失敗しました');
    }
  };

  // Plant management functions
  const addPlant = async (plantData: Omit<Plant, 'id' | 'createdAt'>) => {
    try {
      const newPlant: Plant = {
        ...plantData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const updatedPlants = [...state.plants, newPlant];
      await savePlants(updatedPlants);
      
      setState(prev => ({
        ...prev,
        plants: updatedPlants,
        error: null,
      }));
    } catch (error) {
      console.error('Error adding plant:', error);
      throw error;
    }
  };

  const updatePlant = async (id: string, updates: Partial<Plant>) => {
    try {
      const updatedPlants = state.plants.map(plant =>
        plant.id === id ? { ...plant, ...updates } : plant
      );
      
      await savePlants(updatedPlants);
      
      setState(prev => ({
        ...prev,
        plants: updatedPlants,
        error: null,
      }));
    } catch (error) {
      console.error('Error updating plant:', error);
      throw error;
    }
  };

  const deletePlant = async (id: string) => {
    try {
      const updatedPlants = state.plants.filter(plant => plant.id !== id);
      await savePlants(updatedPlants);
      
      // Also delete related tasks
      const updatedTasks = state.tasks.filter(task => task.plantId !== id);
      await saveTasks(updatedTasks);
      
      setState(prev => ({
        ...prev,
        plants: updatedPlants,
        tasks: updatedTasks,
        error: null,
      }));
    } catch (error) {
      console.error('Error deleting plant:', error);
      throw error;
    }
  };

  const markAsWatered = async (plantId: string) => {
    try {
      const now = new Date();
      const plant = state.plants.find(p => p.id === plantId);
      
      if (!plant) return;

      const nextWatering = new Date(now.getTime() + plant.waterFrequency * 24 * 60 * 60 * 1000);

      await updatePlant(plantId, {
        lastWatered: now.toISOString(),
        nextWatering: nextWatering.toISOString(),
      });
    } catch (error) {
      console.error('Error marking as watered:', error);
      throw error;
    }
  };

  const refreshPlants = async () => {
    await loadData();
  };

  // Task management functions
  const addTask = async (taskData: Omit<CareTask, 'id'>) => {
    try {
      const newTask: CareTask = {
        ...taskData,
        id: Date.now().toString(),
      };

      const updatedTasks = [...state.tasks, newTask];
      await saveTasks(updatedTasks);
      
      setState(prev => ({
        ...prev,
        tasks: updatedTasks,
        error: null,
      }));
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<CareTask>) => {
    try {
      const updatedTasks = state.tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      );
      
      await saveTasks(updatedTasks);
      
      setState(prev => ({
        ...prev,
        tasks: updatedTasks,
        error: null,
      }));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const updatedTasks = state.tasks.filter(task => task.id !== id);
      await saveTasks(updatedTasks);
      
      setState(prev => ({
        ...prev,
        tasks: updatedTasks,
        error: null,
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      const task = state.tasks.find(t => t.id === id);
      if (!task) return;

      await updateTask(id, { completed: !task.completed });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  };

  // Task query functions
  const getTasksForDate = (date: string): CareTask[] => {
    return state.tasks.filter(task => task.date === date);
  };

  // Thêm hàm getTasksByDate - alias của getTasksForDate để tương thích với code calendar
  const getTasksByDate = (date: string): CareTask[] => {
    return getTasksForDate(date);
  };

  const getTodayTasks = (): CareTask[] => {
    const today = new Date().toISOString().split('T')[0];
    return state.tasks.filter(task => task.date === today);
  };

  const getUpcomingTasks = (): CareTask[] => {
    const today = new Date().toISOString().split('T')[0];
    return state.tasks
      .filter(task => task.date > today && !task.completed)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 10); // Limit to 10 upcoming tasks
  };

  const getTaskById = (id: string): CareTask | undefined => {
    return state.tasks.find(task => task.id === id);
  };

  const getPlantById = (id: string): Plant | undefined => {
    return state.plants.find(plant => plant.id === id);
  };

  const value: PlantsContextType = {
    state,
    // Plant management
    addPlant,
    updatePlant,
    deletePlant,
    markAsWatered,
    refreshPlants,
    // Task management
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    // Task queries
    getTasksForDate,
    getTasksByDate, // Thêm vào đây
    getTodayTasks,
    getUpcomingTasks,
    getTaskById,
    getPlantById,
  };

  return (
    <PlantsContext.Provider value={value}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (context === undefined) {
    throw new Error('usePlants must be used within a PlantsProvider');
  }
  return context;
};

// THÊM CUỐI FILE shared/contexts/PlantsContext.tsx
export type { CareTask, Plant } from '../types/plant';
