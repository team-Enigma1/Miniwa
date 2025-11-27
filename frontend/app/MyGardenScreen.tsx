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

interface PlantItem {
  id: number;
  name: string;
  emoji: string;
  type: string;
  plantDate: string;
  health: string;
  harvestDate?: string;
}

const MyGardenScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'growing' | 'harvested'>('growing');

  const [plants, setPlants] = useState<PlantItem[]>([
    { id: 1, name: 'イチゴ', emoji: '🍓', type: '野菜', plantDate: '1日と前', health: '良好' },
    { id: 2, name: 'ミニトマト', emoji: '🍅', type: '野菜', plantDate: '1日と前', health: '良好' },
  ]);

  const [harvestedPlants, setHarvestedPlants] = useState<PlantItem[]>([
    { id: 3, name: 'メロン', emoji: '🍈', type: '野菜', plantDate: '90日前', health: '収穫完了', harvestDate: '2025年12月04日' },
  ]);

  const handlePlantPress = (plant: PlantItem) => {
    router.push(`/PlantProfilescreen?plantId=${plant.id}`);
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
              activeOpacity={0.7}
            >
              <View style={styles.plantImageContainer}>
                <Text style={styles.plantEmoji}>{plant.emoji}</Text>
              </View>
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.name}</Text>
                {activeTab === 'harvested' && plant.harvestDate ? (
                  <Text style={styles.harvestDate}>収穫日：{plant.harvestDate}</Text>
                ) : (
                  <View style={styles.plantMeta}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>🌱</Text>
                      <Text style={styles.metaText}>{plant.type}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>📅</Text>
                      <Text style={styles.metaText}>{plant.plantDate}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>❤️</Text>
                      <Text style={styles.metaText}>{plant.health}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={28} color="#CCCCCC" />
              </View>
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
    paddingTop: 12,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  // Tab Container
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2ECC71',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999999',
  },
  tabTextActive: {
    color: '#2ECC71',
  },

  // Plant List
  plantList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  plantImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plantEmoji: {
    fontSize: 32,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  plantMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 11,
    color: '#666666',
  },
  harvestDate: {
    fontSize: 13,
    color: '#666666',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Floating Add Button
  addButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  addButtonIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default MyGardenScreen;