import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useSegments } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = `/${segments[segments.length - 1] || ""}`;

  const isActive = (screen: string) => currentRoute === screen;

  const handlePlantNav = () => router.push("/MyGardenScreen");
  const handleCalendarNav = () => router.push("/CalendarScreen");
  const handleHomeNav = () => router.push("/HomeScreen");
  const handleCommunityNav = () => {
    // router.push("/CommunityScreen");
    console.log("Navigasi ke CommunityScreen (sementara dinonaktifkan)");
  };
  const handleProfileNav = () => router.push("/ProfileScreen");

  return (
    <View style={styles.bottomNav}>

      {/* PLANT */}
      <TouchableOpacity style={styles.navItem} onPress={handlePlantNav} activeOpacity={0.7}>
        <View style={[styles.navActiveIndicator, isActive("/MyGardenScreen") && { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
          <Text style={[styles.navIcon, isActive("/MyGardenScreen") && styles.navIconActive]}>🌱</Text>
        </View>
        <Text style={[styles.navLabel, isActive("/MyGardenScreen") && styles.navLabelActive]}>マイガーデン</Text>
      </TouchableOpacity>

      {/* CALENDAR */}
      <TouchableOpacity style={styles.navItem} onPress={handleCalendarNav} activeOpacity={0.7}>
        <View style={[styles.navActiveIndicator, isActive("/CalendarScreen") && { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
          <Text style={[styles.navIcon, isActive("/CalendarScreen") && styles.navIconActive]}>📅</Text>
        </View>
        <Text style={[styles.navLabel, isActive("/CalendarScreen") && styles.navLabelActive]}>カレンダー</Text>
      </TouchableOpacity>

      {/* HOME */}
      <TouchableOpacity style={styles.navItem} onPress={handleHomeNav} activeOpacity={0.7}>
        <View style={[styles.navActiveIndicator, isActive("/HomeScreen") && { backgroundColor: "rgba(46, 204, 113, 0.25)", paddingHorizontal: 20, paddingVertical: 10 }]}>
          <Text style={[styles.navIcon, styles.navIconHome, isActive("/HomeScreen") && styles.navIconActive]}>🏠</Text>
        </View>
        <Text style={[styles.navLabel, isActive("/HomeScreen") && styles.navLabelActive]}>ホーム</Text>
      </TouchableOpacity>

      {/* COMMUNITY */}
      <TouchableOpacity style={styles.navItem} onPress={handleCommunityNav} activeOpacity={0.7}>
        <View style={[styles.navActiveIndicator, isActive("/CommunityScreen") && { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
          <Text style={[styles.navIcon, isActive("/CommunityScreen") && styles.navIconActive]}>💬</Text>
        </View>
        <Text style={[styles.navLabel, isActive("/CommunityScreen") && styles.navLabelActive]}>コミュニティ</Text>
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity style={styles.navItem} onPress={handleProfileNav} activeOpacity={0.7}>
        <View style={[styles.navActiveIndicator, isActive("/ProfileScreen") && { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
          <Text style={[styles.navIcon, isActive("/ProfileScreen") && styles.navIconActive]}>👤</Text>
        </View>
        <Text style={[styles.navLabel, isActive("/ProfileScreen") && styles.navLabelActive]}>プロフィール</Text>
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

  navActiveIndicator: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  navIcon: {
    fontSize: 22,
    opacity: 0.5,
  },

  navIconHome: {
    fontSize: 24,
  },

  navIconActive: {
    opacity: 1,
    color: "#2ECC71",
  },

  navLabel: {
    fontSize: 10,
    color: "#666666",
    fontWeight: "500",
    marginTop: 4,
  },

  navLabelActive: {
    color: "#2ECC71",
    fontWeight: "600",
  },
});

export default BottomNavigation;
