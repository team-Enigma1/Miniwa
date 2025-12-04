import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from "../components/ui/BottomNavigation";
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MyGardenScreen.styles'; 

interface PlantItem {
  id: number;
  name: string;
  emoji: string;
  watering?: string;
  plantDate?: string;
  sunlight?: string;
  harvestDate?: string;
}

const MyGardenScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'growing' | 'harvested'>('growing');

  const [plants] = useState<PlantItem[]>([
    { id: 1, name: 'イチゴ', emoji: '🍓', watering: '3日に1回', plantDate: '1日と前', sunlight: '日向' },
    { id: 2, name: 'ミニトマト', emoji: '🍅', watering: '3日に1回', plantDate: '1日と前', sunlight: '日向' },
  ]);

const [harvestedPlants] = useState<PlantItem[]>([
  { id: 3, name: 'メロン', emoji: '🍈', harvestDate: '2025年12月04日' },
]);


  const handlePlantPress = (plant: PlantItem) => {
    if (activeTab === 'growing') {
      router.push(`/PlantProfilescreen?plantId=${plant.id}`);
    }
  };

  const handleAddPlant = () => {
    router.push('/CatalogScreen');
  };

  const displayedPlants = activeTab === 'growing' ? plants : harvestedPlants;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>マイガーデン</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'growing' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('growing')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'growing' && styles.tabTextActive,
            ]}
          >
            植物リスト
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'harvested' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('harvested')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'harvested' && styles.tabTextActive,
            ]}
          >
            収穫済み
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.plantList}>
          {displayedPlants.map((plant) => (
            <TouchableOpacity
              key={plant.id}
              style={styles.plantCard}
              onPress={() => handlePlantPress(plant)}
              activeOpacity={activeTab === 'harvested' ? 1 : 0.7}
              disabled={activeTab === 'harvested'}
            >
              <View style={styles.plantImageContainer}>
                <Text style={styles.plantEmoji}>{plant.emoji}</Text>
              </View>
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.name}</Text>
                {activeTab === 'harvested' && plant.harvestDate && (
                  <Text style={styles.harvestDate}>収穫日：{plant.harvestDate}</Text>
                )}
                {activeTab === 'growing' && (
                  <View style={styles.plantMeta}>
        
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>💧</Text>
                      <Text style={styles.metaText}>{plant.watering}</Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>☀️</Text>
                      <Text style={styles.metaText}>{plant.sunlight}</Text>
                    </View>
                  <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>📅</Text>
                      <Text style={styles.metaText}>{plant.plantDate}</Text>
                    </View>
                  </View>
                )}
              </View>
              {activeTab === 'growing' && (
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={28} color="#CCCCCC" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Show Add Button only on growing tab */}
      {activeTab === 'growing' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPlant}
          activeOpacity={0.9}
        >
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      )}

      <BottomNav />
    </SafeAreaView>
  );
};

export default MyGardenScreen;