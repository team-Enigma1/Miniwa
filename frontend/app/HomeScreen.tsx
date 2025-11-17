import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/HomeScreen.styles'; 
import { TodoItem, Plant, RecommendedItem } from '../types/HomeScreen';

const { width } = Dimensions.get('window');

// ========================================
// メインコンポーネント
// ========================================

const HomeScreen = () => {
  const router = useRouter();
  
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

  // TODO (Backend): GET /api/todos でユーザーの今日のタスクを取得
  // レスポンス例: { todos: [{ id, text, description, completed, icon, type, dueDate, plantId?, ... }] }
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      text: '水やり',
      description: '土の表面が乾いたらたっぷりと。',
      completed: false,
      icon: '💧',
      type: 'water',
    },
    {
      id: 2,
      text: '害虫チェック',
      description: '葉の裏を中心に確認しましょう。',
      completed: false,
      icon: '🐛',
      type: 'check',
    },
    {
      id: 3,
      text: '肥料やり',
      description: '2週間に1度、液体肥料を。',
      completed: true,
      icon: '🌿',
      type: 'fertilize',
    },
  ]);

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

  // ToDoの完了状態を切り替え
  // TODO (Backend): PUT /api/todos/:id で完了状態を更新
  // リクエスト例: { completed: true/false }
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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
  
  const handlePlantNav = () => router.push('/CatalogScreen');
  const handleCalendarNav = () => console.log('/CalendarScreen');
  const handleHomeNav = () => console.log('Home');
  const handleCommunityNav = () => console.log('Community');
  const handleProfileNav = () => console.log('Profile');

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

        {/* 今日のToDoセクション */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>今日のToDo</Text>
       
          <View style={styles.todoContainer}>
            {todos.map((todo) => (
              <TouchableOpacity
                key={todo.id}
                style={[
                  styles.todoItem,
                  todo.completed && styles.todoItemCompleted,
                ]}
                onPress={() => toggleTodo(todo.id)}
                activeOpacity={0.7}
              >
                <View style={styles.todoLeft}>
                  <View
                    style={[
                      styles.todoIconContainer,
                      todo.completed && styles.todoIconContainerCompleted,
                    ]}
                  >
                    <Text style={styles.todoIcon}>{todo.icon}</Text>
                  </View>
                  <View style={styles.todoContent}>
                    <Text
                      style={[
                        styles.todoTitle,
                        todo.completed && styles.todoTitleCompleted,
                      ]}
                    >
                      {todo.text}
                    </Text>
                    <Text
                      style={[
                        styles.todoDescription,
                        todo.completed && styles.todoDescriptionCompleted,
                      ]}
                    >
                      {todo.description}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.todoCheckbox,
                    todo.completed && styles.todoCheckboxCompleted,
                  ]}
                >
                  {todo.completed && (
                    <Text style={styles.todoCheckmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={handlePlantNav}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navLabel}>マイガーデン</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleCalendarNav}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>カレンダー</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={handleHomeNav}
          activeOpacity={0.7}
        >
          <View style={styles.navActiveIndicator}>
            <Text style={styles.navIconActive}>🏠</Text>
          </View>
          <Text style={styles.navLabelActive}>ホーム</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleCommunityNav}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>SNS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleProfileNav}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>プロフィール</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen; 