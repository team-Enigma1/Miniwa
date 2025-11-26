import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


interface GrowthRecord {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

const GrowthRecordScreen = () => {
  const router = useRouter();

  const [records, setRecords] = useState<GrowthRecord[]>([
    {
      id: 1,
      date: '2025/12/10',
      title: '初めての芽が咲いた！',
      description: '早起きて可愛いな芽が咲きました。これから芽がなるのが楽しみ！',
      image: '🌱',
    },
    {
      id: 2,
      date: '2025/02/20',
      title: '葉っぱが大きくなった',
      description: 'ぐんぐん育ってます。毎日見るのが楽しいです。',
      image: '🌿',
    },
  ]);

  const handleBack = () => {
    router.back();
  };

const handleAddRecord = () => {

  router.push('/NewRecordScreen');
};



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>イチゴの成長記録</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Records List */}
        {records.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            {/* Date */}
            <Text style={styles.recordDate}>{record.date}</Text>

            {/* Image */}
            <View style={styles.recordImage}>
              <Text style={styles.recordImagePlaceholder}>{record.image}</Text>
              <View style={styles.imagePlaceholderOverlay}>
                <Text style={styles.imagePlaceholderText}>📷</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.recordContent}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordDescription}>{record.description}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

    {/* Floating Add Button */}
    <TouchableOpacity
    style={styles.addButton}
    onPress={handleAddRecord}
    activeOpacity={0.9}
    >
    <Text style={styles.addButtonIcon}>+</Text>
    </TouchableOpacity>
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
    paddingTop: 20,
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
  backIcon: {
    fontSize: 32,
    color: '#1A1A1A',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSpacer: {
    width: 40,
  },

  // Record Card
  recordCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#999999',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 8,
  },
  recordImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8F5E9',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordImagePlaceholder: {
    fontSize: 80,
    opacity: 0.3,
  },
  imagePlaceholderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
    opacity: 0.5,
  },
  recordContent: {
    padding: 16,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  recordDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },

  // Floating Add Button
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default GrowthRecordScreen;