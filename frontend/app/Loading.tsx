import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

const Loading = () => {
  // 回転アニメーション用の値（0〜1）
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 画面表示時にアニメーション開始
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,           // 0 → 1 まで変化
        duration: 1000,       // 1秒で1回転
        easing: Easing.linear,// 等速で回す
        useNativeDriver: true,// パフォーマンス向上
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

      {/* メインメッセージ */}
      <Text style={styles.text}>認証メールを送信しました</Text>

      {/* サブメッセージ */}
      <Text style={styles.subText}>
        メールを確認して認証を完了してください
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,            // 円にする
    borderWidth: 4,
    borderColor: "#E0E0E0",      // 薄い色
    borderTopColor: "#8BC34A",   // 上だけ緑（回って見える）
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: "#8BC34A",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default Loading;
