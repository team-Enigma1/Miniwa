import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { updateTodo, getTodos } from '@/api/todos';
import { getAdvice } from '@/api/advice';
import { Todo } from '@/types/todo';
import styles from '../styles/HomeScreen.styles'; 
import BottomNav from '../components/ui/BottomNavigation'
import { Advice } from '@/types/advice';

// ========================================
// 型定義
// ========================================


interface Plant {
  id: number;
  name: string;
  status: string;
  emoji: string;
  image?: string;
}

interface RecommendedItem {
  id: number;
  name: string;
  category: string;
  emoji: string;
}

const { width } = Dimensions.get('window');



// ========================================
// メインコンポーネント
// ========================================

const HomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos(); 
        // もし配列でないものが返ってきてもエラーにならないようにする
        if (Array.isArray(data)) {
          setTodos(data);
        } else if (data && typeof data === 'object') {
          // オブジェクトの中にデータが入っているパターンに対応
          const arrayData = Object.values(data).find(Array.isArray);
          setTodos(arrayData || []);
        }
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };
    fetchTodos();
  }, []);

  const [advice, setAdvice] = useState<Advice | null>(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const data = await getAdvice();
        setAdvice(data);
      } catch (e) {
        console.error("Advice fetch error:", e);
      }
    };

    fetchAdvice();
  }, []);

  
  // ========================================
  // 状態管理
  // ========================================
  
  // TODO (Backend): GET /api/plants でユーザーの植物リストを取得
  // レスポンス例: { plants: [{ id, name, status, emoji, image?, growthStage, lastWatered, ... }] }
  const [myPlants, setMyPlants] = useState<Plant[]>([
    {
      id: 1,
      name: 'トマト',
      status: '成長段階: 実がなり始めました！',
      emoji: '🍅',
    },
    {
      id: 2,
      name: 'イチゴ',
      status: '成長段階: 花が咲きました！',
      emoji: '🍓',
    },
  ]);
  

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoWaterUpdate = async (todo: Todo) => {
    try {
      const updateTodos = await updateTodo({
        user_plant_id: todo.user_plant_id,
        water_count: 1,//加算していくから＋１固定
      });
      setTodos(updateTodos);
    } catch (e) {
      console.error(e);
    }
  }

    const handleTodoFertilizerUpdate = async (todo: Todo) => {
    try {
      const updateTodos = await updateTodo({
        user_plant_id: todo.user_plant_id,
        fertilizer: true,
      });
      setTodos(updateTodos);
    } catch (e) {
      console.error(e);
    }
  }
  // TODO (Backend): GET /api/recommendations でユーザーに合わせたおすすめアイテムを取得
  // レスポンス例: { items: [{ id, name, category, emoji, price?, url?, ... }] }
  const [recommendedItems] = useState<RecommendedItem[]>([
    {
      id: 1,
      name: 'トマト用有機肥料',
      category: '肥料',
      emoji: '🍅',
    },
    {
      id: 2,
      name: 'トマト用有機肥料',
      category: '肥料',
      emoji: '🍅',
    },
    {
      id: 3,
      name: 'トマト用有機肥料',
      category: '肥料',
      emoji: '🍅',
    },
  ]);

  // ========================================
  // イベントハンドラー
  // ========================================

  // 植物カードがタップされた時の処理
  const handlePlantPress = (plant: Plant) => {
    console.log('Navigate to plant detail:', plant.name);
    // router.push({ pathname: '/PlantDetailScreen', params: { plantId: plant.id } });
  };

  // おすすめアイテムの購入ボタンがタップされた時の処理
  const handleBuyItem = (item: RecommendedItem) => {
    console.log('Buy item:', item.name);
  };



  // ========================================
  // ナビゲーションハンドラー
  // ========================================
  


  // ========================================
  // レンダリング
  // ========================================

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 天気ヘッダー */}
        {/* TODO (Backend): GET /api/weather でユーザーの位置情報に基づいた天気データを取得 */}
        {/* レスポンス例: { temperature, condition, location, icon, ... } */}
        <View style={styles.weatherHeader}>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherText}>Osaka, 24 °C</Text>
        </View>

        {/* 今日のアドバイスセクション */}
        {/* TODO (Backend): GET /api/tips で天気・季節・ユーザーの植物に基づいたアドバイスを取得 */}
        {/* レスポンス例: { tip: { title, description, icon, priority, ... } } */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipTitle}>今日のアドバイス</Text>
            </View>
            <Text style={styles.tipDescription}>
              {advice?.advice || "ワンポイントアドバイスを読み込み中..."}
            </Text>
          </View>
        </View>
        
        {/* マイガーデンセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>マイガーデン</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plantsScroll}
          >
            {myPlants.map((plant) => (
              <TouchableOpacity
                key={plant.id}
                style={styles.plantCard}
                onPress={() => handlePlantPress(plant)}
                activeOpacity={0.9}
              >
                {/* 植物画像背景 */}
                <View style={styles.plantImageContainer}>
                  <View style={styles.plantImagePlaceholder}>
                    <Text style={styles.plantEmoji}>{plant.emoji}</Text>
                  </View>
                  <View style={styles.plantOverlay} />
                </View>

                {/* 植物情報 */}
                <View style={styles.plantInfo}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  <Text style={styles.plantStatus}>{plant.status}</Text>
                </View>

                {/* アクションボタン（詳細表示） */}
                <TouchableOpacity style={styles.plantActionButton}>
                  <Text style={styles.plantActionIcon}>📊</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {/* 植物追加カード */}
            <TouchableOpacity
              style={styles.addPlantCard}
              onPress={() => router.push('/CatalogScreen')}
              activeOpacity={0.9}
            >
              <View style={styles.addPlantIcon}>
                <Text style={styles.addPlantIconText}>+</Text>
              </View>
              <Text style={styles.addPlantText}>植物を追加</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* デバック */}
        {/* <View style={styles.section}>
          <Text>データ件数: {todos.length}</Text>
        </View> */}

        {/* --- 今日のToDoセクション --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日のToDo</Text>

          {todos.length > 0 ? (
            todos.map((todo) => (
              <View key={String(todo.id)}>
                {/* 水やりカード */}
                <TouchableOpacity 
                  style={styles.todoCard}
                  onPress={() => !todo.water && handleTodoWaterUpdate(todo)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.todoIconContainer, { backgroundColor: '#E3F2FD' }]}>
                    <Text style={styles.todoEmoji}>💧</Text>
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoTaskName}>水やり</Text>
                    <Text style={styles.todoSubText}>
                      {todo.water ? "完了しました" : "土の表面が乾いたらたっぷりと。"}
                    </Text>
                  </View>
                  <View style={[styles.todoCheckCircle, todo.water && styles.todoCheckCircleActive]}>
                    {todo.water ? <Text style={styles.checkMark}>✓</Text> : null}
                  </View>
                </TouchableOpacity>

                {/* 肥料やりカード */}
                <TouchableOpacity 
                  style={styles.todoCard}
                  onPress={() => !todo.fertilizer && handleTodoFertilizerUpdate(todo)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.todoIconContainer, { backgroundColor: '#F1F8E9' }]}>
                    <Text style={styles.todoEmoji}>🌿</Text>
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoTaskName}>肥料やり</Text>
                    <Text style={styles.todoSubText}>
                      {todo.fertilizer ? "完了しました" : "2週間に1度、液体肥料を。"}
                    </Text>
                  </View>
                  <View style={[styles.todoCheckCircle, todo.fertilizer && styles.todoCheckCircleActive]}>
                    {todo.fertilizer ? <Text style={styles.checkMark}>✓</Text> : null}
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>ToDoを読み込み中、またはありません</Text>
            </View>
          )}
        </View>



        {/* おすすめアイテムセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>おすすめのアイテム</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsScroll}
          >
            {recommendedItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImage}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity 
                  style={styles.itemButton}
                  onPress={() => handleBuyItem(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.itemButtonText}>購入する</Text>
                  <Text style={styles.itemButtonIcon}>🛒</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* 底部ナビゲーション */}
      <BottomNav/>
    </View>
  );
};

export default HomeScreen; 