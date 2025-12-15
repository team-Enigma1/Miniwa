import { useRouter } from 'expo-router';
import React from 'react';
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

const PlantDetailScreen = () => {
  const router = useRouter();
  const [growthDay, setGrowthDay] = useState(45);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleRecord = () => {
    router.push('/GrowthRecordScreen');
  };

  const handleDeletePress = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Plant deleted');
    setShowDeleteModal(false);
    router.back();
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleHarvest = () => {
    console.log('Plant harvested');
    // Handle harvest logic
  };

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
        <Text style={styles.headerTitle}>イチゴ</Text>
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
          <Image
            source={require('../assets/images/1.png')}
            style={styles.plantImage}
            resizeMode="contain"
          />
        </View>

        {/* Water Schedule Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.waterIcon}>💧</Text>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>水やりのスケジュール</Text>
              <Text style={styles.cardSubtitle}>午前中と夕方の一日2回</Text>
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
                直射日光6時間以上（午前中が最適）
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
              <Text style={styles.cardSubtitle}>約90日</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineStartDate}>植付け 5月1日</Text>
              <Text style={styles.timelineEndDate}>収穫まであと10日</Text>
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
