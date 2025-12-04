import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  const handlePlantNav = () => router.push("/MyGardenScreen");
  const handleHomeNav = () => router.push("/HomeScreen");
  const handleCommunityNav = () => console.log("Community");
  const handleProfileNav = () => router.push("/ProfileScreen");

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={handlePlantNav} activeOpacity={0.7}>
        <MaterialIcons name="local-florist" size={22}  color={pathname === "/MyGardenScreen" ? "#2ECC71" : "#666"} 
        />
        <Text style={[styles.navLabel, pathname === "/MyGardenScreen" && styles.navLabelActive]}>植物</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleHomeNav} activeOpacity={0.7}>
        <MaterialIcons name="home" size={22} color={pathname === "/HomeScreen" ? "#2ECC71" : "#666"} 
        />
        <Text style={[styles.navLabel, pathname === "/HomeScreen" && styles.navLabelActive]}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleCommunityNav} activeOpacity={0.7}>
        <MaterialIcons name="connect-without-contact" size={22} color={pathname === "/CommunityScreen" ? "#2ECC71" : "#666"} 
        />
        <Text style={[styles.navLabel, pathname === "/CommunityScreen" && styles.navLabelActive]}>コミュニティ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleProfileNav} activeOpacity={0.7}>
        <MaterialIcons name="person" size={22} color={pathname === "/ProfileScreen" ? "#2ECC71" : "#666"} 
        />
        <Text style={[styles.navLabel, pathname === "/ProfileScreen" && styles.navLabelActive]}>プロフィール</Text>
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
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
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