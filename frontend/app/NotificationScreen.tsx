import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from "react-native";
import SwitchButton from "../components/ui/SwitchButton";
import styles from '../styles/NotificationScreen.style';
import BackButton from '../components/ui/BackButton';

const NotificationScreen = () =>{
    return (
        <View style={styles.container}>
            <View style = {styles.backIcon}>
                <BackButton />
            </View>
            <Text style ={styles.Title}>通知設定</Text>
            {/* お手入れ通知 */}
            <Text style={styles.sectionTitle}>お手入れ通知</Text>
            <View >
                <SwitchButton
                    label="水やり"
                    IconComponent={<MaterialIcons name="opacity" size={20} color="blue" />}
                />
            </View>

            {/* SNS通知 */}
            <Text style={styles.sectionTitle}>SNS通知</Text>
            <View>
                <SwitchButton
                    label="投稿への「いいね」"
                    IconComponent={<MaterialIcons name="favorite" size={20} color="#E74C3C" />}
                />
                <SwitchButton
                    label="投稿へのコメント"
                    IconComponent={<MaterialIcons name="chat-bubble" size={20} color="#000" />}
                />
                <SwitchButton
                    label="相談への返信"
                    IconComponent={<MaterialIcons name="reply" size={20} color="#000" />}
                />
            </View>

            {/* 保存ボタン */}
            <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => router.push("/ProfileScreen")}>
                <Text style={styles.saveButtonText}>設定を保存する</Text>
            </TouchableOpacity>
        </View>
    );
}
export default NotificationScreen;