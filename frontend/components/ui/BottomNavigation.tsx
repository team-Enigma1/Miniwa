import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.bottomNav}>

      {/* 植物 */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/CatalogScreen")}
      >
        <MaterialIcons
          name="local-florist"
          size={isActive("/CatalogScreen") ? 24 : 22}
          color={isActive("/CatalogScreen") ? "#2ECC71" : "#999"}
        />
        <Text
          style={[styles.navLabel, isActive("/CatalogScreen") && styles.navLabelActive]}
        >
          植物
        </Text>
      </TouchableOpacity>

      {/* カレンダー */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/calendar")}
      >
        <MaterialIcons
          name="calendar-month"
          size={isActive("/calendar") ? 24 : 22}
          color={isActive("/calendar") ? "#2ECC71" : "#999"}
        />
        <Text
          style={[styles.navLabel, isActive("/CalendarScreen") && styles.navLabelActive]}
        >
          カレンダー
        </Text>
      </TouchableOpacity>

      {/* ホーム */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/HomeScreen")}
      >
        <MaterialIcons
          name="home"
          size={isActive("/HomeScreen") ? 24 : 22}
          color={isActive("/HomeScreen") ? "#2ECC71" : "#999"}
        />
        <Text
          style={[styles.navLabel, isActive("/HomeScreen") && styles.navLabelActive]}
        >
          ホーム
        </Text>
      </TouchableOpacity>

      {/* コミュニティ */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("../Community")}
      >
        <MaterialIcons
          name="connect-without-contact"
          size={isActive("/CommunityScreen") ? 24 : 22}
          color={isActive("/CommunityScreen") ? "#2ECC71" : "#999"}
        />
        <Text
          style={[styles.navLabel, isActive("/CommunityScreen") && styles.navLabelActive]}
        >
          コミュニティ
        </Text>
      </TouchableOpacity>

      {/* プロフィール */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/ProfileScreen")}
      >
        <MaterialIcons
          name="person"
          size={isActive("/ProfileScreen") ? 24 : 22}
          color={isActive("/ProfileScreen") ? "#2ECC71" : "#999"}
        />
        <Text
          style={[styles.navLabel, isActive("/ProfileScreen") && styles.navLabelActive]}
        >
          プロフィール
        </Text>
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