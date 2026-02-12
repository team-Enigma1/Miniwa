import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { updateTodo, getTodos } from '@/api/todos';
import { getAdvice } from '@/api/advice';
import { Todo } from '@/types/todo';
import styles from '../styles/HomeScreen.styles'; 
import BottomNav from '../components/ui/BottomNavigation'
import { Advice } from '@/types/advice';
import { getWeatherData } from '@/api/openWeather';
import { getUserPlants } from '@/api/user';
import { plantGrowthImg } from '@/api/plant';
import { BASE_URL } from '@/api/url';
import { Plant, PlantGrowthImg } from '@/types/plant';
import { Weather } from '@/types/weather';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// ========================================
// 型定義
// ========================================

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
  const [weather, setWeather] = useState<Weather | null>(null);

  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  
  useEffect(() => {
    if (!selectedPlantId) return;

    const fetchTodos = async () => {
      try {
        const data = await getTodos({
          user_plant_id: selectedPlantId,
        });

        if (Array.isArray(data)) {
          setTodos(data);
        } else if (data && typeof data === 'object') {
          const arrayData = Object.values(data).find(Array.isArray);
          setTodos(arrayData || []);
        }
        } catch (e) {
          console.error("Fetch error:", e);
        }
      };

      fetchTodos();
  }, [selectedPlantId]);


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
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [plantImgs, setPlantImgs] = useState<Record<number, PlantGrowthImg[]>>({});

  useEffect(() => {
    const fetchUserPlants = async () => {
      try{
        const data = await getUserPlants();

        if(!Array.isArray(data)){
          console.log("Failed to fetch User's plants");
          return;
        }

        setMyPlants(data);

        const userPlantIds = data
          .map(p => p.userPlantId)
          .filter((id): id is number => id !== undefined);

          const result = await Promise.all(
            userPlantIds.map(async (id) => {
              const imgs = await plantGrowthImg(id);
              return { id, imgs };
            })
          );

          const imgMap: Record<number, PlantGrowthImg[]> = {};

          result.forEach(({ id, imgs }) => {
            if(imgs.length > 0) {
              imgMap[id] = imgs;
            }
          });

          setPlantImgs(imgMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPlants();
  }, []);
  

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
  // ========================================
  // イベントハンドラー
  // ========================================

  // 植物カードがタップされた時の処理
  const handlePlantPress = (userPlantId: number) => {
    setSelectedPlantId(userPlantId);
  };

  const profileScreen = () => {
      router.push({
      pathname: '/PlantProfileScreen',
      params: { userPlantId: selectedPlantId },
    });
  }

  const selectedPlant = myPlants.find(p => p.userPlantId === selectedPlantId);

  // ========================================
  // レンダリング
  // ========================================
  useEffect(() => {
    const loadWeather = async () => {
      try{
        const data = await getWeatherData();
        setWeather(data);
      } catch (error){
        console.log(error);
      }
    };

    loadWeather();
  }, []);

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
          {weather && (
            <>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                }}
                style={{ width: 50, height: 50 }}
              />
              <Text style={styles.weatherText}>
                {weather.city}, {Math.round(weather.temp)}°C
              </Text>
            </>
          )}
        </View>

        {/* 今日のアドバイスセクション */}
        {/* TODO (Backend): GET /api/tips で天気・季節・ユーザーの植物に基づいたアドバイスを取得 */}
        {/* レスポンス例: { tip: { title, description, icon, priority, ... } } */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <MaterialCommunityIcons
                  name="lightbulb-outline"
                  size={20}
                  color="#FFC107"  
                />
              </View>
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
            {myPlants.map((plant) => {
              if (!plant.userPlantId) return null;

              const imgs = plantImgs[plant.userPlantId];
              const img = imgs?.[0];

              return (
                <TouchableOpacity
                  key={plant.userPlantId}
                  style={styles.plantCard}
                  onPress={() => handlePlantPress(img.user_plant_id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.plantImageContainer}>
                    <View style={styles.plantImagePlaceholder}>
                      {img?.image_url && (
                        <Image
                          source={{
                            uri: `${BASE_URL}/images/${img.plant_id}/${img.image_url}`,
                          }}
                          style={{ width: 150, height: 120, marginTop: 20, }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                    <View style={styles.plantOverlay} />
                  </View>

                  <View style={styles.plantInfo}>
                  <Text 
                    style={styles.plantName} 
                    onPress={profileScreen}
                  >
                    {plant.name}
                  </Text>
                </View>
                </TouchableOpacity>
              );
            })}

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


          {/* 報告*/}
          <View style={styles.reportCard}>
          {/* header */}
          <View style={styles.reportHeader}>
           <View style={styles.reportHeaderIcon}>
              <MaterialCommunityIcons
                name="clipboard-outline"
                size={20}
                color="#607D8B"
              />
            </View>
            <Text style={styles.reportHeaderText}>報告</Text>
          </View>
          
          <Text style={styles.reportText}>
            ミニトマトが5日に収穫できます !
          </Text>
        </View>
          
        {/* --- 今日のToDoセクション --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日のToDo</Text>

          {selectedPlant && (
            <Text style={styles.selectedPlantName}>
              {selectedPlant.name}
            </Text>
          )}

          {todos.length > 0 ? (
            todos.map((todo) => (
              <View key={String(todo.id)}>

                {/* 水やりカード */}
                <TouchableOpacity
                  style={styles.todoCard}
                  onPress={() => handleTodoWaterUpdate(todo)}
                  activeOpacity={0.7}
                  disabled={todo.water}
                >
                  <View style={[styles.todoIconContainer, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="water-outline" size={22} color="#2196F3" />
                  </View>

                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoTaskName}>水やり</Text>
                    <Text style={styles.todoSubText}>
                      {todo.water ? '完了しました' : '水やりが必要です'}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.todoCheckCircle,
                      todo.water && styles.todoCheckCircleActive,
                    ]}
                  >
                    {todo.water ? (
                      <Text style={styles.checkMark}>✓</Text>
                    ) : todo.water_required > 0 ? (
                      <Text style={styles.checkMark}>{todo.water_required}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>


                {/* 肥料やりカード */}
                <TouchableOpacity
                  style={styles.todoCard}
                  onPress={() => handleTodoFertilizerUpdate(todo)}
                  activeOpacity={0.7}
                  disabled={todo.fertilizer}
                >
                            <View
                    style={[
                      styles.todoIconContainer,
                      { backgroundColor: '#F1F8E9' },
                    ]}
                  >
                    <MaterialCommunityIcons 
                      name="sprout" 
                      size={22} 
                      color="#4CAF50" 
                    />
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoTaskName}>肥料やり</Text>
                    <Text style={styles.todoSubText}>
                      {todo.fertilizer
                        ? '完了しました'
                        : '2週間に1度、液体肥料を。'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.todoCheckCircle,
                      todo.fertilizer && styles.todoCheckCircleActive,
                    ]}
                  >
                    {todo.fertilizer && (
                      <Text style={styles.checkMark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>
                植物を選択してください
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* 底部ナビゲーション */}
      <BottomNav/>
    </View>
  );
};

export default HomeScreen;