import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

const Loading = () => {
  // 回転アニメーション用の値
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 画面表示時にアニメーション開始
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,            // 0 → 1
        duration: 1000,        // 1秒で1回転
        easing: Easing.linear, // 等速回転
        useNativeDriver: true, // パフォーマンス向上
      })
    ).start();
  }, []);

  // 数値を回転角度に変換
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* 回転するローディング */}
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ rotate }] },
        ]}
      />

      {/* ローディングメッセージ */}
      <Text style={styles.text}>Now Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 縦中央
    alignItems: "center",     // 横中央
    backgroundColor: "#ffffff",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,          // 円にする
    borderWidth: 4,
    borderColor: "#E0E0E0",    // 薄い色
    borderTopColor: "#8BC34A", // 上だけ色を付ける
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#8BC34A",
    fontWeight: "bold",
  },
});

export default Loading;
