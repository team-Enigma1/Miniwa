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
import { Todo } from '@/types/todo';
import styles from '../styles/HomeScreen.styles'; 
import BottomNav from '../components/ui/BottomNavigation'

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
        setTodos(data);
      } catch (e) {
        console.error(e)
      }
    };
    fetchTodos();
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
              今日は気温が適温です。午前中に水やりをすると、植物がより効率的に水分を吸収できます。
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

        {/* Todo */}
        {todos.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            {/* 水やり */}
            <Text>
              💧 水やり：
              {todo.water ? '完了' : `未完了（${todo.water_count}回）`}
            </Text>

            {!todo.water && (
              <TouchableOpacity
                onPress={() => handleTodoWaterUpdate(todo)}
              >
                <Text>水やりした</Text>
              </TouchableOpacity>
            )}

            {/* 肥料 */}
            <Text>
              🌿 肥料：{todo.fertilizer ? '完了' : '未完了'}
            </Text>

            {!todo.fertilizer && (
              <TouchableOpacity
                onPress={() => handleTodoFertilizerUpdate(todo)}
              >
                <Text>肥料あげた</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}



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