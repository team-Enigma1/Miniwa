import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/PlantProfile.styles'; 
import { getUserPlants } from '@/api/user';
import { Plant, PlantGrowthImg } from '@/types/plant';
import { deleteUserPlant, harvestPlant, plantGrowthImg } from '@/api/plant';
import { BASE_URL } from '@/api/url';

const PlantDetailScreen = () => {
  const router = useRouter();
  const {userPlantId} = useLocalSearchParams<{ userPlantId: string }>();
  const [growthDay, setGrowthDay] = useState(45);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [plant, setPlant] = useState<Plant | null >(null);
  const [plantImg, setPlantImg] = useState<PlantGrowthImg | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleRecord = () => {
    router.push({
      pathname: "/GrowthRecordScreen",
      params: { userPlantId: plant?.userPlantId }
    });
  };

  const handleDeletePress = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!plant?.userPlantId) return;

    try {
      await deleteUserPlant(plant.userPlantId);
      setShowDeleteModal(false);
      router.back();
    } catch (err) {
      console.error("Failed to delete plant:", err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleHarvest = async () => {
    if (!plant?.userPlantId) return;

    try {
      await harvestPlant(plant.userPlantId);
      router.back();
    } catch (err) {
      console.error("Failed to harvest plant:", err);
    }
  };

  useEffect(() => {
    if (!userPlantId) return;

    const fetchUserPlants = async () => {
      try {
        const data = await getUserPlants();
        console.log(data)

        const selectedPlant = data.find(
          p => String(p.userPlantId) === String(userPlantId)
        );

        setPlant(selectedPlant ?? null);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    const fetchPlantGrowthimg = async () => {
      try {
        const data = await plantGrowthImg(Number(userPlantId));
        console.log("RAW response:", data);

        if (Array.isArray(data) && data.length > 0) {
          setPlantImg(data[0]);
        } else {
          console.warn("Plant growth data kosong:", data);
          setPlantImg(null);
        }
      } catch (error) {
        console.error('Error fetching plant growth image:', error);
      }
    };

    fetchUserPlants();
    fetchPlantGrowthimg();
  }, [userPlantId]);

  console.log("plantImg object:", plantImg);

  if (!plant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{plant.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>削除</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Plant Image */}
        <View style={styles.modelContainer}>
          {plantImg?.plant_id && plantImg?.image_url && (
            <Image
              source={{
                uri: `${BASE_URL}/images/${plantImg.plant_id}/${plantImg.image_url}`,
              }}
              style={styles.plantImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Water Schedule Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.waterIcon}>💧</Text>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>水やりのスケジュール</Text>
              <Text style={styles.cardSubtitle}>午前中と夕方の一日{plant.wateringSched}回</Text>
            </View>
          </View>
        </View>

        {/* Sunlight Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sunIcon}>☀️</Text>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>日光条件</Text>
              <Text style={styles.cardSubtitle}>
                {plant.sunlight}
              </Text>
            </View>
          </View>
        </View>

        {/* Growth Period Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.calendarIcon}>📅</Text>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>生育期間</Text>
              <Text style={styles.cardSubtitle}>{plant.growthDuration}</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineStartDate}>植付け 5月1日</Text>
              <Text style={styles.timelineEndDate}>収穫まであと{plant.harvestAt
                ? Math.ceil(
                    (new Date(plant.harvestAt).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                  )
                : '-'}日</Text>
            </View>

            {/* Slider */}
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderFill,
                    { width: `${(growthDay / 90) * 100}%` },
                  ]}
                />
                <View
                  style={[
                    styles.sliderThumb,
                    { left: `${(growthDay / 90) * 100}%` },
                  ]}
                />
              </View>
            </View>

            {/* Day Labels */}
            <View style={styles.dayLabels}>
              <Text style={styles.dayLabel}>Day1</Text>
              <Text style={styles.dayLabel}>Day45</Text>
              <Text style={styles.dayLabel}>Day90</Text>
            </View>
          </View>

          {/* Record Button */}
          <TouchableOpacity
            style={styles.recordButton}
            onPress={handleRecord}
            activeOpacity={0.8}
          >
            <Text style={styles.recordButtonText}>記録する</Text>
          </TouchableOpacity>
        </View>

        {/* Harvest Button */}
        <TouchableOpacity
          style={styles.harvestButton}
          onPress={handleHarvest}
          activeOpacity={0.8}
        >
          <Text style={styles.harvestButtonText}>収穫する</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleDeleteCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>植物を削除しますか？</Text>
            <Text style={styles.modalDescription}>
              この操作は元に戻せません。リストからこの植物を完全に削除します。
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleDeleteCancel}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.confirmButtonText}>削除する</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PlantDetailScreen;
