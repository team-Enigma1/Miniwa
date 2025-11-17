import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/ProfileScreen.style';
import BottomNav from "../components/ui/BottomNavigation";
import { USER_PROFILE } from "../constants/user";

const ProfileScreen = () =>{
    
    return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            {/* プロフィールアイコン */}
            <View style={styles.iconCircle}>
            <Text style={styles.iconText}>👤</Text>
            </View>

            {/* 名前 */}
            <Text style={styles.name}>{USER_PROFILE.name}</Text>

            {/* 自己紹介 */}
            <View style={styles.bioBox}>
                <Text style={styles.bioText}>{USER_PROFILE.bio}</Text>
            </View>

            {/* プロフィール編集 */}
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>プロフィールを編集</Text>
            </TouchableOpacity>

            {/* 設定 */}
            <View style={styles.settingSection}>
                <Text style={styles.settingTitle}>設定</Text>
                {/* 通知設定 */}
                <TouchableOpacity style={styles.settingRow}>
                <Text style={styles.settingRowLeft}>通知設定</Text>
                <Text style={styles.settingRowRight}>＞</Text>
                </TouchableOpacity>
            </View>

            <BottomNav />
        </View>
    </View>
    );
}
export default ProfileScreen;