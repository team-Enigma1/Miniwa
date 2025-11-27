import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();

  const handlePlantNav = () => router.push("/CatalogScreen");
  const handleCalendarNav = () => console.log("Calendar");
  const handleHomeNav = () => router.push("/HomeScreen");
  const handleCommunityNav = () => console.log("Community");
  const handleProfileNav = () => router.push("/ProfileScreen");

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={handlePlantNav} activeOpacity={0.7}>
        <MaterialIcons name="local-florist" size={22}  color="" style={styles.navIcon}/>
        <Text style={styles.navLabel}>植物</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleCalendarNav} activeOpacity={0.7}>
        <MaterialIcons name="calendar-month" color="" style={styles.navIcon}/>
        <Text style={styles.navLabel}>カレンダー</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleHomeNav} activeOpacity={0.7}>
        <MaterialIcons name="home" color="" style={styles.navIcon}/>
        <Text style={styles.navLabel}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleCommunityNav} activeOpacity={0.7}>
        <MaterialIcons name="connect-without-contact" color="" style={styles.navIcon}/>
        <Text style={styles.navLabel}>コミュニティ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleProfileNav} activeOpacity={0.7}>
        <MaterialIcons name="person" color="" style={styles.navIcon}/>
        <Text style={styles.navLabel}>プロフィール</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  paddingVertical: 8,
  paddingHorizontal: 8,
  borderTopWidth: 1,
  borderTopColor: "#E5E5E5",
  justifyContent: "space-around",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 8,
  zIndex: 100,              
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navItemActive: {
    position: "relative",
  },
  navActiveIndicator: {
    backgroundColor: "rgba(46, 204, 113, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 10,
    color: "#666666",
    fontWeight: "500",
  },
  navLabelActive: {
    fontSize: 10,
    color: "#2ECC71",
    fontWeight: "600",
    marginTop: 4,
  },
});

export default BottomNavigation;
