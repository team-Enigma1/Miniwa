import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from "../components/ui/BottomNavigation";
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/MyGarden.styles'; 
import { Plant, HarvestedPlant } from '../types/plant';
import { getUserPlants } from '@/api/user';
import { getHarvestedPlants } from '@/api/plant';
import { BASE_URL } from '@/api/url';

const MyGardenScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'growing' | 'harvested'>('growing');

  const [plants, setPlants] = useState<Plant[]>([]);

const [harvestedPlants, setHarvestedPlants] = useState<HarvestedPlant[]>([]);

const handlePlantPress = (plant: Plant | HarvestedPlant) => {
  if (activeTab === 'growing') {
    router.push({
      pathname: '/PlantProfileScreen',
      params: { userPlantId: plant.userPlantId },
    });
  }
};


  const handleAddPlant = () => {
    router.push('/CatalogScreen');
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        if (activeTab === "growing") {
          const data = await getUserPlants();
          setPlants(Array.isArray(data) ? data : []);
        } else {
          const data = await getHarvestedPlants();
          setHarvestedPlants(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, [activeTab]);

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
          >植物
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
          >収穫
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.plantList}>
          {displayedPlants?.map((plant) => (
            <TouchableOpacity
              key={(plant as Plant).userPlantId || (plant as HarvestedPlant).id}
              style={styles.plantCard}
              onPress={() => handlePlantPress(plant)}
              activeOpacity={activeTab === 'harvested' ? 1 : 0.7}
              disabled={activeTab === 'harvested'}
            >
              <View style={styles.plantImageContainer}>
                {activeTab === 'growing' && (
                  <Image
                    source={{ uri: `${BASE_URL}${plant.img}` }}
                    style={{width: 64,height: 64, borderRadius: 12}}
                    resizeMode="cover"
                  />
                )}

                {activeTab === 'harvested' && (
                   <Image
                    source={{ uri: `${BASE_URL}${plant.img}` }}
                    style={{width: 64,height: 64, borderRadius: 12}}
                    resizeMode="cover"
                  />
                )}
                
              </View>
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.name}</Text>
                {activeTab === 'harvested' && (
                  <Text style={styles.harvestDate}>収穫日：{(plant as HarvestedPlant).harvestedDate}</Text>
                )}

                {activeTab === 'growing' && (
                  <View style={styles.plantMeta}>
        
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>💧</Text>
                      <Text style={styles.metaText}>{(plant as Plant).wateringSched}</Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>☀️</Text>
                      <Text style={styles.metaText}>{(plant as Plant).sunlight}</Text>
                    </View>
                  <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>📅</Text>
                      <Text style={styles.metaText}>{new Date((plant as Plant).harvestAt).toLocaleDateString()}</Text>
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