import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/ProfileScreen.style';
import BottomNav from "../components/ui/BottomNavigation";
import { USER_PROFILE } from "../constants/user";
import Click_Button from "../components/ui/ClickButton";
import CardBox from "../components/ui/CardBox";
import ProfileEditModal from "../app/ProfileEditModal";
import RegionSelectModal from '../components/RegionSelectModal';
import { getUserData, updateLocation, updateUserData, getUserPlants } from '@/api/user';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegionModalVisible, setIsRegionModalVisible] = useState(false);
    // 編集前の値を保存
    const [originalName, setOriginalName] = useState('');
    const [originalBio, setOriginalBio] = useState('');
    const [originalIcon, setOriginalIcon] = useState('');
    // 編集に使う値
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [icon, setIcon] = useState('');
    const [userPlants, setUserPlants] = useState([]);
    const [prefecture, setPrefecture] = useState('');

    const openIconPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setIcon(uri);
        }
    };

    const handleSave = async () => {
        if (name === originalName && bio === originalBio && icon === originalIcon) return;

        try {
            setIsModalVisible(false);

            const updatedUser = await updateUserData({
                ...(name !== originalName && { username: name }),
                ...(bio !== originalBio && { description: bio }),
                ...(icon !== originalIcon && { profile_img: icon }),
            });

            setOriginalName(updatedUser.username);
            setOriginalBio(updatedUser.description);
            setOriginalIcon(updatedUser.profile_img);
        } catch (error) {
            console.error("ユーザーデータ更新失敗:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("access_token");
            router.replace("/WelcomeScreen"); // or "/LoginScreen"
        } catch (e) {
            console.error("ログアウト失敗:", e);
        }
    };


    useEffect(() => {
        const loadUser = async () => {
            try {
            const token = await AsyncStorage.getItem("access_token");
            if (!token) return;    

            const data = await getUserData();

            setName(data.username ?? "");
            setBio(data.description ?? "");
            setIcon(data.profile_img ?? "");
            setPrefecture(data.location ?? "");

            setOriginalName(data.username ?? "");
            setOriginalBio(data.description ?? "");
            setOriginalIcon(data.profile_img ?? "");

            const plants = await getUserPlants();
            setUserPlants(plants);

            } catch (e) {
            console.error("ユーザーデータ取得失敗:", e);
            }
        };

        loadUser();
    }, []);

    return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            {/* ログアウト（右上） */}
            <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            >
            <Text style={styles.logoutText}>ログアウト</Text>
            </TouchableOpacity>

            {/* プロフィールアイコン
            <TouchableOpacity onPress={openIconPicker}>
                <View style={styles.iconCircle}>
                    <Image
                    source={icon ? { uri: icon } : require('../assets/images/IMAGE.png')}
                    style={styles.iconImage}
                    />
                </View>
            </TouchableOpacity>
            */}

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
                data={userPlants.length}
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
                label={
                    prefecture
                    ? `地域設定：${prefecture}`
                    : "地域設定：未設定"
                }
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
                onSave={async (value) => {
                    try {
                        setPrefecture(value);

                        await updateLocation({ location: value });

                        setIsRegionModalVisible(false)
                    } catch (e) {
                        console.error(e)
                    }
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