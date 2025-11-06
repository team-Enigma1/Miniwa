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

// ========================================
// 型定義
// ========================================

interface TodoItem {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  icon: string;
  type: 'water' | 'check' | 'fertilize';
}

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
  
  // ========================================
  // 状態管理
  // ========================================
  
  // TODO (Backend): GET /api/plants でユーザーの植物リストを取得
  // レスポンス例: { plants: [{ id, name, status, emoji, image?, growthStage, lastWatered, ... }] }
  const [myPlants, setMyPlants] = useState<Plant[]>([
    {
      id: 1,
      name: 'あなたのトマト',
      status: '成長段階: 実がなり始めました！',
      emoji: '🍅',
    },
    {
      id: 2,
      name: 'あなたのイチゴ',
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

  // 新しいToDoを追加
  // TODO (Backend): POST /api/todos で新しいタスクを作成
  // リクエスト例: { text, description, type, plantId?, dueDate?, ... }
  const handleAddTodo = () => {
    console.log('Add new todo');
  };

  // おすすめアイテムの購入ボタンがタップされた時の処理
  const handleBuyItem = (item: RecommendedItem) => {
    console.log('Buy item:', item.name);
  };

  // ========================================
  // ナビゲーションハンドラー
  // ========================================
  
  const handlePlantNav = () => router.push('/CatalogScreen');
  const handleCalendarNav = () => console.log('Calendar');
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
          <View style={styles.weatherBadge}>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherText}>24°C - Tokyo</Text>
          </View>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>今日のToDo</Text>
            <TouchableOpacity onPress={handleAddTodo}>
              <Text style={styles.addButton}>+ 追加</Text>
            </TouchableOpacity>
          </View>

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

        {/* ナビゲーション用の下部スペース */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* 底部ナビゲーション */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={handlePlantNav}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navLabel}>植物</Text>
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
          <Text style={styles.navIcon}>👥</Text>
          <Text style={styles.navLabel}>コミュニティ</Text>
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

// ========================================
// スタイル定義
// ========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // 天気ヘッダー
  weatherHeader: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
  },
  weatherIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  weatherText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
  },

  // セクション
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  addButton: {
    color: '#2ECC71',
    fontSize: 14,
    fontWeight: '600',
  },

  // 植物スクロール
  plantsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  plantCard: {
    width: width * 0.75,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  plantImageContainer: {
    flex: 1,
    position: 'relative',
  },
  plantImagePlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantEmoji: {
    fontSize: 80,
    opacity: 0.6,
  },
  plantOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  plantInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  plantStatus: {
    fontSize: 12,
    color: '#666666',
  },
  plantActionButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  plantActionIcon: {
    fontSize: 20,
  },

  // 植物追加カード
  addPlantCard: {
    width: width * 0.4,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2ECC71',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlantIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addPlantIconText: {
    fontSize: 28,
    color: '#2ECC71',
    fontWeight: '300',
  },
  addPlantText: {
    color: '#2ECC71',
    fontSize: 14,
    fontWeight: '600',
  },

  // ToDoコンテナ
  todoContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  todoItemCompleted: {
    opacity: 0.5,
  },
  todoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  todoIconContainerCompleted: {
    backgroundColor: '#F0F0F0',
  },
  todoIcon: {
    fontSize: 20,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  todoTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  todoDescription: {
    fontSize: 13,
    color: '#666666',
  },
  todoDescriptionCompleted: {
    color: '#AAAAAA',
  },
  todoCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoCheckboxCompleted: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  todoCheckmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // アドバイスカード
  tipCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 204, 113, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  tipDescription: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
  },

  // おすすめアイテム
  itemsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  itemCard: {
    width: 140,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemEmoji: {
    fontSize: 50,
  },
  itemCategory: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
    lineHeight: 16,
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
  },
  itemButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2ECC71',
  },
  itemButtonIcon: {
    fontSize: 14,
  },

  // 底部ナビゲーション
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    position: 'relative',
  },
  navActiveIndicator: {
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 10,
    color: '#2ECC71',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default HomeScreen;