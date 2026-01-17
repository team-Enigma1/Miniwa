import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useEffect, useState } from 'react';
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
import { Plant } from '@/types/plant';
import { Seeds, Fertilizers, Soils } from '@/types/material';
import { 
  SEEDS_API_URL,
  FERTILIZERS_API_URL,
  SOILS_API_URL
} from '@/api/url';
import { openURL } from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MaterialType = 'seed' | 'fertilizer' | 'soil';

// Itemの型定義
type Material = {      
  id: number;        
  plantId?: number;
  name: string;
  description: string;
  price: number;
  url: string;
  type: MaterialType;
}

const itemCategories: {
  id: MaterialType;
  name: string;
  emoji: string;
  description: string;
}[] = [
  { id: "seed", name: "種", emoji: "🌱", description: "植物を育てるための種" },
  { id: "fertilizer", name: "肥料", emoji: "🧪", description: "成長を促進する肥料" },
  { id: "soil", name: "土", emoji: "🪴", description: "植物に適した土" },
];


const PlantDetailScreen = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // 選択されたアイテムとモーダルの状態管理
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedItems, setSelectedItems] = useState<Material[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');

  // Backendで取得する植物データ（TODO: 本番ではAPIから取得）
  const {
    plantId,
    plantName,
    plantEmoji,
    plantDescription,
    plantSeason
  } = useLocalSearchParams<{
    plantId: string;
    plantName: string;
    plantEmoji: string;
    plantDescription: string;
    plantSeason: string;
  }>();

  const plantData: Plant = {
    id: Number(plantId),
    name: plantName,
    description: plantDescription,
    season: plantSeason,
    img: plantEmoji,
  }

  const mapSeed = (raw: any): Material => ({
    id: raw.Seed_id,
    type: 'seed',
    plantId: raw.Plant_id,
    name: raw.Seed_name,
    description: raw.Desc,
    url: raw.Url,
    price: raw.Price,
  });

  const mapFertilizer = (raw: any): Material => ({
    id: raw.Fertilizer_id,
    type: 'fertilizer',
    plantId: raw.Plant_id,
    name: raw.Fname,
    description: raw.Npk_ratio,
    url: raw.Url,
    price: raw.Price,
  });

  const mapSoil = (raw: any): Material => ({
    id: raw.Rec_id,
    type: 'soil',
    plantId: raw.Plant_id,
    name: raw.Sname,
    description: raw.Desc,
    url: raw.Url,
    price: raw.Price,
  });

  // 戻るボタン処理
  const handleGoBack = () => {
    router.back();
  };

  // 準備完了ボタン処理
  const handleComplete = () => {
    console.log('Setup complete');
    router.back(); // 次画面への遷移も可能
  };

  useEffect(() => {
    if (!plantId) {
      console.error("Invalid plantId");
      return;
    }

    const materialData = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setToken(token);

      if (!token) return;

      try {
        const [seedRes, fertilizerRes, soilRes] = await Promise.all([
          fetch(`${SEEDS_API_URL}?plant_id=${plantId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }),
          fetch(`${FERTILIZERS_API_URL}?plant_id=${plantId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }),
          fetch(`${SOILS_API_URL}?plant_id=${plantId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }),
        ]);

        if (!seedRes.ok || !fertilizerRes.ok || !soilRes.ok) {
          throw new Error("Failed to fetch material data");
        }

        const [seedsData, fertilizersData, soilsData] = await Promise.all([
          seedRes.json(),
          fertilizerRes.json(),
          soilRes.json(),
        ]);

        const merged: Material[] = [
          ...seedsData.map(mapSeed),
          ...fertilizersData.map(mapFertilizer),
          ...soilsData.map(mapSoil),
        ];
        setMaterials(merged);
      } catch (error) {
        console.error("Material fetch error:", error);
      }
    };

    materialData();
}, [plantId]);

const openModal = (type: MaterialType) => {
    const filtered = materials.filter((m) => m.type === type);

    setSelectedItems(filtered);
    setModalTitle(
      type === "seed"
        ? "おすすめの種"
        : type === "fertilizer"
        ? "おすすめの肥料"
        : "おすすめの土"
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItems([]);
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{plantData.name}を育てよう</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{plantData.name}を育てよう</Text>
            <Text style={styles.heroSubtitle}>{plantData.description}</Text>
          </View>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroEmoji}>{plantData.img}</Text>
          </View>
        </View>

        {/* 必要アイテムセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>必要なアイテム</Text>

          {itemCategories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => openModal(item.id)}
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
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* 閉じるボタン */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
              activeOpacity={0.7}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            {/* モーダル本文 */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>

              {/* アイテム詳細（例1） */}
              {selectedItems.map((item) =>  (
                <View key={`${item.type}-${item.id}`} style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>{item.name}</Text>
                <Text style={styles.modalDescription}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.amazonButton}
                  onPress={() => openURL(item.url)} // TODO: バックエンド連携
                  activeOpacity={0.8}
                >
                  <Text style={styles.amazonIcon}>🛒</Text>
                  <Text style={styles.amazonButtonText}>Amazonで購入</Text>
                </TouchableOpacity>
              </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default PlantDetailScreen; 