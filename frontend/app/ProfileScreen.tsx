import React from 'react';
import BottomNav from "../components/ui/BottomNavigation";
import { Text, View, StatusBar, StyleSheet } from 'react-native';

const ProfileScreen = () =>{
    return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <BottomNav />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    },
});
export default ProfileScreen;