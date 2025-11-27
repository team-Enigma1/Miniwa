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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  headerSpacer: {
    width: 40,
  },

  // Model Container
  modelContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },

  // Card
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  waterIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  sunIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  calendarIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },

  // Timeline
  timeline: {
    marginTop: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timelineStartDate: {
    fontSize: 12,
    color: '#666666',
  },
  timelineEndDate: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },

  // Slider
  sliderContainer: {
    marginBottom: 8,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Day Labels
  dayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dayLabel: {
    fontSize: 11,
    color: '#999999',
  },

  // Record Button
  recordButton: {
    marginTop: 16,
    backgroundColor: '#7F8C8D',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  recordButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Harvest Button
  harvestButton: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#2ECC71',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  harvestButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default PlantDetailScreen;