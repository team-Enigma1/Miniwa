import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { router } from 'expo-router';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/ProfileScreen.style';
import BottomNav from "../components/ui/BottomNavigation";
import { USER_PROFILE } from "../constants/user";
import Click_Button from "../components/ui/ClickButton";
import CardBox from "../components/ui/CardBox";
import ProfileEditModal from "../app/ProfileEditModal";
import RegionSelectModal from '../components/RegionSelectModal';

const ProfileScreen = () =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegionModalVisible, setIsRegionModalVisible] = useState(false);
    // 編集前の値を保存
    const [originalName, setOriginalName] = useState(USER_PROFILE.name);
    const [originalBio, setOriginalBio] = useState(USER_PROFILE.bio);
    // 編集に使う値
    const [name, setName] = useState(USER_PROFILE.name);
    const [bio, setBio] = useState(USER_PROFILE.bio);
    const [prefecture, setPrefecture] = useState(USER_PROFILE.prefecture);

    const handleSave = () => {
    setIsModalVisible(false);
    console.log("保存:", { name, bio });
    // ここでAPI保存やAsyncStorageに保存も可能
    };

    return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>

            {/* プロフィールアイコン */}
            <View style={styles.iconCircle}>
                <Image
                    source={USER_PROFILE.icon}
                    style={styles.iconImage}
                />
            </View>

            {/* 名前 */}
            <Text style={styles.name}>{name}</Text>

            {/* 自己紹介 */}
            <View style={styles.bioBox}>
                <Text style={styles.bioText}>{bio}</Text>
            </View>

            {/* プロフィール編集 */}
            <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
                // 編集前の値を保存
                setOriginalName(name);
                setOriginalBio(bio);

                setIsModalVisible(true);
            }}>
            <Text style={styles.editButtonText}>プロフィールを編集</Text>
            </TouchableOpacity>


            {/* 活動実績 */}
            <View style={styles.settingSection}>
                <Text style={styles.settingTitle}>活動実績</Text>
                <CardBox 
                label="育てている植物" 
                IconComponent={<MaterialIcons name="grass" size={22}  color="green"/>}
                data={USER_PROFILE.plant}
                />
                <CardBox
                label="収穫数" 
                IconComponent={<MaterialIcons name="all-inbox" size={22}  color=""/>}
                data={USER_PROFILE.crop}
                />
                <CardBox
                label="もらったいいね"
                IconComponent={<MaterialIcons name="favorite" size={22}  color="red"/>}
                data={USER_PROFILE.good}
                />
            </View>

            {/* 設定 */}
            <View style={styles.settingSection}>
                <Text style={styles.settingTitle}>設定</Text>
                {/* 通知設定 */}
                <Click_Button 
                label="通知設定" 
                IconComponent={<MaterialIcons name="notifications-active" size={22}  color="gold"/>}
                onPress={() => router.push("/NotificationScreen")}
                />
                {/* 地域設定 */}
                <Click_Button
                label={`地域設定：${prefecture}`}
                IconComponent={<MaterialIcons name="location-pin" size={22} />}
                onPress={() => {setIsRegionModalVisible(true);}}
                />
            </View>

            {/* 下部ナビ */}
            <BottomNav />

            {/* モーダル表示 */}
            <ProfileEditModal
                visible={isModalVisible}
                name={name}
                bio={bio}
                onChangeName={setName}
                onChangeBio={setBio}
                onSave={handleSave}
                onClose={() => {
                    // 変更を破棄して元の値に戻す
                    setName(originalName);
                    setBio(originalBio);
                    setIsModalVisible(false);
                }}
            />
            <RegionSelectModal
                visible={isRegionModalVisible}
                value={prefecture}
                onSave={(value) => {
                setPrefecture(value);
                setIsRegionModalVisible(false);
                }}
                onClose={() => {
                setIsRegionModalVisible(false);
                }}
            />
        </View>
    </View>
    );
}
export default ProfileScreen;