import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/ProfileScreen.style';
import BottomNav from "../components/ui/BottomNavigation";
import { USER_PROFILE } from "../constants/user";
import Click_Button from "../components/ui/ClickButton";


const ProfileScreen = () =>{
    
    return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            {/* プロフィールアイコン */}
            <View style={styles.iconCircle}>
            <Text style={styles.iconText}></Text>
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

            {/* 活動実績 */}
            <View style={styles.settingSection}>
                <Text style={styles.settingTitle}>活動実績</Text>
                <Click_Button 
                label="育てている植物" 
                IconComponent={<MaterialIcons name="grass" size={22}  color="green"/>}
                onPress={() => router.push("/CatalogScreen")}
                />
                <Click_Button 
                label="収穫数" 
                IconComponent={<MaterialIcons name="all-inbox" size={22}  color=""/>}
                />
                <Click_Button 
                label="投稿数" 
                IconComponent={<MaterialIcons name="comment" size={22}  color="#555"/>}
                />
                <Click_Button 
                label="もらったいいね"
                IconComponent={<MaterialIcons name="favorite" size={22}  color="red"/>}
                />
            </View>

            {/* 設定 */}
            <View style={styles.settingSection}>
                <Text style={styles.settingTitle}>設定</Text>
                {/* 通知設定 */}
                <Click_Button label="通知設定" 
                IconComponent={<MaterialIcons name="notifications-active" size={22}  color="gold"/>}
                />
            </View>

            {/* 下部ナビ */}
            <BottomNav />
        </View>
    </View>
    );
}
export default ProfileScreen;