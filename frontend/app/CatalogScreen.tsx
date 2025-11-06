import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ========================================
// 型定義
// ========================================

// 植物データの型定義
interface Plant {
  id: number;
  name: string;
  description: string;
  emoji: string;
  season: string;
}

// お気に入り状態の型定義
interface Favorites {
  [key: number]: boolean;
}

// ========================================
// メインコンポーネント
// ========================================

const CatalogScreen = () => {
  const router = useRouter();
  
  // ========================================
  // 状態管理
  // ========================================
  
  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // 選択中の季節フィルター
  const [selectedSeason, setSelectedSeason] = useState<string>('すべて');
  
  // お気に入り状態の管理
  // TODO (Backend): GET /api/favorites でユーザーのお気に入りリストを取得
  const [favorites, setFavorites] = useState<Favorites>({});

  // 季節フィルター用のオプション
  const seasons: string[] = ['すべて', '春', '夏', '秋', '冬'];

  // TODO (Backend): GET /api/plants でサーバーから植物カタログを取得

  const plants: Plant[] = [
    {
      id: 1,
      name: 'ミニトマト',
      description: 'ベランダで簡単に育てられ、夏に収穫が楽しめます。',
      emoji: '🍅',
      season: '夏',
    },
    {
      id: 2,
      name: 'イチゴ',
      description: '甘くて美味しい、家庭菜園の定番。春に収穫できます。',
      emoji: '🍓',
      season: '春',
    },
  ];

  // ========================================
  // イベントハンドラー
  // ========================================

  // お気に入りボタンのトグル処理
  // TODO (Backend): POST /api/favorites/:plantId でお気に入りを追加
  // TODO (Backend): DELETE /api/favorites/:plantId でお気に入りを削除
  // リクエスト例: { plantId: number }
  // レスポンス例: { success: true, isFavorite: boolean }
  const toggleFavorite = (plantId: number): void => {
    setFavorites(prev => {
      const newFavorites = { ...prev };
      newFavorites[plantId] = !newFavorites[plantId];
      return newFavorites;
    });
  };

  // 植物カードタップ時の処理（詳細画面へ遷移）
  // TODO (Backend): PlantDetailScreenで必要な詳細情報は GET /api/plants/:id から取得
  const handlePlantPress = (plant: Plant): void => {
    router.push({
      pathname: '/PlantDetailScreen',
      params: {
        plantId: plant.id,
        plantName: plant.name,
        plantEmoji: plant.emoji,
      }
    });
  };

  // マイガーデンに追加ボタンの処理
  // TODO (Backend): POST /api/user/garden で選択した植物をユーザーのガーデンに追加
  // リクエスト例: { plantId: number, nickname?: string, plantedDate: string }
  // レスポンス例: { success: true, gardenPlantId: number }
  const handleAddToGarden = (): void => {
    router.push('./HomeScreen');
  };

  // ========================================
  // レンダリング
  // ========================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>初心者におすすめの植物</Text>
        </View>

        {/* 検索バー */}
        {/* TODO (Backend): 検索機能実装時は GET /api/plants?search={searchQuery} を呼び出す */}
        {/* デバウンス処理（300-500ms）を実装して、入力の度にAPIを呼ばないようにする */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="植物名を検索"
              placeholderTextColor="#95A5A6"
            />
          </View>
        </View>

        {/* 季節フィルター */}
        {/* TODO (Backend): フィルター変更時は GET /api/plants?season={selectedSeason} を呼び出す */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {seasons.map((season) => (
              <TouchableOpacity
                key={season}
                style={[
                  styles.filterButton,
                  selectedSeason === season && styles.filterButtonActive
                ]}
                onPress={() => setSelectedSeason(season)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedSeason === season && styles.filterTextActive
                  ]}
                >
                  {season}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 植物カード一覧 */}
        <View style={styles.cardsContainer}>
          {plants.map((plant) => (
            <View
              key={plant.id}
              style={styles.cardShadowWrapper}
            >
              <TouchableOpacity
                style={styles.card} 
                onPress={() => handlePlantPress(plant)}
                activeOpacity={0.9}
              >
                {/* 植物画像 */}
                <View style={styles.imageContainer}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>
                      {plant.emoji}
                    </Text>
                  </View>

                  {/* お気に入りボタン */}
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={(e) => {
                      e.stopPropagation(); // 親要素のonPressイベントを防ぐ
                      toggleFavorite(plant.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteIcon}>
                      {favorites[plant.id] === true ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 植物情報 */}
                <View style={styles.cardContent}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  <Text style={styles.plantDescription}>
                    {plant.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* マイガーデンに追加ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToGarden}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>マイガーデンに追加</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  // ヘッダー
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
  },

  // 検索バー
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 0, 
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  // 季節フィルター
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  // カードコンテナ
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },

  // 植物カード
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardShadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  imagePlaceholderText: {
    fontSize: 80,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  cardContent: {
    padding: 16,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  plantDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },

  // 追加ボタン
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  addButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CatalogScreen;