import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/PlantDetailScreen.styles'; 

// Itemの型定義
interface Item {
  id: number;
  name: string;
  description: string;
  emoji: string;
}

// PlantDataの型定義
interface PlantData {
  name: string;
  emoji: string;
  heroTitle: string;
  heroSubtitle: string;
  items: Item[];
}

const PlantDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 選択されたアイテムとモーダルの状態管理
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Backendで取得する植物データ（TODO: 本番ではAPIから取得）
  const plantsData: { [key: string]: PlantData } = {
    'ミニトマト': {
      name: 'ミニトマト',
      emoji: '🍅',
      heroTitle: 'ミニトマトを育てよう！',
      heroSubtitle: 'これらのアイテムがあれば今日から始められます！',
      items: [
        {
          id: 1,
          name: 'ミニトマトの種子',
          description:
            '糖度の高い品種のミニトマトの種子。発芽率が高く、初心者でも育てやすい品種です。',
          emoji: '🌱',
        },
        {
          id: 2,
          name: 'トマト専用培養土',
          description:
            'トマトの成長に必要な栄養分をバランス良く配合。水はけと保水性に優れています。',
          emoji: '🪴',
        },
        {
          id: 3,
          name: 'ミニトマト用支柱',
          description:
            '成長したミニトマトを支える丈夫な支柱。高さ調整可能で、長期間使用できます。',
          emoji: '🎋',
        },
      ],
    },
    'イチゴ': {
      name: 'イチゴ',
      emoji: '🍓',
      heroTitle: 'イチゴを育てよう！',
      heroSubtitle: 'これらのアイテムがあれば今日から始められます！',
      items: [
        {
          id: 1,
          name: 'イチゴの苗',
          description:
            '厳選された甘い品種のイチゴの苗。発芽率が高く、家庭菜園に最適です。日当たりの良い場所を選びましょう。',
          emoji: '🌱',
        },
        {
          id: 2,
          name: '高品質培養土',
          description:
            'イチゴの成長に必要な栄養分をバランス良く含んだ、水はけと水持ちの良い培養土です。根張りを促進し、健康な苗を育てます。',
          emoji: '🪴',
        },
        {
          id: 3,
          name: 'イチゴ用プランター',
          description:
            'イチゴの栽培に適した深さと広さを持つ、通気性の良いプランターです。複数の苗を植えることができます。',
          emoji: '🪴',
        },
      ],
    },
  };

  // URLパラメータから植物名を取得
  const plantName = params.plantName as string;
  const currentPlant = plantsData[plantName] || plantsData['イチゴ']; // デフォルト fallback

  // 戻るボタン処理
  const handleGoBack = () => {
    router.back();
  };

  // アイテム選択時にモーダルを表示
  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // モーダルを閉じる処理
  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // TODO: バックエンド連携（購入リンク）
  const handleAmazonPurchase = () => {
    console.log('Amazon purchase:', selectedItem?.name);
    // ここでAPIや外部リンクを開く処理
  };

  // 準備完了ボタン処理
  const handleComplete = () => {
    console.log('Setup complete');
    router.back(); // 次画面への遷移も可能
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentPlant.name}を育てよう</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{currentPlant.heroTitle}</Text>
            <Text style={styles.heroSubtitle}>{currentPlant.heroSubtitle}</Text>
          </View>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroEmoji}>{currentPlant.emoji}</Text>
          </View>
        </View>

        {/* 必要アイテムセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>必要なアイテム</Text>

          {currentPlant.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.itemImageContainer}>
                <View style={styles.itemImagePlaceholder}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                </View>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 完了ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>準備完了</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* モーダル */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* 閉じるボタン */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
              activeOpacity={0.7}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            {/* モーダル本文 */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{selectedItem?.name}</Text>

              {/* アイテム詳細（例1） */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>高品質{selectedItem?.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem?.description} プロフェッショナルな栽培者も推奨する高品質な商品です。
                </Text>
                <TouchableOpacity
                  style={styles.amazonButton}
                  onPress={handleAmazonPurchase} // TODO: バックエンド連携
                  activeOpacity={0.8}
                >
                  <Text style={styles.amazonIcon}>🛒</Text>
                  <Text style={styles.amazonButtonText}>Amazonで購入</Text>
                </TouchableOpacity>
              </View>

              {/* アイテム詳細（例2） */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>有機{selectedItem?.name}</Text>
                <Text style={styles.modalDescription}>
                  天然素材を使用した有機栽培向けの商品。環境にも優しく、安心して使用できます。
                </Text>
                <TouchableOpacity
                  style={styles.amazonButton}
                  onPress={handleAmazonPurchase} // TODO: バックエンド連携
                  activeOpacity={0.8}
                >
                  <Text style={styles.amazonIcon}>🛒</Text>
                  <Text style={styles.amazonButtonText}>Amazonで購入</Text>
                </TouchableOpacity>
              </View>

              {/* アイテム詳細（例3） */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>お得な{selectedItem?.name}セット</Text>
                <Text style={styles.modalDescription}>
                  初心者向けのお得なセット商品。必要なものが全て揃っているので、すぐに始められます。
                </Text>
                <TouchableOpacity
                  style={styles.amazonButton}
                  onPress={handleAmazonPurchase} // TODO: バックエンド連携
                  activeOpacity={0.8}
                >
                  <Text style={styles.amazonIcon}>🛒</Text>
                  <Text style={styles.amazonButtonText}>Amazonで購入</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default PlantDetailScreen; 