import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        size={48}
        color="#8BC34A"
      />

      <Text style={styles.text}>Now Loading...</Text>
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
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#8BC34A",
    fontWeight: "bold",
  },
});

export default Loading;
