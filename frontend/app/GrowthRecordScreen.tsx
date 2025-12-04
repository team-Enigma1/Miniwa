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
import styles from '../styles/GrowthRecord.styles'; 
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

export default GrowthRecordScreen;