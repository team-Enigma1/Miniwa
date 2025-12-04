import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
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
import styles from '../styles/CatalogScreen.styles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CatalogScreen = async () => {
  const router = useRouter();
  const access_token = await AsyncStorage.getItem("access_token");
  
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

  useEffect(() => {
  const fetchUserPlants = async () => {
    if (!access_token) return;

    const response = await fetch("https://hsysypmwztiyyonpcgjq/api/user/userPlants", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  fetchUserPlants();
}, []);


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

export default CatalogScreen; 