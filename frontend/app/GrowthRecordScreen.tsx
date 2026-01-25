import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { useLocalSearchParams } from 'expo-router';
import { Record } from '@/types/record';
import { getPlantRecord } from '@/api/record';

const GrowthRecordScreen = () => {
  const router = useRouter();
  const { userPlantId } = useLocalSearchParams<{ userPlantId: string }>();
  const numericUserPlantId = Number(userPlantId)

  const [records, setRecords] = useState<Record[]>([]);

  const handleBack = () => {
    router.back();
  };

  const handleAddRecord = () => {
    router.push({
      pathname: "/NewRecordScreen",
      params: { userPlantId: numericUserPlantId }
    });
  };

  useEffect(() => {
    if (!numericUserPlantId) return;

    const fetchPlantRecord = async () => {
      const res = await getPlantRecord(numericUserPlantId);

      if (Array.isArray(res)) {
        setRecords(res);
      } else if (Array.isArray(res?.data)) {
        setRecords(res.data);
      } else {
        setRecords([]); 
      }
    };

    fetchPlantRecord();
  }, [numericUserPlantId]);


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
            <Text style={styles.recordDate}>{record.created_at}</Text>

            {/* Image */}
            <View style={styles.recordImage}>
              <Image source={{ uri: record.image_url }} />
              <View style={styles.imagePlaceholderOverlay}>
                <Text style={styles.imagePlaceholderText}>📷</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.recordContent}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordDescription}>{record.content}</Text>
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
